import { NextResponse } from 'next/server';
import { sendInquiryEmail, MailerConfigError } from '@/lib/mailer';
import { clientIpFrom, checkRateLimit } from '@/lib/rateLimit';

// Nodemailer needs net/tls/stream, which the Edge runtime does not provide.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PER_FILE_LIMIT = 10 * 1024 * 1024; // 10,485,760
const TOTAL_LIMIT = 20 * 1024 * 1024; // 20,971,520
const ALLOWED_EXT = ['.pdf', '.dwg', '.step', '.stp', '.iges', '.igs', '.png', '.jpg', '.jpeg'];
const MAX_LEN = { name: 100, company: 150, phone: 10, email: 254, service: 100, message: 5000 };

const CONTACT_FALLBACK =
  'Please call +91 93233 97961 or message us on WhatsApp at +91 83083 83673.';
const GENERIC_SEND_FAILURE = `We could not send your inquiry right now. ${CONTACT_FALLBACK}`;
const SUCCESS_MESSAGE =
  'Thank you. Your inquiry has been sent. We will respond within 24 hours.';

/**
 * Single exit point for errors.
 *
 * Every message passed here is a fixed string from the taxonomy below, so no
 * internal detail - no stack, no SMTP dialogue, no environment value - can
 * reach the response body. The old route returned `error.message`, which is
 * how a raw Mongoose connection error ended up rendered in the browser.
 */
function fail(status, message) {
  return NextResponse.json({ success: false, message }, { status });
}

function ok() {
  return NextResponse.json({ success: true, message: SUCCESS_MESSAGE }, { status: 200 });
}

function extensionOf(filename) {
  const match = /\.[^.]+$/.exec(String(filename || '').toLowerCase());
  return match ? match[0] : '';
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request) {
  let fields = null;
  let attachments = [];

  try {
    let formData;
    try {
      formData = await request.formData();
    } catch {
      return fail(400, 'We could not read your submission. Please try again.');
    }

    const read = (key) => {
      const value = formData.get(key);
      return typeof value === 'string' ? value.trim() : '';
    };

    // 1. Honeypot. A tripped trap gets the byte-identical success response so a
    // bot cannot tell acceptance from rejection, and it is checked before the
    // rate limiter so bots do not burn a slot shared by real visitors behind
    // the same NAT address.
    if (read('website')) {
      return ok();
    }

    // 2. Rate limit.
    const ip = clientIpFrom(request.headers);
    const { allowed } = checkRateLimit(ip);
    if (!allowed) {
      console.warn('[inquiry] rate limited', { ip });
      return fail(
        429,
        'Too many submissions from this network. Please try again in a little while, or call +91 93233 97961.'
      );
    }

    // 3. Text field validation. Never trust the client.
    const name = read('name');
    const company = read('company');
    const phone = read('phone');
    const email = read('email');
    const service = read('service');
    const message = read('message');

    const required = [
      ['name', name, 'Name'],
      ['phone', phone, 'Phone number'],
      ['email', email, 'Email address'],
      ['service', service, 'Service'],
    ];

    for (const [, value, label] of required) {
      if (!value) return fail(400, `${label} is required.`);
    }

    if (!EMAIL_PATTERN.test(email)) {
      return fail(400, 'Please enter a valid email address.');
    }

    if (!/^\d{10}$/.test(phone)) {
      return fail(400, 'Please enter a 10-digit phone number.');
    }

    const lengthChecks = [
      ['Name', name, MAX_LEN.name],
      ['Company name', company, MAX_LEN.company],
      ['Email address', email, MAX_LEN.email],
      ['Service', service, MAX_LEN.service],
      ['Message', message, MAX_LEN.message],
    ];

    for (const [label, value, limit] of lengthChecks) {
      if (value.length > limit) {
        return fail(400, `${label} is too long. Please keep it under ${limit} characters.`);
      }
    }

    fields = { name, company, phone, email, service, message };

    // 4. Attachment metadata validation, from File.name/.size only.
    //
    // Deliberately before any arrayBuffer() call: an oversized or wrong-type
    // upload is rejected without pulling its bytes into the heap.
    const selected = formData.getAll('files').filter((f) => f && typeof f.arrayBuffer === 'function' && f.size > 0);

    let runningTotal = 0;
    for (const file of selected) {
      const ext = extensionOf(file.name);
      if (!ALLOWED_EXT.includes(ext)) {
        return fail(
          400,
          `"${file.name}" is not an accepted file type. Please upload PDF, DWG, STEP, STP, IGES, IGS, PNG, JPG, or JPEG files.`
        );
      }
      if (file.size > PER_FILE_LIMIT) {
        return fail(400, `"${file.name}" is larger than the 10MB per-file limit.`);
      }
      runningTotal += file.size;
    }

    if (runningTotal > TOTAL_LIMIT) {
      return fail(400, 'Your attachments total more than 20MB. Please send fewer or smaller files.');
    }

    // 5. Read buffers only once the set is known to fit. Nothing touches disk.
    for (const file of selected) {
      const bytes = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: bytes,
        contentType: file.type || 'application/octet-stream',
      });
    }

    // 6. Send. Success is reported only after SMTP accepts the message.
    await sendInquiryEmail({ ...fields, attachments, submittedAt: new Date() });

    return ok();
  } catch (error) {
    if (error instanceof MailerConfigError) {
      // Variable names only - never their values.
      console.error('[inquiry] mailer misconfigured', { missing: error.missing });
      return fail(500, GENERIC_SEND_FAILURE);
    }

    // Lead-recovery log: with no database, this is the only way a submission
    // survives a failed send. Attachment bytes are mapped away to sizes, and
    // only error.name/.code are taken because Nodemailer's error.response can
    // echo the SMTP dialogue, which may quote the account username.
    console.error('[inquiry] send failed - lead payload for manual recovery', {
      receivedAt: new Date().toISOString(),
      ...(fields || {}),
      attachments: attachments.map((a) => ({ filename: a.filename, size: a.content?.length })),
      reason: error?.name,
      smtpCode: error?.code,
    });

    return fail(500, GENERIC_SEND_FAILURE);
  }
}
