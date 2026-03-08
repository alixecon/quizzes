import { geographyQuestions } from './geography.js'
import { sportsQuestions } from './sports.js'
import { artsQuestions } from './arts.js'
import { technologyQuestions } from './technology.js'
import { religionQuestions } from './religion.js'
import { generalQuestions } from './general.js'

// Science & History were defined inline earlier — paste them here:
import { scienceQuestions } from './science.js'
import { historyQuestions } from './history.js'

export const ALL_QUESTIONS = [
  ...scienceQuestions,
  ...historyQuestions,
  ...geographyQuestions,
  ...sportsQuestions,
  ...artsQuestions,
  ...technologyQuestions,
  ...religionQuestions,
  ...generalQuestions,
]

export const getQuestions = (category = null, difficulty = null, limit = null) => {
  let pool = ALL_QUESTIONS
  if (category) pool = pool.filter(q => q.category === category)
  if (difficulty) pool = pool.filter(q => q.difficulty === difficulty)
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return limit ? pool.slice(0, limit) : pool
}

export const CATEGORIES = [
  { id: 'science',    label: 'العلوم',       icon: '🔬' },
  { id: 'history',   label: 'التاريخ',       icon: '📜' },
  { id: 'geography', label: 'الجغرافيا',     icon: '🌍' },
  { id: 'sports',    label: 'الرياضة',       icon: '⚽' },
  { id: 'arts',      label: 'الفنون والأدب', icon: '🎨' },
  { id: 'technology',label: 'التكنولوجيا',   icon: '💻' },
  { id: 'religion',  label: 'الدين',         icon: '🕌' },
  { id: 'general',   label: 'معلومات عامة',  icon: '🧠' },
]

export const DIFFICULTIES = ['easy', 'medium', 'hard']
export const QUESTIONS_PER_GAME = 10
export const TIME_PER_QUESTION = 20 // seconds
