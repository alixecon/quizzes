import { useEffect, useState } from 'react'
import GlassCard from './GlassCard'

function getPerformanceData(pct) {
  if (pct === 100) return { emoji: '🏆', msg: 'مثالي! أنت عبقري حقيقي!',  color: '#ffd60a' }
  if (pct >= 80)  return { emoji: '🥇', msg: 'ممتاز! أداء رائع جداً!',     color: '#60a5fa' }
  if (pct >= 60)  return { emoji: '🥈', msg: 'جيد جداً! واصل التحسن',      color: '#a78bfa' }
  if (pct >= 40)  return { emoji: '🥉', msg: 'جيد! لكن بإمكانك أفضل',      color: '#fb923c' }
  return              { emoji: '💪', msg: 'حاول مجدداً وستتحسن!',           color: '#f472b6' }
}

export default function ResultScreen({
  score, total, correct, maxScore,
  streak, profile, theme,
  onRestart, onHome, onUpdateBestScore,
}) {
  const pct      = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
  const perf     = getPerformanceData(pct)
  const wrong    = total - (correct ?? 0)
  const [displayed, setDisplayed] = useState(0)
  const [isNewBest, setIsNewBest] = useState(false)

  useEffect(() => {
    if (score > (profile?.bestScore || 0)) {
      setIsNewBest(true)
      onUpdateBestScore?.(score)
    }
    let start = 0
    const step = Math.ceil(score / 40)
    const iv = setInterval(() => {
      start = Math.min(start + step, score)
      setDisplayed(start)
      if (start >= score) clearInterval(iv)
    }, 30)
    return () => clearInterval(iv)
  }, [])

  const handleShare = () => {
    const text = `🧠 حققت ${score} نقطة في تحدي المعرفة!\n🎯 الدقة: ${pct}%\n🔥 أطول سلسلة: ${streak ?? 0}\nهل تتحداني؟`
    if (navigator.share) {
      navigator.share({ title: 'نتيجتي في تحدي المعرفة', text })
    } else {
      navigator.clipboard.writeText(text)
    }
  }

  return (
    <div style={{
      minHeight: '100dvh', background: theme.bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px', gap: '16px',
    }}>

      {/* Trophy */}
      <div className="animate-scaleIn" style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 'clamp(4rem,15vw,6rem)', lineHeight: 1, marginBottom: '8px',
          filter: `drop-shadow(${theme.glow})`,
        }}>
          {perf.emoji}
        </div>
        <h2 style={{
          fontFamily: 'Cairo, sans-serif', fontWeight: 900,
          fontSize: 'clamp(1.5rem,6vw,2rem)', color: theme.text, marginBottom: '4px',
        }}>
          {perf.msg}
        </h2>
        {isNewBest && (
          <GlassCard variant="pill" style={{
            display: 'inline-block', padding: '5px 18px', marginTop: '8px',
            background: `linear-gradient(135deg, ${theme.primary}cc, ${theme.secondary}aa)`,
            color: '#fff', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.85rem',
            border: '1px solid rgba(255,255,255,0.25)',
          }}>
            🌟 رقم قياسي جديد!
          </GlassCard>
        )}
      </div>

      {/* Score card */}
      <GlassCard
        variant="card"
        className="animate-fadeInUp delay-1"
        style={{
          width: '100%', maxWidth: '360px', textAlign: 'center', padding: '24px 20px',
          '--glass-tint': `${theme.primary}0a`,
          '--glass-tint-border': `${theme.primary}22`,
        }}
      >
        <div style={{ color: theme.textMuted, fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', marginBottom: '8px' }}>
          نتيجتك النهائية
        </div>
        <div style={{
          fontFamily: 'Cairo, sans-serif', fontWeight: 900,
          fontSize: 'clamp(3rem,12vw,4rem)', color: theme.primary, lineHeight: 1,
          textShadow: `0 0 30px ${theme.primary}66`,
        }}>
          {displayed}
        </div>
        <div style={{ color: theme.textMuted, fontSize: '0.85rem', marginTop: '4px' }}>
          من أصل {maxScore} نقطة
        </div>
        <div style={{ margin: '16px 0 8px' }}>
          <div style={{ height: '10px', borderRadius: '5px', background: theme.progressBg, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${pct}%`,
              background: theme.progressFill,
              borderRadius: '5px', transition: 'width 1.5s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>
          <div style={{
            color: perf.color, fontFamily: 'Cairo, sans-serif',
            fontWeight: 700, fontSize: '1rem', marginTop: '6px',
          }}>
            {pct}%
          </div>
        </div>
      </GlassCard>

      {/* Stats row */}
      <GlassCard
        variant="card"
        className="animate-fadeInUp delay-2"
        style={{
          width: '100%', maxWidth: '360px',
          display: 'flex', justifyContent: 'space-around', padding: '20px',
        }}
      >
        {[
          { label: 'أفضل نتيجة', val: `${Math.max(score, profile?.bestScore || 0)}`, emoji: '🏆' },
          { label: 'صحيحة',      val: `${correct ?? '-'}`,                            emoji: '✅' },
          { label: 'خاطئة',      val: `${correct != null ? wrong : '-'}`,             emoji: '❌' },
          { label: 'سلسلة',      val: `${streak ?? 0}🔥`,                             emoji: '⚡' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem' }}>{stat.emoji}</div>
            <div style={{
              color: theme.text, fontFamily: 'Cairo, sans-serif',
              fontWeight: 800, fontSize: '0.95rem', marginTop: '4px',
            }}>
              {stat.val}
            </div>
            <div style={{ color: theme.textMuted, fontSize: '0.7rem' }}>{stat.label}</div>
          </div>
        ))}
      </GlassCard>

      {/* Actions */}
      <div
        className="animate-fadeInUp delay-3"
        style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <GlassCard
          as="button" variant="btn" shimmer liquid
          onClick={onRestart}
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
          🔄 العب مجدداً
        </GlassCard>

        {/* Share + Home side by side */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <GlassCard
            as="button" variant="card"
            onClick={handleShare}
            style={{
              flex: 1, padding: '15px', borderRadius: '14px',
              color: theme.primary, fontSize: '1rem',
              fontFamily: 'Cairo, sans-serif', fontWeight: 700, cursor: 'pointer',
              '--glass-tint': `${theme.primary}10`,
              '--glass-tint-border': `${theme.primary}30`,
            }}
          >
            📤 مشاركة
          </GlassCard>
          <GlassCard
            as="button" variant="card"
            onClick={onHome}
            style={{
              flex: 1, padding: '15px', borderRadius: '14px',
              color: theme.text, fontSize: '1rem',
              fontFamily: 'Cairo, sans-serif', fontWeight: 700, cursor: 'pointer',
            }}
          >
            🏠 الرئيسية
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
