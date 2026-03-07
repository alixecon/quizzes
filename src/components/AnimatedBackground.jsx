import { useEffect, useRef } from 'react'

function hexToRgb(hex) {
  if (!hex || hex.length < 7) return '255,255,255'
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return `${r},${g},${b}`
}

export default function AnimatedBackground({ theme }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)

    const c1 = hexToRgb(theme.bgOrb1 || theme.primary)
    const c2 = hexToRgb(theme.bgOrb2 || theme.secondary)
    const c3 = hexToRgb(theme.bgOrb3 || theme.accent)
    const cg = hexToRgb(theme.bgGrid || theme.primary)

    const orbs = [
      { x: W*0.12, y: H*0.18, r: 260, vx: 0.22,  vy: 0.14,  color: c1, alpha: 0.13 },
      { x: W*0.82, y: H*0.55, r: 300, vx: -0.16, vy: 0.12,  color: c2, alpha: 0.10 },
      { x: W*0.50, y: H*0.88, r: 200, vx: 0.12,  vy: -0.18, color: c3, alpha: 0.09 },
      { x: W*0.70, y: H*0.15, r: 160, vx: -0.20, vy: 0.20,  color: c1, alpha: 0.07 },
    ]

    const PTOTAL = 60
    const pts = Array.from({ length: PTOTAL }, (_, i) => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.45, vy: (Math.random()-0.5)*0.45,
      r: Math.random()*1.6+0.4,
      a: Math.random()*0.45+0.08,
      color: i%3===0 ? c1 : i%3===1 ? c2 : c3,
    }))

    const GS = 65
    let go = 0

    const draw = () => {
      ctx.clearRect(0,0,W,H)

      // Grid
      go = (go + 0.25) % GS
      ctx.lineWidth = 0.5
      ctx.strokeStyle = `rgba(${cg},0.035)`
      for (let x = 0; x < W+GS; x += GS) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke() }
      for (let y = -GS+go; y < H+GS; y += GS) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke() }

      // Orbs
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy
        if (o.x < -o.r || o.x > W+o.r) o.vx *= -1
        if (o.y < -o.r || o.y > H+o.r) o.vy *= -1
        const g = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r)
        g.addColorStop(0,   `rgba(${o.color},${o.alpha*2.8})`)
        g.addColorStop(0.4, `rgba(${o.color},${o.alpha})`)
        g.addColorStop(1,   `rgba(${o.color},0)`)
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(o.x,o.y,o.r,0,Math.PI*2); ctx.fill()
      })

      // Particles + connections
      pts.forEach((p,i) => {
        p.x += p.vx; p.y += p.vy
        if (p.x<0) p.x=W; if (p.x>W) p.x=0
        if (p.y<0) p.y=H; if (p.y>H) p.y=0
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle = `rgba(${p.color},${p.a})`; ctx.fill()
        for (let j=i+1; j<pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x-q.x,p.y-q.y)
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y)
            ctx.strokeStyle = `rgba(${p.color},${(1-d/110)*0.1})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [theme.id])

  return <canvas ref={canvasRef} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }} />
}
