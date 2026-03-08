content = open('src/components/QuizScreen.jsx').read()

old = """export default function QuizScreen({ questions, difficulty, mode, theme:T, sounds, onFinish }) {"""
new = """export default function QuizScreen({ questions, difficulty, mode, theme:T, sounds, onFinish, onBack }) {"""

old2 = """      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
        <div style={{
          padding:'6px 14px', borderRadius:'2px',
          background:T.bgCard, border:`2px solid ${T.border}`,
          color:T.text, fontFamily:'IBM Plex Mono,monospace', fontWeight:700, fontSize:'0.82rem',
          boxShadow:`2px 2px 0 ${T.border}`,
        }}>
          {idx+1} / {questions.length}
        </div>
        <div style={{
          padding:'6px 16px', borderRadius:'2px',
          background:T.primary, border:`2px solid ${T.primary}`,
          color:T.primaryText, fontFamily:'Tajawal,sans-serif', fontWeight:800, fontSize:'0.9rem',
          boxShadow:`2px 2px 0 ${T.border}`,
        }}>
          {score} نقطة
        </div>
      </div>"""

new2 = """      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px', gap:'8px' }}>
        <button
          onClick={onBack}
          style={{
            padding:'6px 12px', borderRadius:'2px', cursor:'pointer',
            background:'transparent', border:`2px solid ${T.border}`,
            color:T.textMuted, fontFamily:'IBM Plex Mono,monospace', fontSize:'0.8rem',
            boxShadow:`2px 2px 0 ${T.border}`,
          }}
        >← back</button>
        <div style={{
          padding:'6px 14px', borderRadius:'2px',
          background:T.bgCard, border:`2px solid ${T.border}`,
          color:T.text, fontFamily:'IBM Plex Mono,monospace', fontWeight:700, fontSize:'0.82rem',
          boxShadow:`2px 2px 0 ${T.border}`,
        }}>
          {idx+1} / {questions.length}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <button
            onClick={() => sounds.toggle()}
            style={{
              padding:'6px 10px', borderRadius:'2px', cursor:'pointer',
              background:'transparent', border:`2px solid ${T.border}`,
              fontSize:'1rem', boxShadow:`2px 2px 0 ${T.border}`,
            }}
          >{sounds.enabled ? '🔊' : '🔇'}</button>
          <div style={{
            padding:'6px 16px', borderRadius:'2px',
            background:T.primary, border:`2px solid ${T.primary}`,
            color:T.primaryText, fontFamily:'Tajawal,sans-serif', fontWeight:800, fontSize:'0.9rem',
            boxShadow:`2px 2px 0 ${T.border}`,
          }}>
            {score} نقطة
          </div>
        </div>
      </div>"""

content = content.replace(old, new, 1)
content = content.replace(old2, new2, 1)
open('src/components/QuizScreen.jsx', 'w').write(content)
print('Done')
