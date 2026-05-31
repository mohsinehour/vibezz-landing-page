import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Comparison from './components/Comparison'
import WaitlistCTA from './components/WaitlistCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF2E8]">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Comparison />
        <WaitlistCTA />
      </main>
      <Footer />
    </div>
  )
}
