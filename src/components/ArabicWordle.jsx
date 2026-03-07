import { useState, useEffect, useCallback } from 'react'
import GlassCard from './GlassCard'
import { getRandomWord, VALID_GUESSES } from '../data/arabicWords'

const MAX_GUESSES = 6
const WORD_LENGTH = 5
const ARABIC_KEYBOARD = [
  ['ض','ص','ث','ق','ف','غ','ع','ه','خ','ح','ج'],
  ['ش','س','ي','ب','ل','ا','ت','ن','م','ك','د'],
  ['ENTER','ئ','ء','ؤ','ر','ى','ة','و','ز','ظ','⌫'],
]
const STATE = { EMPTY: 'empty', FILLED: 'filled', CORRECT: 'correct', PRESENT: 'present', ABSENT: 'absent' }

function evaluateGuess(guess, answer) {
  const result = Array(WORD_LENGTH).fill(STATE.ABSENT)
  const answerArr = answer.split('')
  const guessArr  = guess.split('')
  const used = Array(WORD_LENGTH).fill(false)
  guessArr.forEach((ch, i) => { if (ch === answerArr[i]) { result[i] = STATE.CORRECT; used[i] = true } })
  guessArr.forEach((ch, i) => {
    if (result[i] === STATE.CORRECT) return
    const j = answerArr.findIndex((c, idx) => c === ch && !used[idx])
    if (j !== -1) { result[i] = STATE.PRESENT; used[j] = true }
  })
  return result
}

export default function ArabicWordle({ theme, onBack, sounds }) {
  const [answer,       setAnswer]       = useState(() => getRandomWord())
  const [guesses,      setGuesses]      = useState([])
  const [current,      setCurrent]      = useState('')
  const [gameState,    setGameState]    = useState('playing')
  const [shake,        setShake]        = useState(false)
  const [message,      setMessage]      = useState('')
  const [revealRow,    setRevealRow]    = useState(null)
  const [letterStates, setLetterStates] = useState({})

  const showMessage = (msg, duration = 2000) => { setMessage(msg); setTimeout(() => setMessage(''), duration) }

  const submitGuess = useCallback(() => {
    if (current.length !== WORD_LENGTH) { setShake(true); setTimeout(() => setShake(false), 500); showMessage('الكلمة يجب أن تكون ٥ أحرف'); return }
    const result = evaluateGuess(current, answer)
    const newGuess = { word: current, result }
    const newGuesses = [...guesses, newGuess]
    setRevealRow(newGuesses.length - 1)
    setGuesses(newGuesses)
    setCurrent('')
    setLetterStates(prev => {
      const next = { ...prev }
      current.split('').forEach((ch, i) => {
        const s = result[i]
        if (!next[ch] || s === STATE.CORRECT || (s === STATE.PRESENT && next[ch] === STATE.ABSENT)) next[ch] = s
      })
      return next
    })
    if (result.every(r => r === STATE.CORRECT)) {
      setTimeout(() => { setGameState('won'); sounds.complete(); showMessage('🎉 أحسنت! لقد فزت!', 3000) }, 600)
    } else if (newGuesses.length >= MAX_GUESSES) {
      setTimeout(() => { setGameState('lost'); showMessage(`الكلمة كانت: ${answer}`, 4000) }, 600)
    } else { sounds.click() }
  }, [current, guesses, answer, sounds])

  const handleKey = useCallback((key) => {
    if (gameState !== 'playing') return
    if (key === '⌫' || key === 'Backspace') { setCurrent(c => c.slice(0, -1)); return }
    if (key === 'ENTER' || key === 'Enter') { submitGuess(); return }
    if (current.length < WORD_LENGTH && /[\u0600-\u06FF]/.test(key)) setCurrent(c => c + key)
  }, [gameState, current, submitGuess])

  useEffect(() => {
    const handler = (e) => handleKey(e.key === 'Backspace' ? '⌫' : e.key === 'Enter' ? 'ENTER' : e.key)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleKey])

  const reset = () => { setAnswer(getRandomWord()); setGuesses([]); setCurrent(''); setGameState('playing'); setLetterStates({}); setMessage('') }

  const cellColor = (state) => {
    if (state === STATE.CORRECT) return { bg: theme.success, border: theme.success, color: '#fff' }
    if (state === STATE.PRESENT) return { bg: '#ff9f0a', border: '#ff9f0a', color: '#fff' }
    if (state === STATE.ABSENT)  return { bg: theme.surface, border: theme.textSubtle, color: theme.textMuted }
    return { bg: 'transparent', border: theme.cardBorder, color: theme.text }
  }

  const keyBg = (ch) => {
    const s = letterStates[ch]
    if (s === STATE.CORRECT) return theme.success
    if (s === STATE.PRESENT) return '#ff9f0a'
    if (s === STATE.ABSENT)  return theme.surface
    return theme.surface
  }

  const rows = []
  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) rows.push(guesses[i])
    else if (i === guesses.length) rows.push({ word: current.padEnd(WORD_LENGTH, ' '), result: null, isCurrent: true })
    else rows.push({ word: '     ', result: null })
  }

  return (
    <div style={{ minHeight: '100dvh', background: theme.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 12px 24px', gap: '12px' }}>
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: '1.4rem', cursor: 'pointer', padding: '8px' }}>←</button>
        <div>
          <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: theme.text, textAlign: 'center' }}>كَلِمَة</h2>
          <div style={{ color: theme.textMuted, fontSize: '0.72rem', textAlign: 'center' }}>خمن الكلمة في ٦ محاولات</div>
        </div>
        <button onClick={reset} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: '1.3rem', cursor: 'pointer', padding: '8px' }}>🔄</button>
      </div>

      {message && (
        <GlassCard variant="pill" className="animate-scaleIn" style={{ padding: '8px 20px', color: theme.text, fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>
          {message}
        </GlassCard>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {rows.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', flexDirection: 'row-reverse', gap: '6px', animation: ri === guesses.length && shake ? 'shake 0.45s ease' : 'none' }}>
            {Array.from({ length: WORD_LENGTH }).map((_, ci) => {
              const ch = row.word[ci] === ' ' ? '' : row.word[ci]
              const state = row.result ? row.result[ci] : (ch ? STATE.FILLED : STATE.EMPTY)
              const colors = cellColor(state)
              const delay = row.result && ri === revealRow ? `${ci * 0.1}s` : '0s'
              return (
                <div key={ci} style={{
                  width: 'clamp(44px, 12vw, 56px)', height: 'clamp(44px, 12vw, 56px)',
                  borderRadius: '10px', border: `2px solid ${colors.border}`, background: colors.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Cairo, sans-serif', fontWeight: 800,
                  fontSize: 'clamp(1rem, 4vw, 1.4rem)', color: colors.color,
                  transition: `background 0.3s ${delay}, border-color 0.3s ${delay}`,
                }}>
                  {ch}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', maxWidth: '400px', marginTop: '8px' }}>
        {ARABIC_KEYBOARD.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
            {row.map((key) => (
              <GlassCard key={key} as="button" variant="btn" onClick={() => handleKey(key)} style={{
                flex: key === 'ENTER' || key === '⌫' ? 1.6 : 1,
                minWidth: '28px', height: '44px', borderRadius: '8px',
                background: letterStates[key] ? keyBg(key) : theme.card,
                color: letterStates[key] === STATE.CORRECT || letterStates[key] === STATE.PRESENT ? '#fff' : theme.text,
                fontFamily: 'Cairo, sans-serif', fontWeight: 700,
                fontSize: key === 'ENTER' ? '0.65rem' : '0.95rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {key === 'ENTER' ? 'دخول' : key}
              </GlassCard>
            ))}
          </div>
        ))}
      </div>

      {gameState !== 'playing' && (
        <div className="animate-fadeInUp" style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
          <GlassCard as="button" variant="btn" shimmer onClick={reset} style={{
            padding: '12px 24px', borderRadius: '50px',
            background: `linear-gradient(135deg, ${theme.primary}cc, ${theme.secondary}aa)`,
            color: '#fff', fontFamily: 'Cairo, sans-serif', fontWeight: 700,
            border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer', fontSize: '0.95rem',
          }}>
            🔄 لعبة جديدة
          </GlassCard>
          <GlassCard as="button" variant="pill" onClick={onBack} style={{
            padding: '12px 24px', color: theme.text,
            fontFamily: 'Cairo, sans-serif', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
          }}>
            ← رجوع
          </GlassCard>
        </div>
      )}
    </div>
  )
}
