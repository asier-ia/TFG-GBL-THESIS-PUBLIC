"use client"

import { useEffect, useState } from "react"

type Mote = {
  id: number
  left: string
  top: string
  size: number
  dur: number
  delay: number
}

export function DustMotes({ count = 12 }: { count?: number }) {
  const [motes, setMotes] = useState<Mote[]>([])

  useEffect(() => {
    // Generate particles on client side to avoid Next.js hydration mismatches
    const generated: Mote[] = []
    for (let i = 0; i < count; i++) {
      const left = `${(i * 17 + 7) % 95}%`
      const top = `${(i * 23 + 13) % 90}%`
      const size = (i % 3) + 2 // 2px to 4px
      const dur = 6 + (i % 5) * 1.5 // 6s to 12s
      const delay = (i % 4) * 0.8
      generated.push({ id: i, left, top, size, dur, delay })
    }
    setMotes(generated)
  }, [count])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {motes.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-gold transition-all duration-300"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animation: `floatDust ${d.dur}s ease-in-out ${d.delay}s infinite`,
            opacity: "calc(0.20 + var(--audio-pulse, 0) * 0.35)",
            scale: "calc(1 + var(--audio-pulse, 0) * 0.4)",
          }}
        />
      ))}
    </div>
  )
}
