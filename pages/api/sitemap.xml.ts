import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 设置正确的 Content-Type
  res.setHeader('Content-Type', 'application/xml');
  
  // 生成 sitemap XML
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

  // 发送响应
  res.write(xml);
  res.end();
} 