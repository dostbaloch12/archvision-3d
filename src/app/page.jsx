import Preloader from '@/components/Preloader'
import ScrollProgress from '@/components/ScrollProgress'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import UXAuditBadge from '@/components/UXAuditBadge'
import MarqueeStrip from '@/components/MarqueeStrip'
import About from '@/components/About'
import StackedServices from '@/components/StackedServices'
import Process from '@/components/Process'
import ProjectShowcase from '@/components/ProjectShowcase'
import SEOServiceLinks from '@/components/SEOServiceLinks'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Navbar />

      <main id="main">
        <Hero />

        <div
          className="h-16 w-full bg-gradient-to-b from-[#080808] to-[#111111]"
          aria-hidden="true"
        />

        <UXAuditBadge />
        <MarqueeStrip />
        <About />
        <StackedServices />
        <Process />
        <ProjectShowcase />
        <SEOServiceLinks />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
