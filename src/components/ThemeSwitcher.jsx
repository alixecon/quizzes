export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  const isDark = currentTheme === 'dark'
  return (
    <button
      onClick={() => onThemeChange(isDark ? 'light' : 'dark')}
      style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '8px 16px', borderRadius: '4px',
        background: isDark ? '#e8ff47' : '#0a0a0a',
        color:      isDark ? '#0a0a0a' : '#f5f0e8',
        border:     `2px solid ${isDark ? '#0a0a0a' : '#0a0a0a'}`,
        boxShadow:  isDark ? '3px 3px 0px #000' : '3px 3px 0px #555',
        fontFamily: 'Tajawal, sans-serif', fontWeight: 800, fontSize: '0.85rem',
        cursor: 'pointer', transition: 'all 0.15s',
        letterSpacing: '0.02em',
      }}
    >
      {isDark ? '☀ فاتح' : '◼ داكن'}
    </button>
  )
}
