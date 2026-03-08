content = open('src/components/CategorySelect.jsx').read()

# Remove the first (old) handleRandom without sounds
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
if old_hr in content:
  content = content.replace(old_hr, "", 1)

open('src/components/CategorySelect.jsx','w').write(content)
print('Done')
