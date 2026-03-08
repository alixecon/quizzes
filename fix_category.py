content = open('src/components/CategorySelect.jsx').read()

# 1) Add sounds prop in signature
content = content.replace(
"export default function CategorySelect({ theme:T, onSelect, onBack }) {",
"export default function CategorySelect({ theme:T, sounds, onSelect, onBack }) {",
1
)

# 2) Remove the old handleRandom (the one without sounds)
old_hr = """  const handleRandom = () => {
    if (spinning) return
    setSpinning(true)
    let count = 0
    const iv = setInterval(() => {
      setHighlighted(CATEGORIES[Math.floor(Math.random()*CATEGORIES.length)].id)
      count++
      if (count >= 16) {
        clearInterval(iv)
        const winner = CATEGORIES[Math.floor(Math.random()*CATEGORIES.length)]
        setHighlighted(winner.id)
        setSpinning(false)
        setTimeout(()=>{ setHighlighted(null); onSelect(winner.id) }, 900)
      }
    }, 100)
  }
"""
content = content.replace(old_hr, "", 1)

# 3) Insert the new handleRandom (with sounds) right after highlighted state
marker = "  const [highlighted, setHighlighted]= useState(null)\n\n\n"
new_hr = """  const handleRandom = () => {
    if (spinning) return
    setSpinning(true)
    sounds?.randomSpin && sounds.randomSpin()

    let count = 0
    const iv = setInterval(() => {
      setHighlighted(CATEGORIES[Math.floor(Math.random()*CATEGORIES.length)].id)
      count++
      if (count >= 16) {
        clearInterval(iv)
        const winner = CATEGORIES[Math.floor(Math.random()*CATEGORIES.length)]
        setHighlighted(winner.id)
        setSpinning(false)
        setTimeout(()=>{ setHighlighted(null); onSelect(winner.id) }, 900)
        sounds?.start && sounds.start()
      }
    }, 100)
  }\n\n"""
content = content.replace(marker, marker + new_hr, 1)

open('src/components/CategorySelect.jsx','w').write(content)
print('Done')
