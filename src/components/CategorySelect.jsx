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
  const [spinning,     setSpinning]     = useState(false)
  const [highlighted,  setHighlighted]  = useState(null)

  const handleRandom = () => {
    if (spinning) return
    setSpinning(true)
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
      }
    }, 100)
  }

  const cardStyle = (cat) => ({
    padding:'18px 14px',
    background: highlighted===cat.id ? cat.color : T.bgCard,
    border:`2px solid ${highlighted===cat.id ? cat.color : T.border}`,
    borderRadius:'2px',
    boxShadow: highlighted===cat.id
      ? `4px 4px 0 ${cat.color}88`
      : T.shadowCard,
    cursor:'pointer',
    textAlign:'center',
    display:'flex', flexDirection:'column', alignItems:'center', gap:'10px',
    transform: highlighted===cat.id ? 'translate(-2px,-2px)' : 'translate(0,0)',
    transition:'all 0.12s ease',
  })

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
          color: T.primaryText,
          border:`2px solid ${spinning ? T.secondary : T.primary}`,
          boxShadow:T.shadowCard,
          letterSpacing:'0.03em',
          transition:'all 0.15s',
        }}
        onMouseEnter={e=>{if(!spinning){e.currentTarget.style.transform='translate(-2px,-2px)';e.currentTarget.style.boxShadow=`6px 6px 0 ${T.secondary}`}}}
        onMouseLeave={e=>{e.currentTarget.style.transform='translate(0,0)';e.currentTarget.style.boxShadow=T.shadowCard}}
      >
        {spinning ? '🎲 جاري الاختيار...' : '🎲 اختر عشوائياً'}
      </button>

      {/* Grid */}
      <div style={{ width:'100%', maxWidth:'460px', display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'10px' }}>
        {CATEGORIES.map((cat,i)=>(
          <button
            key={cat.id}
            className={`animate-scaleIn delay-${Math.min(i+1,5)}`}
            onClick={()=>onSelect(cat.id)}
            style={cardStyle(cat)}
            onMouseEnter={e=>{if(highlighted!==cat.id){e.currentTarget.style.transform='translate(-2px,-2px)';e.currentTarget.style.boxShadow=`5px 5px 0 ${cat.color}`}}}
            onMouseLeave={e=>{if(highlighted!==cat.id){e.currentTarget.style.transform='translate(0,0)';e.currentTarget.style.boxShadow=T.shadowCard}}}
          >
            {/* Icon block */}
            <div style={{
              width:'52px', height:'52px', borderRadius:'2px',
              background: highlighted===cat.id ? 'rgba(255,255,255,0.25)' : T.bgElevated,
              border:`2px solid ${highlighted===cat.id ? 'rgba(255,255,255,0.4)' : cat.color+'44'}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.6rem',
              boxShadow:`2px 2px 0 ${highlighted===cat.id ? 'rgba(255,255,255,0.2)' : cat.color+'33'}`,
            }}>
              {cat.emoji}
            </div>
            {/* Label — always visible */}
            <div style={{
              color: highlighted===cat.id ? '#ffffff' : T.text,
              fontFamily:'Tajawal,sans-serif', fontWeight:800,
              fontSize:'0.95rem', lineHeight:1.2,
            }}>
              {cat.name}
            </div>
            {/* Mono tag */}
            <div style={{
              fontFamily:'IBM Plex Mono,monospace', fontSize:'0.65rem',
              color: highlighted===cat.id ? 'rgba(255,255,255,0.7)' : T.textMuted,
              letterSpacing:'0.06em',
            }}>
              {cat.id.toUpperCase()}
            </div>
          </button>
        ))}

        {/* Puzzles — spans full width */}
        <button
          className="animate-scaleIn delay-5"
          onClick={()=>onSelect('puzzles')}
          style={{
            gridColumn:'span 2',
            padding:'16px 20px',
            background:T.bgCard,
            border:`2px solid ${T.border}`,
            borderRadius:'2px',
            boxShadow:T.shadowCard,
            cursor:'pointer',
            display:'flex', alignItems:'center', gap:'16px',
            transition:'all 0.12s ease',
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translate(-2px,-2px)';e.currentTarget.style.boxShadow=`5px 5px 0 ${T.secondary}`}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translate(0,0)';e.currentTarget.style.boxShadow=T.shadowCard}}
        >
          <div style={{
            width:'52px', height:'52px', borderRadius:'2px',
            background:T.bgElevated, border:`2px solid ${T.secondary}44`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'1.6rem', flexShrink:0,
            boxShadow:`2px 2px 0 ${T.secondary}33`,
          }}>
            🧩
          </div>
          <div style={{ textAlign:'right', flex:1 }}>
            <div style={{ color:T.text, fontFamily:'Tajawal,sans-serif', fontWeight:800, fontSize:'1rem' }}>
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
          background:'transparent', border:`2px solid ${T.border}`,
          color:T.textMuted, boxShadow:`2px 2px 0 ${T.border}`,
          transition:'all 0.1s',
        }}
        onMouseEnter={e=>{e.currentTarget.style.background=T.bgElevated}}
        onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}
      >
        ← رجوع
      </button>
    </div>
  )
}
