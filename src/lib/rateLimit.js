/**
 * In-memory, per-address sliding-window rate limiter for the public inquiry
 * endpoint.
 *
 * HONEST LIMITATION (Req 5.4). The state here lives in a module-scope `Map`
 * inside a single server instance, which makes this a speed bump rather than a
 * guarantee:
 *
 * - Under serverless hosting the platform runs many concurrent instances, each
 *   with its own copy of this map. A client routed across N instances gets up
 *   to N x MAX_REQUESTS submissions per window.
 * - A cold start resets the state entirely, so pausing past the idle-eviction
 *   window restores a full quota.
 * - A distributed source rotating addresses is not slowed at all, because the
 *   bucket key is the address itself.
 *
 * What it does buy: a single naive script hammering the endpoint from one
 * address is blocked within seconds, which covers the realistic abuse case for
 * a small business site. It raises the cost of casual single-source abuse and
 * nothing more.
 *
 * A durable limit needs shared state outside the instance - Upstash Redis or
 * Vercel KV keyed by address with an atomic increment - or a rate-limit rule at
 * the edge (Vercel Firewall / WAF). Both are explicitly out of scope here and
 * are the right answer if the inbox actually gets flooded.
 */

/** Length of the sliding window. */
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

/** Requests permitted per address per window. */
const MAX_REQUESTS = 5;

/**
 * Address -> ascending list of request timestamps (ms since epoch) inside the
 * current window. Pruned lazily on each check; see `checkRateLimit`.
 *
 * @type {Map<string, number[]>}
 */
const hits = new Map();

/**
 * Derive the client address from a request's headers.
 *
 * Reads the left-most entry of `x-forwarded-for`, then `x-real-ip`, then falls
 * back to the literal `'unknown'`.
 *
 * TRUST NOTE: the left-most `x-forwarded-for` entry is only trustworthy because
 * Vercel's edge strips any client-supplied value for this header before setting
 * its own chain. Behind a different proxy - or with no proxy at all - a caller
 * can forge that header and trivially rotate buckets, so this assumption must
 * be revisited if the deployment target changes.
 *
 * The shared `'unknown'` bucket is acceptable: locally it is a single
 * developer, and on Vercel the header is always present.
 *
 * @param {Headers} headers Request headers (`request.headers`).
 * @returns {string} A non-empty bucket key.
 */
export function clientIpFrom(headers) {
  if (!headers || typeof headers.get !== 'function') return 'unknown';

  const forwardedFor = headers.get('x-forwarded-for');
  if (typeof forwardedFor === 'string') {
    // Left-most entry is the original client in the edge-set chain.
    const first = forwardedFor.split(',')[0].trim();
    if (first) return first;
  }

  const realIp = headers.get('x-real-ip');
  if (typeof realIp === 'string') {
    const trimmed = realIp.trim();
    if (trimmed) return trimmed;
  }

  return 'unknown';
}

/**
 * Drop every timestamp older than the window and delete any key left with an
 * empty list.
 *
 * Sweeping the whole map rather than only the key being checked is what
 * actually bounds memory: pruning a single key does nothing about an address
 * that submitted once and never returned. The map therefore holds only
 * addresses seen within the last window, with no background timer.
 *
 * The cost is O(tracked addresses) per check, which is irrelevant at the volume
 * this endpoint sees - the limiter itself caps each address at MAX_REQUESTS per
 * hour, so the map cannot grow large between sweeps on a single instance.
 *
 * @param {number} now Current epoch milliseconds.
 */
function pruneExpired(now) {
  const cutoff = now - WINDOW_MS;

  for (const [key, timestamps] of hits) {
    const recent = timestamps.filter((timestamp) => timestamp > cutoff);

    if (recent.length === 0) {
      hits.delete(key);
    } else if (recent.length !== timestamps.length) {
      hits.set(key, recent);
    }
  }
}

/**
 * Record and evaluate one request from `ip` against the sliding window.
 *
 * A rejected request is not recorded. The window therefore slides off the
 * caller's existing timestamps on schedule rather than being pushed forward by
 * their own retries.
 *
 * @param {string} ip Bucket key, normally from `clientIpFrom`.
 * @returns {{ allowed: boolean, retryAfterSeconds: number }} `retryAfterSeconds`
 *   is 0 when allowed, otherwise a positive whole number of seconds until the
 *   oldest retained timestamp leaves the window.
 */
export function checkRateLimit(ip) {
  const key = typeof ip === 'string' && ip.trim() ? ip.trim() : 'unknown';
  const now = Date.now();

  pruneExpired(now);

  const recent = hits.get(key) || [];

  if (recent.length >= MAX_REQUESTS) {
    // Timestamps are appended in order, so index 0 is the oldest retained hit;
    // a slot frees up one window after it.
    const msUntilFree = recent[0] + WINDOW_MS - now;
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil(msUntilFree / 1000)),
    };
  }

  recent.push(now);
  hits.set(key, recent);

  return { allowed: true, retryAfterSeconds: 0 };
}
