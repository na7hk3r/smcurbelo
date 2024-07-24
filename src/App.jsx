import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {

  return (
    <>
      <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      <Footer />
      <Analytics />
      <SpeedInsights/>
    </>
  )
}

export default App
