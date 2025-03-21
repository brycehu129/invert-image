import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Free Online Image Inverter | Invert Images Instantly - InvertImage.net',
  description: 'Free online tool to invert image colors. Create negative effects, enhance photos, and transform images instantly. No registration required. Support for JPG, PNG, WebP.',
  keywords: 'invert image, image inverter, photo negative, color inversion, image editing tool, online image inverter, free image tool',
  openGraph: {
    title: 'Free Online Image Inverter | InvertImage.net',
    description: 'Transform your images with our free online image inverter. Create stunning negative effects instantly.',
    type: 'website',
    url: 'https://invertimage.net',
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