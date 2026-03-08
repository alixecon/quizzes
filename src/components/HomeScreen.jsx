import ThemeSwitcher from './ThemeSwitcher'
import SoundToggle from './SoundToggle'

export default function HomeScreen({ profile, theme:T, themeId, onThemeChange, soundEnabled, onSoundToggle, onStart, onEditProfile }) {
  return (
    <div style={{ minHeight:'100dvh', background:T.bg, display:'flex', flexDirection:'column' }}>

      {/* Nav */}
      <nav style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        padding:'14px 24px', borderBottom:`2px solid ${T.border}`,
      }}>
        <span style={{ fontFamily:'IBM Plex Mono,monospace', fontSize:'0.75rem', fontWeight:700, color:T.textMuted, letterSpacing:'0.1em' }}>
          QUIZ // 2026
        </span>
        <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
          <SoundToggle enabled={soundEnabled} onToggle={onSoundToggle} theme={T} />
          <ThemeSwitcher currentTheme={themeId} onThemeChange={onThemeChange} />
        </div>
      </nav>

      {/* Hero block */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 24px', gap:'24px' }}>

        {/* Tag */}
        <div className="animate-fadeInUp" style={{
          fontFamily:'IBM Plex Mono,monospace', fontSize:'0.7rem', letterSpacing:'0.12em',
          color:T.textMuted, border:`1.5px solid ${T.border}`, padding:'4px 14px', borderRadius:'2px',
        }}>
          مسابقة تفاعلية ◆ INTERACTIVE QUIZ
        </div>

        {/* Headline — GRIPH big chunky block */}
        <div className="animate-fadeInUp delay-1" style={{ textAlign:'center', lineHeight:0.9 }}>
          <div style={{
            fontFamily:'Tajawal,sans-serif', fontWeight:900,
            fontSize:'clamp(4rem,15vw,9rem)',
            color:T.text, letterSpacing:'-0.03em', display:'block',
          }}>
            مسابقة
          </div>
          {/* Outlined accent word — GRIPH signature */}
          <div style={{
            fontFamily:'Tajawal,sans-serif', fontWeight:900,
            fontSize:'clamp(4rem,15vw,9rem)',
            color: T.id==='dark' ? 'transparent' : 'transparent',
            WebkitTextStroke: `4px ${T.primary}`,
            letterSpacing:'-0.03em', display:'block',
            textShadow: `6px 6px 0px ${T.primary}44`,
          }}>
            المعرفة
          </div>
        </div>

        {/* Profile row */}
        {profile && (
          <div className="animate-fadeInUp delay-2"
            onClick={onEditProfile}
            style={{
              display:'flex', alignItems:'center', gap:'14px',
              padding:'12px 18px', cursor:'pointer',
              background:T.bgCard, border:`2px solid ${T.border}`,
              borderRadius:'2px', boxShadow:T.shadowCard,
              width:'100%', maxWidth:'380px',
              transition:'transform 0.1s, box-shadow 0.1s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translate(-2px,-2px)';e.currentTarget.style.boxShadow=`7px 7px 0 ${T.primary}55`}}
            onMouseLeave={e=>{e.currentTarget.style.transform='translate(0,0)';e.currentTarget.style.boxShadow=T.shadowCard}}
          >
            <span style={{ fontSize:'2.2rem' }}>{profile.avatar||'🎯'}</span>
            <div style={{ flex:1 }}>
              <div style={{ color:T.text, fontFamily:'Tajawal,sans-serif', fontWeight:800, fontSize:'1rem' }}>{profile.name}</div>
              <div style={{ color:T.textMuted, fontFamily:'IBM Plex Mono,monospace', fontSize:'0.72rem', marginTop:'2px' }}>
                BEST: {profile.bestScore||0}pts · CLICK TO EDIT
              </div>
            </div>
            <span style={{ color:T.primary, fontSize:'1.4rem', fontWeight:900 }}>↗</span>
          </div>
        )}

        {/* CTA */}
        <button
          className="animate-fadeInUp delay-3"
          onClick={onStart}
          style={{
            width:'100%', maxWidth:'380px', padding:'20px',
            fontFamily:'Tajawal,sans-serif', fontWeight:900,
            fontSize:'1.3rem', letterSpacing:'0.03em',
            background:T.primary, color:T.primaryText,
            border:`2px solid ${T.primary}`,
            borderRadius:'2px', boxShadow:T.shadowHero,
            cursor:'pointer', transition:'transform 0.1s, box-shadow 0.1s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translate(-2px,-2px)';e.currentTarget.style.boxShadow=`10px 10px 0 ${T.secondary}`}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translate(0,0)';e.currentTarget.style.boxShadow=T.shadowHero}}
        >
          ابدأ الآن ↗
        </button>

        {/* Scrolling ticker */}
        <div className="animate-fadeInUp delay-4" style={{
          width:'100vw', overflow:'hidden',
          borderTop:`2px solid ${T.border}`, borderBottom:`2px solid ${T.border}`,
          padding:'10px 0', background:T.bgAccent,
        }}>
          <div style={{ display:'flex', whiteSpace:'nowrap', animation:'ticker 20s linear infinite' }}>
            {[0,1].map(i=>(
              <span key={i} style={{ fontFamily:'Tajawal,sans-serif', fontWeight:800, fontSize:'0.85rem', color:'#ffffff', letterSpacing:'0.05em' }}>
                {['علوم','تاريخ','جغرافيا','رياضة','فنون','تكنولوجيا','دين','كَلِمَة','سودوكو'].map(c=>`  ◆ ${c}  `).join('')}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding:'12px 24px', borderTop:`2px solid ${T.border}`, display:'flex', justifyContent:'space-between' }}>
        <span style={{ fontFamily:'IBM Plex Mono,monospace', fontSize:'0.68rem', color:T.textSubtle }}>© 2026 مسابقة</span>
        <span style={{ fontFamily:'IBM Plex Mono,monospace', fontSize:'0.68rem', color:T.textSubtle }}>8 CATS · PUZZLES</span>
      </div>
    </div>
  )
}
