import { useState } from 'react'

const CATEGORIES = [
  { id:'science',    name:'العلوم',        emoji:'🔬', color:'#5ac8fa' },
  { id:'history',    name:'التاريخ',       emoji:'📜', color:'#ff9f0a' },
  { id:'geography',  name:'الجغرافيا',    emoji:'🌍', color:'#30d158' },
  { id:'sports',     name:'الرياضة',      emoji:'⚽', color:'#ff453a' },
  { id:'arts',       name:'الفنون',        emoji:'🎨', color:'#bf5af2' },
  { id:'technology', name:'التكنولوجيا',  emoji:'💻', color:'#0aefff' },
  { id:'religion',   name:'الدين',         emoji:'☪️',  color:'#ffd60a' },
  { id:'general',    name:'معلومات عامة', emoji:'🧠', color:'#ff6cae' },
]

export default function CategorySelect({ theme:T, onSelect, onBack }) {
  const [spinning,    setSpinning]   = useState(false)
  const [highlighted, setHighlighted]= useState(null)

  const handleRandom = () => {
    if (spinning) return
    setSpinning(true)
    sounds?.randomSpin && sounds.randomSpin()   // suspense sound once

    let count = 0
    const iv = setInterval(() => {
      setHighlighted(CATEGORIES[Math.floor(Math.random()*CATEGORIES.length)].id)
      count++
      if (count >= 16) {
        clearInterval(iv)
        const winner = CATEGORIES[Math.floor(Math.random()*CATEGORIES.length)]
        setHighlighted(winner.id)
        setSpinning(false)
        setTimeout(()=>{ setHighlighted(null); onSelect(winner.id) }, 900)
        sounds?.start && sounds.start()         // celebratory sound at lock-in
      }
    }, 100)
  }
  // Explicit per-theme values — never rely on T.text for cards
  const isDark     = T.id === 'dark'
  const cardBg     = isDark ? '#1e1e1e' : '#ffffff'
  const cardText   = isDark ? '#f0f0f0' : '#0f0f0f'
  const cardMono   = isDark ? '#666666' : '#888888'
  const cardBorder = isDark ? '#333333' : '#0f0f0f'
  const cardShadow = isDark ? '4px 4px 0 #000000' : '4px 4px 0 #0f0f0f'
  const iconBg     = isDark ? '#2a2a2a' : '#f5f5f5'

  
  

  return (
    <div style={{ minHeight:'100dvh', background:T.bg, display:'flex', flexDirection:'column', alignItems:'center', padding:'24px 20px', gap:'16px' }}>

      {/* Header */}
      <div className="animate-fadeInUp" style={{ textAlign:'center', width:'100%', maxWidth:'460px' }}>
        <div style={{ fontFamily:'IBM Plex Mono,monospace', fontSize:'0.72rem', color:T.textMuted, letterSpacing:'0.1em', marginBottom:'8px' }}>
          SELECT CATEGORY
        </div>
        <h2 style={{ fontFamily:'Tajawal,sans-serif', fontWeight:900, fontSize:'2rem', color:T.text, marginBottom:'4px' }}>
          اختر الفئة
        </h2>
        <p style={{ color:T.textMuted, fontSize:'0.85rem', fontFamily:'Tajawal,sans-serif' }}>
          اختر موضوعاً أو دع الحظ يختار
        </p>
      </div>

      {/* Randomizer */}
      <button
        className="animate-fadeInUp delay-1"
        onClick={handleRandom}
        style={{
          padding:'14px 32px', borderRadius:'2px', cursor:'pointer',
          fontFamily:'Tajawal,sans-serif', fontWeight:900, fontSize:'1rem',
          background: spinning ? T.secondary : T.primary,
          color: '#ffffff',
          border:`2px solid ${spinning ? T.secondary : T.primary}`,
          boxShadow: cardShadow,
          transition:'all 0.15s',
        }}
        onMouseEnter={e=>{ e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow=`6px 6px 0 ${T.secondary}` }}
        onMouseLeave={e=>{ e.currentTarget.style.transform='translate(0,0)'; e.currentTarget.style.boxShadow=cardShadow }}
      >
        {spinning ? '🎲 جاري الاختيار...' : '🎲 اختر عشوائياً'}
      </button>

      {/* Grid */}
      <div style={{ width:'100%', maxWidth:'460px', display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'10px' }}>
        {CATEGORIES.map((cat, i) => {
          const isHl = highlighted === cat.id
          return (
            <button
              key={cat.id}
              className={`animate-scaleIn delay-${Math.min(i+1,5)}`}
              onClick={() => onSelect(cat.id)}
              style={{
                padding:'18px 14px',
                background: isHl ? cat.color : cardBg,
                border:`2px solid ${isHl ? cat.color : cardBorder}`,
                borderRadius:'2px',
                boxShadow: isHl ? `4px 4px 0 ${cat.color}88` : cardShadow,
                cursor:'pointer', textAlign:'center',
                display:'flex', flexDirection:'column', alignItems:'center', gap:'10px',
                transform: isHl ? 'translate(-2px,-2px)' : 'translate(0,0)',
                transition:'all 0.12s ease',
              }}
              onMouseEnter={e=>{ if(!isHl){ e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow=`5px 5px 0 ${cat.color}` } }}
              onMouseLeave={e=>{ if(!isHl){ e.currentTarget.style.transform='translate(0,0)'; e.currentTarget.style.boxShadow=cardShadow } }}
            >
              <div style={{
                width:'52px', height:'52px', borderRadius:'2px',
                background: isHl ? 'rgba(255,255,255,0.25)' : iconBg,
                border:`2px solid ${isHl ? 'rgba(255,255,255,0.5)' : cat.color+'55'}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.6rem',
              }}>
                {cat.emoji}
              </div>

              {/* Name — always explicit color */}
              <div style={{
                color: isHl ? '#ffffff' : cardText,
                fontFamily:'Tajawal,sans-serif', fontWeight:800, fontSize:'0.95rem', lineHeight:1.2,
              }}>
                {cat.name}
              </div>

              <div style={{
                fontFamily:'IBM Plex Mono,monospace', fontSize:'0.62rem',
                color: isHl ? 'rgba(255,255,255,0.75)' : cardMono,
                letterSpacing:'0.06em',
              }}>
                {cat.id.toUpperCase()}
              </div>
            </button>
          )
        })}

        {/* Puzzles full-width */}
        <button
          className="animate-scaleIn delay-5"
          onClick={() => onSelect('puzzles')}
          style={{
            gridColumn:'span 2', padding:'16px 20px',
            background: cardBg, border:`2px solid ${cardBorder}`,
            borderRadius:'2px', boxShadow:cardShadow, cursor:'pointer',
            display:'flex', alignItems:'center', gap:'16px',
            transition:'all 0.12s ease',
          }}
          onMouseEnter={e=>{ e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow=`5px 5px 0 ${T.secondary}` }}
          onMouseLeave={e=>{ e.currentTarget.style.transform='translate(0,0)'; e.currentTarget.style.boxShadow=cardShadow }}
        >
          <div style={{
            width:'52px', height:'52px', borderRadius:'2px',
            background:iconBg, border:`2px solid ${T.secondary}55`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'1.6rem', flexShrink:0,
          }}>
            🧩
          </div>
          <div style={{ textAlign:'right', flex:1 }}>
            <div style={{ color:cardText, fontFamily:'Tajawal,sans-serif', fontWeight:800, fontSize:'1rem' }}>
              الألعاب والألغاز
            </div>
            <div style={{ color:T.secondary, fontFamily:'IBM Plex Mono,monospace', fontSize:'0.72rem', marginTop:'3px', letterSpacing:'0.05em' }}>
              WORDLE · SUDOKU
            </div>
          </div>
          <span style={{ color:T.secondary, fontSize:'1.4rem', fontWeight:900 }}>↗</span>
        </button>
      </div>

      {/* Back */}
      <button
        onClick={onBack}
        style={{
          padding:'10px 24px', borderRadius:'2px', cursor:'pointer',
          fontFamily:'Tajawal,sans-serif', fontWeight:700, fontSize:'0.88rem',
          background:'transparent', border:`2px solid ${cardBorder}`,
          color:T.textMuted, boxShadow:`2px 2px 0 ${cardBorder}`,
          transition:'background 0.1s',
        }}
        onMouseEnter={e=>e.currentTarget.style.background=isDark?'#1e1e1e':'#ede8dc'}
        onMouseLeave={e=>e.currentTarget.style.background='transparent'}
      >
        ← رجوع
      </button>
    </div>
  )
}
