import { categories } from '../data/questions'

export default function CategorySelect({ theme, onSelect, onBack }) {
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
        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📚</div>
        <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: theme.text }}>
          اختر الفئة
        </h2>
        <p style={{ color: theme.textMuted, fontSize: '0.9rem', marginTop: '4px' }}>
          {categories.length} فئات متاحة
        </p>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
      }}>
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            className={`animate-scaleIn delay-${Math.min(i + 1, 5)}`}
            onClick={() => onSelect(cat.id)}
            style={{
              padding: '18px 14px',
              borderRadius: '16px',
              background: theme.card,
              border: `1px solid ${theme.cardBorder}`,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = cat.color
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = theme.cardBorder
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={{
              width: '48px', height: '48px',
              borderRadius: '12px',
              background: `${cat.color}22`,
              border: `1.5px solid ${cat.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              {cat.emoji}
            </div>
            <div style={{
              color: theme.text,
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 700,
              fontSize: '0.85rem',
              lineHeight: 1.3,
            }}>
              {cat.name}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="animate-fadeInUp"
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
