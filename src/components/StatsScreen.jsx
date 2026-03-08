import GlassCard from './GlassCard'
import { CATEGORIES } from '../data/index'

const diffColor = { easy: '#34c759', medium: '#ff9f0a', hard: '#ff453a', mixed: '#6e6ef4' }
const diffName  = { easy: 'سهل', medium: 'متوسط', hard: 'صعب', mixed: 'مزيج' }

function StatBox({ emoji, label, value, color, theme }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '1.5rem' }}>{emoji}</div>
      <div style={{
        color: color || theme.text,
        fontFamily: 'Cairo, sans-serif', fontWeight: 800,
        fontSize: '1.1rem', marginTop: '4px',
      }}>
        {value}
      </div>
      <div style={{ color: theme.textMuted, fontSize: '0.7rem', marginTop: '2px' }}>
        {label}
      </div>
    </div>
  )
}

export default function StatsScreen({ stats, profile, theme, onBack }) {
  const history      = stats?.history      || []
  const catStats     = stats?.categoryStats || {}
  const gamesPlayed  = stats?.gamesPlayed  || 0
  const totalScore   = stats?.totalScore   || 0
  const bestStreak   = stats?.bestStreak   || 0
  const avgScore     = gamesPlayed > 0 ? Math.round(totalScore / gamesPlayed) : 0

  // overall accuracy from history
  const totalCorrect = history.reduce((a, g) => a + (g.correct || 0), 0)
  const totalQs      = history.reduce((a, g) => a + (g.total   || 0), 0)
  const accuracy     = totalQs > 0 ? Math.round((totalCorrect / totalQs) * 100) : 0

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
          as="button" variant="pill"
          onClick={onBack}
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
          📊 الإحصائيات
        </h2>
        {/* spacer */}
        <div style={{ width: '72px' }} />
      </div>

      {/* Profile banner */}
      {profile && (
        <GlassCard
          variant="card"
          className="animate-fadeInUp delay-1"
          style={{
            padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: '14px',
            '--glass-tint': `${theme.primary}0a`,
            '--glass-tint-border': `${theme.primary}22`,
          }}
        >
          <span style={{ fontSize: '2.4rem' }}>{profile.avatar || '🎯'}</span>
          <div style={{ flex: 1 }}>
            <div style={{
              color: theme.text, fontFamily: 'Cairo, sans-serif',
              fontWeight: 800, fontSize: '1rem',
            }}>
              {profile.name}
            </div>
            <div style={{ color: theme.primary, fontFamily: 'Cairo, sans-serif', fontSize: '0.78rem', marginTop: '2px' }}>
              🏆 أفضل نتيجة: {profile.bestScore || 0} نقطة
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: theme.primary, fontFamily: 'Cairo, sans-serif',
              fontWeight: 900, fontSize: '1.6rem', lineHeight: 1,
            }}>
              {gamesPlayed}
            </div>
            <div style={{ color: theme.textMuted, fontSize: '0.68rem' }}>مباراة</div>
          </div>
        </GlassCard>
      )}

      {/* Overview stats */}
      <GlassCard
        variant="card"
        className="animate-fadeInUp delay-2"
        style={{ padding: '20px' }}
      >
        <div style={{
          color: theme.textMuted, fontFamily: 'Cairo, sans-serif',
          fontSize: '0.72rem', marginBottom: '16px', letterSpacing: '0.06em',
        }}>
          نظرة عامة
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px',
        }}>
          <StatBox emoji="🎯" label="الدقة"       value={`${accuracy}%`}  color={theme.primary} theme={theme} />
          <StatBox emoji="⭐" label="متوسط"       value={avgScore}         color="#ff9f0a"       theme={theme} />
          <StatBox emoji="🔥" label="أطول سلسلة"  value={bestStreak}       color="#ff453a"       theme={theme} />
          <StatBox emoji="✅" label="إجابات صحيحة" value={totalCorrect}    color="#34c759"       theme={theme} />
        </div>
      </GlassCard>

      {/* Wins per difficulty */}
      <GlassCard
        variant="card"
        className="animate-fadeInUp delay-2"
        style={{ padding: '20px' }}
      >
        <div style={{
          color: theme.textMuted, fontFamily: 'Cairo, sans-serif',
          fontSize: '0.72rem', marginBottom: '16px', letterSpacing: '0.06em',
        }}>
          انتصارات حسب المستوى
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['easy', 'medium', 'hard'].map(d => {
            const wins  = stats?.[`${d}Wins`] || 0
            const total = history.filter(g => g.difficulty === d).length
            const pct   = total > 0 ? Math.round((wins / total) * 100) : 0
            return (
              <div key={d}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '5px',
                }}>
                  <span style={{
                    color: diffColor[d],
                    fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.85rem',
                  }}>
                    {diffName[d]}
                  </span>
                  <span style={{ color: theme.textMuted, fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif' }}>
                    {wins} / {total} فوز
                  </span>
                </div>
                <div style={{ height: '7px', borderRadius: '4px', background: theme.progressBg, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${pct}%`,
                    background: diffColor[d], borderRadius: '4px',
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            )
          })}
        </div>
      </GlassCard>

      {/* Per-category accuracy */}
      {Object.keys(catStats).length > 0 && (
        <GlassCard
          variant="card"
          className="animate-fadeInUp delay-3"
          style={{ padding: '20px' }}
        >
          <div style={{
            color: theme.textMuted, fontFamily: 'Cairo, sans-serif',
            fontSize: '0.72rem', marginBottom: '16px', letterSpacing: '0.06em',
          }}>
            الدقة حسب الفئة
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(catStats).map(([catId, data]) => {
              const cat = CATEGORIES.find(c => c.id === catId)
              const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
              const barColor = pct >= 80 ? '#34c759' : pct >= 50 ? '#ff9f0a' : '#ff453a'
              return (
                <div key={catId}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', marginBottom: '5px',
                  }}>
                    <span style={{
                      color: theme.text,
                      fontFamily: 'Cairo, sans-serif', fontWeight: 600, fontSize: '0.82rem',
                    }}>
                      {cat?.emoji} {cat?.name || catId}
                    </span>
                    <span style={{ color: barColor, fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>
                      {pct}%
                    </span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '4px', background: theme.progressBg, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: barColor, borderRadius: '4px',
                      transition: 'width 1s ease',
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      )}

      {/* Recent games history */}
      {history.length > 0 && (
        <GlassCard
          variant="card"
          className="animate-fadeInUp delay-3"
          style={{ padding: '20px' }}
        >
          <div style={{
            color: theme.textMuted, fontFamily: 'Cairo, sans-serif',
            fontSize: '0.72rem', marginBottom: '16px', letterSpacing: '0.06em',
          }}>
            آخر المباريات
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {history.slice(0, 8).map((game, i) => {
              const cat     = CATEGORIES.find(c => c.id === game.category)
              const gamePct = game.maxScore > 0 ? Math.round((game.score / game.maxScore) * 100) : 0
              const dateStr = new Date(game.date).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 12px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  {/* Category icon */}
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '9px',
                    background: `${diffColor[game.difficulty]}18`,
                    border: `1px solid ${diffColor[game.difficulty]}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem', flexShrink: 0,
                  }}>
                    {cat?.emoji || '🎯'}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      color: theme.text, fontFamily: 'Cairo, sans-serif',
                      fontWeight: 700, fontSize: '0.82rem',
                      display: 'flex', gap: '6px', alignItems: 'center',
                    }}>
                      <span>{cat?.name || 'مختلط'}</span>
                      <span style={{
                        color: diffColor[game.difficulty],
                        fontSize: '0.7rem',
                        background: `${diffColor[game.difficulty]}18`,
                        padding: '1px 7px', borderRadius: '20px',
                      }}>
                        {diffName[game.difficulty]}
                      </span>
                    </div>
                    <div style={{ color: theme.textMuted, fontSize: '0.7rem', marginTop: '2px' }}>
                      {dateStr} · {game.correct}/{game.total} صحيحة
                      {game.streak > 1 && ` · 🔥${game.streak}`}
                    </div>
                  </div>

                  {/* Score */}
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{
                      color: gamePct >= 50 ? '#34c759' : '#ff453a',
                      fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '0.95rem',
                    }}>
                      {game.score}
                    </div>
                    <div style={{ color: theme.textMuted, fontSize: '0.65rem' }}>{gamePct}%</div>
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      )}

      {/* Empty state */}
      {history.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: theme.textMuted }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎮</div>
          <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
            لا توجد مباريات بعد
          </div>
          <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>
            العب أول مباراة لترى إحصائياتك هنا
          </div>
        </div>
      )}
    </div>
  )
}
