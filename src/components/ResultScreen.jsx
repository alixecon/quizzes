import { useEffect, useState } from 'react'

function getPerformanceData(pct) {
  if (pct === 100) return { emoji: '🏆', msg: 'مثالي! أنت عبقري حقيقي!', color: '#ffd700' }
  if (pct >= 80)  return { emoji: '🥇', msg: 'ممتاز! أداء رائع جداً!',    color: '#60a5fa' }
  if (pct >= 60)  return { emoji: '🥈', msg: 'جيد جداً! واصل التحسن',      color: '#a78bfa' }
  if (pct >= 40)  return { emoji: '🥉', msg: 'جيد! لكن بإمكانك أفضل',      color: '#fb923c' }
  return              { emoji: '💪', msg: 'حاول مجدداً وستتحسن!',           color: '#f472b6' }
}

export default function ResultScreen({ score, total, maxScore, profile, theme, onRestart, onHome, onUpdateBestScore }) {
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
  const perf = getPerformanceData(pct)
  const [displayed, setDisplayed] = useState(0)
  const [isNewBest, setIsNewBest] = useState(false)

  useEffect(() => {
    if (score > (profile?.bestScore || 0)) {
      setIsNewBest(true)
      onUpdateBestScore(score)
    }
    // Animate score count-up
    let start = 0
    const step = Math.ceil(score / 40)
    const interval = setInterval(() => {
      start = Math.min(start + step, score)
      setDisplayed(start)
      if (start >= score) clearInterval(interval)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const cardBase = {
    background: theme.card,
    border: `1px solid ${theme.cardBorder}`,
    borderRadius: '20px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '20px',
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: theme.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
      gap: '16px',
    }}>
      {/* Trophy */}
      <div className="animate-scaleIn" style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 'clamp(4rem, 15vw, 6rem)',
          lineHeight: 1,
          marginBottom: '8px',
          filter: `drop-shadow(${theme.glow})`,
        }}>
          {perf.emoji}
        </div>
        <h2 style={{
          fontFamily: 'Cairo, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(1.5rem, 6vw, 2rem)',
          color: theme.text,
          marginBottom: '4px',
        }}>
          {perf.msg}
        </h2>
        {isNewBest && (
          <div style={{
            display: 'inline-block',
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            color: '#fff',
            padding: '4px 16px',
            borderRadius: '50px',
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 700,
            fontSize: '0.85rem',
            marginTop: '6px',
          }}>
            🌟 رقم قياسي جديد!
          </div>
        )}
      </div>

      {/* Score card */}
      <div className="animate-fadeInUp delay-1" style={{ ...cardBase, width: '100%', maxWidth: '360px', textAlign: 'center' }}>
        <div style={{ color: theme.textMuted, fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', marginBottom: '8px' }}>
          نتيجتك النهائية
        </div>
        <div style={{
          fontFamily: 'Cairo, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(3rem, 12vw, 4rem)',
          color: theme.primary,
          lineHeight: 1,
          textShadow: `0 0 30px ${theme.primary}66`,
        }}>
          {displayed}
        </div>
        <div style={{ color: theme.textMuted, fontSize: '0.85rem', marginTop: '4px' }}>
          من أصل {maxScore} نقطة
        </div>

        {/* Progress ring / bar */}
        <div style={{ margin: '16px 0 8px' }}>
          <div style={{
            height: '10px',
            borderRadius: '5px',
            background: theme.progressBg,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
              borderRadius: '5px',
              transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          </div>
          <div style={{ color: perf.color, fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '1rem', marginTop: '6px' }}>
            {pct}%
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="animate-fadeInUp delay-2" style={{
        ...cardBase,
        width: '100%',
        maxWidth: '360px',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        {[
          { label: 'أفضل نتيجة', val: Math.max(score, profile?.bestScore || 0) + ' نقطة', emoji: '🏆' },
          { label: 'الأسئلة',   val: `${total}`,  emoji: '📝' },
          { label: 'الدقة',     val: `${pct}%`,   emoji: '🎯' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem' }}>{stat.emoji}</div>
            <div style={{ color: theme.text, fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1rem', marginTop: '4px' }}>
              {stat.val}
            </div>
            <div style={{ color: theme.textMuted, fontSize: '0.72rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="animate-fadeInUp delay-3" style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={onRestart}
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
          🔄 العب مجدداً
        </button>
        <button
          onClick={onHome}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '14px',
            background: theme.surface,
            border: `1.5px solid ${theme.cardBorder}`,
            color: theme.text,
            fontSize: '1rem',
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          🏠 الصفحة الرئيسية
        </button>
      </div>
    </div>
  )
}
