import { themes } from '../styles/themes'

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  return (
    <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
      {Object.values(themes).map((t) => {
        const isActive = t.id === currentTheme
        return (
          <button
            key={t.id}
            onClick={() => onThemeChange(t.id)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              padding: '10px 14px', borderRadius: '16px', cursor: 'pointer',
              border: `2px solid ${isActive ? t.primary : 'rgba(255,255,255,0.08)'}`,
              background: isActive
                ? `linear-gradient(135deg, ${t.primary}22, ${t.secondary}14)`
                : 'rgba(255,255,255,0.04)',
              transition: 'all 0.22s ease',
              boxShadow: isActive ? `0 0 20px ${t.primary}44, inset 0 1px 0 rgba(255,255,255,0.1)` : 'none',
              minWidth: '72px',
            }}
          >
            {/* Mini background preview */}
            <div style={{
              width: '40px', height: '28px', borderRadius: '8px', overflow: 'hidden',
              background: t.bg, border: `1px solid ${t.primary}33`, position: 'relative',
            }}>
              <div style={{
                position: 'absolute', width: '16px', height: '16px', borderRadius: '50%',
                background: t.primary, opacity: 0.7, top: '2px', left: '4px', filter: 'blur(4px)',
              }} />
              <div style={{
                position: 'absolute', width: '12px', height: '12px', borderRadius: '50%',
                background: t.secondary, opacity: 0.6, bottom: '2px', right: '4px', filter: 'blur(3px)',
              }} />
            </div>
            <span style={{ fontSize: '1rem' }}>{t.emoji}</span>
            <span style={{
              color: isActive ? t.primary : 'rgba(255,255,255,0.45)',
              fontFamily: 'Cairo, sans-serif', fontWeight: isActive ? 700 : 500,
              fontSize: '0.7rem', whiteSpace: 'nowrap',
            }}>
              {t.name}
            </span>
            {isActive && (
              <div style={{
                width: '18px', height: '3px', borderRadius: '2px',
                background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
              }} />
            )}
          </button>
        )
      })}
    </div>
  )
}
