export default function SoundToggle({ enabled, onToggle, theme }) {
  return (
    <button onClick={onToggle} style={{
      width:'40px', height:'40px', borderRadius:'2px', cursor:'pointer',
      background:'transparent',
      border:`2px solid ${theme.border}`,
      color:theme.textMuted, fontSize:'1.1rem',
      display:'flex', alignItems:'center', justifyContent:'center',
      transition:'all 0.1s',
    }}>
      {enabled ? '🔊' : '🔇'}
    </button>
  )
}
