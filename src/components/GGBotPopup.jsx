import { useEffect, useState } from 'react'
import Robot from './Robot'
import { ArrowUpRight } from './ui'
import { aiInterviewUrl, waLink } from '../data/site'

// Corner popup promoting the AI Pre-CAS interview simulator.
// Appears once per visit after 20 s or half a page of scrolling; "Maybe later" shrinks it to a small robot button.
const KEY = 'ggbot-state'
const read = () => { try { return sessionStorage.getItem(KEY) } catch { return null } }
const save = (v) => { try { sessionStorage.setItem(KEY, v) } catch { /* private mode */ } }

export default function GGBotPopup() {
  const [state, setState] = useState(() => (read() === 'min' ? 'min' : 'hidden'))

  useEffect(() => {
    if (state !== 'hidden') return
    let done = false
    const show = () => {
      if (done) return
      done = true
      setState('open')
      save('min')   // after the first showing, later pages start minimised
    }
    const timer = setTimeout(show, 20000)
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0 && window.scrollY / max > 0.5) show()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll) }
  }, [state])

  useEffect(() => {
    if (state !== 'open') return
    const onKey = (e) => { if (e.key === 'Escape') setState('min') }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [state])

  if (state === 'hidden') return null

  return (
    <div className="ggbot">
      {state === 'open' ? (
        <div className="ggbot-card" role="dialog" aria-modal="false" aria-labelledby="ggbot-title">
          <div className="ggbot-robot"><Robot width={132} /></div>
          <div className="ggbot-hi" aria-hidden="true">Hi! I'm GG-Bot</div>
          <button type="button" className="ggbot-close" aria-label="Close" onClick={() => setState('min')}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <div className="ggbot-status"><i />AI INTERVIEW COACH · ONLINE</div>
          <h3 id="ggbot-title">Psst… wanna prepare for your <span className="accent">Pre-CAS interview?</span></h3>
          <p>I'll ask you real questions on camera and score every answer out of 100 — with tips to make it stronger.</p>
          <div className="ggbot-tags"><span>19 questions</span><span>AI score /100</span><span>Speaking tips</span></div>
          <a className="btn btn-red" href={aiInterviewUrl('robot-popup')} target="_blank" rel="noopener noreferrer" onClick={() => setState('min')}>
            Yes, let's practise <ArrowUpRight />
          </a>
          <button type="button" className="ggbot-later" onClick={() => setState('min')}>Maybe later</button>
          <div className="ggbot-foot">
            For Global Gate students · <a href={waLink("Hi, I'd like a login for the AI Pre-CAS interview practice.")} target="_blank" rel="noopener noreferrer">get your login</a>
          </div>
        </div>
      ) : (
        <div className="ggbot-launch">
          <span aria-hidden="true">Pre-CAS practice?</span>
          <button type="button" aria-label="Open Pre-CAS interview practice" onClick={() => setState('open')}>
            <Robot width={54} title="" />
          </button>
        </div>
      )}
    </div>
  )
}
