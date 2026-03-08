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

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    // Parse primary color to rgba
    const hex = theme.primary
    const r = parseInt(hex.slice(1,3),16)
    const g = parseInt(hex.slice(3,5),16)
    const b = parseInt(hex.slice(5,7),16)
    const primaryRgb = `${r},${g},${b}`

    const secHex = theme.secondary || '#5ac8fa'
    const r2 = parseInt(secHex.slice(1,3),16)
    const g2 = parseInt(secHex.slice(3,5),16)
    const b2 = parseInt(secHex.slice(5,7),16)
    const secondaryRgb = `${r2},${g2},${b2}`

    // Particles
    const PARTICLE_COUNT = 55
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      color: i % 3 === 0 ? primaryRgb : i % 3 === 1 ? secondaryRgb : '255,255,255',
    }))

    // Orbs
    const orbs = [
      { x: W * 0.15, y: H * 0.2,  radius: 180, vx: 0.18, vy: 0.12, color: primaryRgb,   alpha: 0.08 },
      { x: W * 0.8,  y: H * 0.6,  radius: 220, vx: -0.14,vy: 0.1,  color: secondaryRgb, alpha: 0.07 },
      { x: W * 0.5,  y: H * 0.85, radius: 150, vx: 0.1,  vy: -0.15,color: primaryRgb,   alpha: 0.06 },
    ]

    // Grid lines
    const GRID_SPACING = 60
    const gridAlpha = 0.04
    let gridOffset = 0

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Scrolling perspective grid
      gridOffset = (gridOffset + 0.3) % GRID_SPACING
      ctx.strokeStyle = `rgba(${primaryRgb},${gridAlpha})`
      ctx.lineWidth = 0.5
      // Vertical lines
      for (let x = -GRID_SPACING; x < W + GRID_SPACING; x += GRID_SPACING) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      // Horizontal lines with perspective drift
      for (let y = -GRID_SPACING + gridOffset; y < H + GRID_SPACING; y += GRID_SPACING) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // Glowing orbs
      orbs.forEach(orb => {
        orb.x += orb.vx; orb.y += orb.vy
        if (orb.x < -orb.radius || orb.x > W + orb.radius) orb.vx *= -1
        if (orb.y < -orb.radius || orb.y > H + orb.radius) orb.vy *= -1
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        grad.addColorStop(0,   `rgba(${orb.color},${orb.alpha * 2.5})`)
        grad.addColorStop(0.4, `rgba(${orb.color},${orb.alpha})`)
        grad.addColorStop(1,   `rgba(${orb.color},0)`)
        ctx.fillStyle = grad
        ctx.beginPath(); ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2); ctx.fill()
      })

      // Particles + connections
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`
        ctx.fill()

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q    = particles[j]
          const dist = Math.hypot(p.x - q.x, p.y - q.y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${p.color},${(1 - dist / 100) * 0.12})`
            ctx.lineWidth   = 0.5
            ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [theme.primary, theme.secondary])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        pointerEvents: 'none', opacity: 1,
      }}
    />
  )
}
