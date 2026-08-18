import Preloader from '@/components/Preloader'
import ScrollProgress from '@/components/ScrollProgress'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MarqueeStrip from '@/components/MarqueeStrip'
import About from '@/components/About'
import StackedServices from '@/components/StackedServices'
import Process from '@/components/Process'
import ProjectShowcase from '@/components/ProjectShowcase'
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
          className="h-16 w-full bg-gradient-to-b from-[#041B13] to-[#654EA3]"
          aria-hidden="true"
        />

        <MarqueeStrip />
        <About />
        <StackedServices />
        <Process />
        <ProjectShowcase />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  )
}