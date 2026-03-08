import { useEffect } from 'react'
import GlassCard from './GlassCard'
import { useLeaderboard } from '../hooks/useLeaderboard'
import { CATEGORIES } from '../data/index'

const diffColor = { easy: '#34c759', medium: '#ff9f0a', hard: '#ff453a', mixed: '#6e6ef4' }
const diffName  = { easy: 'سهل', medium: 'متوسط', hard: 'صعب', mixed: 'مزيج' }

const rankStyle = (rank) => {
  if (rank === 1) return { emoji: '🥇', color: '#ffd60a' }
  if (rank === 2) return { emoji: '🥈', color: '#c0c0c0' }
  if (rank === 3) return { emoji: '🥉', color: '#cd7f32' }
  return { emoji: `${rank}`, color: '#6e6ef4' }
}

export default function Leaderboard({ theme, onBack }) {
  const { entries, loading, error, fetchTop } = useLeaderboard()

  useEffect(() => { fetchTop(20) }, [])

  return (
    <div style={{
      minHeight: '100dvh', background: theme.bg,
      display: 'flex', flexDirection: 'column',
      padding: '20px 20px 40px', gap: '16px',
    }}>

      {/* Header */}
      <div className="animate-fadeIn" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginTop: '8px',
      }}>
        <GlassCard
          as="button" variant="pill" onClick={onBack}
          style={{
            padding: '8px 18px', cursor: 'pointer',
            color: theme.textMuted,
            fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem',
          }}
        >
          ← رجوع
        </GlassCard>
        <h2 style={{
          fontFamily: 'Cairo, sans-serif', fontWeight: 800,
          fontSize: '1.2rem', color: theme.text, margin: 0,
        }}>
          🏆 المتصدرون
        </h2>
        {/* Refresh */}
        <GlassCard
          as="button" variant="pill"
          onClick={() => fetchTop(20)}
          style={{
            padding: '8px 14px', cursor: 'pointer',
            color: theme.textMuted, fontSize: '0.85rem',
          }}
        >
          🔄
        </GlassCard>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: theme.textMuted }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px', animation: 'pulse 1s ease infinite' }}>⏳</div>
          <div style={{ fontFamily: 'Cairo, sans-serif' }}>جاري التحميل...</div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#ff453a' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⚠️</div>
          <div style={{ fontFamily: 'Cairo, sans-serif' }}>{error}</div>
        </div>
      )}

      {/* Entries */}
      {!loading && !error && entries.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {entries.map((entry, i) => {
            const rs  = rankStyle(entry.rank)
            const cat = CATEGORIES.find(c => c.id === entry.category)
            const isTop3 = entry.rank <= 3

            return (
              <GlassCard
                key={entry.id}
                variant="card"
                className={`animate-fadeInUp delay-${Math.min(i + 1, 5)}`}
                style={{
                  padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  '--glass-tint': isTop3 ? `${rs.color}10` : 'transparent',
                  '--glass-tint-border': isTop3 ? `${rs.color}30` : 'rgba(255,255,255,0.08)',
                  boxShadow: isTop3 ? `0 4px 20px ${rs.color}22` : 'none',
                }}
              >
                {/* Rank */}
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: `${rs.color}18`,
                  border: `1.5px solid ${rs.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Cairo, sans-serif', fontWeight: 800,
                  fontSize: isTop3 ? '1.2rem' : '0.85rem',
                  color: rs.color, flexShrink: 0,
                }}>
                  {rs.emoji}
                </div>

                {/* Avatar */}
                <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>
                  {entry.avatar || '🎯'}
                </span>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    color: theme.text, fontFamily: 'Cairo, sans-serif',
                    fontWeight: 700, fontSize: '0.9rem',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {entry.name}
                  </div>
                  <div style={{
                    display: 'flex', gap: '6px', alignItems: 'center', marginTop: '3px', flexWrap: 'wrap',
                  }}>
                    {cat && (
                      <span style={{ color: theme.textMuted, fontSize: '0.7rem', fontFamily: 'Cairo, sans-serif' }}>
                        {cat.emoji} {cat.name}
                      </span>
                    )}
                    <span style={{
                      color: diffColor[entry.difficulty],
                      fontSize: '0.68rem', fontFamily: 'Cairo, sans-serif',
                      background: `${diffColor[entry.difficulty]}18`,
                      padding: '1px 7px', borderRadius: '20px',
                    }}>
                      {diffName[entry.difficulty]}
                    </span>
                    <span style={{ color: theme.textMuted, fontSize: '0.68rem' }}>
                      🎯 {entry.accuracy}%
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{
                    color: isTop3 ? rs.color : theme.primary,
                    fontFamily: 'Cairo, sans-serif', fontWeight: 900,
                    fontSize: '1.1rem',
                    textShadow: isTop3 ? `0 0 12px ${rs.color}66` : 'none',
                  }}>
                    {entry.score}
                  </div>
                  <div style={{ color: theme.textMuted, fontSize: '0.65rem' }}>نقطة</div>
                </div>
              </GlassCard>
            )
          })}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && entries.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: theme.textMuted }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🏆</div>
          <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
            لا يوجد متصدرون بعد
          </div>
          <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>
            كن أول من يسجل نتيجة!
          </div>
        </div>
      )}
    </div>
  )
}
