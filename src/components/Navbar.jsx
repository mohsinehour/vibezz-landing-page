import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['Problem', 'How It Works', 'Features']

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-[#FAF2E8]/90 backdrop-blur-md shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            src="/assets/vibezz-logo.png"
            alt="Vibezz"
            className="h-6 w-auto"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[#111111] font-body text-sm font-medium hover:text-[#F00B51] transition-colors duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <a
          href="#waitlist"
          className="hidden md:inline-flex items-center gap-2 gradient-bg text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5"
        >
          Join Waitlist →
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#111111] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#111111] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#111111] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#FAF2E8]/95 backdrop-blur-md px-6 pb-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setMenuOpen(false)}
              className="text-[#111111] font-body text-sm font-medium py-1 border-b border-[#111111]/10"
            >
              {link}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setMenuOpen(false)}
            className="gradient-bg text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full text-center"
          >
            Join Waitlist →
          </a>
        </div>
      </div>
    </nav>
  )
}
