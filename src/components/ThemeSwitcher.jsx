export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  const isDark = currentTheme === 'dark'
  return (
    <button
      onClick={() => onThemeChange(isDark ? 'light' : 'dark')}
      style={{
        padding:'8px 16px', borderRadius:'2px', cursor:'pointer',
        background: isDark ? '#f5f0e8' : '#0f0f0f',
        color:      isDark ? '#0f0f0f' : '#f5f0e8',
        border:     '2px solid ' + (isDark ? '#f5f0e8' : '#0f0f0f'),
        boxShadow:  isDark ? '3px 3px 0 #ffffff44' : '3px 3px 0 #00000044',
        fontFamily: 'Tajawal, sans-serif', fontWeight: 800, fontSize: '0.85rem',
        letterSpacing: '0.03em',
        transition: 'transform 0.1s, box-shadow 0.1s',
      }}
      onMouseEnter={e=>{e.currentTarget.style.transform='translate(-1px,-1px)'}}
      onMouseLeave={e=>{e.currentTarget.style.transform='translate(0,0)'}}
    >
      {isDark ? '☀ فاتح' : '◼ داكن'}
    </button>
  )
}
