import { GetServerSideProps } from 'next';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (!res) return { props: {} };

  res.setHeader('Content-Type', 'application/xml');
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        <url>
            <loc>https://invertimage.net/</loc>
            <lastmod>2024-03-21</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://www.invertimage.net/</loc>
            <lastmod>2024-03-21</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
    </urlset>`;

  res.write(xml);
  res.end();

  return { props: {} };
};

export default Sitemap; 