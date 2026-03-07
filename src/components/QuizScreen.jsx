import { useState, useEffect, useCallback, useRef } from 'react'

const TIMER_SECONDS = 20
const POINTS_BASE = 10

export default function QuizScreen({ questions, difficulty, mode, theme, sounds, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [timerActive, setTimerActive] = useState(mode === 'timed')
  const timerRef = useRef(null)
  const multMap = { easy: 1, medium: 2, hard: 3 }
  const mult = multMap[difficulty] || 1

  const current = questions[currentIndex]
  const total = questions.length
  const progress = ((currentIndex) / total) * 100

  const handleAnswer = useCallback((optIdx) => {
    if (answered) return
    setTimerActive(false)
    clearInterval(timerRef.current)
    setSelected(optIdx)
    setAnswered(true)
    const isCorrect = optIdx === current.answer
    if (isCorrect) {
      const pts = POINTS_BASE * mult + (mode === 'timed' ? Math.floor(timeLeft * 0.5) : 0)
      setScore(s => s + pts)
      sounds.correct()
    } else {
      sounds.wrong()
    }
  }, [answered, current, mult, mode, timeLeft, sounds])

  // Timer effect
  useEffect(() => {
    if (mode !== 'timed' || answered) return
    setTimeLeft(TIMER_SECONDS)
    setTimerActive(true)
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
      onFinish(score + (selected === current.answer && !answered ? POINTS_BASE * mult : 0))
      sounds.complete()
    } else {
      setCurrentIndex(i => i + 1)
      setSelected(null)
      setAnswered(false)
      if (mode === 'timed') setTimerActive(true)
    }
  }

  const optionStyle = (idx) => {
    const base = {
      width: '100%',
      padding: '16px 18px',
      borderRadius: '14px',
      background: theme.card,
      border: `1.5px solid ${theme.cardBorder}`,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      color: theme.text,
      fontFamily: 'Noto Naskh Arabic, serif',
      fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
      textAlign: 'right',
      cursor: answered ? 'default' : 'pointer',
      transition: 'all 0.25s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      lineHeight: 1.5,
    }

    if (!answered) return base

    if (idx === current.answer) {
      return {
        ...base,
        background: theme.optionCorrect,
        border: `1.5px solid ${theme.optionCorrectBorder}`,
        animation: 'correctPop 0.4s ease',
      }
    }
    if (idx === selected && idx !== current.answer) {
      return {
        ...base,
        background: theme.optionWrong,
        border: `1.5px solid ${theme.optionWrongBorder}`,
        animation: 'shake 0.45s ease',
      }
    }
    return { ...base, opacity: 0.45 }
  }

  const timerPct = (timeLeft / TIMER_SECONDS) * 100
  const timerColor = timerPct > 50 ? theme.primary : timerPct > 25 ? '#f0a500' : '#ff4d4f'

  return (
    <div style={{
      minHeight: '100dvh',
      background: theme.bg,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 20px 32px',
      gap: '16px',
    }}>
      {/* Header: progress & score */}
      <div className="animate-fadeIn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <div style={{
          background: `${theme.primary}22`,
          border: `1px solid ${theme.primary}44`,
          padding: '6px 14px',
          borderRadius: '50px',
          color: theme.primary,
          fontFamily: 'Cairo, sans-serif',
          fontWeight: 700,
          fontSize: '0.9rem',
        }}>
          {score} نقطة
        </div>
        <div style={{ color: theme.textMuted, fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem' }}>
          {currentIndex + 1} / {total}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: '6px',
        borderRadius: '3px',
        background: theme.progressBg,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
          borderRadius: '3px',
          transition: 'width 0.5s ease',
        }} />
      </div>

      {/* Timer (timed mode) */}
      {mode === 'timed' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            flex: 1,
            height: '8px',
            borderRadius: '4px',
            background: theme.progressBg,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${timerPct}%`,
              background: timerColor,
              borderRadius: '4px',
              transition: 'width 1s linear, background 0.3s',
            }} />
          </div>
          <div style={{
            color: timerColor,
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 800,
            fontSize: '1.1rem',
            minWidth: '28px',
            textAlign: 'center',
            animation: timeLeft <= 5 ? 'timerPulse 0.6s ease infinite' : 'none',
          }}>
            {timeLeft}
          </div>
        </div>
      )}

      {/* Question card */}
      <div
        key={currentIndex}
        className="animate-scaleIn"
        style={{
          background: theme.card,
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: '22px',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          padding: '24px 20px',
          boxShadow: theme.shadow,
          flex: '0 0 auto',
        }}
      >
        <div style={{
          color: theme.textSubtle,
          fontSize: '0.78rem',
          fontFamily: 'Cairo, sans-serif',
          marginBottom: '12px',
        }}>
          سؤال {currentIndex + 1}
        </div>
        <p style={{
          color: theme.text,
          fontFamily: 'Noto Naskh Arabic, serif',
          fontSize: 'clamp(1.05rem, 4vw, 1.25rem)',
          lineHeight: 1.7,
          fontWeight: 600,
        }}>
          {current.question}
        </p>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {current.options.map((opt, idx) => (
          <button
            key={idx}
            style={optionStyle(idx)}
            onClick={() => handleAnswer(idx)}
            disabled={answered}
          >
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: answered && idx === current.answer
                ? '#52c41a22'
                : answered && idx === selected && idx !== current.answer
                ? '#ff4d4f22'
                : theme.surface,
              border: `1px solid ${
                answered && idx === current.answer
                  ? '#52c41a'
                  : answered && idx === selected && idx !== current.answer
                  ? '#ff4d4f'
                  : theme.cardBorder
              }`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
              fontSize: '0.8rem',
              color: answered && idx === current.answer
                ? '#52c41a'
                : answered && idx === selected && idx !== current.answer
                ? '#ff4d4f'
                : theme.textMuted,
              flexShrink: 0,
              transition: 'all 0.25s',
            }}>
              {answered && idx === current.answer ? '✓'
               : answered && idx === selected && idx !== current.answer ? '✗'
               : ['أ','ب','ج','د'][idx]}
            </span>
            {opt}
          </button>
        ))}
      </div>

      {/* Feedback + next */}
      {answered && (
        <div className="animate-fadeInUp">
          <div style={{
            textAlign: 'center',
            marginBottom: '12px',
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 700,
            fontSize: '1rem',
            color: selected === current.answer ? '#52c41a' : '#ff4d4f',
          }}>
            {selected === current.answer
              ? `🎉 أحسنت! +${POINTS_BASE * mult}${mode === 'timed' ? ` +${Math.floor(timeLeft * 0.5)} (سرعة)` : ''} نقطة`
              : selected === -1
              ? '⏰ انتهى الوقت!'
              : `❌ الإجابة الصحيحة: ${current.options[current.answer]}`
            }
          </div>
          <button
            onClick={handleNext}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '14px',
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              color: '#fff',
              fontSize: '1.05rem',
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              boxShadow: `0 6px 24px ${theme.primary}44`,
            }}
          >
            {currentIndex + 1 >= total ? '🏁 عرض النتائج' : 'التالي ←'}
          </button>
        </div>
      )}
    </div>
  )
}
