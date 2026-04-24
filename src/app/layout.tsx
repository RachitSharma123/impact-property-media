import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import SiteShell from '@/components/SiteShell';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://impactpropertymedia.com.au'),
  title: 'Impact Property Media | Real Estate Photography Melbourne',
  description:
    'Premium real estate photography, video, aerial & virtual tours across Melbourne. Impact Property Media captures properties that sell.',
  keywords: [
    'real estate photography Melbourne',
    'property photography',
    'aerial drone photography',
    'virtual tours',
    'floor plans',
    'property videography',
    'Impact Property Media',
  ],
  alternates: {
    canonical: 'https://impactpropertymedia.com.au',
  },
  openGraph: {
    title: 'Impact Property Media | Real Estate Photography Melbourne',
    description:
      'Premium real estate photography, video, aerial & virtual tours across Melbourne. Impact Property Media captures properties that sell.',
    url: 'https://impactpropertymedia.com.au',
    siteName: 'Impact Property Media',
    type: 'website',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impact Property Media | Real Estate Photography Melbourne',
    description:
      'Premium real estate photography, video, aerial & virtual tours across Melbourne. Impact Property Media captures properties that sell.',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
