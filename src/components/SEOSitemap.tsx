
import { useEffect } from 'react';

const SEOSitemap = () => {
  useEffect(() => {
    // Generate XML sitemap dynamically
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://survivalist-gpt.lovable.app/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    // Create robots.txt content
    const robots = `User-agent: *
Allow: /

Sitemap: https://survivalist-gpt.lovable.app/sitemap.xml`;

    // Log for manual implementation
    console.log('Sitemap XML:', sitemap);
    console.log('Robots.txt:', robots);
  }, []);

  return null;
};

export default SEOSitemap;
