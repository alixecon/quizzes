export const themes = {
  dark: {
    id: 'dark',
    name: 'داكن',
    emoji: '◼',

    // Backgrounds
    bg: '#0a0a0a',
    bgSurface: '#111111',
    bgElevated: '#1a1a1a',
    bgCard: '#141414',

    // Borders
    border: '#2a2a2a',
    borderStrong: '#3a3a3a',
    borderAccent: '#e8ff47',

    // Text
    text: '#f0f0f0',
    textMuted: '#888888',
    textSubtle: '#444444',
    textInverse: '#0a0a0a',

    // Accent — GRIPH-style vivid yellow-green
    primary: '#e8ff47',
    primaryHover: '#d4eb2a',
    primaryText: '#0a0a0a',

    // Semantic
    success: '#4ade80',
    error: '#ff4444',
    warning: '#ff9f0a',

    // UI
    progressBg: '#222222',
    progressFill: '#e8ff47',
    glow: '0 0 30px rgba(232,255,71,0.25)',
    shadow: '4px 4px 0px #000000',
    shadowCard: '6px 6px 0px #000000',

    // Quiz states
    optionCorrectBg: '#4ade8022',
    optionCorrectBorder: '#4ade80',
    optionWrongBg: '#ff444422',
    optionWrongBorder: '#ff4444',

    // Orbs for animated bg
    bgOrb1: '#e8ff47',
    bgOrb2: '#ffffff',
    bgOrb3: '#888888',
  },

  light: {
    id: 'light',
    name: 'فاتح',
    emoji: '◻',

    bg: '#f5f0e8',
    bgSurface: '#ede8dc',
    bgElevated: '#ffffff',
    bgCard: '#ffffff',

    border: '#1a1a1a',
    borderStrong: '#000000',
    borderAccent: '#000000',

    text: '#0a0a0a',
    textMuted: '#555555',
    textSubtle: '#aaaaaa',
    textInverse: '#f5f0e8',

    primary: '#0a0a0a',
    primaryHover: '#333333',
    primaryText: '#f5f0e8',

    success: '#16a34a',
    error: '#dc2626',
    warning: '#d97706',

    progressBg: '#d5cfc3',
    progressFill: '#0a0a0a',
    glow: '0 0 30px rgba(0,0,0,0.12)',
    shadow: '4px 4px 0px #0a0a0a',
    shadowCard: '6px 6px 0px #0a0a0a',

    optionCorrectBg: '#16a34a18',
    optionCorrectBorder: '#16a34a',
    optionWrongBg: '#dc262618',
    optionWrongBorder: '#dc2626',

    bgOrb1: '#0a0a0a',
    bgOrb2: '#555555',
    bgOrb3: '#aaaaaa',
  },
}

export const defaultTheme = 'dark'
