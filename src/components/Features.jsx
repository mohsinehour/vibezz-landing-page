import { useInView } from '../hooks/useInView'
import { useState, useRef } from 'react'
import { Video, Puzzle, SlidersVertical, Play, Link, Zap } from 'lucide-react';

const features = [
  {
    icon: <Video className="text-[#F00B51]" />,
    title: 'Video Vibe Analysis',
    body: 'AI reads mood, color temperature, pacing, and energy — not just the caption you write.',
  },
  {
    icon: <Puzzle className="text-[#730062]" />,
    title: 'Precision Matching',
    body: 'Songs matched by tempo, mood, genre, and energy — not pulled from a generic trending list.',
  },
  {
    icon: <SlidersVertical className="text-[#F00B51]" />,
    title: 'Your Taste, Your Rules',
    body: 'Set desired mood, BPM range, or genre. The AI folds your input into the result.',
  },
  {
    icon: <Play className="text-[#730062]" />,
    title: 'In-App Preview',
    body: 'Hear a 30-second preview of each suggestion before deciding. No tab-switching.',
  },
  {
    icon: <Link className="text-[#F00B51]" />,
    title: 'One-Tap Apply',
    body: 'Found your song? Apply it to your Instagram or TikTok story with a single tap.',
  },
  {
    icon: <Zap className="text-[#730062]" />,
    title: 'Under 10 Seconds',
    body: 'Upload, analyze, and see your top song picks in seconds. Not minutes.',
  },
]

function FeatureCard({ icon, title, body, className = "" }) {
  return (
    <div className="group bg-white rounded-2xl p-6 border border-[#111111]/6 hover:shadow-xl hover:shadow-[#F00B51]/10 hover:border-[#F00B51]/30 hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer h-full">
      <div className="w-10 h-10 rounded-xl bg-[#FAF2E8] flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-3">
        {icon}
      </div>
      <h3 className="font-heading text-[#111111] text-base mb-2">{title}</h3>
      <p className="font-body text-[#777777] text-sm leading-relaxed">{body}</p>
    </div>
  )
}

export default function Features() {
  const { ref, inView } = useInView()
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef(null)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const index = Math.round(el.scrollLeft / el.offsetWidth)
    setActiveIndex(index)
  }

  return (
    <section id="features" className="relative py-14 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Tag */}
        <div
          ref={ref}
          className={`text-center mb-4 transition-all duration-[600ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="gradient-text font-heading font-medium text-md tracking-widest uppercase">
            Why Vibezz
          </span>
        </div>

        {/* Headline */}
        <h2
          className={`font-heading text-3xl md:text-4xl lg:text-5xl text-[#111111] text-center mb-3 leading-tight transition-all duration-[600ms] delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          Everything A{' '}
          <em className="gradient-text not-italic">Creator</em>{' '}
          Actually Needs.
        </h2>

        {/* Subline */}
        <p
          className={`font-body text-[#777777] text-base md:text-lg text-center max-w-xl mx-auto mb-14 transition-all duration-[600ms] delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          No bloat. Just the tools that get you from clip to posted.
        </p>

        {/* Mobile carousel */}
        <div className="sm:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={`flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide transition-all duration-700 delay-[400ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="flex-none w-[85vw] snap-center"
              >
                <FeatureCard {...f} className="shadow-xl shadow-[#F00B51]/10" />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className={`flex justify-center gap-2 mt-5 transition-all duration-700 delay-[400ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  scrollRef.current?.scrollTo({ left: i * scrollRef.current.offsetWidth, behavior: 'smooth' })
                  setActiveIndex(i)
                }}
                className={`transition-all duration-300 rounded-full ${activeIndex === i
                  ? 'w-6 h-2 gradient-bg'
                  : 'w-2 h-2 bg-[#111111]/20'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className={`hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 delay-[400ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}