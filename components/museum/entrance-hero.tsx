"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/LanguageContext"
import { asset } from "@/lib/asset-path"

export function EntranceHero() {
  const { t } = useLanguage()

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Scroll 4 - Boceto de tiza blanca en la pared izquierda del Hero */}
      <div 
        style={{ transform: "translateY(calc(var(--scroll-y, 0) * -0.08px)) rotate(3deg)" }}
        className="absolute left-[6vw] top-[40%] z-0 select-none pointer-events-auto cursor-default opacity-35 hover:opacity-75 transition-opacity duration-1000 hidden sm:block"
      >
        <Image
          src={asset("/scroll/scroll-4.png")}
          alt="Scroll ornament 4"
          width={300}
          height={224}
          className="w-24 sm:w-32 md:w-36 h-auto object-contain"
        />
      </div>

      {/* Ceiling spotlight */}
      <div className="spotlight pointer-events-none absolute inset-x-0 -top-20 h-[60vh]" />

      {/* Floating dust motes in the light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {DUST.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gold/40"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              animation: `floatDust ${d.dur}s ease-in-out ${d.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-gold">
          {t("hero.badge")}
        </p>

        <h1 className="text-balance font-serif text-5xl font-bold leading-[0.95] text-foreground text-shadow-soft sm:text-7xl md:text-8xl">
          {t("hero.title1")}
          <span className="mt-2 block italic text-gold">{t("hero.title2")}</span>
        </h1>

        <p className="mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          {t("hero.desc")}
        </p>

        <button
          onClick={() => {
            const el = document.getElementById("tech-hall")
            if (el) {
              const offset = 80
              const bodyRect = document.body.getBoundingClientRect().top
              const elementRect = el.getBoundingClientRect().top
              const elementPosition = elementRect - bodyRect
              const offsetPosition = elementPosition - offset

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              })
            }
          }}
          className="group mt-12 inline-flex items-center gap-3 rounded-full border border-gold/50 bg-gold/5 px-8 py-4 font-mono text-sm uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-gold-foreground cursor-pointer"
        >
          {t("hero.btn")}
          <span className="transition-transform duration-300 group-hover:translate-y-1">
            ↓
          </span>
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {t("hero.scroll")}
      </div>
    </section>
  )
}

const DUST = [
  { left: "12%", top: "22%", size: 4, dur: 6, delay: 0 },
  { left: "78%", top: "30%", size: 3, dur: 7, delay: 1 },
  { left: "35%", top: "15%", size: 5, dur: 8, delay: 0.5 },
  { left: "62%", top: "48%", size: 3, dur: 6.5, delay: 1.5 },
  { left: "24%", top: "55%", size: 4, dur: 9, delay: 2 },
  { left: "88%", top: "60%", size: 2, dur: 7.5, delay: 0.8 },
  { left: "50%", top: "38%", size: 3, dur: 8.5, delay: 1.2 },
]
