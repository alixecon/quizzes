export default function SoundToggle({ enabled, onToggle, theme }) {
  return (
    <button onClick={onToggle} style={{
      padding:'7px 12px', borderRadius:'4px', cursor:'pointer',
      background:'transparent', border:`2px solid ${theme.border}`,
      color:theme.textMuted, fontSize:'1rem',
      boxShadow:`2px 2px 0px ${theme.borderStrong}`,
      transition:'all 0.1s',
    }}>
      {enabled ? '🔊' : '🔇'}
    </button>
  )
}
