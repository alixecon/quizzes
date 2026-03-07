import { useState } from 'react'

const AVATARS = ['🦁','🐯','🦊','🐺','🦅','🐉','⚡','🌟','🔥','💎','🏆','🎯','🌙','🌈','🎭','🤴']

export default function ProfileSetup({ initialProfile, theme, onSave }) {
  const [name, setName] = useState(initialProfile?.name || '')
  const [avatar, setAvatar] = useState(initialProfile?.avatar || AVATARS[0])
  const [error, setError] = useState('')

  const handleSave = () => {
    const trimmed = name.trim()
    if (!trimmed) { setError('يرجى إدخال اسمك'); return }
    if (trimmed.length < 2) { setError('الاسم قصير جداً'); return }
    onSave({ name: trimmed, avatar, bestScore: initialProfile?.bestScore || 0 })
  }

  const cardStyle = {
    background: theme.card,
    border: `1px solid ${theme.cardBorder}`,
    borderRadius: '20px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '28px 24px',
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: theme.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
      gap: '20px',
    }}>
      <div className="animate-scaleIn" style={{ width: '100%', maxWidth: '380px' }}>
        <h2 style={{
          fontFamily: 'Cairo, sans-serif',
          fontWeight: 800,
          fontSize: '1.7rem',
          color: theme.text,
          textAlign: 'center',
          marginBottom: '6px',
        }}>
          الملف الشخصي 👤
        </h2>
        <p style={{ color: theme.textMuted, textAlign: 'center', marginBottom: '24px', fontSize: '0.9rem' }}>
          أدخل اسمك واختر رمزاً لك
        </p>

        <div style={cardStyle}>
          {/* Name input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: theme.textMuted,
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 600,
            }}>
              الاسم
            </label>
            <input
              value={name}
              onChange={e => { setName(e.target.value); setError('') }}
              placeholder="أدخل اسمك..."
              maxLength={20}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: `1.5px solid ${error ? theme.error : theme.cardBorder}`,
                background: theme.surface,
                color: theme.text,
                fontSize: '1rem',
                fontFamily: 'Noto Naskh Arabic, serif',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = theme.primary}
              onBlur={e => e.target.style.borderColor = error ? theme.error : theme.cardBorder}
            />
            {error && <div style={{ color: theme.error, fontSize: '0.8rem', marginTop: '6px' }}>{error}</div>}
          </div>

          {/* Avatar grid */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: theme.textMuted,
              marginBottom: '12px',
              fontSize: '0.9rem',
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 600,
            }}>
              اختر رمزك
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '8px',
            }}>
              {AVATARS.map((av) => (
                <button
                  key={av}
                  onClick={() => setAvatar(av)}
                  style={{
                    fontSize: '1.5rem',
                    padding: '8px',
                    borderRadius: '10px',
                    border: `2px solid ${av === avatar ? theme.primary : 'transparent'}`,
                    background: av === avatar ? `${theme.primary}22` : theme.surface,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    aspectRatio: '1',
                  }}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div style={{
            textAlign: 'center',
            padding: '12px',
            background: theme.surface,
            borderRadius: '12px',
            marginBottom: '20px',
          }}>
            <span style={{ fontSize: '2.5rem' }}>{avatar}</span>
            <div style={{ color: theme.text, fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginTop: '4px' }}>
              {name || 'اسمك هنا'}
            </div>
          </div>

          <button
            onClick={handleSave}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '14px',
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              color: '#fff',
              fontSize: '1.1rem',
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              boxShadow: `0 6px 24px ${theme.primary}44`,
            }}
          >
            حفظ الملف ✓
          </button>
        </div>
      </div>
    </div>
  )
}
