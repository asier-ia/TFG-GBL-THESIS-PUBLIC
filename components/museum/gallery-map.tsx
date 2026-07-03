"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/LanguageContext"

type RoomId = "hero" | "tech-hall" | "sala-uno" | "corredor" | "sala-dos" | "portal" | "atelier"

export function GalleryMap({ 
  showAtelier = false,
  onEnterAtelier,
  onExitAtelier
}: { 
  showAtelier?: boolean
  onEnterAtelier?: () => void
  onExitAtelier?: () => void
}) {
  const [activeRoom, setActiveRoom] = useState<RoomId>("hero")
  const { t } = useLanguage()

  useEffect(() => {
    if (showAtelier) {
      setActiveRoom("atelier")
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveRoom(entry.target.id as RoomId)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "-25% 0px -40% 0px", // Focus trigger on central area of the screen
      }
    )

    const sections = ["hero", "tech-hall", "sala-uno", "corredor", "sala-dos", "portal"]
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [showAtelier])

  const handleScrollTo = (id: RoomId) => {
    if (id === "atelier") {
      if (!showAtelier) {
        onEnterAtelier?.()
      }
      return
    }

    // If we are currently in El Atelier, close it before scrolling to another room
    if (showAtelier) {
      onExitAtelier?.()
    }

    const el = document.getElementById(id)
    if (el) {
      // Small timeout to allow the Atelier component to unmount so scroll rect calculations are exact
      setTimeout(() => {
        const offset = 80
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = el.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }, 50)
    }
  }

  // Coordinates of active dot on the SVG floor plan (height 370, spacing 56px for maximum breathing room)
  const dotCoords: Record<RoomId, { x: number; y: number }> = {
    hero: { x: 30, y: 20 },
    "tech-hall": { x: 30, y: 76 },
    "sala-uno": { x: 30, y: 132 },
    corredor: { x: 30, y: 188 },
    "sala-dos": { x: 30, y: 244 },
    portal: { x: 30, y: 300 },
    atelier: { x: 30, y: 356 }, // Disconnected floating room with full breathing space!
  }

  return (
    <div className="fixed bottom-6 left-6 z-[160] select-none hidden md:block bg-neutral-950/60 backdrop-blur-md border border-white/10 rounded-md p-4 shadow-2xl transition-all duration-500 hover:border-gold/30 hover:bg-neutral-950/80 group w-[110px]">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/80 mb-4 text-center">
        {t("map.title")}
      </p>

      <div className="relative w-full h-[375px]">
        {/* Architectural Vector Floor Plan SVG with disconnected room and breathing room */}
        <svg
          width="60"
          height="375"
          viewBox="0 0 60 375"
          className="mx-auto"
          fill="none"
          stroke="currentColor"
        >
          {/* Connected corridor path (ends at y=300, does NOT connect to y=356!) */}
          <line x1="30" y1="40" x2="30" y2="280" stroke="rgba(197, 160, 89, 0.15)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Vestíbulo / Entrance Hall (Circular Shape) */}
          <rect
            x="15"
            y="10"
            width="30"
            height="30"
            rx="15"
            fill="transparent"
            className={cn(
              "cursor-pointer pointer-events-auto transition-all duration-500 hover:stroke-gold/80",
              activeRoom === "hero" ? "stroke-gold fill-gold/5 stroke-[1.5]" : "stroke-neutral-800 hover:stroke-neutral-600 stroke-1"
            )}
            onClick={() => handleScrollTo("hero")}
          />

          {/* Gela Aurrekoa / Antechamber (Greek Temple Columns Shape) */}
          <g 
            className="cursor-pointer pointer-events-auto"
            onClick={() => handleScrollTo("tech-hall")}
          >
            {/* Click hit box */}
            <rect x="5" y="55" width="50" height="40" fill="transparent" stroke="none" />
            
            {/* Temple Roof */}
            <polygon
              points="5,66 30,54 55,66"
              className={cn(
                "transition-all duration-500",
                activeRoom === "tech-hall" ? "stroke-gold fill-gold/5 stroke-[1.5]" : "stroke-neutral-800 hover:stroke-neutral-600 stroke-1"
              )}
            />
            {/* Columns */}
            <line x1="15" y1="66" x2="15" y2="91" className={cn("transition-all duration-500", activeRoom === "tech-hall" ? "stroke-gold stroke-[1.5]" : "stroke-neutral-800 hover:stroke-neutral-600 stroke-1")} />
            <line x1="30" y1="66" x2="30" y2="91" className={cn("transition-all duration-500", activeRoom === "tech-hall" ? "stroke-gold stroke-[1.5]" : "stroke-neutral-800 hover:stroke-neutral-600 stroke-1")} />
            <line x1="45" y1="66" x2="45" y2="91" className={cn("transition-all duration-500", activeRoom === "tech-hall" ? "stroke-gold stroke-[1.5]" : "stroke-neutral-800 hover:stroke-neutral-600 stroke-1")} />
            {/* Temple Base */}
            <rect
              x="10"
              y="91"
              width="40"
              height="5"
              rx="1"
              className={cn(
                "transition-all duration-500",
                activeRoom === "tech-hall" ? "stroke-gold fill-gold/5 stroke-[1.5]" : "stroke-neutral-800 hover:stroke-neutral-600 stroke-1"
              )}
            />
          </g>

          {/* Sala Uno / Gallery (Great Rectangular Hall) */}
          <rect
            x="5"
            y="115"
            width="50"
            height="35"
            rx="2"
            fill="transparent"
            className={cn(
              "cursor-pointer pointer-events-auto transition-all duration-500 hover:stroke-gold/80",
              activeRoom === "sala-uno" ? "stroke-gold fill-gold/5 stroke-[1.5]" : "stroke-neutral-800 hover:stroke-neutral-600 stroke-1"
            )}
            onClick={() => handleScrollTo("sala-uno")}
          />

          {/* El Corredor / Transition Hall (Narrow corridor) */}
          <rect
            x="20"
            y="171"
            width="20"
            height="35"
            rx="1"
            fill="transparent"
            className={cn(
              "cursor-pointer pointer-events-auto transition-all duration-500 hover:stroke-gold/80",
              activeRoom === "corredor" ? "stroke-gold fill-gold/5 stroke-[1.5]" : "stroke-neutral-800 hover:stroke-neutral-600 stroke-1"
            )}
            onClick={() => handleScrollTo("corredor")}
          />

          {/* Sala Dos / Masterpiece Room (Circular Rotunda) */}
          <circle
            cx="30"
            cy="244"
            r="18"
            fill="transparent"
            className={cn(
              "cursor-pointer pointer-events-auto transition-all duration-500 hover:stroke-gold/80",
              activeRoom === "sala-dos" ? "stroke-gold fill-gold/5 stroke-[1.5]" : "stroke-neutral-800 hover:stroke-neutral-600 stroke-1"
            )}
            onClick={() => handleScrollTo("sala-dos")}
          />

          {/* El Atelier / Portal (Arched vaulted ceiling chamber) */}
          <path
            d="M 12 310 L 12 285 A 18 18 0 0 1 48 285 L 48 310 Z"
            fill="transparent"
            className={cn(
              "cursor-pointer pointer-events-auto transition-all duration-500 hover:stroke-gold/80",
              activeRoom === "portal" ? "stroke-gold fill-gold/5 stroke-[1.5]" : "stroke-neutral-800 hover:stroke-neutral-600 stroke-1"
            )}
            onClick={() => handleScrollTo("portal")}
          />

          {/* SECRET DISCONNECTED ROOM: El Atelier (Floating Golden Diamond / Rhombus) */}
          <polygon
            points="30,341 45,356 30,371 15,356"
            fill="transparent"
            className={cn(
              "cursor-pointer pointer-events-auto transition-all duration-500 hover:stroke-gold/80",
              activeRoom === "atelier" ? "stroke-gold fill-gold/5 stroke-[1.5]" : "stroke-neutral-800 hover:stroke-neutral-600 stroke-1"
            )}
            onClick={() => handleScrollTo("atelier")}
          />

          {/* Pulsing Visitor Locator Dot */}
          <circle
            cx={dotCoords[activeRoom].x}
            cy={dotCoords[activeRoom].y}
            r="3"
            className="fill-gold transition-all duration-500 ease-out"
          />
          <circle
            cx={dotCoords[activeRoom].x}
            cy={dotCoords[activeRoom].y}
            r="7"
            className="stroke-gold/50 fill-none animate-pulse transition-all duration-500 ease-out"
          />
        </svg>

        {/* Architectural labels showing on hover */}
        <div className="absolute left-full top-[5px] ml-3 bg-neutral-950/95 border border-white/10 rounded px-2 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[9px] tracking-wider text-gold shadow-md whitespace-nowrap z-50">
          {t("map.hero")}
        </div>
        <div className="absolute left-full top-[61px] ml-3 bg-neutral-950/95 border border-white/10 rounded px-2 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[9px] tracking-wider text-gold shadow-md whitespace-nowrap z-50">
          {t("map.tech_hall")}
        </div>
        <div className="absolute left-full top-[117px] ml-3 bg-neutral-950/95 border border-white/10 rounded px-2 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[9px] tracking-wider text-gold shadow-md whitespace-nowrap z-50">
          {t("map.sala_uno")}
        </div>
        <div className="absolute left-full top-[173px] ml-3 bg-neutral-950/95 border border-white/10 rounded px-2 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[9px] tracking-wider text-gold shadow-md whitespace-nowrap z-50">
          {t("map.corredor")}
        </div>
        <div className="absolute left-full top-[229px] ml-3 bg-neutral-950/95 border border-white/10 rounded px-2 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[9px] tracking-wider text-gold shadow-md whitespace-nowrap z-50">
          {t("map.sala_dos")}
        </div>
        <div className="absolute left-full top-[285px] ml-3 bg-neutral-950/95 border border-white/10 rounded px-2 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[9px] tracking-wider text-gold shadow-md whitespace-nowrap z-50">
          {t("map.portal")}
        </div>
        <div className="absolute left-full top-[341px] ml-3 bg-neutral-950/95 border border-white/10 rounded px-2 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[9px] tracking-wider text-gold shadow-md whitespace-nowrap z-50">
          {t("map.atelier")}
        </div>
      </div>
    </div>
  )
}
