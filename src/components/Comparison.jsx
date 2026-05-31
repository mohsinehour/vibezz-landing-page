import { useInView } from '../hooks/useInView'
import { Frown, Smile } from "lucide-react"

const withoutItems = [
  '30–60 min scrolling music apps',
  "Random picks that don't fit the vibe",
  'Same trending song as everyone else',
  "4 apps open before you've even posted",
]

const withItems = [
  'Song suggestions in under 10 seconds',
  "Songs matched to your video's mood",
  'Discover tracks that fit your vibe',
  'Upload, match, post, all in one place',
]

export default function Comparison() {
  const { ref, inView } = useInView()
  const { ref: leftRef, inView: leftIn } = useInView({ threshold: 0.2 })
  const { ref: rightRef, inView: rightIn } = useInView({ threshold: 0.2 })

  return (
    <section className="relative py-24 px-6 bg-white/40">
      {/* Fade in from top */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF2E8] to-transparent pointer-events-none z-10" />

      {/* Fade out to bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF2E8] to-transparent pointer-events-none z-10" />
      <div className="max-w-5xl mx-auto">
        {/* Headline */}
        <h2
          ref={ref}
          className={`font-heading text-3xl md:text-4xl lg:text-5xl text-[#111111] text-center mb-14 leading-tight transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          Not Another{' '}
          <em className="gradient-text not-italic">Random</em>{' '}
          Scroller.
        </h2>

        {/* Two column comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Without Vibezz */}
          <div
            ref={leftRef}
            className={`rounded-2xl bg-[#f5f5f5] p-8 shadow-lg shadow-[#730062]/20 transition-all duration-700 delay-100 ${leftIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-body font-bold text-[#999] uppercase tracking-widest">
                Without Vibezz
              </span>
              <span className="ml-auto flex items-center justify-center text-[#999] font-bold text-xs">
                <Frown className="w-6 h-6" />
              </span>
            </div>
            <ul className="flex flex-col gap-4">
              {withoutItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#ddd] flex items-center justify-center text-[#999] font-bold text-xs flex-shrink-0">✕</span>
                  <span className="font-body text-[#999] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Vibezz */}
          <div
            ref={rightRef}
            className={`rounded-2xl bg-gradient-to-r from-[#F00B51]/20 to-[#730062]/20 p-8 shadow-lg shadow-[#730062]/20 transition-all duration-700 delay-200 ${rightIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="gradient-text text-sm font-body font-bold uppercase tracking-widest">
                With Vibezz
              </span>
              <span className="ml-auto flex items-center justify-center text-[#F00B51]/75 font-bold text-xs">
                <Smile className="w-6 h-6" />
              </span>
            </div>
            <ul className="flex flex-col gap-4">
              {withItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F00B51]/40 flex items-center justify-center text-[#F00B51] font-bold text-xs shadow-sm shadow-pink-300">✓</span>
                  <span className="font-body text-[#111111] text-sm leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
