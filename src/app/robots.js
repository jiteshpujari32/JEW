import { getSiteUrl } from '@/lib/siteUrl';

/**
 * App Router robots metadata route.
 *
 * Permits crawling of every public page, keeps crawlers out of `/api/`, and
 * points them at the sitemap on the configured origin.
 *
 * @returns {import('next').MetadataRoute.Robots}
 */
export default function robots() {
  const base = getSiteUrl();

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
