import { useState } from 'react'
import GlassCard from './GlassCard'
import ThemeSwitcher from './ThemeSwitcher'
import SoundToggle from './SoundToggle'

export default function HomeScreen({
  profile, theme, themeId, onThemeChange,
  soundEnabled, onSoundToggle,
  onStart, onEditProfile, onStats,onLeaderboard
}) {
  const [pressed, setPressed] = useState(false)

  return (
    <div style={{
      minHeight: '100dvh',
      background: theme.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
      gap: '20px',
      position: 'relative',
    }}>

      {/* Top bar */}
      <div style={{
        position: 'absolute',
        top: '20px', left: '20px', right: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <SoundToggle enabled={soundEnabled} onToggle={onSoundToggle} theme={theme} />
        <GlassCard variant="pill" style={{
          padding: '5px 14px',
          color: theme.textSubtle,
          fontSize: '0.72rem',
          fontFamily: 'Cairo, sans-serif',
          letterSpacing: '0.5px',
        }}>
          مسابقة المعرفة
        </GlassCard>
      </div>

      {/* Hero */}
      <div className="animate-fadeInUp" style={{ textAlign: 'center', marginTop: '40px' }}>
        <div style={{
          fontSize: 'clamp(4rem, 15vw, 7rem)',
          lineHeight: 1,
          marginBottom: '12px',
          filter: `drop-shadow(${theme.glow})`,
          animation: 'pulse 3s ease infinite',
        }}>
          🏆
        </div>
        <h1 style={{
          fontFamily: 'Cairo, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(2rem, 7vw, 3.2rem)',
          color: theme.text,
          marginBottom: '8px',
          lineHeight: 1.2,
          textShadow: `0 2px 20px ${theme.primary}55`,
        }}>
          مسابقة المعرفة
        </h1>
        <p style={{
          color: theme.textMuted,
          fontSize: 'clamp(0.95rem, 3.5vw, 1.1rem)',
          fontFamily: 'Noto Naskh Arabic, serif',
          maxWidth: '320px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          اختبر معلوماتك في مختلف المجالات وتحدَّ نفسك
        </p>
      </div>

      {/* Profile card */}
      {profile && (
        <GlassCard
          variant="card"
          shimmer
          className="animate-fadeInUp delay-1"
          onClick={onEditProfile}
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            width: '100%',
            maxWidth: '360px',
            '--glass-tint': `${theme.primary}12`,
            '--glass-tint-border': `${theme.primary}28`,
          }}
        >
          <span style={{ fontSize: '2.2rem' }}>{profile.avatar || '🎯'}</span>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{
              color: theme.text,
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700, fontSize: '1rem',
            }}>
              {profile.name}
            </div>
            <div style={{ color: theme.textMuted, fontSize: '0.8rem' }}>
              أفضل نتيجة: {profile.bestScore || 0} نقطة · ✏️ تعديل
            </div>
          </div>
        </GlassCard>
      )}

      {/* Start button */}
      <GlassCard
        as="button"
        variant="btn"
        shimmer
        liquid
        className="animate-fadeInUp delay-2"
        onClick={() => { console.log('BUTTON CLICKED'); setPressed(true); onStart() }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '18px',
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${theme.primary}cc, ${theme.secondary}aa)`,
          color: '#fff',
          fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
          fontFamily: 'Cairo, sans-serif',
          fontWeight: 800,
          border: '1px solid rgba(255,255,255,0.28)',
          boxShadow: `0 8px 30px ${theme.primary}55, inset 0 1px 0 rgba(255,255,255,0.3)`,
          cursor: 'pointer',
          transform: pressed ? 'scale(0.97)' : 'scale(1)',
          transition: 'all 0.15s ease',
          letterSpacing: '0.5px',
        }}
      >
        🚀 ابدأ المسابقة
      </GlassCard>

      {/* Stats button */}
      <GlassCard
        as="button"
        variant="card"
        className="animate-fadeInUp delay-3"
        onClick={onStats}
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '15px',
          borderRadius: '16px',
          color: theme.textMuted,
          fontSize: '1rem',
          fontFamily: 'Cairo, sans-serif',
          fontWeight: 700,
          cursor: 'pointer',
          textAlign: 'center',
          border: `1px solid rgba(255,255,255,0.1)`,
        }}
      >
        📊 إحصائياتي
      </GlassCard>
      
      {/* Leaderboard button */}
          <GlassCard
          as="button"
         variant="card"
         className="animate-fadeInUp delay-4"
         onClick={onLeaderboard}
         style={{
          width: '100%', maxWidth: '360px',
          padding: '15px', borderRadius: '16px',
          color: '#ffd60a', fontSize: '1rem',
        fontFamily: 'Cairo, sans-serif', fontWeight: 700,
          cursor: 'pointer', textAlign: 'center',
        '--glass-tint': 'rgba(255,214,10,0.08)',
      '--glass-tint-border': 'rgba(255,214,10,0.2)',
  }}
>
  🏆 المتصدرون
</GlassCard>


      {/* Theme switcher */}
      <GlassCard
        variant="card"
        className="animate-fadeInUp delay-4"
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '16px 18px',
        }}
      >
        <div style={{
          color: theme.textMuted, fontSize: '0.78rem',
          textAlign: 'center', marginBottom: '12px',
          fontFamily: 'Cairo, sans-serif',
        }}>
          اختر المظهر
        </div>
        <ThemeSwitcher currentTheme={themeId} onThemeChange={onThemeChange} />
      </GlassCard>

      {/* Footer */}
      <div className="animate-fadeInUp delay-5" style={{
        color: theme.textSubtle,
        fontSize: '0.72rem',
        textAlign: 'center',
        fontFamily: 'Cairo, sans-serif',
      }}>
        ٨ فئات · ٣ مستويات · ألعاب وألغاز
      </div>

    </div>
  )
}
