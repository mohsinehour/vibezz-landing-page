import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { Upload, AudioLines, Music4, Folder, Fingerprint, Link } from "lucide-react";

const steps = [
  {
    number: '1.',
    icon: <Upload />,
    title: 'Upload Your Clip',
    body: 'Drop any reel or story. Any format, any length. No editing experience needed.',
    badge: 'Instant Upload',
    badgeIcon: <Folder />,
    badgeDetail: 'Supports MP4, MOV, and all major video formats. Works directly from your camera roll, no compression or conversion needed.',
  },
  {
    number: '2.',
    icon: <AudioLines />,
    title: 'Vibezz Reads The Vibe',
    body: 'We scan mood, energy, pace, color tone, and motion — to understand what your content actually feels like.',
    badge: 'Vibe Fingerprint',
    badgeIcon: <Fingerprint />,
    badgeDetail: 'Emotion, energy level, visual tempo, and color mood are all mapped and connected to what music your audience will feel.',
  },
  {
    number: '3.',
    icon: <Music4 />,
    title: 'Get Your Matches',
    body: 'Curated song suggestions with match score, 30s preview, and one-tap link to apply on Instagram or TikTok.',
    badge: 'One-Tap Apply',
    badgeIcon: <Link size={24} />,
    badgeDetail: 'Preview each track in app, see your match score, then apply it directly to your reel or story without ever leaving Vibezz.',
  },
]

// ─── Mobile card (normal scroll) ───────────────────────────────────────────
function MobileStepCard({ step, index }) {
  const { ref, inView } = useInView({ threshold: 0.2 })
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="bg-white rounded-2xl p-6 border border-[#111111]/6 shadow-sm">
        <span className="font-heading text-2xl gradient-text block mb-3">{`Step 0${index + 1}`}</span>
        <div className="flex items-start justify-between mb-4">
          <h2 className="font-heading gradient-text text-4xl">{step.number}</h2>
          <span className="w-10 h-10 rounded-xl bg-[#FAF2E8] text-[#F00B51] flex items-center justify-center ml-2">
            {step.icon}
          </span>
        </div>
        <h3 className="font-heading text-[#111111] text-lg leading-relaxed mb-4">{step.title}</h3>
        <p className="font-body text-[#777777] text-sm leading-relaxed mb-5">{step.body}</p>
        <div className="flex gap-2 bg-[#FAF2E8] rounded-xl p-4 border border-[#F00B51]/15">
          <span className="w-10 h-10 shrink-0 rounded-xl bg-[#730062]/20 text-[#730062] flex items-center justify-center">
            {step.badgeIcon}
          </span>
          <div>
            <p className="font-body font-semibold text-xs text-[#F00B51] mb-0.5">{step.badge}</p>
            <p className="font-body text-xs text-[#777777]">{step.badgeDetail}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────
export default function HowItWorks() {
  const sectionRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const { ref: headingRef, inView: headingInView } = useInView()

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Desktop scroll tracking
  useEffect(() => {
    if (isMobile) return
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const extraScroll = section.offsetHeight - window.innerHeight
      if (extraScroll <= 0) return
      const scrolled = Math.max(0, -rect.top)
      const p = Math.min(scrolled / extraScroll, 1)
      setProgress(p)
      setActiveStep(Math.min(Math.round(p * (steps.length - 1)), steps.length - 1))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  // Card transform based on position relative to active step
  const getCardStyle = (index) => {
    const diff = index - activeStep
    if (diff < 0) {
      // Already passed — slide up and out
      return {
        transform: 'translateY(-112%) scale(0.96)',
        zIndex: 10 - Math.abs(diff),
        opacity: 0,
        pointerEvents: 'none',
        transition: 'all 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
      }
    } else if (diff === 0) {
      // Active card — fully visible on top
      return {
        transform: 'translateY(0) scale(1)',
        zIndex: 30,
        opacity: 1,
        transition: 'all 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
      }
    } else {
      // Future cards — peek from below, slightly scaled down
      return {
        transform: `translateY(${diff * 16}px) scale(${1 - diff * 0.04})`,
        zIndex: 20 - diff,
        opacity: 1,
        pointerEvents: 'none',
        transition: 'all 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        transformOrigin: 'top center',
      }
    }
  }

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative pt-20"
      style={{ height: isMobile ? 'auto' : `${(steps.length + 1.5) * 100}vh` }}
    >
      {/* Fade in from top */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF2E8] to-transparent pointer-events-none z-10" />
      {/* Fade out to bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF2E8] to-transparent pointer-events-none z-10" />

      {/* ── DESKTOP: sticky scroll deck ── */}
      <div className="max-w-5xl mx-auto h-full flex flex-col">

        {/* Headline (desktop only — mobile has its own inside the mobile block) */}
        <div
          ref={headingRef}
          className={`hidden md:block text-center mb-10 shrink-0 transition-all duration-700 ${headingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="gradient-text font-heading font-medium text-sm tracking-widest uppercase">
            How It Works
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#111111] mt-3 leading-tight">
            From Upload To{' '}
            <em className="gradient-text not-italic">Perfect Track</em>{' '}
            In Under{' '}
            <em className="gradient-text not-italic">10</em>{' '}
            Seconds.
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="hidden md:block sticky top-20 h-[75vh] overflow-hidden py-14 px-6">
          <div className="flex gap-100 flex-1 min-h-0 items-center">

            {/* Left column: animated line + step labels */}
            <div className="relative flex flex-col justify-between h-[320px] min-w-[150px]">
              {/* Grey base line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#e0e0e0]" />
              {/* Gradient progress line */}
              <div
                className="absolute left-0 top-0 w-px bg-gradient-to-b from-[#F00B51] to-[#730062]"
                style={{
                  height: `${progress * 100}%`,
                  transition: 'height 0.4s ease-out',
                }}
              />
              {/* Step labels */}
              {steps.map((_, i) => (
                <div key={i} className="pl-16">
                  <span
                    className={`font-heading text-3xl leading-none transition-all duration-500 ${activeStep >= i ? 'gradient-text' : 'text-[#ccc]'
                      }`}
                  >
                    Step {`0${i + 1}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Right column: stacked card deck */}
            <div className="flex-1 relative" style={{ height: '380px' }}>
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="absolute inset-x-0 top-0"
                  style={getCardStyle(i)}
                >
                  <div className="bg-white rounded-2xl p-10 border border-[#111111]/6 shadow-sm">
                    <div className="flex items-start justify-between mb-5">
                      <h2 className="font-heading gradient-text text-4xl">{step.number}</h2>
                      <span className="w-10 h-10 rounded-xl bg-[#FAF2E8] text-[#F00B51] flex items-center justify-center ml-2">
                        {step.icon}
                      </span>
                    </div>
                    <h3 className="font-heading text-[#111111] text-lg leading-relaxed mb-4">{step.title}</h3>
                    <p className="font-body text-[#777777] text-sm leading-relaxed mb-5">{step.body}</p>
                    <div className="flex gap-2 bg-[#FAF2E8] rounded-xl p-4 border border-[#F00B51]/15">
                      <span className="w-10 h-10 shrink-0 rounded-xl bg-[#730062]/20 text-[#730062] flex items-center justify-center">
                        {step.badgeIcon}
                      </span>
                      <div>
                        <p className="font-body font-semibold text-xs text-[#F00B51] mb-0.5">{step.badge}</p>
                        <p className="font-body text-xs text-[#777777]">{step.badgeDetail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: normal scroll ── */}
      <div className="md:hidden relative py-24 px-6">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF2E8] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF2E8] to-transparent pointer-events-none z-10" />
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-4">
            <span className="gradient-text font-heading font-medium text-sm tracking-widest uppercase">
              How It Works
            </span>
          </div>
          <h2 className="font-heading text-3xl text-[#111111] text-center mb-12 leading-tight">
            From Upload To{' '}
            <em className="gradient-text not-italic">Perfect Track</em>{' '}
            In Under{' '}
            <em className="gradient-text not-italic">10</em>{' '}
            Seconds.
          </h2>
          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <MobileStepCard key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}