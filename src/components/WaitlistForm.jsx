import { useState } from 'react'

export default function WaitlistForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || 'Something went wrong')

            setStatus('success')
            setEmail('')
        } catch (err) {
            setErrorMsg(err.message)
            setStatus('error')
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {status === 'success' ? (
                <div className="text-center py-4 px-6 rounded-2xl bg-[#F00B51]/10 border border-[#F00B51]/20">
                    <p className="font-heading gradient-text text-lg">You're on the list! 🎉</p>
                    <p className="font-body text-sm text-[#777] mt-1">We'll notify you when we launch.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-5 py-3 rounded-2xl border border-[#111]/10 bg-white font-body text-sm text-[#111] placeholder:text-[#aaa] focus:outline-none focus:border-[#F00B51]/40 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F00B51] to-[#730062] text-white font-heading text-sm tracking-wide uppercase transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
                    >
                        {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                    </button>
                </form>
            )}

            {status === 'error' && (
                <p className="mt-2 text-xs text-[#F00B51] font-body text-center">{errorMsg}</p>
            )}
        </div>
    )
}