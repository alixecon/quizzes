import { useState, useEffect, useCallback, useRef } from 'react'
import GlassCard from './GlassCard'

const TIMER_SECONDS = 20
const POINTS_BASE   = 10

export default function QuizScreen({ questions, difficulty, mode, theme, sounds, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected,     setSelected]     = useState(null)
  const [answered,     setAnswered]     = useState(false)
  const [score,        setScore]        = useState(0)
  const [timeLeft,     setTimeLeft]     = useState(TIMER_SECONDS)
  const [streak,  setStreak]  = useState(0)  // resets on wrong answer
  const [pointsEarned, setPointsEarned] = useState(0)
  const [showPoints,   setShowPoints]   = useState(false)
  const [correct, setCorrect] = useState(0)  // NEVER resets, only increments
  const timerRef   = useRef(null)
  const answeredRef = useRef(false)

  const multMap = { easy: 1, medium: 2, hard: 3 }
  const mult    = multMap[difficulty] || 1

  const current  = questions[currentIndex]
  const total    = questions.length
  const progress = (currentIndex / total) * 100

  // streak bonus: 0→0, 1→0, 2→+5, 3→+10, 4+→+15
  const streakBonus = streak >= 4 ? 15 : streak >= 3 ? 10 : streak >= 2 ? 5 : 0

  const handleAnswer = useCallback((optIdx) => {
  if (answeredRef.current) return
  answeredRef.current = true
  clearInterval(timerRef.current)
  setSelected(optIdx)
  setAnswered(true)

  // ✅ compute locally inside callback
  const bonus = streak >= 4 ? 15 : streak >= 3 ? 10 : streak >= 2 ? 5 : 0

  const isCorrect = optIdx === current.answer
  if (isCorrect) {
  setCorrect(c => c + 1)   // ✅ always increments, never resets
  setStreak(s => s + 1)    // resets on wrong
  // ...points logic
} else {
  setStreak(0)             // ✅ only streak resets, correct is untouched
  sounds?.wrong?.()
}

}, [current, mult, mode, timeLeft, streak])  // ✅ clean deps


  // Reset answeredRef on question change
  useEffect(() => {
    answeredRef.current = false
    setTimeLeft(TIMER_SECONDS)

    if (mode !== 'timed') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          handleAnswer(-1)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [currentIndex, mode])

  const handleNext = () => {
    if (currentIndex + 1 >= total) {
      sounds?.complete?.()
      onFinish({ score, streak, correct })
    } else {
      setCurrentIndex(i => i + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const timerPct   = (timeLeft / TIMER_SECONDS) * 100
  const timerColor = timerPct > 50 ? theme.primary : timerPct > 25 ? '#ff9f0a' : '#ff453a'

  const optionStyle = (idx) => {
    if (!answered) return {}
    if (idx === current.answer) return {
      '--glass-tint': 'rgba(52,199,89,0.18)',
      '--glass-tint-border': '#34c759',
    }
    if (idx === selected && idx !== current.answer) return {
      '--glass-tint': 'rgba(255,69,58,0.18)',
      '--glass-tint-border': '#ff453a',
    }
    return { opacity: 0.4 }
  }

  const streakLabel = streak >= 4 ? '🔥🔥🔥' : streak >= 3 ? '🔥🔥' : streak >= 2 ? '🔥' : null

  return (
    <div style={{
      minHeight: '100dvh', background: theme.bg,
      display: 'flex', flexDirection: 'column',
      padding: '20px 20px 32px', gap: '14px',
      position: 'relative',
    }}>

      {/* Floating +points animation */}
      {showPoints && (
        <div style={{
          position: 'fixed', top: '80px', left: '50%',
          transform: 'translateX(-50%)',
          color: '#34c759', fontFamily: 'Cairo, sans-serif',
          fontWeight: 800, fontSize: '1.4rem',
          animation: 'floatUp 1.5s ease forwards',
          zIndex: 999, pointerEvents: 'none',
          textShadow: '0 0 20px rgba(52,199,89,0.6)',
        }}>
          +{pointsEarned}
        </div>
      )}

      {/* Header */}
      <div className="animate-fadeIn" style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginTop: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GlassCard variant="pill" style={{
            padding: '6px 16px',
            color: theme.primary,
            fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.9rem',
            '--glass-tint': `${theme.primary}18`,
            '--glass-tint-border': `${theme.primary}40`,
          }}>
            {score} نقطة
          </GlassCard>
          {/* Streak badge */}
          {streakLabel && (
            <div style={{
              fontFamily: 'Cairo, sans-serif', fontWeight: 800,
              fontSize: '0.85rem', color: '#ff9f0a',
              animation: 'timerPulse 0.8s ease infinite',
            }}>
              {streakLabel} ×{streak}
            </div>
          )}
        </div>
        <div style={{
          color: theme.textMuted,
          fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem',
        }}>
          {total} / {currentIndex + 1}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: '6px', borderRadius: '3px',
        background: theme.progressBg, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: theme.progressFill,
          borderRadius: '3px', transition: 'width 0.5s ease',
        }} />
      </div>

      {/* Timer */}
      {mode === 'timed' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            color: timerColor, fontFamily: 'Cairo, sans-serif',
            fontWeight: 800, fontSize: '1.1rem',
            minWidth: '28px', textAlign: 'center',
            animation: timeLeft <= 5 ? 'timerPulse 0.6s ease infinite' : 'none',
          }}>
            {timeLeft}
          </div>
          <div style={{
            flex: 1, height: '8px', borderRadius: '4px',
            background: theme.progressBg, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${timerPct}%`,
              background: timerColor, borderRadius: '4px',
              transition: 'width 1s linear, background 0.3s',
            }} />
          </div>
        </div>
      )}

      {/* Question card */}
      <GlassCard
        key={currentIndex}
        variant="card"
        className="animate-scaleIn"
        style={{
          padding: '24px 20px',
          '--glass-tint': `${theme.primary}08`,
          '--glass-tint-border': `${theme.primary}20`,
        }}
      >
        <div style={{
          color: theme.textSubtle, fontSize: '0.78rem',
          fontFamily: 'Cairo, sans-serif', marginBottom: '12px',
        }}>
          سؤال {currentIndex + 1}
        </div>
        <p style={{
          color: theme.text,
          fontFamily: 'Noto Naskh Arabic, serif',
          fontSize: 'clamp(1.05rem, 4vw, 1.25rem)',
          lineHeight: 1.7, fontWeight: 600, margin: 0,
        }}>
          {current.question}
        </p>
      </GlassCard>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {current.options.map((opt, idx) => (
          <GlassCard
            key={idx}
            as="button"
            variant="card"
            onClick={() => handleAnswer(idx)}
            style={{
              width: '100%', padding: '16px 18px',
              borderRadius: '14px',
              color: theme.text,
              fontFamily: 'Noto Naskh Arabic, serif',
              fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
              textAlign: 'right',
              cursor: answered ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', gap: '12px',
              lineHeight: 1.5,
              transition: 'all 0.25s',
              ...optionStyle(idx),
            }}
          >
            <span style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: answered && idx === current.answer ? 'rgba(52,199,89,0.2)'
                : answered && idx === selected && idx !== current.answer ? 'rgba(255,69,58,0.2)'
                : 'rgba(255,255,255,0.06)',
              border: `1px solid ${
                answered && idx === current.answer ? '#34c759'
                : answered && idx === selected && idx !== current.answer ? '#ff453a'
                : 'rgba(255,255,255,0.12)'
              }`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.8rem',
              color: answered && idx === current.answer ? '#34c759'
                : answered && idx === selected && idx !== current.answer ? '#ff453a'
                : theme.textMuted,
              flexShrink: 0, transition: 'all 0.25s',
            }}>
              {answered && idx === current.answer ? '✓'
               : answered && idx === selected && idx !== current.answer ? '✗'
               : ['أ','ب','ج','د'][idx]}
            </span>
            {opt}
          </GlassCard>
        ))}
      </div>

      {/* Explanation */}
      {answered && (
        <div className="animate-fadeInUp">
          {/* Result line */}
          <div style={{
            textAlign: 'center', marginBottom: '10px',
            fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '1rem',
            color: selected === current.answer ? '#34c759' : '#ff453a',
          }}>
            {selected === current.answer
              ? `🎉 أحسنت! +${pointsEarned} نقطة${streakBonus > 0 ? ` (شامل مكافأة السلسلة +${streakBonus})` : ''}`
              : selected === -1 ? '⏰ انتهى الوقت!'
              : `❌ الإجابة الصحيحة: ${current.options[current.answer]}`}
          </div>

          {/* Explanation card */}
          <GlassCard variant="card" style={{
            padding: '14px 16px', marginBottom: '12px',
            '--glass-tint': 'rgba(255,255,255,0.04)',
            '--glass-tint-border': 'rgba(255,255,255,0.12)',
          }}>
            <div style={{
              color: theme.textMuted, fontSize: '0.72rem',
              fontFamily: 'Cairo, sans-serif', marginBottom: '6px',
            }}>
              💡 هل تعلم؟
            </div>
            <p style={{
              color: theme.text, margin: 0,
              fontFamily: 'Noto Naskh Arabic, serif',
              fontSize: '0.88rem', lineHeight: 1.7,
            }}>
              {current.explanation}
            </p>
          </GlassCard>

          {/* Next button */}
          <GlassCard
            as="button"
            variant="btn"
            shimmer
            liquid
            onClick={handleNext}
            style={{
              width: '100%', padding: '16px', borderRadius: '14px',
              background: `linear-gradient(135deg, ${theme.primary}cc, ${theme.secondary}aa)`,
              color: '#fff', fontSize: '1.05rem',
              fontFamily: 'Cairo, sans-serif', fontWeight: 800,
              border: '1px solid rgba(255,255,255,0.25)',
              cursor: 'pointer',
              boxShadow: `0 6px 24px ${theme.primary}44, inset 0 1px 0 rgba(255,255,255,0.25)`,
            }}
          >
            {currentIndex + 1 >= total ? '🏁 عرض النتائج' : 'التالي ←'}
          </GlassCard>
        </div>
      )}

      {/* floatUp keyframe — inject once */}
      <style>{`
        @keyframes floatUp {
          0%   { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-60px); }
        }
      `}</style>
    </div>
  )
}
