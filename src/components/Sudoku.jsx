import { useState, useCallback } from 'react'

// Generate a valid Sudoku puzzle (simplified seeded approach)
function generatePuzzle(difficulty = 'medium') {
  const base = [
    [5,3,0, 0,7,0, 0,0,0],
    [6,0,0, 1,9,5, 0,0,0],
    [0,9,8, 0,0,0, 0,6,0],
    [8,0,0, 0,6,0, 0,0,3],
    [4,0,0, 8,0,3, 0,0,1],
    [7,0,0, 0,2,0, 0,0,6],
    [0,6,0, 0,0,0, 2,8,0],
    [0,0,0, 4,1,9, 0,0,5],
    [0,0,0, 0,8,0, 0,7,9],
  ]
  const solution = [
    [5,3,4, 6,7,8, 9,1,2],
    [6,7,2, 1,9,5, 3,4,8],
    [1,9,8, 3,4,2, 5,6,7],
    [8,5,9, 7,6,1, 4,2,3],
    [4,2,6, 8,5,3, 7,9,1],
    [7,1,3, 9,2,4, 8,5,6],
    [9,6,1, 5,3,7, 2,8,4],
    [2,8,7, 4,1,9, 6,3,5],
    [3,4,5, 2,8,6, 1,7,9],
  ]

  // Add more blanks for harder difficulty
  const hard = [
    [5,0,0, 0,7,0, 0,0,0],
    [6,0,0, 1,0,5, 0,0,0],
    [0,9,0, 0,0,0, 0,6,0],
    [8,0,0, 0,6,0, 0,0,3],
    [0,0,0, 8,0,3, 0,0,1],
    [7,0,0, 0,2,0, 0,0,0],
    [0,6,0, 0,0,0, 2,0,0],
    [0,0,0, 4,1,0, 0,0,5],
    [0,0,0, 0,8,0, 0,7,0],
  ]
  const easy = [
    [5,3,4, 0,7,8, 9,1,2],
    [6,7,2, 1,9,5, 3,4,8],
    [1,9,8, 3,4,2, 5,6,7],
    [8,5,9, 7,6,1, 4,2,3],
    [4,2,6, 8,0,3, 7,9,1],
    [7,1,3, 9,2,4, 8,5,6],
    [9,6,1, 5,3,7, 2,8,4],
    [2,8,7, 4,1,9, 6,3,5],
    [3,4,5, 2,8,6, 1,0,9],
  ]

  const puzzle = difficulty === 'hard' ? hard : difficulty === 'easy' ? easy : base
  return { puzzle, solution }
}

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false
    if (board[i][col] === num) return false
  }
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = boxRow; r < boxRow + 3; r++)
    for (let c = boxCol; c < boxCol + 3; c++)
      if (board[r][c] === num) return false
  return true
}

export default function Sudoku({ theme, onBack, sounds }) {
  const [difficulty, setDifficulty] = useState(null)
  const [{ puzzle, solution }, setPuzzleData] = useState({ puzzle: null, solution: null })
  const [board, setBoard] = useState(null)
  const [selected, setSelected] = useState(null)
  const [errors, setErrors] = useState({})
  const [won, setWon] = useState(false)
  const [hints, setHints] = useState(3)

  const startGame = (diff) => {
    setDifficulty(diff)
    const data = generatePuzzle(diff)
    setPuzzleData(data)
    setBoard(data.puzzle.map(row => [...row]))
    setSelected(null)
    setErrors({})
    setWon(false)
    setHints(3)
    sounds.start()
  }

  const handleCellPress = (r, c) => {
    if (puzzle[r][c] !== 0) return
    setSelected([r, c])
    sounds.click()
  }

  const handleNumberInput = useCallback((num) => {
    if (!selected || won) return
    const [r, c] = selected
    if (puzzle[r][c] !== 0) return

    const newBoard = board.map(row => [...row])
    newBoard[r][c] = num

    const key = `${r}-${c}`
    const newErrors = { ...errors }
    if (num !== 0 && !isValid(newBoard.map(row => [...row]).map((row, ri) => ri === r ? row.map((v, ci) => ci === c ? 0 : v) : row), r, c, num)) {
      newErrors[key] = true
      sounds.wrong()
    } else {
      delete newErrors[key]
      if (num !== 0) sounds.correct()
    }

    setBoard(newBoard)
    setErrors(newErrors)

    // Check win
    const isComplete = newBoard.every((row, ri) =>
      row.every((val, ci) => val === solution[ri][ci])
    )
    if (isComplete) { setWon(true); sounds.complete() }
  }, [selected, board, puzzle, solution, errors, won, sounds])

  const useHint = () => {
    if (hints <= 0 || !selected) return
    const [r, c] = selected
    if (puzzle[r][c] !== 0) return
    handleNumberInput(solution[r][c])
    setHints(h => h - 1)
  }

  const cellSize = 'clamp(34px, 9.5vw, 46px)'

  if (!difficulty) {
    return (
      <div style={{
        minHeight: '100dvh', background: theme.bg,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '24px 20px', gap: '16px',
      }}>
        <button onClick={onBack} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: theme.textMuted, fontSize: '1.4rem', cursor: 'pointer' }}>←</button>
        <div style={{ fontSize: '3rem' }}>🔢</div>
        <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: theme.text }}>سودوكو</h2>
        <p style={{ color: theme.textMuted, fontSize: '0.9rem' }}>اختر مستوى الصعوبة</p>
        {[
          { id: 'easy', name: 'سهل', emoji: '🌱', color: '#30d158' },
          { id: 'medium', name: 'متوسط', emoji: '⚡', color: '#ff9f0a' },
          { id: 'hard', name: 'صعب', emoji: '🔥', color: '#ff453a' },
        ].map(lvl => (
          <button key={lvl.id} onClick={() => startGame(lvl.id)} style={{
            width: '100%', maxWidth: '320px',
            padding: '18px 22px', borderRadius: '16px',
            background: theme.card, border: `1px solid ${theme.cardBorder}`,
            display: 'flex', alignItems: 'center', gap: '16px',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = lvl.color}
            onMouseLeave={e => e.currentTarget.style.borderColor = theme.cardBorder}
          >
            <span style={{ fontSize: '1.8rem' }}>{lvl.emoji}</span>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: theme.text }}>{lvl.name}</span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100dvh', background: theme.bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', padding: '16px 12px 24px', gap: '12px',
    }}>
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '420px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: '1.4rem', cursor: 'pointer', padding: '8px' }}>←</button>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: theme.text }}>🔢 سودوكو</h2>
          <div style={{ color: theme.textMuted, fontSize: '0.72rem' }}>تلميحات متبقية: {'💡'.repeat(hints)}</div>
        </div>
        <button onClick={() => startGame(difficulty)} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: '1.3rem', cursor: 'pointer', padding: '8px' }}>🔄</button>
      </div>

      {won && (
        <div className="animate-scaleIn" style={{
          background: `${theme.success}22`, border: `1px solid ${theme.success}`,
          borderRadius: '50px', padding: '8px 20px',
          color: theme.success, fontFamily: 'Cairo, sans-serif', fontWeight: 700,
        }}>
          🎉 أحسنت! حللت اللغز!
        </div>
      )}

      {/* Sudoku grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)',
        gap: '2px',
        border: `2px solid ${theme.primary}`,
        borderRadius: '12px', overflow: 'hidden',
        boxShadow: theme.shadow,
      }}>
        {board && board.map((row, ri) =>
          row.map((val, ci) => {
            const isFixed = puzzle[ri][ci] !== 0
            const isSel = selected && selected[0] === ri && selected[1] === ci
            const isErr = errors[`${ri}-${ci}`]
            const isSameBox = selected && Math.floor(selected[0]/3) === Math.floor(ri/3) && Math.floor(selected[1]/3) === Math.floor(ci/3)
            const isSameRowCol = selected && (selected[0] === ri || selected[1] === ci)
            const borderRight = (ci + 1) % 3 === 0 && ci !== 8 ? `2px solid ${theme.primary}66` : `1px solid ${theme.cardBorder}`
            const borderBottom = (ri + 1) % 3 === 0 && ri !== 8 ? `2px solid ${theme.primary}66` : `1px solid ${theme.cardBorder}`
            return (
              <div
                key={`${ri}-${ci}`}
                onClick={() => handleCellPress(ri, ci)}
                style={{
                  width: cellSize, height: cellSize,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: isFixed ? 800 : 600,
                  fontSize: 'clamp(0.85rem, 3vw, 1.1rem)',
                  color: isErr ? theme.error : isFixed ? theme.text : theme.primary,
                  background: isSel ? `${theme.primary}22`
                    : isErr ? `${theme.error}15`
                    : isSameBox || isSameRowCol ? theme.surface
                    : 'transparent',
                  borderRight, borderBottom,
                  cursor: isFixed ? 'default' : 'pointer',
                  transition: 'background 0.15s',
                  outline: isSel ? `2px solid ${theme.primary}` : 'none',
                  outlineOffset: '-2px',
                }}
              >
                {val !== 0 ? val : ''}
              </div>
            )
          })
        )}
      </div>

      {/* Number pad */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '340px' }}>
        {[1,2,3,4,5,6,7,8,9].map(n => (
          <button key={n} onClick={() => handleNumberInput(n)} style={{
            width: '44px', height: '44px', borderRadius: '10px',
            background: theme.card, border: `1px solid ${theme.cardBorder}`,
            color: theme.text, fontFamily: 'Cairo, sans-serif',
            fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = theme.primary}
            onMouseLeave={e => e.currentTarget.style.borderColor = theme.cardBorder}
          >
            {n}
          </button>
        ))}
        <button onClick={() => handleNumberInput(0)} style={{
          padding: '0 16px', height: '44px', borderRadius: '10px',
          background: theme.surface, border: `1px solid ${theme.cardBorder}`,
          color: theme.textMuted, fontFamily: 'Cairo, sans-serif',
          fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
        }}>
          مسح
        </button>
        <button onClick={useHint} disabled={hints === 0 || !selected} style={{
          padding: '0 16px', height: '44px', borderRadius: '10px',
          background: hints > 0 ? `${theme.accent}22` : theme.surface,
          border: `1px solid ${hints > 0 ? theme.accent : theme.cardBorder}`,
          color: hints > 0 ? theme.accent : theme.textSubtle,
          fontFamily: 'Cairo, sans-serif', fontWeight: 700,
          fontSize: '0.85rem', cursor: hints > 0 ? 'pointer' : 'not-allowed',
        }}>
          💡 تلميح ({hints})
        </button>
      </div>
    </div>
  )
}
