export default function DifficultySelect({ theme: T, onSelect, onBack }) {
  const isDark     = T.id === 'dark'
  const cardBg     = isDark ? '#1e1e1e' : '#ffffff'
  const cardText   = isDark ? '#f0f0f0' : '#0f0f0f'
  const cardMono   = isDark ? '#666666' : '#888888'
  const cardBorder = isDark ? '#333333' : '#0f0f0f'
  const cardShadow = isDark ? '4px 4px 0 #000000' : '4px 4px 0 #0f0f0f'
  const iconBg     = isDark ? '#2a2a2a' : '#f5f5f5'

  const levels = [
    { id: 'easy',   name: 'سهل',   emoji: '🌱'},
    { id: 'medium', name: 'متوسط', emoji: '⚡'},
    { id: 'hard',   name: 'صعب',   emoji: '🔥' },
  ]

  return (
    <div style={{ minHeight: '100dvh', background: T.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px', gap: '16px' }}>

      {/* Header */}
      <div className="animate-fadeInUp" style={{ textAlign: 'center', width: '100%', maxWidth: '460px' }}>
        <div style={{ fontFamily: 'IBM Plex Mono,monospace', fontSize: '0.72rem', color: T.textMuted, letterSpacing: '0.1em', marginBottom: '8px' }}>
          SELECT DIFFICULTY
        </div>
        <h2 style={{ fontFamily: 'Tajawal,sans-serif', fontWeight: 900, fontSize: '2rem', color: T.text, marginBottom: '4px' }}>
          مستوى الصعوبة
        </h2>
        <p style={{ color: T.textMuted, fontSize: '0.85rem', fontFamily: 'Tajawal,sans-serif' }}>
          كلما زادت الصعوبة، زادت النقاط
        </p>
      </div>

      {/* Cards */}
      <div style={{ width: '100%', maxWidth: '460px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
        {levels.map((lvl, i) => (
          <button
            key={lvl.id}
            className={`animate-scaleIn delay-${i + 1}`}
            onClick={() => onSelect(lvl.id)}
            style={{
              padding: '18px 10px',
              background: cardBg,
              border: `2px solid ${cardBorder}`,
              borderRadius: '2px',
              boxShadow: cardShadow,
              cursor: 'pointer', textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
              transition: 'all 0.12s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translate(-2px,-2px)'
              e.currentTarget.style.boxShadow = `5px 5px 0 ${lvl.color}`
              e.currentTarget.style.borderColor = lvl.color
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translate(0,0)'
              e.currentTarget.style.boxShadow = cardShadow
              e.currentTarget.style.borderColor = cardBorder
            }}
          >
            <div style={{
              width: '52px', height: '52px', borderRadius: '2px',
              background: iconBg,
              border: `2px solid ${lvl.color}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.6rem',
            }}>
              {lvl.emoji}
            </div>

            <div style={{ color: cardText, fontFamily: 'Tajawal,sans-serif', fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.2 }}>
              {lvl.name}
            </div>

            <div style={{ fontFamily: 'IBM Plex Mono,monospace', fontSize: '0.62rem', color: cardMono, letterSpacing: '0.06em' }}>
              ×{lvl.mult} PTS
            </div>
          </button>
        ))}
      </div>

      {/* Desc strip — full width */}
      <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {levels.map((lvl, i) => (
          <div
            key={lvl.id}
            className={`animate-fadeInUp delay-${i + 1}`}
            style={{
              padding: '12px 16px',
              background: cardBg,
              border: `2px solid ${cardBorder}`,
              borderRadius: '2px',
              boxShadow: `2px 2px 0 ${cardBorder}`,
              display: 'flex', alignItems: 'center', gap: '12px',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{lvl.emoji}</span>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <span style={{ color: cardText, fontFamily: 'Tajawal,sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>
                {lvl.name}
              </span>
              <span style={{ color: cardMono, fontFamily: 'Tajawal,sans-serif', fontSize: '0.82rem', marginRight: '8px' }}>
                — {lvl.desc}
              </span>
            </div>
            <span style={{ color: lvl.color, fontFamily: 'IBM Plex Mono,monospace', fontWeight: 800, fontSize: '0.85rem' }}>
              ×{lvl.mult}
            </span>
          </div>
        ))}
      </div>

      {/* Back */}
      <button
        onClick={onBack}
        style={{
          padding: '10px 24px', borderRadius: '2px', cursor: 'pointer',
          fontFamily: 'Tajawal,sans-serif', fontWeight: 700, fontSize: '0.88rem',
          background: 'transparent', border: `2px solid ${cardBorder}`,
          color: T.textMuted, boxShadow: `2px 2px 0 ${cardBorder}`,
          transition: 'background 0.1s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = isDark ? '#1e1e1e' : '#ede8dc'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        ← رجوع
      </button>
    </div>
  )
}
