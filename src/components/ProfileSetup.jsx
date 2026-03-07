import { useState } from 'react'

const FACES       = ['😊','😎','🤩','😄','🥳','😤','🧐','🤓','😏','🥸','🦁','🐯','🦊','🐺','🦅','🐉']
const ACCESSORIES = ['none','🎩','👑','⛑️','🎓','🪖','🧢','👒','🕶️','🎭']
const BACKGROUNDS = ['🌌','🌊','🏜️','🌲','🌆','🚀','⚡','🔥','💫']

function buildAvatarStr(face, acc) {
  return acc !== 'none' ? `${acc}${face}` : face
}

export default function ProfileSetup({ initialProfile, theme:T, onSave }) {
  const init = initialProfile?.avatarObj || { face:'😎', acc:'👑', bg:'🌌' }
  const [name,  setName]  = useState(initialProfile?.name || '')
  const [face,  setFace]  = useState(init.face)
  const [acc,   setAcc]   = useState(init.acc || 'none')
  const [bg,    setBg]    = useState(init.bg  || '🌌')
  const [error, setError] = useState('')
  const [tab,   setTab]   = useState('face')

  const save = () => {
    const t = name.trim()
    if (!t)        { setError('يرجى إدخال اسمك'); return }
    if (t.length<2){ setError('الاسم قصير جداً'); return }
    onSave({ name:t, avatar:buildAvatarStr(face,acc), avatarObj:{face,acc,bg}, bestScore:initialProfile?.bestScore||0 })
  }

  const Row = ({items, selected, onSelect}) => (
    <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
      {items.map(it=>(
        <button key={it} onClick={()=>onSelect(it)} style={{
          width:'44px', height:'44px', fontSize:'1.4rem', borderRadius:'2px', cursor:'pointer',
          border:`2px solid ${it===selected ? T.primary : T.border}`,
          background: it===selected ? `${T.primary}22` : T.bgCard,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow: it===selected ? `2px 2px 0 ${T.primary}` : 'none',
          transition:'all 0.1s',
        }}>
          {it==='none'?'✕':it}
        </button>
      ))}
    </div>
  )

  return (
    <div style={{ minHeight:'100dvh', background:T.bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px 20px' }}>

      {/* Back button */}
      <div style={{ width:'100%', maxWidth:'420px', marginBottom:'16px' }}>
        <button onClick={()=>onSave(initialProfile||null)} style={{
          background:'transparent', border:`2px solid ${T.border}`, borderRadius:'2px',
          color:T.textMuted, fontFamily:'Tajawal,sans-serif', fontWeight:700,
          padding:'8px 16px', cursor:'pointer', fontSize:'0.9rem',
          boxShadow:`2px 2px 0 ${T.border}`,
        }}>
          ← رجوع
        </button>
      </div>

      <div style={{ width:'100%', maxWidth:'420px' }}>
        <h2 style={{ fontFamily:'Tajawal,sans-serif', fontWeight:900, fontSize:'2rem', color:T.text, marginBottom:'4px' }}>
          {initialProfile ? 'تعديل الملف ✏️' : 'إنشاء الملف 👤'}
        </h2>
        <p style={{ color:T.textMuted, fontSize:'0.88rem', marginBottom:'24px', fontFamily:'IBM Plex Mono,monospace' }}>
          BUILD YOUR CHARACTER
        </p>

        {/* Preview */}
        <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'24px',
          padding:'16px', background:T.bgCard, border:`2px solid ${T.border}`, borderRadius:'2px', boxShadow:T.shadowCard }}>
          <div style={{
            width:'64px', height:'64px', borderRadius:'2px',
            background:T.bgElevated, border:`2px solid ${T.primary}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'2rem', flexShrink:0, position:'relative', overflow:'hidden',
            boxShadow:`3px 3px 0 ${T.primary}`,
          }}>
            <span style={{ position:'absolute', fontSize:'2.5rem', opacity:0.15 }}>{bg}</span>
            <span style={{ position:'relative', zIndex:1 }}>
              {acc!=='none'&&<span style={{fontSize:'1.2rem',display:'block',textAlign:'center',lineHeight:1}}>{acc}</span>}
              <span style={{fontSize:'1.8rem',display:'block',textAlign:'center',lineHeight:1}}>{face}</span>
            </span>
          </div>
          <div>
            <div style={{ color:T.text, fontFamily:'Tajawal,sans-serif', fontWeight:800, fontSize:'1.1rem' }}>{name||'اسمك هنا'}</div>
            <div style={{ color:T.textMuted, fontFamily:'IBM Plex Mono,monospace', fontSize:'0.72rem', marginTop:'2px' }}>BEST: {initialProfile?.bestScore||0}pts</div>
          </div>
        </div>

        {/* Name */}
        <div style={{ marginBottom:'20px' }}>
          <label style={{ display:'block', color:T.textMuted, fontFamily:'IBM Plex Mono,monospace', fontSize:'0.75rem', letterSpacing:'0.08em', marginBottom:'8px' }}>
            DISPLAY NAME
          </label>
          <input value={name} onChange={e=>{setName(e.target.value);setError('')}} placeholder="أدخل اسمك..." maxLength={20}
            style={{
              width:'100%', padding:'14px 16px', borderRadius:'2px',
              border:`2px solid ${error?T.error:T.border}`, background:T.bgCard,
              color:T.text, fontSize:'1rem', fontFamily:'Tajawal,sans-serif', outline:'none',
              boxShadow:`3px 3px 0 ${error?T.error:T.border}`,
            }}
            onFocus={e=>e.target.style.borderColor=T.primary}
            onBlur={e=>e.target.style.borderColor=error?T.error:T.border}
          />
          {error&&<div style={{color:T.error,fontSize:'0.8rem',marginTop:'4px'}}>{error}</div>}
        </div>

        {/* Builder tabs */}
        <div style={{ display:'flex', gap:'8px', marginBottom:'14px' }}>
          {[['face','😊 وجه'],['acc','🎩 إكسسوار'],['bg','🌌 خلفية']].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{
              flex:1, padding:'9px', borderRadius:'2px', cursor:'pointer',
              fontFamily:'Tajawal,sans-serif', fontWeight:700, fontSize:'0.8rem',
              border:`2px solid ${tab===id?T.primary:T.border}`,
              background:tab===id?T.primary:'transparent',
              color:tab===id?T.primaryText:T.textMuted,
              boxShadow:tab===id?`2px 2px 0 ${T.border}`:'none',
            }}>{label}</button>
          ))}
        </div>

        <div style={{ padding:'16px', background:T.bgCard, border:`2px solid ${T.border}`, borderRadius:'2px', marginBottom:'20px', boxShadow:T.shadowCard }}>
          {tab==='face' && <Row items={FACES}       selected={face} onSelect={setFace} />}
          {tab==='acc'  && <Row items={ACCESSORIES} selected={acc}  onSelect={setAcc}  />}
          {tab==='bg'   && <Row items={BACKGROUNDS} selected={bg}   onSelect={setBg}   />}
        </div>

        {/* Save */}
        <button onClick={save} style={{
          width:'100%', padding:'18px', borderRadius:'2px', cursor:'pointer',
          fontFamily:'Tajawal,sans-serif', fontWeight:900, fontSize:'1.15rem',
          background:T.primary, color:T.primaryText,
          border:`2px solid ${T.primary}`, boxShadow:T.shadowCard,
          transition:'transform 0.1s, box-shadow 0.1s',
        }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translate(-2px,-2px)';e.currentTarget.style.boxShadow=`7px 7px 0 ${T.secondary}`}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translate(0,0)';e.currentTarget.style.boxShadow=T.shadowCard}}
        >
          حفظ الملف ✓
        </button>
      </div>
    </div>
  )
}
