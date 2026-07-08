"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { obraMaestra } from "./artworks"
import { Reveal } from "./reveal"
import { useLanguage } from "@/lib/LanguageContext"
import { cn } from "@/lib/utils"
import { asset } from "@/lib/asset-path"

type MasterpieceProps = {
  onSelectVideo?: (videoUrl: string) => void
}

export function Masterpiece({ onSelectVideo }: MasterpieceProps) {
  const { t } = useLanguage()
  const art = obraMaestra

  const [tiltStyle, setTiltStyle] = useState<string>("")
  const [glareStyle, setGlareStyle] = useState<string>("")
  const [isCentered, setIsCentered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsCentered(entry.isIntersecting)
        })
      },
      {
        threshold: 0,
        rootMargin: "-25% 0px -25% 0px", // Centered trigger range
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const w = rect.width
    const h = rect.height

    const normX = x / w - 0.5
    const normY = y / h - 0.5

    const rotateX = normY * -8 // Slightly lower angle because it is widescreen and monumental
    const rotateY = normX * 8

    setTiltStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)

    const glareX = 50 - normX * 60
    const glareY = 50 - normY * 60
    setGlareStyle(`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`)
  }

  const handleMouseLeave = () => {
    setTiltStyle("perspective(1000px) rotateX(0deg) rotateY(0deg)")
    setGlareStyle("radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04) 0%, transparent 60%)")
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Reveal from="scale" className="group relative">
        {/* Majestic wide ambient backlight glow behind the masterpiece */}
        <div 
          className={cn(
            "pointer-events-none absolute -inset-20 -z-10 rounded-full blur-3xl transition-all duration-1000 group-hover:opacity-95 group-hover:scale-105",
            isCentered ? "opacity-85 scale-102" : "opacity-30 scale-95"
          )}
          style={{ background: "radial-gradient(circle, rgba(197, 160, 89, 0.20) 0%, rgba(197, 160, 89, 0.02) 50%, transparent 80%)" }}
        />

        {/* Ceiling Spotlight physical cone of light */}
        <div 
          className={cn(
            "pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 h-[80vh] w-[130%] -z-10 rounded-full blur-3xl transition-all duration-1000",
            isCentered ? "opacity-45" : "opacity-15"
          )}
          style={{
            background: "radial-gradient(circle at top, rgba(197, 160, 89, 0.16) 0%, transparent 55%)"
          }}
        />

        <div 
          ref={containerRef}
          onClick={() => onSelectVideo?.(art.video)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative cursor-pointer"
        >
          {/* Monumental Frame of Honor holding the masterpiece */}
          <div 
            style={{ transform: tiltStyle || "perspective(1000px) rotateX(0deg) rotateY(0deg)" }}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-neutral-950 border-[16px] border-neutral-900 p-8 shadow-[0_50px_100px_rgba(0,0,0,0.95)] ring-2 ring-gold/40 ring-offset-2 ring-offset-neutral-950 transition-transform duration-300 ease-out"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1px] shadow-[inset_0_0_30px_rgba(0,0,0,0.95)]">
              <Image
                src={art.image || asset("/placeholder.svg")}
                alt={art.title}
                fill
                sizes="(max-width: 1024px) 92vw, 1024px"
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              {/* Glass glare effect overlay */}
              <div 
                className="pointer-events-none absolute inset-0 transition-all duration-300 ease-out opacity-50" 
                style={{ background: glareStyle || "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04) 0%, transparent 60%)" }}
              />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-6 h-8 w-2/3 rounded-[100%] bg-black/75 blur-xl" />

        {/* Brushed metal base panel - monumental scale */}
        <div className="mx-auto -mt-2 w-[90%] max-w-[400px]">
          <div className="relative bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border-x border-t border-neutral-700/40 rounded-t-sm overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.8)]">
            {/* Metallic brushed texture overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)"
            }} />
            {/* Inner bevel ring */}
            <div className="relative mx-5 my-4 px-4 py-3 border border-gold/10 rounded-sm bg-neutral-950/60 shadow-inner">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-gold/70 text-center">
                INV. #{art.id.toUpperCase()}-2026
              </p>
              <p className="mt-1 font-serif text-lg sm:text-2xl font-bold tracking-wide text-gold text-center">
                {art.title}
              </p>
              <p className="mt-0.5 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-muted-foreground uppercase text-center">
                Asier Iglesias Alconero
              </p>
            </div>
            {/* Gold LED strip - wider for monumental */}
            <div className="h-[4px] w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent shadow-[0_0_12px_rgba(197,160,89,0.4)]" />
          </div>
        </div>
      </Reveal>

      <Reveal delay={200} className="mx-auto mt-14 max-w-2xl text-center">
        <div className="mx-auto mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gold/50" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            {t("masterpiece_tag")}
          </span>
          <span className="h-px w-12 bg-gold/50" />
        </div>

        <h3 className="text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-6xl">
          {t("art_" + art.id + "_title")}
        </h3>

        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-gold/90">
          {t("art_" + art.id + "_year")} · {t("art_" + art.id + "_tech")}
        </p>

        <p className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {t("art_" + art.id + "_desc")}
        </p>
      </Reveal>
    </div>
  )
}
