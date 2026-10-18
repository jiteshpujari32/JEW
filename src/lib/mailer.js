/**
 * Email transport and inquiry notification sending.
 *
 * This module is the only place the application reads SMTP configuration and
 * the only place it opens a mail connection. It is imported exclusively from
 * the `runtime = 'nodejs'` inquiry route, so the `SMTP_*` reads stay
 * server-side and are never bundled for the browser.
 *
 * `nodemailer` is pinned at 6.9.16. Note for anyone bumping it: 6.9.18 does
 * not exist on the registry - the 6.9.x line ends at 6.9.16.
 *
 * CREDENTIAL HANDLING: `SMTP_PASSWORD` is read, handed to the transport, and
 * never logged, interpolated into a message, or included in an error. Config
 * errors carry variable *names* only.
 */

import nodemailer from 'nodemailer';
import { escapeHtml, escapeHtmlMultiline } from '@/lib/escapeHtml';

/**
 * Raised when the environment is missing configuration the mailer needs.
 *
 * Carries the offending variable names in `missing` so the caller can log them
 * directly. The caller maps this to a generic 500 for the visitor - the names
 * are operator diagnostics, not user-facing text.
 */
export class MailerConfigError extends Error {
  constructor(missing, message) {
    const names = Array.isArray(missing)
      ? missing.filter((name) => typeof name === 'string' && name.length > 0)
      : [];

    super(
      message ||
        `Email is not configured. Missing or empty environment ${
          names.length === 1 ? 'variable' : 'variables'
        }: ${names.join(', ')}.`
    );

    this.name = 'MailerConfigError';
    this.missing = names;
  }
}

/**
 * Required variables, in the order they are reported when missing.
 *
 * Each reads `process.env` through a static property access rather than a
 * computed lookup, because Next.js substitutes environment values by matching
 * that exact syntax; `process.env[name]` is not always rewritten.
 */
const REQUIRED_VARS = [
  { name: 'SMTP_HOST', key: 'host', read: () => process.env.SMTP_HOST },
  { name: 'SMTP_PORT', key: 'port', read: () => process.env.SMTP_PORT },
  { name: 'SMTP_USER', key: 'user', read: () => process.env.SMTP_USER },
  { name: 'SMTP_PASSWORD', key: 'password', read: () => process.env.SMTP_PASSWORD },
  { name: 'INQUIRY_TO_EMAIL', key: 'to', read: () => process.env.INQUIRY_TO_EMAIL },
];

function readTrimmed(raw) {
  return typeof raw === 'string' ? raw.trim() : '';
}

/**
 * Read and validate the mail configuration from the environment.
 *
 * CALL SITE MATTERS: this runs inside `sendInquiryEmail`, never at module
 * scope. The old `src/lib/mongodb.js` threw at import time on a missing
 * `MONGODB_URI`; under the App Router that turns one absent variable into a
 * build/prerender crash that takes unrelated static pages down with it. Here a
 * missing variable surfaces only on the request that actually needs mail, so
 * `npm run build` succeeds with no SMTP variables set.
 */
function assertConfig() {
  const missing = [];
  const values = {};

  for (const variable of REQUIRED_VARS) {
    const value = readTrimmed(variable.read());
    if (value) {
      values[variable.key] = value;
    } else {
      missing.push(variable.name);
    }
  }

  if (missing.length > 0) {
    throw new MailerConfigError(missing);
  }

  const port = Number(values.port);

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new MailerConfigError(
      ['SMTP_PORT'],
      'Email is not configured. SMTP_PORT is not a valid TCP port number.'
    );
  }

  const bcc = readTrimmed(process.env.INQUIRY_BCC_EMAIL) || undefined;

  return { host: values.host, port, user: values.user, password: values.password, to: values.to, bcc };
}

/**
 * Cached transport, reused for the life of the process.
 *
 * Module scope persists across invocations on a warm serverless instance, so
 * one cold start pays the TLS handshake and later submissions reuse the pooled
 * connection.
 */
let cachedTransporter = null;

/**
 * Port 465 with implicit TLS is the intended setup: the TLS session is
 * established before any SMTP exchange, so there is no cleartext
 * EHLO/STARTTLS negotiation to downgrade. `secure` is derived from the port
 * rather than hard-coded, and `requireTLS` covers the other branch, so moving
 * to 587 is an environment change with no code change and no silent drop to
 * cleartext.
 */
function getTransporter(cfg) {
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    requireTLS: cfg.port !== 465,
    auth: { user: cfg.user, pass: cfg.password },
    pool: true,
    maxConnections: 1,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });

  return cachedTransporter;
}

/** Human-readable byte size for the attachment listing. */
function formatBytes(bytes) {
  const size = Number(bytes) || 0;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Format a timestamp in the business's own timezone.
 *
 * Computed server-side and pinned to Asia/Kolkata so the owner reads a local
 * time regardless of the serverless instance's UTC clock.
 */
function formatIst(date) {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

/**
 * Compose the owner notification message.
 *
 * Every visitor-supplied value is escaped before HTML interpolation. The
 * visitor's address goes in `replyTo` only - never in `From`, which Gmail
 * would reject as a spoof - so hitting Reply reaches the customer directly.
 */
export function buildInquiryMessage({
  name,
  company,
  phone,
  email,
  service,
  message,
  attachments = [],
  submittedAt = new Date(),
  config,
}) {
  const companyText = company && company.trim() ? company.trim() : 'Not provided';
  const messageText = message && message.trim() ? message.trim() : 'Not provided';
  const phoneDisplay = `+91${phone}`;
  const timestamp = formatIst(submittedAt);

  const attachmentLines = attachments.length
    ? attachments.map((a) => `  - ${a.filename} (${formatBytes(a.content?.length)})`).join('\n')
    : '  (none)';

  const text = [
    'New inquiry from the Jitesh Engineering Works website',
    `Received: ${timestamp} IST`,
    '',
    `Name:     ${name}`,
    `Company:  ${companyText}`,
    `Phone:    ${phoneDisplay}`,
    `Email:    ${email}`,
    `Service:  ${service}`,
    '',
    'Message:',
    messageText,
    '',
    `Attachments (${attachments.length}):`,
    attachmentLines,
    '',
  ].join('\n');

  const row = (label, value) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;white-space:nowrap;">${label}</td>` +
    `<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;">${value}</td></tr>`;

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
    <div style="background:#1f2937;color:#ffffff;padding:20px 24px;">
      <h1 style="margin:0;font-size:18px;">New Website Inquiry</h1>
      <p style="margin:6px 0 0;font-size:13px;color:#d1d5db;">Received ${escapeHtml(timestamp)} IST</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${row('Name', escapeHtml(name))}
      ${row('Company', escapeHtml(companyText))}
      ${row('Phone', `<a href="tel:${escapeHtml(phoneDisplay)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(phoneDisplay)}</a>`)}
      ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(email)}</a>`)}
      ${row('Service', escapeHtml(service))}
    </table>
    <div style="padding:16px 24px;">
      <p style="margin:0 0 6px;color:#6b7280;font-size:13px;">Message</p>
      <div style="color:#111827;font-size:14px;line-height:1.6;">${escapeHtmlMultiline(messageText)}</div>
    </div>
    <div style="padding:0 24px 20px;">
      <p style="margin:0 0 6px;color:#6b7280;font-size:13px;">Attachments (${attachments.length})</p>
      <div style="color:#111827;font-size:13px;">${
        attachments.length
          ? attachments
              .map((a) => `${escapeHtml(a.filename)} <span style="color:#6b7280;">(${escapeHtml(formatBytes(a.content?.length))})</span>`)
              .join('<br />')
          : '<span style="color:#6b7280;">None</span>'
      }</div>
    </div>
    <div style="background:#f9fafb;padding:14px 24px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;">
      Reply to this email to respond directly to the customer.
    </div>
  </div>
</body></html>`;

  const msg = {
    from: `"Jitesh Engineering Works Website" <${config.user}>`,
    to: config.to,
    replyTo: email,
    subject: `New Inquiry: ${service} \u2014 ${name}`,
    text,
    html,
    attachments: attachments.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
    })),
  };

  if (config.bcc) msg.bcc = config.bcc;

  return msg;
}

/**
 * Send one inquiry notification email.
 *
 * Resolves only once the SMTP server has accepted the message, which is the
 * confirmation the route needs before it reports success to the visitor.
 */
export async function sendInquiryEmail(payload) {
  const cfg = assertConfig();
  const transporter = getTransporter(cfg);
  const message = buildInquiryMessage({ ...payload, config: cfg });

  await transporter.sendMail(message);
}
