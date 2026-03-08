import { useState, useEffect, useCallback, useRef } from 'react'

const TIMER_SECS = 20

export default function QuizScreen({ questions, difficulty, mode, theme:T, sounds, onFinish }) {
  const [idx,      setIdx]      = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score,    setScore]    = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECS)
  const timerRef = useRef(null)
  const mult = {easy:1,medium:2,hard:3}[difficulty]||1
  const q    = questions[idx]
  const pct  = (idx / questions.length) * 100
  const tPct = (timeLeft / TIMER_SECS) * 100

  const answer = useCallback((i) => {
    if (answered) return
    clearInterval(timerRef.current)
    setSelected(i); setAnswered(true)
    if (i === q.answer) { setScore(s=>s+10*mult); sounds.correct() }
    else sounds.wrong()
  }, [answered, q, mult, sounds])

  useEffect(() => {
    if (answered) return
    setTimeLeft(TIMER_SECS)
    timerRef.current = setInterval(()=>{
      setTimeLeft(t=>{ if(t<=1){clearInterval(timerRef.current);answer(-1);return 0} return t-1 })
    },1000)
    return ()=>clearInterval(timerRef.current)
  },[idx])

  const next = () => {
    if (idx+1>=questions.length) {
      // Update localStorage stats when game ends
      const prev = parseInt(localStorage.getItem('highScore') || '0');
      if (score > prev) localStorage.setItem('highScore', score);

      // Calculate streak (example logic, adjust as needed)
      const prevStreak = parseInt(localStorage.getItem('bestStreak') || '0');
      // If you have a streak variable, use it; otherwise, streak logic can be customized
      // For now, just increment streak if all correct
      const finalStreak = score === questions.length * 10 * mult ? prevStreak + 1 : prevStreak;
      if (finalStreak > prevStreak) localStorage.setItem('bestStreak', finalStreak);

      const games = parseInt(localStorage.getItem('totalGames') || '0');
      localStorage.setItem('totalGames', games + 1);

      onFinish(score);
      sounds.complete();
    } else {
      setIdx(i=>i+1);setSelected(null);setAnswered(false);
    }
  }

  const optStyle = (i) => {
    const base = {
      width:'100%', padding:'18px 20px', borderRadius:'2px', cursor:answered?'default':'pointer',
      border:`2px solid ${T.optionBorder}`, background:T.optionBg,
      color:T.optionText, fontFamily:'Tajawal,sans-serif', fontWeight:700,
      fontSize:'clamp(0.95rem,3.5vw,1.05rem)', textAlign:'right',
      display:'flex', alignItems:'center', gap:'14px', transition:'all 0.15s',
      boxShadow:`3px 3px 0 ${T.border}`,
    }
    if (!answered) return base
    if (i===q.answer) return {...base, background:T.optionCorrectBg, border:`2px solid ${T.optionCorrectBorder}`, boxShadow:`3px 3px 0 ${T.optionCorrectBorder}`, animation:'correctPop 0.4s ease'}
    if (i===selected) return {...base, background:T.optionWrongBg, border:`2px solid ${T.optionWrongBorder}`, boxShadow:`3px 3px 0 ${T.optionWrongBorder}`, animation:'shake 0.4s ease', opacity:0.8}
    return {...base, opacity:0.4}
  }

  const timerColor = tPct>50 ? T.primary : tPct>25 ? '#ff9f0a' : T.error

  return (
    <div style={{ minHeight:'100dvh', background:T.bg, display:'flex', flexDirection:'column', padding:'20px 20px 32px' }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
        <div style={{
          padding:'6px 14px', borderRadius:'2px',
          background:T.bgCard, border:`2px solid ${T.border}`,
          color:T.text, fontFamily:'IBM Plex Mono,monospace', fontWeight:700, fontSize:'0.82rem',
          boxShadow:`2px 2px 0 ${T.border}`,
        }}>
          {idx+1} / {questions.length}
        </div>
        <div style={{
          padding:'6px 16px', borderRadius:'2px',
          background:T.primary, border:`2px solid ${T.primary}`,
          color:T.primaryText, fontFamily:'Tajawal,sans-serif', fontWeight:800, fontSize:'0.9rem',
          boxShadow:`2px 2px 0 ${T.border}`,
        }}>
          {score} نقطة
        </div>
      </div>

      {/* Progress */}
      <div style={{ height:'6px', background:T.progressBg, borderRadius:'1px', marginBottom:'10px', border:`1px solid ${T.border}` }}>
        <div style={{ height:'100%', width:`${pct}%`, background:T.progressFill, transition:'width 0.5s ease' }} />
      </div>

      {/* Timer */}
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
        <div style={{ flex:1, height:'8px', background:T.progressBg, border:`1px solid ${T.border}`, borderRadius:'1px', overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${tPct}%`, background:timerColor, transition:'width 1s linear, background 0.3s' }} />
        </div>
        <span style={{ color:timerColor, fontFamily:'IBM Plex Mono,monospace', fontWeight:700, fontSize:'1rem', minWidth:'28px', textAlign:'center' }}>
          {timeLeft}
        </span>
      </div>

      {/* Question */}
      <div key={idx} className="animate-scaleIn" style={{
        padding:'24px 20px', marginBottom:'20px',
        background:T.bgCard, border:`2px solid ${T.border}`,
        borderRadius:'2px', boxShadow:T.shadowCard,
      }}>
        <div style={{ color:T.textMuted, fontFamily:'IBM Plex Mono,monospace', fontSize:'0.72rem', marginBottom:'10px', letterSpacing:'0.06em' }}>
          سؤال — {idx+1}
        </div>
        <p style={{ color:T.text, fontFamily:'Tajawal,sans-serif', fontSize:'clamp(1.1rem,4vw,1.3rem)', fontWeight:700, lineHeight:1.6 }}>
          {q.question}
        </p>
      </div>

      {/* Options */}
      <div style={{ display:'flex', flexDirection:'column', gap:'10px', flex:1 }}>
        {q.options.map((opt,i)=>(
          <button key={i} style={optStyle(i)} onClick={()=>answer(i)}>
            <span style={{
              width:'32px', height:'32px', borderRadius:'2px', flexShrink:0,
              border:`2px solid ${answered && i===q.answer ? T.optionCorrectBorder : answered && i===selected ? T.optionWrongBorder : T.border}`,
              background: answered && i===q.answer ? T.optionCorrectBg : answered && i===selected ? T.optionWrongBg : T.bgElevated,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'IBM Plex Mono,monospace', fontWeight:700, fontSize:'0.85rem',
              color: answered && i===q.answer ? T.optionCorrectBorder : answered && i===selected ? T.optionWrongBorder : T.textMuted,
            }}>
              {answered && i===q.answer ? '✓' : answered && i===selected ? '✗' : ['A','B','C','D'][i]}
            </span>
            {opt}
          </button>
        ))}
      </div>

      {/* Feedback + Next */}
      {answered && (
        <div className="animate-fadeInUp" style={{ marginTop:'16px' }}>
          <div style={{
            textAlign:'center', marginBottom:'12px',
            fontFamily:'Tajawal,sans-serif', fontWeight:800, fontSize:'1rem',
            color: selected===q.answer ? T.optionCorrectBorder : T.optionWrongBorder,
          }}>
            {selected===q.answer ? `✓ أحسنت! +${10*mult} نقطة` : selected===-1 ? '⏰ انتهى الوقت!' : `✗ الإجابة: ${q.options[q.answer]}`}
          </div>
          <button
            onClick={next}
            style={{
              width:'100%', padding:'17px',
              fontFamily:'Tajawal,sans-serif', fontWeight:900, fontSize:'1.1rem',
              background:T.primary, color:T.primaryText,
              border:`2px solid ${T.primary}`, borderRadius:'2px',
              boxShadow:T.shadowCard, cursor:'pointer',
              transition:'transform 0.1s, box-shadow 0.1s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translate(-2px,-2px)';e.currentTarget.style.boxShadow=`7px 7px 0 ${T.secondary}`}}
            onMouseLeave={e=>{e.currentTarget.style.transform='translate(0,0)';e.currentTarget.style.boxShadow=T.shadowCard}}
          >
            {idx+1>=questions.length ? '🏁 عرض النتائج ↗' : 'التالي ↗'}
          </button>
        </div>
      )}
    </div>
  )
}
