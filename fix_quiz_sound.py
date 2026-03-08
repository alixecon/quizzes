content = open('src/components/QuizScreen.jsx').read()

old = """export default function QuizScreen({ questions, difficulty, mode, theme:T, sounds, onFinish, onBack }) {"""
new = """export default function QuizScreen({ questions, difficulty, mode, theme:T, sounds, soundEnabled, onSoundToggle, onFinish, onBack }) {"""

old2 = """            onClick={() => sounds.toggle()}
            style={{
              padding:'6px 10px', borderRadius:'2px', cursor:'pointer',
              background:'transparent', border:`2px solid ${T.border}`,
              fontSize:'1rem', boxShadow:`2px 2px 0 ${T.border}`,
            }}
          >{sounds.enabled ? '🔊' : '🔇'}</button>"""

new2 = """            onClick={onSoundToggle}
            style={{
              padding:'6px 10px', borderRadius:'2px', cursor:'pointer',
              background:'transparent', border:`2px solid ${T.border}`,
              fontSize:'1rem', boxShadow:`2px 2px 0 ${T.border}`,
            }}
          >{soundEnabled ? '🔊' : '🔇'}</button>"""

content = content.replace(old, new, 1)
content = content.replace(old2, new2, 1)
open('src/components/QuizScreen.jsx', 'w').write(content)
print('Done')
