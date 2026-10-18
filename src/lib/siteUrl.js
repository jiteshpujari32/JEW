/**
 * Resolves the public origin of the site for metadata, sitemap, and robots routes.
 */

/**
 * Documented default production URL, used whenever `NEXT_PUBLIC_SITE_URL` is
 * missing or unusable.
 *
 * NOTE: update this constant when a custom domain is attached to the
 * deployment — it is the documented default production URL and is what every
 * environment without an explicit `NEXT_PUBLIC_SITE_URL` falls back to.
 */
export const FALLBACK_SITE_URL = 'https://jitesh-engineering-works.vercel.app';

/**
 * Returns the canonical site origin, with no trailing slash and no path.
 *
 * Total by design: unset, empty, whitespace-only, and malformed values all
 * resolve to `FALLBACK_SITE_URL` instead of throwing.
 *
 * @returns {string} An origin such as `https://example.com`.
 */
export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_SITE_URL;

  try {
    // Normalizing through `new URL().origin` strips any trailing slash and any
    // path, so downstream sitemap entries never come out as
    // `https://site.com//about`.
    return new URL(raw).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}
