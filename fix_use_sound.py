content = open('src/hooks/useSound.js').read()

insert_point = "  const sounds = {\n"
if insert_point not in content:
    raise SystemExit("sounds object not found")

# add randomSpin helper before sounds object
helper = """
  const randomSpin = useCallback(() => {
    if (!enabled) return
    const base = 320
    const steps = 10
    const gap = 90
    for (let i = 0; i < steps; i++) {
      const f = base + i * 40
      const v = 0.08 + i * 0.01
      setTimeout(() => playTone(f, 0.09, 'sine', v), i * gap)
    }
  }, [enabled, playTone])
"""

if "randomSpin = useCallback" not in content:
    content = content.replace("  const sounds = {", helper + "\n  const sounds = {", 1)

# add randomSpin to the sounds object if missing
if "randomSpin," not in content:
    content = content.replace(
"    complete: () => {",
"    complete: () => {",
1
)
    content = content.replace(
"    complete: () => {",
"    complete: () => {\n      [523, 659, 784, 1046].forEach((f, i) =>\n        setTimeout(() => playTone(f, 0.22, 'sine', 0.18), i * 120)\n      )\n    },\n    randomSpin,\n",
1
)

open('src/hooks/useSound.js','w').write(content)
print('Done')
