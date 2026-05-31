import { useInView } from '../hooks/useInView'
import WaitlistFormSubmit from './WaitlistFormSubmit'

export default function WaitlistCTA() {
  const { ref, inView } = useInView({ threshold: 0.15 })

  return (
    <section
      id="waitlist"
      className="relative pt-28 pb-12 px-6 overflow-hidden bg-gradient-to-b from-[#F00B51]/20 to-[#730062]/20"
    >
      {/* Fade in from top */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF2E8] to-transparent pointer-events-none z-10" />
      {/* Fade out to bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF2E8] to-transparent pointer-events-none z-10" />
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F00B51]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#730062]/8 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`flex flex-col items-center justify-center max-w-2xl mx-auto text-center relative z-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Tag */}
        <div className="flex flex-col items-center justify-center gap-5 mb-5">
          <div className="flex items-center justify-center">
            <img src="/assets/vibezz-favicon.png" alt="Icon" className="w-8 h-8" />
          </div>
          <span className="gradient-text font-heading font-medium text-md tracking-widest uppercase">
            Early Access
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#111111] mb-4 leading-tight">
          Find Your{' '}
          <em className="gradient-text not-italic">Sound,</em>
          <br />
          Before Everyone Else.
        </h2>

        {/* Subline */}
        <p className="font-body text-[#777777] text-base md:text-lg mb-10 leading-relaxed">
          Join the waitlist and get free early access when we launch. No spam — just your invite when it's ready.
        </p>

        {/* Form */}
        <WaitlistFormSubmit />

        {/* Note */}
        <p className="mt-5 font-body text-xs text-[#aaa] italic">
          Free forever for early members · No credit card needed · Unsubscribe anytime
        </p>
      </div>
    </section>
  )
}