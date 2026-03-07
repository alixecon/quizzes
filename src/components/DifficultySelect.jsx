import GlassCard from './GlassCard'

const levels = [
  { id:'easy',   name:'سهل',   emoji:'🌱', desc:'للمبتدئين',     color:'#34c759', mult:1, unlock:'متاح دائماً' },
  { id:'medium', name:'متوسط', emoji:'⚡', desc:'تحدٍّ معتدل',   color:'#ff9f0a', mult:2, unlock:'أكمل سهل مرة' },
  { id:'hard',   name:'صعب',   emoji:'🔥', desc:'للمحترفين فقط', color:'#ff453a', mult:3, unlock:'أكمل متوسط مرة' },
]

export default function DifficultySelect({ theme, onSelect, onBack, unlocked = ['easy'] }) {
  return (
    <div style={{
      minHeight:'100dvh', background:'transparent',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'24px 20px', gap:'14px',
    }}>
      <div className="animate-fadeInUp" style={{ textAlign:'center', marginBottom:'4px' }}>
        <div style={{ fontSize:'2.2rem', marginBottom:'6px' }}>⚔️</div>
        <h2 style={{ fontFamily:'Cairo, sans-serif', fontWeight:800, fontSize:'1.7rem', color:theme.text }}>مستوى الصعوبة</h2>
        <p style={{ color:theme.textMuted, fontSize:'0.85rem', marginTop:'3px' }}>كلما زادت الصعوبة، زادت النقاط</p>
      </div>

      <div style={{ width:'100%', maxWidth:'380px', display:'flex', flexDirection:'column', gap:'10px' }}>
        {levels.map((lvl, i) => {
          const isLocked = !unlocked.includes(lvl.id)
          return (
            <GlassCard
              key={lvl.id}
              as="button"
              variant="card"
              shimmer={!isLocked}
              className={`animate-fadeInUp delay-${i+1}`}
              onClick={() => !isLocked && onSelect(lvl.id)}
              style={{
                width:'100%', padding:'18px 20px', borderRadius:'18px',
                display:'flex', alignItems:'center', gap:'14px',
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.45 : 1,
                '--glass-tint': `${lvl.color}0e`,
                '--glass-tint-border': isLocked ? theme.cardBorder : `${lvl.color}28`,
              }}
            >
              <div style={{
                width:'50px', height:'50px', borderRadius:'13px',
                background: `${lvl.color}1a`, border:`1.5px solid ${lvl.color}${isLocked?'22':'44'}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.5rem', flexShrink:0,
              }}>
                {isLocked ? '🔒' : lvl.emoji}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ color:theme.text, fontFamily:'Cairo, sans-serif', fontWeight:700, fontSize:'1rem' }}>
                  {lvl.name}
                </div>
                <div style={{ color:isLocked ? theme.textSubtle : theme.textMuted, fontSize:'0.8rem', marginTop:'2px' }}>
                  {isLocked ? `🔒 ${lvl.unlock}` : `${lvl.desc} · ${lvl.mult}× نقاط`}
                </div>
              </div>
              {!isLocked && (
                <GlassCard variant="pill" style={{
                  padding:'3px 11px', color:lvl.color,
                  fontFamily:'Cairo, sans-serif', fontWeight:800, fontSize:'0.9rem',
                  '--glass-tint': `${lvl.color}18`,
                  '--glass-tint-border': `${lvl.color}40`,
                }}>
                  ×{lvl.mult}
                </GlassCard>
              )}
            </GlassCard>
          )
        })}
      </div>

      {/* Progression hint */}
      {unlocked.length < 3 && (
        <GlassCard variant="pill" className="animate-fadeInUp delay-4" style={{
          padding:'8px 18px', textAlign:'center',
          color: theme.textMuted, fontSize:'0.78rem', fontFamily:'Cairo, sans-serif',
          '--glass-tint': `${theme.primary}0a`,
        }}>
          💡 أكمل مستوى لفتح التالي
        </GlassCard>
      )}

      <GlassCard as="button" variant="pill" onClick={onBack} style={{
        padding:'11px 28px', cursor:'pointer',
        color:theme.textMuted, fontFamily:'Cairo, sans-serif', fontSize:'0.88rem',
      }}>
        ← رجوع
      </GlassCard>
    </div>
  )
}
