import { useState, useCallback } from 'react'
import GlassCard from './GlassCard'

function generatePuzzle(difficulty = 'medium') {
  const medium = [
    [5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9],
  ]
  const easy = [
    [5,3,4,0,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],[4,2,6,8,0,3,7,9,1],[7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,0,9],
  ]
  const hard = [
    [5,0,0,0,7,0,0,0,0],[6,0,0,1,0,5,0,0,0],[0,9,0,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],[0,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,0],
    [0,6,0,0,0,0,2,0,0],[0,0,0,4,1,0,0,0,5],[0,0,0,0,8,0,0,7,0],
  ]
  const solution = [
    [5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9],
  ]
  const puzzle = difficulty === 'hard' ? hard : difficulty === 'easy' ? easy : medium
  return { puzzle, solution }
}

function isConflict(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === num) return true
    if (i !== row && board[i][col] === num) return true
  }
  const br = Math.floor(row/3)*3, bc = Math.floor(col/3)*3
  for (let r = br; r < br+3; r++)
    for (let c = bc; c < bc+3; c++)
      if ((r !== row || c !== col) && board[r][c] === num) return true
  return false
}

export default function Sudoku({ theme, onBack, sounds }) {
  const [difficulty, setDifficulty] = useState(null)
  const [puzzleData, setPuzzleData] = useState({ puzzle: null, solution: null })
  const [board,      setBoard]      = useState(null)
  const [selected,   setSelected]   = useState(null)
  const [errors,     setErrors]     = useState({})
  const [won,        setWon]        = useState(false)
  const [hints,      setHints]      = useState(3)

  const startGame = (diff) => {
    const data = generatePuzzle(diff)
    setDifficulty(diff)
    setPuzzleData(data)
    setBoard(data.puzzle.map(r => [...r]))
    setSelected(null); setErrors({}); setWon(false); setHints(3)
    sounds.start()
  }

  const handleInput = useCallback((num) => {
    if (!selected || won || !puzzleData.puzzle) return
    const [r, c] = selected
    if (puzzleData.puzzle[r][c] !== 0) return
    const nb = board.map(row => [...row])
    nb[r][c] = num
    const key = `${r}-${c}`
    const ne = { ...errors }
    if (num !== 0 && isConflict(nb, r, c, num)) { ne[key] = true; sounds.wrong() }
    else { delete ne[key]; if (num !== 0) sounds.correct() }
    setBoard(nb); setErrors(ne)
    if (nb.every((row, ri) => row.every((v, ci) => v === puzzleData.solution[ri][ci]))) {
      setWon(true); sounds.complete()
    }
  }, [selected, board, puzzleData, errors, won, sounds])

  const useHint = () => {
    if (hints <= 0 || !selected || !puzzleData.puzzle) return
    const [r, c] = selected
    if (puzzleData.puzzle[r][c] !== 0) return
    handleInput(puzzleData.solution[r][c])
    setHints(h => h - 1)
  }

  if (!difficulty) return (
    <div style={{ minHeight: '100dvh', background: theme.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px', gap: '16px' }}>
      <button onClick={onBack} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: theme.textMuted, fontSize: '1.4rem', cursor: 'pointer' }}>←</button>
      <div style={{ fontSize: '3rem' }}>🔢</div>
      <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: theme.text }}>سودوكو</h2>
      <p style={{ color: theme.textMuted, fontSize: '0.9rem' }}>اختر مستوى الصعوبة</p>
      {[{id:'easy',name:'سهل',emoji:'🌱',color:'#30d158'},{id:'medium',name:'متوسط',emoji:'⚡',color:'#ff9f0a'},{id:'hard',name:'صعب',emoji:'🔥',color:'#ff453a'}].map(lvl => (
        <GlassCard key={lvl.id} as="button" variant="card" shimmer onClick={() => startGame(lvl.id)} style={{
          width: '100%', maxWidth: '320px', padding: '18px 22px', borderRadius: '16px',
          display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer',
          '--glass-tint': `${lvl.color}10`, '--glass-tint-border': `${lvl.color}28`,
        }}>
          <span style={{ fontSize: '1.8rem' }}>{lvl.emoji}</span>
          <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: theme.text }}>{lvl.name}</span>
        </GlassCard>
      ))}
    </div>
  )

  const cellSize = 'clamp(34px, 9.5vw, 46px)'
  return (
    <div style={{ minHeight: '100dvh', background: theme.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 12px 24px', gap: '12px' }}>
      <div style={{ width: '100%', maxWidth: '420px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: '1.4rem', cursor: 'pointer', padding: '8px' }}>←</button>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: theme.text }}>🔢 سودوكو</h2>
          <div style={{ color: theme.textMuted, fontSize: '0.72rem' }}>تلميحات: {'💡'.repeat(hints)}</div>
        </div>
        <button onClick={() => startGame(difficulty)} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: '1.3rem', cursor: 'pointer', padding: '8px' }}>🔄</button>
      </div>

      {won && (
        <GlassCard variant="pill" className="animate-scaleIn" style={{ padding: '8px 20px', color: theme.success, fontFamily: 'Cairo, sans-serif', fontWeight: 700, '--glass-tint': `${theme.success}18`, '--glass-tint-border': theme.success }}>
          🎉 أحسنت! حللت اللغز!
        </GlassCard>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '2px', border: `2px solid ${theme.primary}`, borderRadius: '12px', overflow: 'hidden', boxShadow: theme.shadow }}>
        {board && board.map((row, ri) => row.map((val, ci) => {
          const isFixed = puzzleData.puzzle[ri][ci] !== 0
          const isSel   = selected && selected[0] === ri && selected[1] === ci
          const isErr   = errors[`${ri}-${ci}`]
          const isSameBox = selected && Math.floor(selected[0]/3) === Math.floor(ri/3) && Math.floor(selected[1]/3) === Math.floor(ci/3)
          const isSameRC  = selected && (selected[0] === ri || selected[1] === ci)
          const borderRight  = (ci+1)%3===0 && ci!==8 ? `2px solid ${theme.primary}66` : `1px solid ${theme.cardBorder}`
          const borderBottom = (ri+1)%3===0 && ri!==8 ? `2px solid ${theme.primary}66` : `1px solid ${theme.cardBorder}`
          return (
            <div key={`${ri}-${ci}`} onClick={() => { if (!isFixed) { setSelected([ri,ci]); sounds.click() } }} style={{
              width: cellSize, height: cellSize, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Cairo, sans-serif', fontWeight: isFixed ? 800 : 600,
              fontSize: 'clamp(0.85rem,3vw,1.1rem)',
              color: isErr ? theme.error : isFixed ? theme.text : theme.primary,
              background: isSel ? `${theme.primary}22` : isErr ? `${theme.error}15` : isSameBox || isSameRC ? theme.surface : 'transparent',
              borderRight, borderBottom, cursor: isFixed ? 'default' : 'pointer',
              outline: isSel ? `2px solid ${theme.primary}` : 'none', outlineOffset: '-2px',
              transition: 'background 0.15s',
            }}>
              {val !== 0 ? val : ''}
            </div>
          )
        }))}
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '340px' }}>
        {[1,2,3,4,5,6,7,8,9].map(n => (
          <GlassCard key={n} as="button" variant="btn" onClick={() => handleInput(n)} style={{
            width: '44px', height: '44px', borderRadius: '10px',
            color: theme.text, fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer',
          }}>
            {n}
          </GlassCard>
        ))}
        <GlassCard as="button" variant="pill" onClick={() => handleInput(0)} style={{ padding: '0 16px', height: '44px', color: theme.textMuted, fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
          مسح
        </GlassCard>
        <GlassCard as="button" variant="pill" onClick={useHint} disabled={hints === 0 || !selected} style={{
          padding: '0 16px', height: '44px', cursor: hints > 0 ? 'pointer' : 'not-allowed',
          color: hints > 0 ? theme.accent : theme.textSubtle,
          fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.85rem',
          '--glass-tint': hints > 0 ? `${theme.accent}18` : 'transparent',
          '--glass-tint-border': hints > 0 ? `${theme.accent}40` : theme.cardBorder,
        }}>
          💡 ({hints})
        </GlassCard>
      </div>
    </div>
  )
}
