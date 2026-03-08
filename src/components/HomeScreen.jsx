import { useState } from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import SoundToggle from './SoundToggle'

export default function HomeScreen({ profile, theme, themeId, onThemeChange, soundEnabled, onSoundToggle, onStart, onEditProfile }) {
  const [pressed, setPressed] = useState(false)

  const handleStart = () => {
    setPressed(true)
    onStart()
  }

  const cardStyle = {
    background: theme.card,
    border: `1px solid ${theme.cardBorder}`,
    borderRadius: '20px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
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
      gap: '20px',
      position: 'relative',
    }}>
      {/* Top bar */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <SoundToggle enabled={soundEnabled} onToggle={onSoundToggle} theme={theme} />
        <div style={{
          fontSize: '0.75rem',
          color: theme.textSubtle,
          fontFamily: 'Cairo, sans-serif',
          letterSpacing: '0.5px',
        }}>
          مسابقة المعرفة
        </div>
      </div>

      {/* Hero */}
      <div
        className="animate-fadeInUp"
        style={{ textAlign: 'center', marginTop: '40px' }}
      >
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
        <div
          className="animate-fadeInUp delay-1"
          onClick={onEditProfile}
          style={{
            ...cardStyle,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            width: '100%',
            maxWidth: '360px',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = theme.primary}
          onMouseLeave={e => e.currentTarget.style.borderColor = theme.cardBorder}
        >
          <span style={{ fontSize: '2.2rem' }}>{profile.avatar}</span>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ color: theme.text, fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
              {profile.name}
            </div>
            <div style={{ color: theme.textMuted, fontSize: '0.8rem' }}>
              أفضل نتيجة: {profile.bestScore || 0} نقطة ✏️ تعديل
            </div>
          </div>
        </div>
      )}

      {/* Start button */}
      <button
        className="animate-fadeInUp delay-2"
        onClick={handleStart}
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '18px',
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          color: '#fff',
          fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
          fontFamily: 'Cairo, sans-serif',
          fontWeight: 800,
          border: 'none',
          boxShadow: `0 8px 30px ${theme.primary}55`,
          cursor: 'pointer',
          transform: pressed ? 'scale(0.97)' : 'scale(1)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          letterSpacing: '0.5px',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 40px ${theme.primary}77` }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 8px 30px ${theme.primary}55`; setPressed(false) }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => { setPressed(false); handleStart() }}
      >
        🚀 ابدأ المسابقة
      </button>

      {/* Theme switcher */}
      <div className="animate-fadeInUp delay-3" style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{ color: theme.textMuted, fontSize: '0.78rem', textAlign: 'center', marginBottom: '10px', fontFamily: 'Cairo, sans-serif' }}>
          اختر المظهر
        </div>
        <ThemeSwitcher currentTheme={themeId} onThemeChange={onThemeChange} />
      </div>

      {/* Footer */}
      <div className="animate-fadeInUp delay-4" style={{
        color: theme.textSubtle,
        fontSize: '0.72rem',
        textAlign: 'center',
        fontFamily: 'Cairo, sans-serif',
        marginTop: '8px',
      }}>
        ٨ فئات · ٣ مستويات · نقاط فورية
      </div>
    </div>
  )
}
