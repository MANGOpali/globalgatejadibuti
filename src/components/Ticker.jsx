const items = [
  { flag: '🇦🇺', text: 'Australia' },
  { flag: '🇨🇦', text: 'Canada' },
  { flag: '🇬🇧', text: 'United Kingdom' },
  { flag: '🇺🇸', text: 'United States' },
  { flag: '🇩🇰', text: 'Denmark' },
  { flag: '🇫🇮', text: 'Finland' },
  { flag: '🇯🇵', text: 'Japan' },
  { flag: '🇰🇷', text: 'South Korea' },
  { flag: '📝', text: 'IELTS Preparation' },
  { flag: '📚', text: 'PTE Coaching' },
  { flag: '🎓', text: 'University Admission' },
  { flag: '✈️', text: 'Visa Assistance' },
]

const doubled = [...items, ...items]

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <div className="ticker-item" key={i}>
            <span className="ti-flag">{item.flag}</span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
