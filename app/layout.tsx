import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GoogleAnalytics from './components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invert Image Online | Free Image Color Inverter Tool',
  description: 'Free online tool to invert image colors. Easy to use image inverter - upload, invert, and download. Support PNG, JPG, JPEG formats. No registration required.',
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
  alternates: {
    canonical: 'https://invertimage.net'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Free online tool to invert image colors. Easy to use image inverter - upload, invert, and download. Support PNG, JPG, JPEG formats. No registration required." />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}