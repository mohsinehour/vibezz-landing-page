import { useInView } from '../hooks/useInView'
import WaitlistFormSubmit from './WaitlistFormSubmit'

export default function Hero() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-12"
    >
      {/* Fade in from top */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF2E8] to-transparent pointer-events-none z-10" />
      {/* Fade out to bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF2E8] to-transparent pointer-events-none z-10" />
      {/* Subtle background blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#F00B51]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#730062]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-16">
        {/* Left: Text content */}
        <div className={`transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="gradient-text font-heading font-medium text-xs md:text-md tracking-widest uppercase">
              Stop Scrolling, Start Feeling
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-tight mb-5">
            The right song<br />
            for every reel{' '}
            <em className="gradient-text not-italic">Instantly.</em>
          </h1>

          {/* Subline */}
          <p className="font-body text-[#777777] text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Upload your video. Vibezz's AI reads the mood, energy, and pace — then suggests the perfect track for your reel. No more scrolling. No more guessing.
          </p>

          {/* Form */}
          <WaitlistFormSubmit />

          {/* Note */}
          <p className="mt-4 font-body text-xs text-[#aaa] italic">
            Free forever for early members · No credit card needed
          </p>
        </div>

        {/* Right: Hero image */}
        <div className={`relative flex justify-center md:justify-end transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            {/* Glow behind image */}
            <div className="absolute inset-0 gradient-bg rounded-3xl blur-2xl opacity-20 scale-110" />
            <img
              src="/assets/hero-img.png"
              alt="Vibezz app — the right song for every reel"
              className="relative w-full max-w-sm md:max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}