import { useState } from 'react'
import GlassCard from './GlassCard'

const CATEGORIES = [
  { id: 'science',     name: 'العلوم',        emoji: '🔬', color: '#5ac8fa' },
  { id: 'history',     name: 'التاريخ',       emoji: '📜', color: '#ff9f0a' },
  { id: 'geography',   name: 'الجغرافيا',    emoji: '🌍', color: '#30d158' },
  { id: 'sports',      name: 'الرياضة',      emoji: '⚽', color: '#ff453a' },
  { id: 'arts',        name: 'الفنون',        emoji: '🎨', color: '#bf5af2' },
  { id: 'technology',  name: 'التكنولوجيا',  emoji: '💻', color: '#0aefff' },
  { id: 'religion',    name: 'الدين',         emoji: '☪️',  color: '#ffd60a' },
  { id: 'general',     name: 'معلومات عامة', emoji: '🧠', color: '#ff6cae' },
]

export default function CategorySelect({ theme, onSelect, onBack }) {
  const [spinning, setSpinning] = useState(false)
  const [highlighted, setHighlighted] = useState(null)

  const handleRandom = () => {
    if (spinning) return
    setSpinning(true)
    let count = 0
    const total = 14
    const iv = setInterval(() => {
      setHighlighted(CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].id)
      count++
      if (count >= total) {
        clearInterval(iv)
        const winner = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
        setHighlighted(winner.id)
        setSpinning(false)
        setTimeout(() => { setHighlighted(null); onSelect(winner.id) }, 800)
      }
    }, 100)
  }

  return (
    <div style={{
      minHeight: '100dvh', background: 'transparent',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px', gap: '14px',
    }}>
      <div className="animate-fadeInUp" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.2rem', marginBottom: '6px' }}>📚</div>
        <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1.7rem', color: theme.text }}>اختر الفئة</h2>
        <p style={{ color: theme.textMuted, fontSize: '0.85rem', marginTop: '3px' }}>اختر موضوعاً أو دع الحظ يختار</p>
      </div>

      {/* Randomizer button */}
      <GlassCard
        as="button" variant="btn" shimmer liquid
        onClick={handleRandom}
        className="animate-fadeInUp delay-1"
        style={{
          padding: '14px 32px', borderRadius: '50px',
          background: spinning
            ? `linear-gradient(135deg, ${theme.accent}cc, ${theme.primary}aa)`
            : `linear-gradient(135deg, ${theme.primary}cc, ${theme.secondary}aa)`,
          color: '#fff', fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1rem',
          border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer',
          boxShadow: `0 6px 28px ${theme.primary}55`,
          animation: spinning ? 'pulse 0.5s ease infinite' : 'none',
        }}
      >
        {spinning ? '🎲 جاري الاختيار...' : '🎲 اختر عشوائياً'}
      </GlassCard>

      {/* Category grid */}
      <div style={{
        width: '100%', maxWidth: '440px',
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px',
      }}>
        {CATEGORIES.map((cat, i) => (
          <GlassCard
            key={cat.id}
            as="button"
            variant="card"
            shimmer
            className={`animate-scaleIn delay-${Math.min(i+1,5)}`}
            onClick={() => onSelect(cat.id)}
            style={{
              padding: '16px 14px', borderRadius: '16px', cursor: 'pointer',
              textAlign: 'center', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '8px',
              border: `1.5px solid ${highlighted === cat.id ? cat.color : theme.cardBorder}`,
              boxShadow: highlighted === cat.id ? `0 0 20px ${cat.color}55` : 'none',
              transform: highlighted === cat.id ? 'scale(1.04)' : 'scale(1)',
              transition: 'all 0.15s ease',
              '--glass-tint': `${cat.color}0e`,
              '--glass-tint-border': `${cat.color}20`,
            }}
          >
            <div style={{
              width: '46px', height: '46px', borderRadius: '12px',
              background: `${cat.color}1a`, border: `1.5px solid ${cat.color}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
            }}>
              {cat.emoji}
            </div>
            <div style={{ color: theme.text, fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.88rem' }}>
              {cat.name}
            </div>
          </GlassCard>
        ))}

        {/* Puzzles — full width */}
        <GlassCard
          as="button" variant="card" shimmer
          onClick={() => onSelect('puzzles')}
          className="animate-scaleIn delay-5"
          style={{
            gridColumn: 'span 2', padding: '16px 20px', borderRadius: '16px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px',
            '--glass-tint': '#bf5af214', '--glass-tint-border': '#bf5af230',
          }}
        >
          <div style={{
            width: '46px', height: '46px', borderRadius: '12px',
            background: '#bf5af21a', border: '1.5px solid #bf5af233',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0,
          }}>🧩</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: theme.text, fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>الألعاب والألغاز</div>
            <div style={{ color: '#bf5af2', fontSize: '0.75rem', marginTop: '2px' }}>كَلِمَة · سودوكو</div>
          </div>
        </GlassCard>
      </div>

      <GlassCard as="button" variant="pill" onClick={onBack} style={{
        padding: '11px 28px', cursor: 'pointer',
        color: theme.textMuted, fontFamily: 'Cairo, sans-serif', fontSize: '0.88rem',
      }}>
        ← رجوع
      </GlassCard>
    </div>
  )
}
