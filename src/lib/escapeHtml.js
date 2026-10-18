/**
 * HTML escaping helpers for the inquiry mailer.
 *
 * Every visitor-supplied value is interpolated into the notification email's
 * HTML body, so these helpers are the boundary that keeps submitted text from
 * becoming markup in the owner's inbox. Both functions are total: any input
 * type is accepted and a string is always returned.
 */

/**
 * Coerce an arbitrary value to a string without throwing.
 *
 * `null` and `undefined` become an empty string. Exotic values that reject
 * primitive conversion (e.g. `Object.create(null)`, symbols) fall back to an
 * empty string rather than propagating a TypeError into the send path.
 *
 * @param {unknown} value
 * @returns {string}
 */
function toSafeString(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;

  try {
    return String(value);
  } catch {
    return '';
  }
}

/**
 * Escape the five HTML metacharacters in `value`.
 *
 * Ordering matters: `&` must be replaced first. Escaping it after the others
 * would rewrite the ampersands introduced by those replacements and
 * double-escape them (`<` → `&lt;` → `&amp;lt;`).
 *
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  return toSafeString(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Escape `value` and then convert its newlines to `<br />`, preserving the
 * line breaks a visitor typed in the message field.
 *
 * The order is deliberate and must not be reversed: inserting `<br />` before
 * escaping would leave literal `<br />` text in the string, which `escapeHtml`
 * would then turn into `&lt;br /&gt;` — the break shows up as visible markup
 * instead of a line break. Escape first, insert breaks second.
 *
 * All three newline forms (`\r\n`, `\r`, `\n`) collapse to a single break.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtmlMultiline(value) {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, '<br />');
}
