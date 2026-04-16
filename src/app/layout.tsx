import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
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
  openGraph: {
    title: 'Impact Property Media | Real Estate Photography Melbourne',
    description:
      'Premium real estate photography, video, aerial & virtual tours across Melbourne. Impact Property Media captures properties that sell.',
    type: 'website',
    locale: 'en_AU',
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
