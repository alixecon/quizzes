import { useState, useMemo, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useSound } from './hooks/useSound'
import { themes, defaultTheme } from './styles/themes'
import { getQuestions } from './data/index'

import AnimatedBackground    from './components/AnimatedBackground'
import HomeScreen            from './components/HomeScreen'
import ProfileSetup          from './components/ProfileSetup'
import CategorySelect        from './components/CategorySelect'
import DifficultySelect      from './components/DifficultySelect'
import QuizScreen            from './components/QuizScreen'
import ResultScreen          from './components/ResultScreen'
import PuzzleSelect          from './components/PuzzleSelect'
import ArabicWordle          from './components/ArabicWordle'
import Sudoku                from './components/Sudoku'

const QUESTIONS_PER_GAME = 10

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]]
  }
  return a
}

// Difficulty progression: unlock medium after 1 easy win, hard after 1 medium win
function getUnlockedDifficulties(stats) {
  const unlocked = ['easy']
  if ((stats?.easyWins  || 0) >= 1) unlocked.push('medium')
  if ((stats?.mediumWins|| 0) >= 1) unlocked.push('hard')
  return unlocked
}

export default function App() {
  const [themeId,      setThemeId]      = useLocalStorage('aq_theme',   defaultTheme)
  const [soundEnabled, setSoundEnabled] = useLocalStorage('aq_sound',   true)
  const [profile,      setProfile]      = useLocalStorage('aq_profile', null)
  const [stats,        setStats]        = useLocalStorage('aq_stats',   { easyWins:0, mediumWins:0 })

  const [screen,        setScreen]        = useState('home')
  const [categoryId,    setCategoryId]    = useState(null)
  const [difficulty,    setDifficulty]    = useState('easy')
  const [gameQuestions, setGameQuestions] = useState([])
  const [lastScore,     setLastScore]     = useState(0)

  const safeThemeId = themes[themeId] ? themeId : defaultTheme
  const theme       = themes[safeThemeId]

  useEffect(() => { if (!themes[themeId]) setThemeId(defaultTheme) }, [])

  const sounds   = useSound(soundEnabled)
  const unlocked = getUnlockedDifficulties(stats)

  const maxScore = useMemo(() => {
    const mult = { easy:1, medium:2, hard:3 }[difficulty] || 1
    return gameQuestions.length * 10 * mult
  }, [gameQuestions, difficulty])

  const handleStart = () => {
    sounds.click()
    if (!profile) { setScreen('profile'); return }
    setScreen('category')
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
    let pool = getQuestions(selectedCategory, diff)
    if (categoryId) pool = pool.filter(q => q.category === categoryId)
    if (pool.length === 0) pool = getQuestions(selectedCategory, diff)
    if (pool.length === 0) pool = getQuestions(selectedCategory, "easy")
    setGameQuestions(shuffleArray(pool).slice(0, QUESTIONS_PER_GAME))
    sounds.start()
    setScreen('quiz')
  }

  const handleFinish = (score) => {
    setLastScore(score)
    // Award win for progression
    const pct = maxScore > 0 ? score / maxScore : 0
    if (pct >= 0.5) {
      setStats(s => ({
        ...s,
        easyWins:   difficulty === 'easy'   ? (s.easyWins||0)+1   : (s.easyWins||0),
        mediumWins: difficulty === 'medium' ? (s.mediumWins||0)+1 : (s.mediumWins||0),
      }))
    }
    setScreen('result')
  }

  const handleUpdateBestScore = (score) => setProfile(p => ({ ...p, bestScore: score }))
  const handleRestart  = () => { sounds.click(); setCategoryId(null); setScreen('category') }
  const handleHome     = () => { sounds.click(); setCategoryId(null); setGameQuestions([]); setScreen('home') }
  const handleSaveProfile = (p) => {
    setProfile(p)
    // Fix: always go home after saving, whether new or editing
    setScreen('home')
  }

  if (!theme) return (
    <div style={{ minHeight:'100dvh', background:'#08080f', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ color:'#fff', fontFamily:'Cairo, sans-serif', fontSize:'1.2rem' }}>جاري التحميل...</div>
    </div>
  )

  return (
    <div style={{ background: theme.bg, minHeight: '100dvh', position: 'relative' }}>
      <AnimatedBackground theme={theme} />
      <div style={{ position: 'relative', zIndex: 1 }}>

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
        {screen === 'category' && (
          <CategorySelect theme={theme} onSelect={handleCategorySelect} onBack={handleHome} />
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
            unlocked={unlocked}
            onBack={() => setScreen('category')}
          />
        )}
        {screen === 'quiz' && gameQuestions.length > 0 && (
          <QuizScreen
            questions={gameQuestions} difficulty={difficulty}
            mode="category" theme={theme} sounds={sounds} onFinish={handleFinish}
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
    </div>
  )
}
