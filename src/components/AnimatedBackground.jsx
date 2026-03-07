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
    const dotColor = isDark ? '232,255,71' : '0,0,0'
    const lineColor = isDark ? '255,255,255' : '0,0,0'

    // Sparse dot grid
    const DOT_SPACING = 40
    let scanY = 0

    const draw = () => {
      ctx.clearRect(0,0,W,H)

      // Dot grid
      for (let x = DOT_SPACING; x < W; x += DOT_SPACING) {
        for (let y = DOT_SPACING; y < H; y += DOT_SPACING) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI*2)
          ctx.fillStyle = `rgba(${dotColor},0.12)`
          ctx.fill()
        }
      }

      // Moving horizontal scanline
      scanY = (scanY + 0.6) % H
      const grad = ctx.createLinearGradient(0, scanY-60, 0, scanY+60)
      grad.addColorStop(0,   `rgba(${lineColor},0)`)
      grad.addColorStop(0.5, `rgba(${lineColor},0.025)`)
      grad.addColorStop(1,   `rgba(${lineColor},0)`)
      ctx.fillStyle = grad
      ctx.fillRect(0, scanY-60, W, 120)

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [theme.id])

  return <canvas ref={canvasRef} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }} />
}
