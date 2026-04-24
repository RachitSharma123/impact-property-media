export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Script from 'next/script'
import VideoHero from '@/components/VideoHero'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://impactpropertymedia.com.au',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Impact Property Media',
  description: 'Premium real estate photography, video, aerial & virtual tours across Melbourne.',
  url: 'https://impactpropertymedia.com.au',
  telephone: '',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -37.8136,
    longitude: 144.9631,
  },
  areaServed: 'Melbourne, VIC, Australia',
  priceRange: '$$',
  serviceType: ['Real Estate Photography', 'Aerial Drone Photography', 'Property Videography', 'Virtual Tours', 'Floor Plans'],
}
import LogoBar from '@/components/LogoBar'
import ServicesGrid from '@/components/ServicesGrid'
import AboutSection from '@/components/AboutSection'
import PortfolioGrid from '@/components/PortfolioGrid'
import PackagesSection from '@/components/PackagesSection'
import Testimonials from '@/components/Testimonials'
import FAQSection from '@/components/FAQSection'
import BlogSection from '@/components/BlogSection'
import CTASection from '@/components/CTASection'
import ContactSection from '@/components/ContactSection'
export default function Home() {
  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <VideoHero />
      <LogoBar />
      <ServicesGrid />
      <AboutSection />
      <PortfolioGrid />
      <PackagesSection />
      <Testimonials />
      <FAQSection />
      <BlogSection />
      <CTASection />
      <ContactSection />
    </>
  )
}
