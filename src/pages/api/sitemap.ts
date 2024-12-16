import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(_req:NextApiRequest, res:NextApiResponse) {
  // Sahifalar katalogini o‘qish
  const pagesDir = path.join(process.cwd(), 'src/pages'); // Sahifalar joylashgan joy (o'zingizda bu joyni tekshiring)
  const files = fs.readdirSync(pagesDir);

  // Faqat kerakli fayllarni filtrlash
  const staticPages = files
    .filter((file) => file.endsWith('.js') || file.endsWith('.tsx'))
    .map((file) => `/${file.replace(/\.js|\.tsx/g, '')}`);

  // Agar kerak bo‘lsa, dinamik yo‘llarni qo‘shish
  const dynamicPages = [
    { url: '/drivers/1' },
    { url: '/drivers/2' },
    // Boshqa dinamik yo‘llarni qo‘shing yoki API’dan oling
  ];

  // Sitemap yaratish
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const urls = [...staticPages, ...dynamicPages.map((page) => page.url)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${siteUrl}${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`
  )
  .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
}
