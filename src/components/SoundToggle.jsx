import GlassCard from './GlassCard'

export default function SoundToggle({ enabled, onToggle, theme }) {
  return (
    <GlassCard
      as="button"
      variant="pill"
      onClick={onToggle}
      title={enabled ? 'كتم الصوت' : 'تشغيل الصوت'}
      style={{
        width: '44px', height: '44px',
        borderRadius: '50%',
        color: enabled ? theme.primary : theme.textMuted,
        fontSize: '1.3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        '--glass-tint': enabled ? `${theme.primary}18` : 'rgba(255,255,255,0.05)',
        '--glass-tint-border': enabled ? `${theme.primary}40` : 'rgba(255,255,255,0.1)',
        border: `1.5px solid ${enabled ? theme.primary + '50' : 'rgba(255,255,255,0.12)'}`,
      }}
    >
      {enabled ? '🔊' : '🔇'}
    </GlassCard>
  )
}
