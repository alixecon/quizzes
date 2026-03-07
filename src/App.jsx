import { useState, useMemo, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useSound } from './hooks/useSound'
import { themes, defaultTheme } from './styles/themes'
import { questions } from './data/questions'

import HomeScreen       from './components/HomeScreen'
import ProfileSetup     from './components/ProfileSetup'
import ModeSelect       from './components/ModeSelect'
import CategorySelect   from './components/CategorySelect'
import DifficultySelect from './components/DifficultySelect'
import QuizScreen       from './components/QuizScreen'
import ResultScreen     from './components/ResultScreen'
import PuzzleSelect     from './components/PuzzleSelect'
import ArabicWordle     from './components/ArabicWordle'
import Sudoku           from './components/Sudoku'

const QUESTIONS_PER_GAME = 10

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [themeId,      setThemeId]      = useLocalStorage('aq_theme',   defaultTheme)
  const [soundEnabled, setSoundEnabled] = useLocalStorage('aq_sound',   true)
  const [profile,      setProfile]      = useLocalStorage('aq_profile', null)

  const [screen,        setScreen]        = useState('home')
  const [gameMode,      setGameMode]      = useState('normal')
  const [categoryId,    setCategoryId]    = useState(null)
  const [difficulty,    setDifficulty]    = useState('medium')
  const [gameQuestions, setGameQuestions] = useState([])
  const [lastScore,     setLastScore]     = useState(0)

  // ── Fix: if saved themeId no longer exists, reset to default ──
  const safeThemeId = themes[themeId] ? themeId : defaultTheme
  const theme = themes[safeThemeId]

  useEffect(() => {
    if (!themes[themeId]) setThemeId(defaultTheme)
  }, [])

  const sounds = useSound(soundEnabled)

  const maxScore = useMemo(() => {
    const mult = { easy: 1, medium: 2, hard: 3 }[difficulty] || 1
    const pts  = gameMode === 'timed' ? (10 * mult) + (20 * 0.5) : 10 * mult
    return Math.round(gameQuestions.length * pts)
  }, [gameQuestions, difficulty, gameMode])

  const handleStart = () => {
    sounds.click()
    if (!profile) { setScreen('profile'); return }
    setScreen('mode')
  }

  const handleModeSelect = (mode) => {
    sounds.click()
    setGameMode(mode)
    if (mode === 'category') { setScreen('category'); return }
    setScreen('difficulty')
  }

  const handleCategorySelect = (catId) => {
    sounds.click()
    if (catId === 'puzzles') { setScreen('puzzles'); return }
    setCategoryId(catId)
    setScreen('difficulty')
  }

  const handlePuzzleSelect = (puzzleId) => {
    sounds.click()
    setScreen(puzzleId === 'wordle' ? 'wordle' : 'sudoku')
  }

  const handleDifficultySelect = (diff) => {
    sounds.click()
    setDifficulty(diff)
    let pool = questions.filter(q => q.difficulty === diff)
    if (categoryId) pool = pool.filter(q => q.category === categoryId)
    if (pool.length === 0) pool = questions.filter(q => q.difficulty === diff)
    if (pool.length === 0) pool = questions
    const selected = shuffleArray(pool).slice(0, QUESTIONS_PER_GAME)
    setGameQuestions(selected)
    sounds.start()
    setScreen('quiz')
  }

  const handleFinish         = (score) => { setLastScore(score); setScreen('result') }
  const handleUpdateBestScore = (score) => setProfile(p => ({ ...p, bestScore: score }))
  const handleRestart        = () => { sounds.click(); setCategoryId(null); setScreen('mode') }
  const handleHome           = () => { sounds.click(); setCategoryId(null); setGameQuestions([]); setScreen('home') }
  const handleSaveProfile    = (p) => { setProfile(p); setScreen(!profile ? 'mode' : 'home') }

  // Guard — never render with undefined theme
  if (!theme) return (
    <div style={{ minHeight: '100dvh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#fff', fontFamily: 'Cairo, sans-serif', fontSize: '1.2rem' }}>جاري التحميل...</div>
    </div>
  )

  return (
    <div style={{ background: theme.bg, minHeight: '100dvh' }}>
      {screen === 'home' && (
        <HomeScreen
          profile={profile} theme={theme} themeId={safeThemeId}
          onThemeChange={id => { setThemeId(id); sounds.click() }}
          soundEnabled={soundEnabled}
          onSoundToggle={() => setSoundEnabled(s => !s)}
          onStart={handleStart}
          onEditProfile={() => setScreen('profile')}
        />
      )}
      {screen === 'profile' && (
        <ProfileSetup initialProfile={profile} theme={theme} onSave={handleSaveProfile} />
      )}
      {screen === 'mode' && (
        <ModeSelect theme={theme} onSelect={handleModeSelect} onBack={handleHome} />
      )}
      {screen === 'category' && (
        <CategorySelect theme={theme} onSelect={handleCategorySelect} onBack={() => setScreen('mode')} />
      )}
      {screen === 'puzzles' && (
        <PuzzleSelect theme={theme} onSelect={handlePuzzleSelect} onBack={() => setScreen('category')} />
      )}
      {screen === 'wordle' && (
        <ArabicWordle theme={theme} sounds={sounds} onBack={() => setScreen('puzzles')} />
      )}
      {screen === 'sudoku' && (
        <Sudoku theme={theme} sounds={sounds} onBack={() => setScreen('puzzles')} />
      )}
      {screen === 'difficulty' && (
        <DifficultySelect
          theme={theme} onSelect={handleDifficultySelect}
          onBack={() => setScreen(gameMode === 'category' ? 'category' : 'mode')}
        />
      )}
      {screen === 'quiz' && gameQuestions.length > 0 && (
        <QuizScreen
          questions={gameQuestions} difficulty={difficulty}
          mode={gameMode} theme={theme} sounds={sounds} onFinish={handleFinish}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          score={lastScore} total={gameQuestions.length} maxScore={maxScore}
          profile={profile} theme={theme}
          onRestart={handleRestart} onHome={handleHome}
          onUpdateBestScore={handleUpdateBestScore}
        />
      )}
    </div>
  )
}
