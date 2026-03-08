import { useEffect, useRef } from 'react'

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
    const isDark = theme.id === 'dark'
    const dot = isDark ? '255,255,255' : '0,0,0'
    const D = 44
    let scanY = 0
    const draw = () => {
      ctx.clearRect(0,0,W,H)
      for (let x=D; x<W; x+=D) for (let y=D; y<H; y+=D) {
        ctx.beginPath(); ctx.arc(x,y,1,0,Math.PI*2)
        ctx.fillStyle=`rgba(${dot},0.1)`; ctx.fill()
      }
      scanY=(scanY+0.5)%H
      const g=ctx.createLinearGradient(0,scanY-80,0,scanY+80)
      g.addColorStop(0,`rgba(${dot},0)`)
      g.addColorStop(0.5,`rgba(${dot},0.02)`)
      g.addColorStop(1,`rgba(${dot},0)`)
      ctx.fillStyle=g; ctx.fillRect(0,scanY-80,W,160)
      animId=requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize',resize) }
  }, [theme.id])
  return <canvas ref={canvasRef} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none'}} />
}
