const levels = [
  { id: 'easy',   name: 'سهل',   emoji: '🌱', desc: 'للمبتدئين',           color: '#52c41a', mult: 1 },
  { id: 'medium', name: 'متوسط', emoji: '⚡', desc: 'تحدٍّ معتدل',         color: '#f0a500', mult: 2 },
  { id: 'hard',   name: 'صعب',   emoji: '🔥', desc: 'للمحترفين فقط',       color: '#ff4d4f', mult: 3 },
]

export default function DifficultySelect({ theme, onSelect, onBack }) {
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
      <div className="animate-fadeInUp" style={{ textAlign: 'center', marginBottom: '4px' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>⚔️</div>
        <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: theme.text }}>
          مستوى الصعوبة
        </h2>
        <p style={{ color: theme.textMuted, fontSize: '0.9rem', marginTop: '4px' }}>
          كلما زادت الصعوبة، زادت النقاط
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {levels.map((lvl, i) => (
          <button
            key={lvl.id}
            className={`animate-fadeInUp delay-${i + 1}`}
            onClick={() => onSelect(lvl.id)}
            style={{
              width: '100%',
              padding: '20px 22px',
              borderRadius: '18px',
              background: theme.card,
              border: `1px solid ${theme.cardBorder}`,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
              transition: 'all 0.22s ease',
              textAlign: 'right',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = lvl.color
              e.currentTarget.style.background = `${lvl.color}11`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = theme.cardBorder
              e.currentTarget.style.background = theme.card
            }}
          >
            <div style={{
              width: '52px', height: '52px',
              borderRadius: '14px',
              background: `${lvl.color}22`,
              border: `1.5px solid ${lvl.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.6rem', flexShrink: 0,
            }}>
              {lvl.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: theme.text, fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>
                {lvl.name}
              </div>
              <div style={{ color: theme.textMuted, fontSize: '0.82rem', marginTop: '2px' }}>
                {lvl.desc} · {lvl.mult}× نقاط
              </div>
            </div>
            <span style={{
              color: lvl.color,
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 800,
              fontSize: '0.95rem',
            }}>
              ×{lvl.mult}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="animate-fadeInUp delay-4"
        style={{
          padding: '12px 28px',
          borderRadius: '50px',
          border: `1.5px solid ${theme.cardBorder}`,
          background: 'transparent',
          color: theme.textMuted,
          fontFamily: 'Cairo, sans-serif',
          fontSize: '0.9rem',
          cursor: 'pointer',
        }}
      >
        ← رجوع
      </button>
    </div>
  )
}
