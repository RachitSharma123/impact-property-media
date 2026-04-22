export const dynamic = 'force-dynamic'

import VideoHero from '@/components/VideoHero'
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
