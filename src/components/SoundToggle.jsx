export default function SoundToggle({ enabled, onToggle, theme }) {
  return (
    <button
      onClick={onToggle}
      title={enabled ? 'كتم الصوت' : 'تشغيل الصوت'}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: `1.5px solid ${enabled ? theme.primary : 'rgba(255,255,255,0.15)'}`,
        background: enabled ? `${theme.primary}22` : 'rgba(255,255,255,0.06)',
        color: enabled ? theme.primary : theme.textMuted,
        fontSize: '1.3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        flexShrink: 0,
      }}
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  )
}
