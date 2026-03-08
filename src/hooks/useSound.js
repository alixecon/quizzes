import { useCallback } from 'react'

export function useSound(enabled) {
  const ctx = useCallback(() => {
    try { return new (window.AudioContext || window.webkitAudioContext)() }
    catch { return null }
  }, [])

  const playTone = useCallback((frequency, duration, type = 'sine', volume = 0.18) => {
    if (!enabled) return
    const audioCtx = ctx()
    if (!audioCtx) return
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.type = type
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime)
    gain.gain.setValueAtTime(volume, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)
    osc.start(audioCtx.currentTime)
    osc.stop(audioCtx.currentTime + duration)
  }, [enabled, ctx])

  const randomSpin = useCallback(() => {
    if (!enabled) return
    const base = 320
    const steps = 10
    const gap = 90   // ms
    for (let i = 0; i < steps; i++) {
      const f = base + i * 40         // rising pitch
      const v = 0.08 + i * 0.01       // slightly louder
      setTimeout(() => playTone(f, 0.09, 'sine', v), i * gap)
    }
  }, [enabled, playTone])

  const sounds = {
    correct: () => {
      playTone(523, 0.15, 'sine', 0.2)
      setTimeout(() => playTone(659, 0.15, 'sine', 0.2), 120)
      setTimeout(() => playTone(784, 0.25, 'sine', 0.2), 240)
    },
    wrong: () => {
      playTone(200, 0.12, 'sawtooth', 0.15)
      setTimeout(() => playTone(150, 0.2, 'sawtooth', 0.12), 100)
    },
    click: () => playTone(440, 0.06, 'sine', 0.08),
    start: () => {
      [261, 329, 392, 523].forEach((f, i) =>
        setTimeout(() => playTone(f, 0.18, 'sine', 0.15), i * 100)
      )
    },
    complete: () => {
      [523, 659, 784, 1046].forEach((f, i) =>
        setTimeout(() => playTone(f, 0.22, 'sine', 0.18), i * 120)
      )
    },
    randomSpin,   // ← new
  }

  return sounds
}
