import { useEffect, useState } from 'react'

function getPerformanceData(pct) {
  if (pct === 100) return { emoji: '🏆', msg: 'مثالي! أنت عبقري حقيقي!', color: '#ffd700' }
  if (pct >= 80)  return { emoji: '🥇', msg: 'ممتاز! أداء رائع جداً!',    color: '#60a5fa' }
  if (pct >= 60)  return { emoji: '🥈', msg: 'جيد جداً! واصل التحسن',      color: '#a78bfa' }
  if (pct >= 40)  return { emoji: '🥉', msg: 'جيد! لكن بإمكانك أفضل',      color: '#fb923c' }
  return              { emoji: '💪', msg: 'حاول مجدداً وستتحسن!',           color: '#f472b6' }
}

export default function ResultScreen({ score, total, maxScore, profile, theme:T, onRestart, onHome, onUpdateBestScore }) {
  // Same theme vars as CategorySelect
  const isDark     = T.id === 'dark'
  const cardBg     = isDark ? '#1e1e1e' : '#ffffff'
  const cardText   = isDark ? '#f0f0f0' : '#0f0f0f'
  const cardMono   = isDark ? '#666666' : '#888888'
  const cardBorder = isDark ? '#333333' : '#0f0f0f'
  const cardShadow = isDark ? '4px 4px 0 #000000' : '4px 4px 0 #0f0f0f'
  const iconBg     = isDark ? '#2a2a2a' : '#f5f5f5'

  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
  const perf = getPerformanceData(pct)
  const [displayed, setDisplayed] = useState(0)
  const [isNewBest, setIsNewBest] = useState(false)

  useEffect(() => {
    if (score > (profile?.bestScore || 0)) {
      setIsNewBest(true)
      onUpdateBestScore(score)
    }
    let start = 0
    const step = Math.ceil(score / 40)
    const interval = setInterval(() => {
      start = Math.min(start + step, score)
      setDisplayed(start)
      if (start >= score) clearInterval(interval)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ minHeight: '100dvh', background: T.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px', gap: '16px' }}>

      {/* Trophy */}
      <div className="animate-fadeInUp" style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 'clamp(4rem, 15vw, 6rem)',
          lineHeight: 1,
          marginBottom: '8px',
        }}>
          {perf.emoji}
        </div>
        <h2 style={{
          fontFamily: 'Tajawal,sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(1.5rem, 6vw, 2rem)',
          color: cardText,
          marginBottom: '4px',
        }}>
          {perf.msg}
        </h2>
        {isNewBest && (
          <div style={{
            display: 'inline-block',
            background: `linear-gradient(135deg, ${T.primary}, ${T.secondary})`,
            color: '#fff',
            padding: '6px 18px',
            borderRadius: '2px',
            fontFamily: 'Tajawal,sans-serif',
            fontWeight: 800,
            fontSize: '0.85rem',
            boxShadow: `2px 2px 0 ${T.primary}88`,
          }}>
            🌟 رقم قياسي جديد!
          </div>
        )}
      </div>

      {/* Main Score Card */}
      <div className="animate-fadeInUp delay-1" style={{
        width: '100%',
        maxWidth: '380px',
        padding: '24px 20px',
        background: cardBg,
        border: `2px solid ${cardBorder}`,
        borderRadius: '2px',
        boxShadow: cardShadow,
        textAlign: 'center',
      }}>
        <div style={{ color: cardMono, fontFamily: 'IBM Plex Mono,monospace', fontSize: '0.72rem', letterSpacing: '0.06em', marginBottom: '10px' }}>
          نتيجتك النهائية
        </div>
        <div style={{
          fontFamily: 'Tajawal,sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(3rem, 12vw, 4rem)',
          color: T.primary,
          lineHeight: 1,
        }}>
          {displayed}
        </div>
        <div style={{ color: cardMono, fontSize: '0.85rem', marginTop: '4px' }}>
          من أصل {maxScore} نقطة
        </div>

        {/* Progress bar */}
        <div style={{ margin: '18px 0 12px' }}>
          <div style={{
            height: '10px',
            borderRadius: '2px',
            background: cardBg,
            border: `1px solid ${cardBorder}`,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${T.primary}, ${T.secondary})`,
              borderRadius: '2px',
              transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          </div>
          <div style={{ color: perf.color, fontFamily: 'Tajawal,sans-serif', fontWeight: 800, fontSize: '1rem', marginTop: '8px' }}>
            {pct}%
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="animate-fadeInUp delay-2" style={{
        width: '100%',
        maxWidth: '380px',
        padding: '20px',
        background: cardBg,
        border: `2px solid ${cardBorder}`,
        borderRadius: '2px',
        boxShadow: cardShadow,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
      }}>
        {[
          { label: 'أفضل نتيجة', val: Math.max(score, profile?.bestScore || 0) + ' نقطة', emoji: '🏆' },
          { label: 'الأسئلة',   val: `${total}`,  emoji: '📝' },
          { label: 'الدقة',     val: `${pct}%`,   emoji: '🎯' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem' }}>{stat.emoji}</div>
            <div style={{ color: cardText, fontFamily: 'Tajawal,sans-serif', fontWeight: 800, fontSize: '1rem', marginTop: '4px' }}>
              {stat.val}
            </div>
            <div style={{ color: cardMono, fontFamily: 'IBM Plex Mono,monospace', fontSize: '0.68rem', letterSpacing: '0.04em' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="animate-fadeInUp delay-3" style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={onRestart}
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '2px',
            background: `linear-gradient(135deg, ${T.primary}, ${T.secondary})`,
            color: '#fff',
            fontFamily: 'Tajawal,sans-serif',
            fontWeight: 900,
            fontSize: '1.1rem',
            border: `2px solid ${T.primary}`,
            boxShadow: cardShadow,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e=>{ e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow=`6px 6px 0 ${T.primary}` }}
            onMouseLeave={e=>{ e.currentTarget.style.transform='translate(0,0)'; e.currentTarget.style.boxShadow=cardShadow }}
        >
          🔄 العب مجدداً
        </button>
        <button
          onClick={onHome}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '2px',
            background: cardBg,
            border: `2px solid ${cardBorder}`,
            color: cardText,
            fontFamily: 'Tajawal,sans-serif',
            fontWeight: 800,
            fontSize: '1rem',
                        boxShadow: cardShadow,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e=>{ e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow=`4px 4px 0 ${T.primary}` }}
          onMouseLeave={e=>{ e.currentTarget.style.transform='translate(0,0)'; e.currentTarget.style.boxShadow=cardShadow }}
        >
          🏠 الصفحة الرئيسية
        </button>
      </div>
    </div>
  )
}
