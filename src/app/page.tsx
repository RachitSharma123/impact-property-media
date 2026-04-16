import HeroSlider from '@/components/HeroSlider'
import TrustBar from '@/components/TrustBar'
import ServicesGrid from '@/components/ServicesGrid'
import AboutSection from '@/components/AboutSection'
import PortfolioGrid from '@/components/PortfolioGrid'
import Testimonials from '@/components/Testimonials'
import ContactSection from '@/components/ContactSection'
import ChatBot from '@/components/ChatBot'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <TrustBar />
      <ServicesGrid />
      <AboutSection />
      <PortfolioGrid />
      <Testimonials />
      <ContactSection />
      <ChatBot />
    </>
  )
}
