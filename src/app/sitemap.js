import { getSiteUrl } from '@/lib/siteUrl';
import { SERVICE_SLUGS } from '@/app/services/[slug]/page';

/**
 * The static public pages, with the crawl hints from the design table.
 *
 * API routes are deliberately absent (Req 10.5), and there are no `/admin`
 * entries because those pages no longer exist.
 */
const STATIC_PATHS = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'yearly' },
];

/**
 * One entry per service route, derived from `SERVICE_SLUGS` rather than a
 * duplicated literal list — adding a service to `servicesData` adds it here
 * too, so a new service page cannot be silently omitted from the sitemap.
 */
const SERVICE_PATHS = SERVICE_SLUGS.map((slug) => ({
  path: `/services/${slug}`,
  priority: 0.8,
  changeFrequency: 'monthly',
}));

const PATHS = [...STATIC_PATHS, ...SERVICE_PATHS];

/**
 * App Router sitemap metadata route: every public page on the configured
 * origin (Req 10.3).
 *
 * @returns {import('next').MetadataRoute.Sitemap}
 */
export default function sitemap() {
  const base = getSiteUrl();
  const lastModified = new Date();

  return PATHS.map(({ path, priority, changeFrequency }) => ({
    // `getSiteUrl()` has no trailing slash, so the root must contribute an
    // empty string rather than `/` to avoid emitting `https://site.com/`.
    url: `${base}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
