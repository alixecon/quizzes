import { useState, useMemo, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useSound } from './hooks/useSound'
import { themes, defaultTheme } from './styles/themes'
import { getQuestions } from './data/index'          // ✅ fixed import

import AnimatedBackground from './components/AnimatedBackground'
import HomeScreen         from './components/HomeScreen'
import ProfileSetup       from './components/ProfileSetup'
import StatsScreen from './components/StatsScreen'; // Correct if file is StatsScreen.jsx
import CategorySelect     from './components/CategorySelect'
import DifficultySelect   from './components/DifficultySelect'
import QuizScreen         from './components/QuizScreen'
import ResultScreen       from './components/ResultScreen'
import PuzzleSelect       from './components/PuzzleSelect'
import ArabicWordle       from './components/ArabicWordle'
import Sudoku             from './components/Sudoku'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const QUESTIONS_PER_GAME = 10

export default function App() {
  const [themeId,      setThemeId]      = useLocalStorage('aq_theme',   defaultTheme)
  const [soundEnabled, setSoundEnabled] = useLocalStorage('aq_sound',   true)
  const [profile,      setProfile]      = useLocalStorage('aq_profile', null)
  const [stats,        setStats]        = useLocalStorage('aq_stats',   {
    easyWins: 0, mediumWins: 0, hardWins: 0,
    gamesPlayed: 0, totalScore: 0, bestStreak: 0,
    history: [],          // last 20 games
    categoryStats: {},    // { [catId]: { played, correct, total } }
  })

  const [screen,        setScreen]     = useState('home')
  const [categoryId,    setCategoryId] = useState(null)
  const [difficulty,    setDifficulty] = useState('easy')
  const [gameQuestions, setGameQ]      = useState([])
  const [lastResult,    setLastResult] = useState(null)   // { score, streak, correct }

  const safeId = themes[themeId] ? themeId : defaultTheme
  const theme  = themes[safeId]

  useEffect(() => { if (!themes[themeId]) setThemeId(defaultTheme) }, [])

  const sounds = useSound(soundEnabled)

  const maxScore = useMemo(() => {
    const m = difficulty === 'mixed' ? 2 : ({ easy:1, medium:2, hard:3 }[difficulty] || 1)
    return gameQuestions.length * 10 * m
  }, [gameQuestions, difficulty])

  // ── Navigation ────────────────────────────────────────────────
  const handleStart = () => {
    sounds.click()
    if (!profile) { setScreen('profile'); return }
    setScreen('category')
  }

  const handleCategory = (id) => {
    sounds.click()
    if (id === 'puzzles') { setScreen('puzzles'); return }
    setCategoryId(id)
    setScreen('difficulty')
  }

  const handlePuzzle = (id) => {
    sounds.click()
    setScreen(id === 'wordle' ? 'wordle' : 'sudoku')
  }

  const handleDifficulty = (d) => {
    sounds.click()
    setDifficulty(d)

    // ✅ handle mixed + correct data source
    let pool = []
    if (d === 'mixed') {
      pool = categoryId ? getQuestions(categoryId) : getQuestions()
    } else {
      pool = categoryId
        ? getQuestions(categoryId, d)
        : getQuestions(null, d)
    }
    if (!pool.length) pool = getQuestions()

    setGameQ(shuffle(pool).slice(0, QUESTIONS_PER_GAME))
    sounds.start()
    setScreen('quiz')
  }

  // ✅ now receives { score, streak, correct }
  const handleFinish = ({ score, streak, correct }) => {
    setLastResult({ score, streak, correct })

    const isWin = maxScore > 0 && score / maxScore >= 0.5

    setStats(s => {
      // per-category tracking
      const catStats = { ...(s.categoryStats || {}) }
      if (categoryId) {
        const prev = catStats[categoryId] || { played: 0, correct: 0, total: 0 }
        catStats[categoryId] = {
          played:  prev.played + 1,
          correct: prev.correct + (correct ?? 0),
          total:   prev.total + gameQuestions.length,
        }
      }

      // game history (keep last 20)
      const newEntry = {
        date:       new Date().toISOString(),
        category:   categoryId,
        difficulty,
        score,
        maxScore,
        correct:    correct ?? 0,
        total:      gameQuestions.length,
        streak,
      }
      const history = [newEntry, ...(s.history || [])].slice(0, 20)

      return {
        ...s,
        gamesPlayed:  (s.gamesPlayed || 0) + 1,
        totalScore:   (s.totalScore  || 0) + score,
        bestStreak:   Math.max(s.bestStreak || 0, streak || 0),
        easyWins:     difficulty === 'easy'   && isWin ? (s.easyWins   || 0) + 1 : (s.easyWins   || 0),
        mediumWins:   difficulty === 'medium' && isWin ? (s.mediumWins || 0) + 1 : (s.mediumWins || 0),
        hardWins:     difficulty === 'hard'   && isWin ? (s.hardWins   || 0) + 1 : (s.hardWins   || 0),
        categoryStats: catStats,
        history,
      }
    })

    setScreen('result')
  }

  const handleHome    = () => { sounds.click(); setCategoryId(null); setGameQ([]); setScreen('home') }
  const handleRestart = () => { sounds.click(); setCategoryId(null); setScreen('category') }
  const handleSave    = (p) => { setProfile(p); setScreen('home') }
  const handleBest    = (s) => setProfile(p => ({ ...p, bestScore: s }))

  if (!theme) return <div style={{ minHeight: '100dvh', background: '#0a0a0a' }} />

  return (
    <div style={{ background: theme.bg, minHeight: '100dvh', position: 'relative' }}>
      <AnimatedBackground theme={theme} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {screen === 'home'       && <HomeScreen profile={profile} theme={theme} themeId={safeId} onThemeChange={id => { setThemeId(id); sounds.click() }} soundEnabled={soundEnabled} onSoundToggle={() => setSoundEnabled(s => !s)} onStart={handleStart} onEditProfile={() => setScreen('profile')} />}
        {screen === 'profile'    && <ProfileSetup initialProfile={profile} theme={theme} onSave={handleSave} />}
        {screen === 'category'   && <CategorySelect theme={theme} difficulty={difficulty} onSelect={handleCategory} onBack={handleHome} />}
        {screen === 'puzzles'    && <PuzzleSelect theme={theme} onSelect={handlePuzzle} onBack={() => setScreen('category')} />}
        {screen === 'wordle'     && <ArabicWordle theme={theme} sounds={sounds} onBack={() => setScreen('puzzles')} />}
        {screen === 'sudoku'     && <Sudoku theme={theme} sounds={sounds} onBack={() => setScreen('puzzles')} />}
        {screen === 'difficulty' && <DifficultySelect theme={theme} onSelect={handleDifficulty} onBack={() => setScreen('category')} />}
        {screen === 'quiz'       && gameQuestions.length > 0 && <QuizScreen questions={gameQuestions} difficulty={difficulty} mode="timed" theme={theme} sounds={sounds} onFinish={handleFinish} />}
        {screen === 'result'     && <ResultScreen
          score={lastResult?.score ?? 0}
          correct={lastResult?.correct}
          streak={lastResult?.streak}
          total={gameQuestions.length}
          maxScore={maxScore}
          profile={profile}
          theme={theme}
          onRestart={handleRestart}
          onHome={handleHome}
          onUpdateBestScore={handleBest}
        />}
        {screen === 'stats' && (<StatsScreen stats={stats} profile={profile} theme={theme} onBack={() => setScreen('home')}
  />
)}

      </div>
    </div>
  )
}
