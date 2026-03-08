export const themes = {
  dark: {
    id: 'dark',
    name: 'داكن',

    // Page backgrounds
    bg:         '#0f0f0f',
    bgCard:     '#1a1a1a',
    bgElevated: '#242424',
    bgAccent:   '#3d3df7',   // GRIPH electric blue

    // Borders
    border:       '#2e2e2e',
    borderStrong: '#ffffff',

    // Text
    text:        '#f5f0e8',
    textMuted:   '#888888',
    textSubtle:  '#444444',
    textInverse: '#0f0f0f',

    // Primary accent — GRIPH electric blue
    primary:     '#3d3df7',
    primaryText: '#ffffff',

    // Secondary accent — GRIPH hot pink
    secondary:     '#ff4ecd',
    secondaryText: '#ffffff',

    // Tertiary — cream
    tertiary:     '#f5f0e8',
    tertiaryText: '#0f0f0f',

    // Semantic
    success: '#4ade80',
    error:   '#ff4444',

    // Shadows — hard offset GRIPH style
    shadow:     '3px 3px 0px #ffffff22',
    shadowCard: '5px 5px 0px #3d3df755',
    shadowHero: '8px 8px 0px #3d3df7',

    // Progress
    progressBg:   '#2e2e2e',
    progressFill: '#3d3df7',

    // Quiz option states
    optionBg:            '#1a1a1a',
    optionBorder:        '#2e2e2e',
    optionText:          '#f5f0e8',
    optionCorrectBg:     '#4ade8022',
    optionCorrectBorder: '#4ade80',
    optionWrongBg:       '#ff444422',
    optionWrongBorder:   '#ff4444',
  },

  light: {
    id: 'light',
    name: 'فاتح',

    bg:         '#f5f0e8',
    bgCard:     '#ffffff',
    bgElevated: '#ede8dc',
    bgAccent:   '#3d3df7',

    border:       '#0f0f0f',
    borderStrong: '#0f0f0f',

    text:        '#0f0f0f',
    textMuted:   '#555555',
    textSubtle:  '#aaaaaa',
    textInverse: '#f5f0e8',

    primary:     '#3d3df7',
    primaryText: '#ffffff',

    secondary:     '#ff4ecd',
    secondaryText: '#ffffff',

    tertiary:     '#0f0f0f',
    tertiaryText: '#f5f0e8',

    success: '#16a34a',
    error:   '#dc2626',

    shadow:     '3px 3px 0px #0f0f0f44',
    shadowCard: '5px 5px 0px #0f0f0f',
    shadowHero: '8px 8px 0px #0f0f0f',

    progressBg:   '#d5cfc3',
    progressFill: '#3d3df7',

    optionBg:            '#ffffff',
    optionBorder:        '#0f0f0f',
    optionText:          '#0f0f0f',
    optionCorrectBg:     '#4ade8022',
    optionCorrectBorder: '#16a34a',
    optionWrongBg:       '#ff444422',
    optionWrongBorder:   '#dc2626',
  },
}

export const defaultTheme = 'dark'
