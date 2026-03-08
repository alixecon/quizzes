import { getQuestions } from '../data/index'

<DifficultySelect
  theme={theme}
  questionCounts={{
    easy:   getQuestions(selectedCategory, 'easy').length,
    medium: getQuestions(selectedCategory, 'medium').length,
    hard:   getQuestions(selectedCategory, 'hard').length,
  }}
  onSelect={(diff) => setDifficulty(diff)}
  onBack={() => setScreen('category')}
/>

export default DifficultySelect
