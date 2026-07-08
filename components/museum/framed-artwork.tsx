"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import type { Artwork } from "./artworks"
import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/LanguageContext"
import { asset } from "@/lib/asset-path"

type FramedArtworkProps = {
  artwork: Artwork
  /** Flip the layout so the plaque sits on the left */
  reverse?: boolean
  onSelectVideo?: (videoUrl: string) => void
}

const getFrameStyles = (type: "gallery" | "ash" | "floating" | "monumental") => {
  switch (type) {
    case "gallery":
      // Variation 1: "Gallery Minimalist" - Dark stone paspartú, thin black wooden frame, sutil gold bevel.
      return "bg-neutral-900 border-[8px] border-neutral-950 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.85)] ring-1 ring-gold/20"
    case "ash":
      // Variation 2: "Ash and Gold Bevel" - Deep black wood, wider border, gold inner frame highlight.
      return "bg-zinc-950 border-[12px] border-zinc-900 p-4 shadow-[0_35px_70px_rgba(0,0,0,0.9)] ring-1 ring-gold/40 shadow-inner"
    case "floating":
      // Variation 3: "Studio Floating Frame" - Suspended canvas illusion with black offset shadow gap.
      return "bg-neutral-950/60 p-2.5 shadow-[0_40px_80px_rgba(0,0,0,0.95)] ring-[8px] ring-neutral-800 ring-offset-[6px] ring-offset-black/90"
    default:
      return "border border-white/10 bg-neutral-950/40 p-1.5 drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
  }
}

export function FramedArtwork({ artwork, reverse = false, onSelectVideo }: FramedArtworkProps) {
  const { t } = useLanguage()
  const frameClass = getFrameStyles(artwork.frameType)

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

    const rotateX = normY * -12
    const rotateY = normX * 12

    setTiltStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)

    const glareX = 50 - normX * 60
    const glareY = 50 - normY * 60
    setGlareStyle(`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`)
  }

  const handleMouseLeave = () => {
    setTiltStyle("perspective(1000px) rotateX(0deg) rotateY(0deg)")
    setGlareStyle("radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)")
  }

  return (
    <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16 min-h-[75vh] py-12">
      {/* The framed painting */}
      <Reveal
        from="scale"
        className={cn("relative flex justify-center", reverse && "md:order-2")}
      >
        <div 
          ref={containerRef}
          onClick={() => onSelectVideo?.(artwork.video)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative cursor-pointer"
        >
          {/* Soft ambient backlight glow behind the frame */}
          <div 
            className={cn(
              "pointer-events-none absolute -inset-10 -z-10 rounded-full blur-2xl transition-all duration-1000 group-hover:opacity-100 group-hover:scale-110",
              isCentered ? "opacity-90 scale-105" : "opacity-30 scale-95"
            )}
            style={{ background: "radial-gradient(circle, rgba(197, 160, 89, 0.16) 0%, rgba(197, 160, 89, 0.02) 50%, transparent 80%)" }}
          />

          {/* Ceiling Spotlight physical cone of light */}
          <div 
            className={cn(
              "pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[75vh] w-[140%] -z-10 rounded-full blur-3xl transition-all duration-1000",
              isCentered ? "opacity-50" : "opacity-15"
            )}
            style={{
              background: "radial-gradient(circle at top, rgba(197, 160, 89, 0.14) 0%, transparent 60%)"
            }}
          />

          <div 
            style={{ transform: tiltStyle || "perspective(1000px) rotateX(0deg) rotateY(0deg)" }}
            className="relative w-[74vw] max-w-sm transition-transform duration-300 ease-out"
          >
            {/* Aspect box holding the artwork with dynamic frame styling */}
            <div className={cn("relative aspect-[4/5] w-full overflow-hidden rounded-sm transition-all duration-500", frameClass)}>
              <div className="relative h-full w-full overflow-hidden rounded-[1px] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                <Image
                  src={artwork.image || asset("/placeholder.svg")}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 768px) 74vw, 384px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Glass glare effect overlay */}
                <div 
                  className="pointer-events-none absolute inset-0 transition-all duration-300 ease-out opacity-60" 
                  style={{ background: glareStyle || "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)" }}
                />
              </div>
            </div>
          </div>

          {/* Little wall shadow under the artwork */}
          <div className="mx-auto mt-4 h-6 w-3/4 rounded-[100%] bg-black/60 blur-md" />

          {/* Brushed metal base panel integrated below the frame */}
          <div className="mx-auto -mt-1 w-[85%] max-w-[260px]">
            <div className="relative bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border-x border-t border-neutral-700/40 rounded-t-sm overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.7)]">
              {/* Metallic brushed texture overlay */}
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)"
              }} />
              {/* Inner bevel ring */}
              <div className="relative mx-4 my-3 px-3 py-2.5 border border-gold/10 rounded-sm bg-neutral-950/60 shadow-inner">
                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-gold/70 text-center">
                  INV. #{artwork.id.toUpperCase()}-2026
                </p>
                <p className="mt-1 font-serif text-base sm:text-lg font-bold tracking-wide text-gold text-center">
                  {artwork.title}
                </p>
                <p className="mt-0.5 font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-muted-foreground uppercase text-center">
                  Asier Iglesias Alconero
                </p>
              </div>
              {/* Gold LED strip across the bottom edge */}
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent shadow-[0_0_8px_rgba(197,160,89,0.3)]" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* The museum plaque / text */}
      <Reveal
        from={reverse ? "left" : "right"}
        delay={150}
        className={cn(reverse && "md:order-1 md:text-right")}
      >
        <div className={cn("max-w-xl", reverse && "md:ml-auto")}>
          <div
            className={cn(
              "mb-5 flex items-center gap-3",
              reverse && "md:flex-row-reverse",
            )}
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-gold/40 font-serif text-sm text-gold">
              {artwork.number}
            </span>
            <span className="h-px w-16 bg-gold/40" />
          </div>

          <h3 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {t("art_" + artwork.id + "_title")}
          </h3>

          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-gold/90">
            {t("art_" + artwork.id + "_year")} · {t("art_" + artwork.id + "_tech")}
          </p>

          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            {t("art_" + artwork.id + "_desc")}
          </p>
        </div>
      </Reveal>
    </article>
  )
}
