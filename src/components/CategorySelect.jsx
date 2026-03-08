import { useState } from 'react'
import GlassCard from './GlassCard'
import { CATEGORIES, getQuestions } from '../data/index'

const extraCategories = [
  { id: 'mixed', name: 'كل الفئات', emoji: '🎲', color: '#6e6ef4' },
]

const allCategories = [...CATEGORIES, ...extraCategories]

export default function CategorySelect({ theme, difficulty, onSelect, onBack }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (id) => {
    setSelected(id)
    setTimeout(() => onSelect(id), 300)
  }

  // count available questions per category given current difficulty
  const getCount = (catId) => {
    if (catId === 'mixed') {
      return difficulty === 'mixed'
        ? getQuestions().length
        : getQuestions(null, difficulty).length
    }
    return difficulty === 'mixed'
      ? getQuestions(catId).length
      : getQuestions(catId, difficulty).length
  }

  return (
    <div style={{
      minHeight: '100dvh', background: theme.bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px', gap: '16px',
    }}>

      {/* Header */}
      <div className="animate-fadeInUp" style={{ textAlign: 'center', marginBottom: '4px' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📚</div>
        <h2 style={{
          fontFamily: 'Cairo, sans-serif', fontWeight: 800,
          fontSize: '1.8rem', color: theme.text, margin: 0,
        }}>
          اختر الفئة
        </h2>
        <p style={{ color: theme.textMuted, fontSize: '0.9rem', marginTop: '4px' }}>
          {allCategories.length} فئات متاحة
        </p>
      </div>

      {/* Grid */}
      <div style={{
        width: '100%', maxWidth: '420px',
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px',
      }}>
        {allCategories.map((cat, i) => {
          const isSelected = selected === cat.id
          const count = getCount(cat.id)
          const isFull = cat.id === 'mixed'

          return (
            <GlassCard
              key={cat.id}
              as="button"
              variant="card"
              shimmer
              className={`animate-scaleIn delay-${Math.min(i + 1, 5)}`}
              onClick={() => handleSelect(cat.id)}
              style={{
                padding: '18px 14px', borderRadius: '16px',
                cursor: 'pointer', textAlign: 'center',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '8px',
                gridColumn: isFull ? 'span 2' : 'span 1',
                transition: 'transform 0.2s, box-shadow 0.2s',
                transform: isSelected ? 'scale(0.96)' : 'scale(1)',
                '--glass-tint': isSelected ? `${cat.color}22` : `${cat.color}10`,
                '--glass-tint-border': isSelected ? cat.color : `${cat.color}22`,
                boxShadow: isSelected ? `0 0 20px ${cat.color}44` : 'none',
              }}
            >
              {/* Icon */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: `${cat.color}22`,
                border: `1.5px solid ${isSelected ? cat.color : cat.color + '44'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', transition: 'border 0.2s',
              }}>
                {cat.emoji}
              </div>

              {/* Name */}
              <div style={{
                color: theme.text, fontFamily: 'Cairo, sans-serif',
                fontWeight: 700, fontSize: isFull ? '1rem' : '0.85rem',
                lineHeight: 1.3,
              }}>
                {cat.name}
              </div>

              {/* Question count badge */}
              <div style={{
                color: cat.color, fontSize: '0.72rem',
                fontFamily: 'Cairo, sans-serif', fontWeight: 600,
                opacity: 0.85,
              }}>
                {count} سؤال
              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* Back */}
      <GlassCard
        as="button"
        variant="pill"
        onClick={onBack}
        style={{
          padding: '12px 28px', cursor: 'pointer',
          color: theme.textMuted, fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem',
        }}
      >
        ← رجوع
      </GlassCard>
    </div>
  )
}
