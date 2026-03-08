import ThemeSwitcher from './ThemeSwitcher'
import SoundToggle from './SoundToggle'

export default function HomeScreen({ profile, theme, themeId, onThemeChange, soundEnabled, onSoundToggle, onStart, onEditProfile }) {
  const T = theme
  return (
    <div style={{ minHeight:'100dvh', background:T.bg, display:'flex', flexDirection:'column', padding:'0' }}>

      {/* Top bar */}
      <nav style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        padding:'16px 24px',
        borderBottom:`2px solid ${T.border}`,
        background: T.bg,
      }}>
        <div style={{ fontFamily:'IBM Plex Mono, monospace', fontWeight:700, fontSize:'0.8rem', color:T.textMuted, letterSpacing:'0.08em' }}>
          QUIZ — v2.0
        </div>
        <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
          <SoundToggle enabled={soundEnabled} onToggle={onSoundToggle} theme={T} />
          <ThemeSwitcher currentTheme={themeId} onThemeChange={onThemeChange} />
        </div>
      </nav>

      {/* Hero */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', gap:'0' }}>

        {/* Eyebrow tag */}
        <div className="animate-fadeInUp" style={{
          fontFamily:'IBM Plex Mono, monospace', fontSize:'0.72rem', fontWeight:500,
          color:T.textMuted, letterSpacing:'0.12em', textTransform:'uppercase',
          border:`1.5px solid ${T.border}`, borderRadius:'2px', padding:'4px 12px',
          marginBottom:'24px',
        }}>
          مسابقة تفاعلية // ARABIC QUIZ
        </div>

        {/* Big headline */}
        <h1 className="animate-fadeInUp delay-1" style={{
          fontFamily:'Tajawal, sans-serif', fontWeight:900,
          fontSize:'clamp(3rem,12vw,7rem)',
          color:T.text, lineHeight:0.95,
          textAlign:'center', marginBottom:'8px',
          letterSpacing:'-0.02em',
        }}>
          مسابقة
        </h1>
        <h1 className="animate-fadeInUp delay-1" style={{
          fontFamily:'Tajawal, sans-serif', fontWeight:900,
          fontSize:'clamp(3rem,12vw,7rem)',
          color:T.primary, lineHeight:0.95,
          textAlign:'center', marginBottom:'32px',
          letterSpacing:'-0.02em',
          WebkitTextStroke: T.id === 'light' ? '2px #0a0a0a' : 'none',
        }}>
          المعرفة
        </h1>

        {/* Profile card */}
        {profile && (
          <div className="animate-fadeInUp delay-2"
            onClick={onEditProfile}
            style={{
              display:'flex', alignItems:'center', gap:'14px',
              padding:'14px 18px', marginBottom:'24px',
              background:T.bgCard, border:`2px solid ${T.border}`,
              borderRadius:'4px', boxShadow:T.shadowCard,
              cursor:'pointer', width:'100%', maxWidth:'360px',
            }}
          >
            <span style={{ fontSize:'2rem' }}>{profile.avatar || '🎯'}</span>
            <div>
              <div style={{ color:T.text, fontFamily:'Tajawal, sans-serif', fontWeight:700, fontSize:'1rem' }}>{profile.name}</div>
              <div style={{ color:T.textMuted, fontSize:'0.78rem', fontFamily:'IBM Plex Mono, monospace' }}>
                BEST: {profile.bestScore || 0}pts · EDIT ↗
              </div>
            </div>
          </div>
        )}

        {/* Start button */}
        <button
          className="animate-fadeInUp delay-3 g-btn"
          onClick={onStart}
          style={{
            width:'100%', maxWidth:'360px', padding:'18px',
            fontSize:'1.2rem', letterSpacing:'0.04em',
            background:T.primary, color:T.primaryText,
            border:`2px solid ${T.borderStrong}`,
            boxShadow:T.shadowCard,
          }}
        >
          ابدأ الآن ↗
        </button>

        {/* Ticker */}
        <div className="animate-fadeInUp delay-4" style={{
          marginTop:'40px', width:'100vw', overflow:'hidden',
          borderTop:`1.5px solid ${T.border}`, borderBottom:`1.5px solid ${T.border}`,
          padding:'10px 0',
        }}>
          <div style={{
            display:'flex', gap:'0', whiteSpace:'nowrap',
            animation:'ticker 18s linear infinite',
          }}>
            {[...Array(2)].map((_,rep) => (
              <span key={rep} style={{
                fontFamily:'IBM Plex Mono, monospace', fontSize:'0.75rem',
                color:T.textMuted, letterSpacing:'0.08em',
              }}>
                {['علوم','تاريخ','جغرافيا','رياضة','فنون','تكنولوجيا','دين','معلومات عامة','كَلِمَة','سودوكو'].map(c =>
                  `  ◆ ${c}  `
                ).join('')}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding:'14px 24px', borderTop:`1.5px solid ${T.border}`,
        display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <span style={{ fontFamily:'IBM Plex Mono, monospace', fontSize:'0.68rem', color:T.textSubtle }}>© 2026</span>
        <span style={{ fontFamily:'IBM Plex Mono, monospace', fontSize:'0.68rem', color:T.textSubtle }}>٨ فئات · ألعاب · ألغاز</span>
      </div>
    </div>
  )
}
