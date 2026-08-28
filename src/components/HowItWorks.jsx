import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { Upload, AudioLines, Music4, Folder, Fingerprint, Link } from "lucide-react";

const steps = [
  {
    number: '1.',
    icon: <Upload size={18} />,
    title: 'Upload Your Clip',
    body: 'Drop any reel or story. Any format, any length. No editing experience needed.',
    badge: 'Instant Upload',
    badgeIcon: <Folder size={18} />,
    badgeDetail: 'Supports MP4, MOV, and all major video formats. Works directly from your camera roll, no compression or conversion needed.',
  },
  {
    number: '2.',
    icon: <AudioLines size={18} />,
    title: 'Vibezz Reads The Vibe',
    body: 'We scan mood, energy, pace, color tone, and motion — to understand what your content actually feels like.',
    badge: 'Vibe Fingerprint',
    badgeIcon: <Fingerprint size={18} />,
    badgeDetail: 'Emotion, energy level, visual tempo, and color mood are all mapped and connected to what music your audience will feel.',
  },
  {
    number: '3.',
    icon: <Music4 size={18} />,
    title: 'Get Your Matches',
    body: 'Curated song suggestions with match score, 30s preview, and one-tap link to apply on Instagram or TikTok.',
    badge: 'One-Tap Apply',
    badgeIcon: <Link size={18} />,
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

// ─── Desktop Step Card (sticky overlap style) ──────────────────────────────
function DesktopStepCard({ step, index }) {
  return (
    <div
      className="sticky bg-white rounded-2xl p-10 border border-[#111111]/6 shadow-md"
      style={{
        top: `${100 + index * 24}px`,
        zIndex: 10 + index,  // each card sits ON TOP of the previous
      }}
    >
      {/* Step badge + icon */}
      <div className="flex items-center justify-between mb-6">
        <span className="inline-flex items-center border border-[#F00B51]/30 text-[#F00B51] font-body font-semibold text-xs tracking-widest uppercase px-3 py-1 rounded-full">
          Step 0{index + 1}
        </span>
        <span className="w-10 h-10 rounded-xl bg-[#FAF2E8] text-[#F00B51] flex items-center justify-center">
          {step.icon}
        </span>
      </div>
      <h3 className="font-heading text-[#111111] text-2xl leading-tight mb-3">{step.title}</h3>
      <p className="font-body text-[#777777] text-sm leading-relaxed mb-6">{step.body}</p>
      <div className="flex gap-3 bg-[#FAF2E8] rounded-xl p-4 border border-[#F00B51]/15">
        <span className="w-10 h-10 shrink-0 rounded-xl bg-[#730062]/20 text-[#730062] flex items-center justify-center">
          {step.badgeIcon}
        </span>
        <div>
          <p className="font-body font-semibold text-xs text-[#F00B51] mb-0.5">{step.badge}</p>
          <p className="font-body text-xs text-[#777777]">{step.badgeDetail}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────
export default function HowItWorks() {
  const sectionRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)
  const [lineProgress, setLineProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const stepRefs = useRef([])
  const { ref: headingRef, inView: headingInView } = useInView()

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Track which step card is in view on desktop
  useEffect(() => {
    if (isMobile) return
    const handleScroll = () => {
      const midY = window.innerHeight / 2
      let current = 0
      stepRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (rect.top <= midY) current = i
      })
      setActiveStep(current)

      // Line progress: 0 at first step visible, 1 at last step
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      setLineProgress(Math.min(scrolled / total, 1))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative pt-20"
    >
      {/* ── DESKTOP layout ── */}
      <div className="hidden md:block max-w-5xl mx-auto px-6">

        {/* Section headline */}
        <div
          ref={headingRef}
          className={`text-center mb-16 transition-all duration-700 ${headingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
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

        {/* Two-column: left sticky nav + right scrolling cards */}
        <div className="flex gap-64 items-start">

          {/* ── Left: sticky step nav ── */}
          <div className="sticky top-24 w-56 shrink-0 self-start">
            {/* Vertical line container */}
            <div className="relative pl-6">
              {/* Grey base line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-[#e0e0e0]" />
              {/* Animated gradient fill */}
              <div
                className="absolute left-0 top-2 w-px bg-gradient-to-b from-[#F00B51] to-[#730062] transition-all duration-300 ease-out"
                style={{ height: `${lineProgress * 100}%` }}
              />

              {/* Step items */}
              <div className="flex flex-col gap-10">
                {steps.map((step, i) => {
                  const isActive = activeStep === i
                  const isPast = activeStep > i
                  const isActivated = isActive || isPast
                  return (
                    <div key={i} className="flex items-start gap-3">
                      {/* Circle number */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-bold shrink-0 -ml-[14.5px] transition-all duration-500 border ${isActivated
                          ? 'bg-[#F00B51] text-white border-[#F00B51]'
                          : 'bg-white text-[#ccc] border-[#ddd]'
                          }`}
                      >
                        {i + 1}
                      </div>
                      {/* Step label */}
                      <div>
                        <p className={`font-heading text-sm font-semibold leading-tight transition-colors duration-500 ${isActivated ? 'text-[#111111]' : 'text-[#bbb]'}`}>
                          {step.title}
                        </p>
                        {isActive && (
                          <p className="font-body text-xs text-[#777777] mt-1 leading-relaxed">
                            {step.body}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Right: stacking sticky cards ── */}
          <div className="flex-1 pb-[50vh]">
            {steps.map((step, i) => (
              <div
                key={step.title}
                ref={el => stepRefs.current[i] = el}
                style={{ marginBottom: i < steps.length - 1 ? '60vh' : 0 }}
              >
                <DesktopStepCard step={step} index={i} />
              </div>
            ))}
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