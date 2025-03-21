import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Free Online Image Inverter - Professional Image Color Inversion Tool',
  description: 'Instantly invert your images with our professional-grade tool. Free, no registration required, supports all common image formats with high quality results.',
  keywords: 'image inverter, photo negative, color inversion, image editing tool, online image tool',
  robots: 'index, follow',
  openGraph: {
    title: 'Free Online Image Inverter',
    description: 'Professional image color inversion tool - free and instant processing',
    type: 'website',
    url: 'https://image-inverter.net',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image Inverter Tool Preview',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}