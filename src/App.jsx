import { useState, useMemo, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useSound } from './hooks/useSound'
import { themes, defaultTheme } from './styles/themes'
import { getQuestions } from './data/index'

import AnimatedBackground from './components/AnimatedBackground'
import HomeScreen         from './components/HomeScreen'
import ProfileSetup       from './components/ProfileSetup'
import CategorySelect     from './components/CategorySelect'
import DifficultySelect   from './components/DifficultySelect'
import QuizScreen         from './components/QuizScreen'
import ResultScreen       from './components/ResultScreen'
import PuzzleSelect       from './components/PuzzleSelect'
import ArabicWordle       from './components/ArabicWordle'
import Sudoku             from './components/Sudoku'
import BlockSortMode from './components/BlockSortMode'

function shuffle(arr) {
  const a = [...arr]
  for (let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
  return a
}

function getUnlocked(stats) {
  const u = ['easy']
  if ((stats?.easyWins||0)>=1)   u.push('medium')
  if ((stats?.mediumWins||0)>=1) u.push('hard')
  return u
}

export default function App() {
  const [themeId,      setThemeId]      = useLocalStorage('aq_theme',   defaultTheme)
  const [soundEnabled, setSoundEnabled] = useLocalStorage('aq_sound',   true)
  const [profile,      setProfile]      = useLocalStorage('aq_profile', null)
  const [stats,        setStats]        = useLocalStorage('aq_stats',   {easyWins:0,mediumWins:0})

  const [screen,        setScreen]     = useState('home')
  const [categoryId,    setCategoryId] = useState(null)
  const [difficulty,    setDifficulty] = useState('easy')
  const [gameQuestions, setGameQ]      = useState([])
  const [lastScore,     setLastScore]  = useState(0)

  const safeId  = themes[themeId] ? themeId : defaultTheme
  const theme   = themes[safeId]
  const unlocked = getUnlocked(stats)

  useEffect(() => { if (!themes[themeId]) setThemeId(defaultTheme) }, [])

  const sounds = useSound(soundEnabled)

  const maxScore = useMemo(() => {
    const m = {easy:1,medium:2,hard:3}[difficulty]||1
    return gameQuestions.length * 10 * m
  }, [gameQuestions, difficulty])

  const handleStart = () => { sounds.click(); if (!profile) { setScreen('profile'); return }; setScreen('category') }
  const handleCategory = (id) => { sounds.click(); if (id==='puzzles'){setScreen('puzzles');return};if (id==='blocksort') { handleBlockSort();return }; setCategoryId(id); setScreen('difficulty') }
  const handlePuzzle   = (id) => { sounds.click(); setScreen(id==='wordle'?'wordle':'sudoku') }
  const handleBlockSort = () => { sounds.click(); setScreen('blocksort') }
  const handleDifficulty = (d) => {
    sounds.click(); setDifficulty(d)
    let pool = getQuestions(categoryId, d)
    if (!pool.length) pool = getQuestions(null, d)
    if (!pool.length) pool = getQuestions(null, null)
    setGameQ(shuffle(pool).slice(0,10))
    sounds.start(); setScreen('quiz')
  }
  const handleFinish = (score) => {
    setLastScore(score)
    if (maxScore>0 && score/maxScore>=0.5) {
      setStats(s=>({...s,
        easyWins:   difficulty==='easy'   ? (s.easyWins||0)+1   : (s.easyWins||0),
        mediumWins: difficulty==='medium' ? (s.mediumWins||0)+1 : (s.mediumWins||0),
      }))
    }
    setScreen('result')
  }
  const handleHome    = () => { sounds.click(); setCategoryId(null); setGameQ([]); setScreen('home') }
  const handleRestart = () => { sounds.click(); setCategoryId(null); setScreen('category') }
  const handleSave    = (p) => { setProfile(p); setScreen('home') }
  const handleBest    = (s) => setProfile(p=>({...p,bestScore:s}))

  if (!theme) return <div style={{minHeight:'100dvh',background:'#0a0a0a'}} />

  return (
    <div style={{ background:theme.bg, minHeight:'100dvh', position:'relative' }}>
      <AnimatedBackground theme={theme} />
      <div style={{ position:'relative', zIndex:1 }}>
        {screen==='home'       && <HomeScreen profile={profile} theme={theme} themeId={safeId} onThemeChange={id=>{setThemeId(id);sounds.click()}} soundEnabled={soundEnabled} onSoundToggle={()=>setSoundEnabled(s=>!s)} onStart={handleStart} onEditProfile={()=>setScreen('profile')} />}
        {screen==='profile'    && <ProfileSetup initialProfile={profile} theme={theme} onSave={handleSave} />}
        {screen==='category'   && <CategorySelect theme={theme} sounds={sounds} onSelect={handleCategory} onBack={handleHome} />}
        {screen==='puzzles'    && <PuzzleSelect theme={theme} onSelect={handlePuzzle} onBack={()=>setScreen('category')} />}
        {screen==='wordle'     && <ArabicWordle theme={theme} sounds={sounds} onBack={()=>setScreen('puzzles')} />}
        {screen==='sudoku'     && <Sudoku theme={theme} sounds={sounds} onBack={()=>setScreen('puzzles')} />}
        {screen==='blocksort' && <BlockSortMode questions={getQuestions(null, null)} theme={theme} sounds={sounds} onExit={handleHome} />}
        {screen==='difficulty' && <DifficultySelect theme={theme} onSelect={handleDifficulty} unlocked={unlocked} onBack={()=>setScreen('category')} />}
        {screen==='quiz' && gameQuestions.length>0 && <QuizScreen questions={gameQuestions} difficulty={difficulty} mode="category" theme={theme} sounds={sounds} soundEnabled={soundEnabled} onSoundToggle={()=>setSoundEnabled(s=>!s)} onFinish={handleFinish} onBack={()=>setScreen('category')} />}
        {screen==='result'     && <ResultScreen score={lastScore} total={gameQuestions.length} maxScore={maxScore} profile={profile} theme={theme} onRestart={handleRestart} onHome={handleHome} onUpdateBestScore={handleBest} />}
      </div>
    </div>
  )
}
