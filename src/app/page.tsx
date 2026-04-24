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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly will I receive my photos and videos?',
      acceptedAnswer: { '@type': 'Answer', text: 'Photos are delivered within 24 hours of the shoot. Video packages are delivered within 48 hours. Rush delivery is available on request.' },
    },
    {
      '@type': 'Question',
      name: 'Do you cover all of Melbourne?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, we cover all Melbourne metro suburbs and surrounding regions. Travel fees may apply beyond 50km from the CBD.' },
    },
    {
      '@type': 'Question',
      name: 'What happens if the weather is bad on shoot day?',
      acceptedAnswer: { '@type': 'Answer', text: "We monitor weather closely and will contact you if conditions aren't suitable. We rebook at no extra charge." },
    },
    {
      '@type': 'Question',
      name: 'Can I request specific shots or angles?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. We encourage you to share a shot list before the shoot. Our photographers will also recommend their best angles.' },
    },
    {
      '@type': 'Question',
      name: 'Do you offer twilight photography?',
      acceptedAnswer: { '@type': 'Answer', text: "Yes — twilight shoots are available as an add-on to any package. They're particularly effective for premium listings." },
    },
    {
      '@type': 'Question',
      name: 'How do I book?',
      acceptedAnswer: { '@type': 'Answer', text: "Simply fill out the contact form or call us. We'll confirm your booking within 2 hours." },
    },
  ],
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
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
