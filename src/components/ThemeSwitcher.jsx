import { themes } from '../styles/themes'

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  const t = themes[currentTheme]

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    }}>
      {Object.values(themes).map((theme) => {
        const isActive = theme.id === currentTheme
        return (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '50px',
              border: `2px solid ${isActive ? theme.primary : 'rgba(255,255,255,0.15)'}`,
              background: isActive ? `${theme.primary}22` : 'rgba(255,255,255,0.06)',
              color: isActive ? theme.primary : t.textMuted,
              fontSize: '0.82rem',
              fontFamily: 'Cairo, sans-serif',
              fontWeight: isActive ? 700 : 500,
              transition: 'all 0.25s ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: '1.1em' }}>{theme.emoji}</span>
            {theme.name}
          </button>
        )
      })}
    </div>
  )
}
