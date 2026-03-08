import GlassCard from './GlassCard'

const modes = [
  { id: 'normal',   name: 'الوضع العادي',  description: 'أسئلة بدون ضغط وقت',    emoji: '🎯', color: '#60a5fa' },
  { id: 'timed',    name: 'الوضع الزمني',  description: '20 ثانية لكل سؤال',       emoji: '⏱️', color: '#fb923c' },
  { id: 'category', name: 'وضع الفئات',    description: 'اختر فئتك المفضلة',       emoji: '📚', color: '#a78bfa' },
]

export default function ModeSelect({ theme, onSelect, onBack }) {
  return (
    <div style={{
      minHeight: '100dvh',
      background: theme.bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px', gap: '16px',
    }}>
      <div className="animate-fadeInUp" style={{ textAlign: 'center', marginBottom: '8px' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎮</div>
        <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: theme.text }}>
          اختر نمط اللعب
        </h2>
        <p style={{ color: theme.textMuted, fontSize: '0.9rem', marginTop: '4px' }}>
          كل نمط يقدم تحدياً مختلفاً
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {modes.map((mode, i) => (
          <GlassCard
            key={mode.id}
            as="button"
            variant="card"
            shimmer
            className={`animate-fadeInUp delay-${i + 1}`}
            onClick={() => onSelect(mode.id)}
            style={{
              width: '100%', padding: '20px 22px',
              borderRadius: '18px',
              display: 'flex', alignItems: 'center', gap: '16px',
              cursor: 'pointer', textAlign: 'right',
              '--glass-tint': `${mode.color}10`,
              '--glass-tint-border': `${mode.color}28`,
            }}
          >
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: `${mode.color}22`,
              border: `1.5px solid ${mode.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.6rem', flexShrink: 0,
            }}>
              {mode.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: theme.text, fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '1.05rem' }}>
                {mode.name}
              </div>
              <div style={{ color: theme.textMuted, fontSize: '0.83rem', marginTop: '2px' }}>
                {mode.description}
              </div>
            </div>
            <span style={{ color: theme.textSubtle, fontSize: '1.2rem' }}>←</span>
          </GlassCard>
        ))}
      </div>

      <GlassCard
        as="button"
        variant="pill"
        className="animate-fadeInUp delay-4"
        onClick={onBack}
        style={{
          padding: '12px 28px', cursor: 'pointer',
          color: theme.textMuted, fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem',
        }}
      >
        ← رجوع
      </GlassCard>
    </div>
  )
}
