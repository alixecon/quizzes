import { useState, useEffect } from 'react'
import { getQuestions } from '../data/index'

// ─── Category styles (colors match CategorySelect.jsx exactly) ───────────────
const CAT = {
  science:    { shape:'hexagon',  color:'#5ac8fa', label:'العلوم',       emoji:'🔬' },
  history:    { shape:'square',   color:'#ff9f0a', label:'التاريخ',      emoji:'📜' },
  geography:  { shape:'circle',   color:'#30d158', label:'الجغرافيا',    emoji:'🌍' },
  sports:     { shape:'triangle', color:'#ff453a', label:'الرياضة',      emoji:'⚽' },
  arts:       { shape:'diamond',  color:'#bf5af2', label:'الفنون',       emoji:'🎨' },
  technology: { shape:'hexagon',  color:'#0aefff', label:'التكنولوجيا',  emoji:'💻' },
  religion:   { shape:'diamond',  color:'#ffd60a', label:'الدين',        emoji:'🕌' },
  general:    { shape:'square',   color:'#ff6cae', label:'معلومات عامة', emoji:'🧠' },
}

// ─── SVG Block ────────────────────────────────────────────────────────────────
function Block({ block, theme: T, size = 64, isDraggable = true }) {
  const cs = block.revealed ? CAT[block.category] : null
  const color = cs ? cs.color : T.bgElevated

  const shapeEl = () => {
    const s = size, cx = s/2, cy = s/2, r = s/2 - 5
    if (!cs) return <rect x={5} y={5} width={s-10} height={s-10} fill={color} rx={2} />
    switch (cs.shape) {
      case 'circle':
        return <circle cx={cx} cy={cy} r={r} fill={color} />
      case 'hexagon': {
        const pts = Array.from({length:6}, (_,i) => {
          const a = (Math.PI/180)*(60*i-30)
          return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`
        }).join(' ')
        return <polygon points={pts} fill={color} />
      }
      case 'diamond':
        return <polygon points={`${cx},${cy-r} ${cx+r},${cy} ${cx},${cy+r} ${cx-r},${cy}`} fill={color} />
      case 'triangle':
        return <polygon points={`${cx},6 ${s-6},${s-6} 6,${s-6}`} fill={color} />
      case 'square':
      default:
        return <rect x={5} y={5} width={s-10} height={s-10} fill={color} />
    }
  }

  return (
    <div style={{ width:size, height:size, cursor: isDraggable ? 'grab' : 'default', flexShrink:0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{display:'block'}}>
        {shapeEl()}
        <text x={size/2} y={size/2+7} textAnchor="middle" fontSize={size*0.3}>
          {cs ? cs.emoji : '?'}
        </text>
      </svg>
    </div>
  )
}

// ─── Level builder ────────────────────────────────────────────────────────────
function buildLevel(level) {
  const counts = {1:6, 2:9, 3:12, 4:15, 5:16}
  const count = counts[Math.min(level,5)] || 16
  const pool = getQuestions(null, null)
    .filter(q => CAT[q.category])
    .sort(() => Math.random()-0.5)
    .slice(0, count)
  return pool.map((q,i) => ({
    id: q.id || `b_${i}_${Date.now()}`,
    category: q.category,
    question: q,
    revealed: false,
    placed: false,
  }))
}

// ─── Trivia Gate ──────────────────────────────────────────────────────────────
function TriviaGate({ block, theme:T, answered, total, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const q = block.question
  const isDark = T.id === 'dark'
  const cardBg     = isDark ? '#1e1e1e' : '#ffffff'
  const cardBorder = isDark ? '#333333' : '#0f0f0f'
  const cardShadow = isDark ? '4px 4px 0 #000000' : '4px 4px 0 #0f0f0f'
  const cs = CAT[block.category]

  const pick = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    setTimeout(() => { onAnswer(idx === q.answer); setSelected(null) }, 900)
  }

  const optStyle = (idx) => {
    const base = {
      padding:'12px 16px', border:`2px solid ${cardBorder}`,
      background: cardBg, color: T.text,
      cursor: selected===null ? 'pointer' : 'default',
      fontFamily:'Tajawal,sans-serif', fontSize:'0.95rem',
      textAlign:'right', direction:'rtl',
      boxShadow: cardShadow, borderRadius:'2px', width:'100%',
      transition:'all 0.12s',
    }
    if (selected === null) return base
    if (idx === q.answer)  return { ...base, background: T.optionCorrectBg, border:`2px solid ${T.optionCorrectBorder}`, color: T.success }
    if (idx === selected)  return { ...base, background: T.optionWrongBg,   border:`2px solid ${T.optionWrongBorder}`,   color: T.error }
    return { ...base, opacity:0.4 }
  }

  return (
    <div style={{ width:'100%', maxWidth:520 }}>
      {/* Progress bar */}
      <div style={{ background: T.progressBg, height:5, marginBottom:20, borderRadius:2 }}>
        <div style={{ width:`${(answered/total)*100}%`, height:'100%', background: T.progressFill, transition:'width 0.3s', borderRadius:2 }} />
      </div>

      {/* Block preview */}
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16,
        background: cardBg, border:`2px solid ${cardBorder}`, padding:14, boxShadow:cardShadow, borderRadius:'2px' }}>
        <Block block={{...block, revealed:false}} theme={T} size={48} isDraggable={false} />
        <div>
          <div style={{ fontFamily:'IBM Plex Mono,monospace', fontSize:'0.65rem', color:T.textMuted, letterSpacing:'0.08em' }}>
            أجب صح لتكشف هذه القطعة
          </div>
          <div style={{ fontFamily:'Tajawal,sans-serif', fontWeight:800, fontSize:'0.95rem', color: cs?.color || T.primary, marginTop:4 }}>
            {cs?.emoji} {cs?.label}
          </div>
        </div>
      </div>

      {/* Question card */}
      <div style={{ background:cardBg, border:`2px solid ${cardBorder}`, boxShadow:cardShadow, padding:18, borderRadius:'2px' }}>
        <div style={{ fontFamily:'Tajawal,sans-serif', fontSize:'1.05rem', fontWeight:700, lineHeight:1.7, marginBottom:16, direction:'rtl' }}>
          {q.question}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
          {q.options.map((opt,idx) => (
            <button key={idx} onClick={() => pick(idx)} style={optStyle(idx)}>
              {opt}
            </button>
          ))}
        </div>
        {selected !== null && q.explanation && (
          <div style={{ marginTop:12, fontSize:'0.82rem', color:T.textMuted,
            borderTop:`1px solid ${cardBorder}`, paddingTop:10, direction:'rtl', fontFamily:'Tajawal,sans-serif' }}>
            💡 {q.explanation}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Compartment ──────────────────────────────────────────────────────────────
function Compartment({ category, placedBlocks, theme:T, onDrop, onMisplace }) {
  const [highlight, setHighlight] = useState(false)
  const [shake,     setShake]     = useState(false)
  const isDark = T.id === 'dark'
  const cardBg     = isDark ? '#1e1e1e' : '#ffffff'
  const cardBorder = isDark ? '#333333' : '#0f0f0f'
  const cardShadow = isDark ? '4px 4px 0 #000000' : '4px 4px 0 #0f0f0f'
  const cs = CAT[category]

  const handleDrop = (e) => {
    e.preventDefault(); setHighlight(false)
    const blockId = e.dataTransfer.getData('blockId')
    const correct = onDrop(blockId, category)
    if (!correct) { setShake(true); setTimeout(()=>setShake(false),500); onMisplace() }
  }

  return (
    <div
      onDragOver={e=>{e.preventDefault();setHighlight(true)}}
      onDragLeave={()=>setHighlight(false)}
      onDrop={handleDrop}
      style={{
        flex:'1 1 140px', minHeight:140,
        background: highlight ? `${cs.color}22` : cardBg,
        border:`2px solid ${highlight ? cs.color : cardBorder}`,
        boxShadow: highlight ? `5px 5px 0 ${cs.color}` : cardShadow,
        padding:10, borderRadius:'2px', transition:'all 0.12s',
        animation: shake ? 'bsShake 0.4s ease' : 'none',
      }}
    >
      <div style={{ fontFamily:'Tajawal,sans-serif', fontWeight:800, fontSize:'0.82rem',
        color: cs.color, marginBottom:8, display:'flex', gap:5, alignItems:'center' }}>
        <span>{cs.emoji}</span><span>{cs.label}</span>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
        {placedBlocks.map(b => <Block key={b.id} block={b} theme={T} size={48} isDraggable={false} />)}
      </div>
    </div>
  )
}

// ─── Sort Board ───────────────────────────────────────────────────────────────
function SortBoard({ blocks: init, theme:T, onMisplace, onComplete }) {
  const [blocks, setBlocks] = useState(init)
  const categories = [...new Set(init.map(b=>b.category))].filter(c=>CAT[c])
  const isDark = T.id === 'dark'
  const cardBg     = isDark ? '#1e1e1e' : '#ffffff'
  const cardBorder = isDark ? '#333333' : '#0f0f0f'
  const cardShadow = isDark ? '4px 4px 0 #000000' : '4px 4px 0 #0f0f0f'

  const handleDrop = (blockId, targetCat) => {
    const block = blocks.find(b=>b.id===blockId)
    if (!block) return false
    if (block.category !== targetCat) return false
    setBlocks(prev => {
      const updated = prev.map(b => b.id===blockId ? {...b, placed:true} : b)
      if (updated.every(b=>b.placed)) setTimeout(onComplete, 600)
      return updated
    })
    return true
  }

  const unplaced = blocks.filter(b=>!b.placed)
  const placedIn  = (cat) => blocks.filter(b=>b.placed && b.category===cat)

  return (
    <div style={{ width:'100%', maxWidth:560 }}>
      {/* Tray */}
      <div style={{ background:cardBg, border:`2px solid ${cardBorder}`,
        boxShadow:cardShadow, padding:14, marginBottom:16, borderRadius:'2px' }}>
        <div style={{ fontFamily:'IBM Plex Mono,monospace', fontSize:'0.65rem',
          color:T.textMuted, letterSpacing:'0.08em', marginBottom:10 }}>
          TRAY — {unplaced.length} REMAINING
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
          {unplaced.map(block => (
            <div key={block.id} draggable
              onDragStart={e => e.dataTransfer.setData('blockId', block.id)}>
              <Block block={block} theme={T} size={48} isDraggable={true} />
            </div>
          ))}
        </div>
      </div>
      {/* Compartments */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
        {categories.map(cat => (
          <Compartment key={cat} category={cat} placedBlocks={placedIn(cat)}
            theme={T} onDrop={handleDrop} onMisplace={onMisplace} />
        ))}
      </div>
    </div>
  )
}

// ─── Star Result ──────────────────────────────────────────────────────────────
function StarResult({ misplacements, level, blocks, theme:T, onNext, onExit }) {
  const stars = misplacements===0 ? 3 : misplacements<=2 ? 2 : 1
  const isDark = T.id === 'dark'
  const cardBorder = isDark ? '#333333' : '#0f0f0f'
  const cardShadow = isDark ? '4px 4px 0 #000000' : '4px 4px 0 #0f0f0f'

  const categories = [...new Set(blocks.map(b=>b.category))]

  const shareText = () => {
    const grid = categories.map(cat => {
      const cb = blocks.filter(b=>b.category===cat)
      return cb.map(b=>b.revealed?'🟩':'🟥').join('')
    }).join(' | ')
    const txt = `رتّبت المستوى ${level} بـ ${'⭐'.repeat(stars)}
${grid}
alixecon.github.io/quizzes`
    if (navigator.share) navigator.share({text:txt})
    else { navigator.clipboard.writeText(txt); alert('تم النسخ!') }
  }

  const btnBase = {
    padding:'12px 24px', fontFamily:'Tajawal,sans-serif',
    fontWeight:800, fontSize:'1rem', cursor:'pointer',
    borderRadius:'2px', width:'100%', border:`2px solid ${cardBorder}`,
  }

  return (
    <div style={{ width:'100%', maxWidth:460 }}>
      <div style={{ background: isDark?'#1e1e1e':'#ffffff',
        border:`2px solid ${cardBorder}`, boxShadow: T.shadowHero, padding:28, borderRadius:'2px', textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:8 }}>{'⭐'.repeat(stars)}{'☆'.repeat(3-stars)}</div>
        <div style={{ fontFamily:'Tajawal,sans-serif', fontWeight:900, fontSize:'1.3rem',
          color:T.primary, marginBottom:6 }}>
          {stars===3 ? 'ممتاز! بدون أخطاء 🎯' : stars===2 ? 'جيد جداً!' : 'أكملت المستوى!'}
        </div>
        <div style={{ fontFamily:'IBM Plex Mono,monospace', fontSize:'0.72rem',
          color:T.textMuted, marginBottom:20 }}>
          LEVEL {level} · {misplacements===0?'PERFECT':'MISPLACES: '+misplacements}
        </div>

        {/* Category breakdown */}
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8, marginBottom:24 }}>
          {categories.map(cat => {
            const cs = CAT[cat]
            const total   = blocks.filter(b=>b.category===cat).length
            const revealed = blocks.filter(b=>b.category===cat && b.revealed).length
            return (
              <div key={cat} style={{ border:`2px solid ${cs.color}`, padding:'4px 10px',
                fontFamily:'IBM Plex Mono,monospace', fontSize:'0.65rem', color:cs.color, borderRadius:'2px' }}>
                {cs.emoji} {revealed}/{total}
              </div>
            )
          })}
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <button onClick={shareText} style={{...btnBase, background:T.secondary, color:'#ffffff', border:`2px solid ${cardBorder}`, boxShadow:cardShadow}}>
            📤 شارك نتيجتك
          </button>
          <button onClick={onNext} style={{...btnBase, background:T.primary, color:'#ffffff', boxShadow:T.shadowHero}}>
            المستوى التالي ←
          </button>
          <button onClick={onExit} style={{...btnBase, background:'transparent', color:T.textMuted, fontSize:'0.88rem'}}>
            ← رجوع
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main BlockSortMode ───────────────────────────────────────────────────────
export default function BlockSortMode({ theme: T,sounds,onExit }) {
  const [level,        setLevel]   = useState(1)
  const [blocks,       setBlocks]  = useState([])
  const [queue,        setQueue]   = useState([])
  const [gameState,    setState]   = useState('trivia') // trivia | sorting | result
  const [misplacements,setMiss]    = useState(0)

  useEffect(() => {
    const b = buildLevel(level)
    setBlocks(b)
    setQueue([...b])
    setMiss(0)
    setState('trivia')
  }, [level])

  const handleAnswer = (correct) => {
    const current = queue[0]
    const rest    = queue.slice(1)
    setBlocks(prev => prev.map(b => b.id===current.id ? {...b, revealed:correct} : b))
    if (rest.length === 0) { setQueue([]); setState('sorting') }
    else setQueue(rest)
  }

  const isDark     = T.id === 'dark'
  const cardBorder = isDark ? '#333333' : '#0f0f0f'

  return (
    <div style={{ minHeight:'100dvh', background:T.bg, color:T.text,
      fontFamily:'Tajawal,sans-serif', direction:'rtl',
      display:'flex', flexDirection:'column', alignItems:'center', padding:'20px 16px' }}>

      <style>{`
        @keyframes bsShake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-5px)}
          80%{transform:translateX(5px)}
        }
      `}</style>

      {/* Header */}
      <div style={{ width:'100%', maxWidth:560, display:'flex',
        justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
        <button onClick={onExit} style={{
          background:'transparent', border:`2px solid ${cardBorder}`,
          color:T.textMuted, padding:'6px 14px', cursor:'pointer',
          fontFamily:'Tajawal,sans-serif', fontSize:'0.88rem', borderRadius:'2px',
        }}>← رجوع</button>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily:'IBM Plex Mono,monospace', fontSize:'0.65rem',
            color:T.textMuted, letterSpacing:'0.08em' }}>BLOCK SORT MODE</div>
          <div style={{ fontFamily:'Tajawal,sans-serif', fontWeight:900,
            fontSize:'1.1rem', color:T.primary }}>رتّب المعرفة — {level}</div>
        </div>
        <div style={{ fontFamily:'IBM Plex Mono,monospace', fontSize:'0.7rem', color:T.textMuted }}>
          {gameState==='trivia' ? `${queue.length} left` : gameState==='sorting' ? 'SORT!' : '✓'}
        </div>
      </div>

      {gameState==='trivia' && queue.length>0 && (
        <TriviaGate
          block={queue[0]}
          theme={T}
          answered={blocks.length - queue.length}
          total={blocks.length}
          onAnswer={handleAnswer}
        />
      )}

      {gameState==='sorting' && (
        <SortBoard
          blocks={blocks}
          theme={T}
          onMisplace={() => setMiss(m=>m+1)}
          onComplete={() => setState('result')}
        />
      )}

      {gameState==='result' && (
        <StarResult
          misplacements={misplacements}
          level={level}
          blocks={blocks}
          theme={T}
          onNext={() => setLevel(l=>l+1)}
          onExit={onExit}
        />
      )}
    </div>
  )
}
