export default function Footer() {
  return (
    <footer className="border-t border-[#111111]/8 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img
              src="/assets/vibezz-logo.png"
              alt="Vibezz"
              className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
            />
          </a>
          <span className="gradient-text font-heading font-medium text-[8px] tracking-widest uppercase">
            Stop Scrolling, Start Feeling
          </span>
        </div>

        {/* Copyright */}
        <p className="font-body text-xs text-[#aaa] text-center tracking-wide">
          © 2026 VIBEZZ · MADE FOR CREATORS WHO FEEL MUSIC
        </p>
      </div>
    </footer>
  )
}
