// GG-Bot: the Global Gate AI interview coach. Pure SVG; motion classes live in index.css
// and switch off for visitors who prefer reduced motion.
export default function Robot({ width = 132, title = 'GG-Bot, the Global Gate interview practice robot' }) {
  return (
    <svg
      viewBox="0 0 160 192" width={width} height={Math.round(width * 192 / 160)} style={{ display: 'block', overflow: 'visible' }}
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: 'false' })}
    >
      <defs>
        <linearGradient id="ggb-sheen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3A62B0" /><stop offset="1" stopColor="#1B3A6B" /></linearGradient>
      </defs>
      <ellipse cx="80" cy="186" rx="38" ry="5" fill="rgba(14,20,36,0.14)" />
      <g className="ggb-bob">
        <line x1="50" y1="38" x2="44" y2="16" stroke="#1B3A6B" strokeWidth="4" strokeLinecap="round" />
        <circle className="ggb-glow" cx="43" cy="12" r="7" fill="#C8202F" />
        <rect x="9" y="64" width="15" height="28" rx="7.5" fill="#C8202F" />
        <rect x="136" y="64" width="15" height="28" rx="7.5" fill="#C8202F" />
        <rect x="20" y="34" width="120" height="88" rx="36" fill="url(#ggb-sheen)" />
        <rect x="34" y="50" width="92" height="56" rx="26" fill="#0B1736" />
        <g className="ggb-blink">
          <ellipse cx="62" cy="74" rx="9" ry="11" fill="#7FE3FF" />
          <ellipse cx="98" cy="74" rx="9" ry="11" fill="#7FE3FF" />
          <circle cx="65.5" cy="69.5" r="3" fill="#FFFFFF" />
          <circle cx="101.5" cy="69.5" r="3" fill="#FFFFFF" />
        </g>
        <path d="M69 92 Q80 100 91 92" stroke="#7FE3FF" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="47" cy="92" r="5" fill="#FF6B7A" opacity="0.75" />
        <circle cx="113" cy="92" r="5" fill="#FF6B7A" opacity="0.75" />
        <g transform="rotate(10 104 30)">
          <rect x="86" y="30" width="34" height="11" rx="3" fill="#0E1424" />
          <polygon points="66,30 103,15 140,30 103,45" fill="#14213F" />
          <circle cx="103" cy="30" r="3" fill="#C8202F" />
          <path d="M103 30 L134 33 L134 50" stroke="#C8202F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="134" cy="52" r="4" fill="#C8202F" />
        </g>
        <rect x="70" y="118" width="20" height="10" rx="3" fill="#0E1424" />
        <rect x="46" y="124" width="68" height="52" rx="20" fill="#FBFBFA" stroke="#1B3A6B" strokeWidth="4" />
        <g stroke="#C8202F" strokeWidth="2" strokeLinecap="round">
          <line x1="66" y1="146" x2="80" y2="139" /><line x1="80" y1="139" x2="94" y2="147" />
          <line x1="66" y1="146" x2="79" y2="159" /><line x1="94" y1="147" x2="79" y2="159" /><line x1="80" y1="139" x2="79" y2="159" />
        </g>
        <g fill="#C8202F"><circle cx="66" cy="146" r="4" /><circle cx="80" cy="139" r="4" /><circle cx="94" cy="147" r="4" /><circle cx="79" cy="159" r="4" /></g>
        <path d="M48 142 Q32 148 33 162" stroke="#1B3A6B" strokeWidth="8" fill="none" strokeLinecap="round" />
        <rect x="24" y="150" width="16" height="22" rx="8" fill="#C8202F" />
        <line x1="32" y1="172" x2="32" y2="180" stroke="#0E1424" strokeWidth="4" strokeLinecap="round" />
        <g className="ggb-wave">
          <path d="M112 140 Q130 130 134 112" stroke="#1B3A6B" strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="135" cy="107" r="8.5" fill="#FBFBFA" stroke="#1B3A6B" strokeWidth="4" />
        </g>
      </g>
    </svg>
  )
}
