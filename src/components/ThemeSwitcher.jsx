import GlassCard from './GlassCard'
import { themes } from '../styles/themes'

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {Object.values(themes).map((theme) => {
        const isActive = theme.id === currentTheme
        return (
          <GlassCard
            key={theme.id}
            as="button"
            variant={isActive ? 'btn' : 'pill'}
            onClick={() => onThemeChange(theme.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px', borderRadius: '50px',
              border: `1.5px solid ${isActive ? theme.primary + '80' : 'rgba(255,255,255,0.1)'}`,
              color: isActive ? theme.primary : 'rgba(255,255,255,0.5)',
              fontSize: '0.82rem', fontFamily: 'Cairo, sans-serif',
              fontWeight: isActive ? 700 : 500, cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: '1.1em' }}>{theme.emoji}</span>
            {theme.name}
          </GlassCard>
        )
      })}
    </div>
  )
}
