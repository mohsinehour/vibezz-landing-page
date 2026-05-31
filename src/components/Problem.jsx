import { useInView } from '../hooks/useInView'
import { ClockFading, Dices, TrendingDown, Repeat } from 'lucide-react';

const problems = [
  {
    icon: <ClockFading className="text-[#F00B51]" />,
    title: 'Time Wasted Scrolling',
    body: 'Creators lose 30–60 minutes on a reel just browsing tracks hoping something clicks.',
  },
  {
    icon: <Dices className="text-[#730062]" />,
    title: 'Random Guessing',
    body: 'Without context-awareness it\'s trial and error. Most songs simply don\'t fit the vibe.',
  },
  {
    icon: <TrendingDown className="text-[#730062]" />,
    title: 'Mismatched Audio Hurts Reach',
    body: 'Instagram and TikTok algorithms reward content where music matches the visual energy.',
  },
  {
    icon: <Repeat className="text-[#F00B51]" />,
    title: 'Everyone Uses The Same Song',
    body: 'Everyone ends up using the same trending song. Discover what fits, not what\'s popular.',
  },
]

function ProblemCard({ icon, title, body, delay }) {
  const { ref: leftRef, inView: leftIn } = useInView({ threshold: 0.2 })
  return (
    <div
      ref={leftRef}
      className={`bg-white/50 rounded-2xl p-6 border border-[#111111]/6 hover:shadow-xl hover:shadow-[#F00B51]/10 hover:border-[#730062]/30 hover:-translate-y-1 transition-all duration-700 delay-100 ease-in-out ${leftIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
    >
      <div className="w-10 h-10 rounded-xl bg-[#FAF2E8] flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-3">
        {icon}
      </div>
      <h3 className="font-heading text-[#111111] text-base mb-2">{title}</h3>
      <p className="font-body text-[#777777] text-sm leading-relaxed">{body}</p>
    </div>
  )
}

export default function Problem() {
  const { ref, inView } = useInView()

  return (
    <section id="problem" className="relative py-24 px-6 bg-gradient-to-b from-[#F00B51]/20 to-[#730062]/20">
      {/* Fade in from top */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF2E8] to-transparent pointer-events-none z-10" />
      {/* Fade out to bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF2E8] to-transparent pointer-events-none z-10" />
      <div className="max-w-6xl mx-auto">
        {/* Tag */}
        <div
          ref={ref}
          className={`text-center mb-4 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="gradient-text font-heading font-medium text-md tracking-widest uppercase">
            The Real Problem
          </span>
        </div>

        {/* Headline */}
        <h2
          className={`font-heading text-3xl md:text-4xl lg:text-5xl text-[#111111] text-center mb-4 leading-tight transition-all duration-600 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          Picking Music Is The{' '}
          <em className="gradient-text not-italic">Least</em>{' '}
          Creative Part Of Creating.
        </h2>

        {/* Subline */}
        <p
          className={`font-body text-[#777777] text-base md:text-lg text-center max-w-2xl mx-auto mb-14 leading-relaxed transition-all duration-600 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          You captured the perfect moment. Then you waste an hour scrolling through music hoping something fits. That's the wall we're knocking down.
        </p>

        {/* Cards grid */}
        <div className={`grid sm:grid-cols-2 gap-5 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {problems.map((p, i) => (
            <ProblemCard key={p.title} {...p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
