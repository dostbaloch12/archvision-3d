import AnchorScroll from '@/components/AnchorScroll'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StudioIntro from '@/components/StudioIntro'
import Services from '@/components/StackedServices'
import ProjectShowcase from '@/components/ProjectShowcase'
import Process from '@/components/Process'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <AnchorScroll />
      <Navbar />

      <main id="main" className="pt-[92px]">
        <div className="site-container">
          <Hero />
          <StudioIntro />
        </div>

        <Services />
        <ProjectShowcase />
        <Process />

        <div className="site-container">
          <About />
        </div>

        <Contact />

        <div className="site-container">
          <Footer />
        </div>
      </main>
    </>
  )
}