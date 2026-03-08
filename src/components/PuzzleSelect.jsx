import GlassCard from './GlassCard'

const puzzles = [
  { id: 'wordle', name: 'كَلِمَة', desc: 'خمن الكلمة في ٦ محاولات', emoji: '🟩', color: '#30d158' },
  { id: 'sudoku', name: 'سودوكو', desc: 'احشو الشبكة بالأرقام ١-٩', emoji: '🔢', color: '#bf5af2' },
]

export default function PuzzleSelect({ theme, onSelect, onBack }) {
  return (
    <div style={{
      minHeight: '100dvh', background: theme.bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px', gap: '16px',
    }}>
      <div className="animate-fadeInUp" style={{ textAlign: 'center', marginBottom: '4px' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🧩</div>
        <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: theme.text }}>
          الألعاب والألغاز
        </h2>
        <p style={{ color: theme.textMuted, fontSize: '0.9rem', marginTop: '4px' }}>ألعاب ذهنية عربية</p>
      </div>

      <div style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {puzzles.map((p, i) => (
          <GlassCard
            key={p.id}
            as="button"
            variant="card"
            shimmer
            liquid
            className={`animate-fadeInUp delay-${i + 1}`}
            onClick={() => onSelect(p.id)}
            style={{
              width: '100%', padding: '22px', borderRadius: '20px',
              display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer',
              '--glass-tint': `${p.color}12`, '--glass-tint-border': `${p.color}30`,
            }}
          >
            <div style={{
              width: '60px', height: '60px', borderRadius: '16px',
              background: `${p.color}22`, border: `2px solid ${p.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', flexShrink: 0,
            }}>
              {p.emoji}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: theme.text, fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1.2rem' }}>{p.name}</div>
              <div style={{ color: theme.textMuted, fontSize: '0.85rem', marginTop: '2px' }}>{p.desc}</div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard
        as="button" variant="pill" onClick={onBack}
        style={{ padding: '12px 28px', cursor: 'pointer', color: theme.textMuted, fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem' }}
      >
        ← رجوع
      </GlassCard>
    </div>
  )
}
