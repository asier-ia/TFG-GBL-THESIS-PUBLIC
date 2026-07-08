"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { EntranceHero } from "@/components/museum/entrance-hero"
import { FramedArtwork } from "@/components/museum/framed-artwork"
import { Masterpiece } from "@/components/museum/masterpiece"
import { Reveal } from "@/components/museum/reveal"
import { salaUno } from "@/components/museum/artworks"
import { LanguageProvider, useLanguage } from "@/lib/LanguageContext"
import { cn } from "@/lib/utils"
import { GalleryMap } from "@/components/museum/gallery-map"
import { DustMotes } from "@/components/museum/dust-motes"
import { AudioProvider, useAudio } from "@/lib/AudioContext"

const TECHNOLOGIES = [
  {
    name: "React",
    svg: (
      <svg viewBox="-10.5 -9.45 21 18.9" className="size-10 stroke-sky-400 fill-none stroke-[1]">
        <ellipse rx="10" ry="3.7"/>
        <ellipse rx="10" ry="3.7" transform="rotate(60)"/>
        <ellipse rx="10" ry="3.7" transform="rotate(120)"/>
        <circle r="0.9" className="fill-sky-400 stroke-none"/>
      </svg>
    )
  },
  { name: "Vite", icon: "/icons/vite.webp" },
  { name: "Tailwind", icon: "/icons/tailwind.webp" },
  { name: "Qdrant", icon: "/icons/qdrant.png" },
  { name: "Crawl4AI", icon: "/icons/crawl4ai.svg" },
  { name: "DB", icon: "/icons/db.svg" },
  { name: "LangChain", icon: "/icons/langchain.png" },
  { name: "LangGraph", icon: "/icons/langGraph.png" },
  { name: "Python", icon: "/icons/python.webp" },
  { name: "FastAPI", icon: "/icons/fastapi.webp" }
]

export default function Page() {
  return (
    <LanguageProvider>
      <AudioProvider>
        <MainContent />
      </AudioProvider>
    </LanguageProvider>
  )
}

function MainContent() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const { language, setLanguage, t } = useLanguage()
  const { isPlaying, togglePlay, volume, setVolume } = useAudio()
  
  const [showAtelier, setShowAtelier] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [showIntro, setShowIntro] = useState(false)

  const handleEnterAtelier = () => {
    setShowFlash(true)
    setTimeout(() => {
      setShowAtelier(true)
    }, 400)
    setTimeout(() => {
      setShowFlash(false)
    }, 1500)
  }

  useEffect(() => {
    const dismissed = sessionStorage.getItem("intro_dismissed")
    if (!dismissed) {
      setShowIntro(true)
    }
  }, [])

  const handleDismissIntro = () => {
    sessionStorage.setItem("intro_dismissed", "true")
    setShowIntro(false)

    // Only auto-scroll down to technologies if the visitor is currently at the top of the page
    if (window.scrollY < 300) {
      setTimeout(() => {
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
      }, 100)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll-y", window.scrollY.toString())
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="wall-texture relative overflow-hidden">
      {/* Top brand bar */}
      <header className="fixed inset-x-0 top-0 z-[170] flex items-center justify-between px-6 py-4 sm:px-10 bg-background/60 backdrop-blur-md border-b border-white/5 shadow-sm transition-all">
        <span className="font-serif text-base italic text-foreground sm:text-lg">Asier Iglesias Alconero</span>
        
        {/* Audio Visualizer & Language Selector wrapper */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Audio Visualizer Toggle Button */}
          <button
            onClick={togglePlay}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer font-mono text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold",
              isPlaying 
                ? "border-gold/30 bg-gold/5 text-gold hover:bg-gold/10 shadow-[0_0_10px_rgba(197,160,89,0.1)]" 
                : "border-white/10 bg-neutral-900/40 text-neutral-400 hover:text-foreground hover:border-white/20"
            )}
            title={isPlaying ? "Mute Ambient" : "Play Ambient Music"}
          >
            {isPlaying ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-gold animate-bounce" style={{ animationDuration: "2s" }}>
                  <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" className="fill-gold/10" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="animate-pulse" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className="animate-pulse" />
                </svg>
                <span className="hidden sm:inline">{t("sound.on")}</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-neutral-500">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="22" y1="9" x2="16" y2="15" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                </svg>
                <span className="hidden sm:inline">{t("sound.off")}</span>
              </>
            )}
          </button>

          {/* Volume Slider - smoothly expand/fade when isPlaying */}
          <div 
            className={cn(
              "flex items-center gap-2 transition-all duration-500 overflow-hidden",
              isPlaying ? "max-w-[120px] opacity-100" : "max-w-0 opacity-0"
            )}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-14 sm:w-20 accent-gold h-1 rounded-lg cursor-pointer bg-white/10"
              title="Volume"
            />
            <span className="font-mono text-[8px] sm:text-[9px] text-gold/80 min-w-[20px]">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Info Button to reopen the welcome plaque */}
          <button
            onClick={() => setShowIntro(true)}
            className="flex items-center justify-center size-7 sm:size-8 rounded-full border border-white/10 hover:border-gold/30 bg-neutral-900/40 hover:bg-neutral-900/60 transition-all cursor-pointer text-neutral-400 hover:text-gold"
            title="Museum Guide / Info"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 sm:size-4">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs">
          {(["EU", "ES", "EN"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={cn(
                "px-2 py-1 rounded transition-all tracking-wider cursor-pointer border border-transparent",
                language === lang 
                  ? "text-gold border-gold/30 bg-gold/5 font-semibold" 
                  : "text-neutral-500 hover:text-foreground"
              )}
            >
              {lang}
            </button>
          ))}
          </div>
        </div>
      </header>

      <section id="hero" className="relative">
        <EntranceHero />
      </section>

      {/* ---------- SALÓN DE LAS TECNOLOGÍAS (#tech-hall) ---------- */}
      <section id="tech-hall" className="relative px-6 py-24 min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden border-b border-white/5 bg-black/10">
        {/* Ambient dust motes */}
        <DustMotes count={15} />

        <div className="mx-auto max-w-6xl relative z-10 w-full">
          <Reveal className="text-center flex flex-col items-center mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-gold">
              {language === "EU" ? "GELA AURREKOA" : language === "ES" ? "ANTECÁMARA" : "THE ANTECHAMBER"}
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl sm:text-5xl font-bold text-foreground">
              {t("tech.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground text-sm sm:text-base">
              {t("tech.desc")}
            </p>
            <div className="mx-auto mt-8 h-12 w-px bg-gradient-to-b from-gold/60 to-transparent" />
          </Reveal>

          {/* Grid of Greek Pedestals holding Technology Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-20 pt-10">
            {TECHNOLOGIES.map((tech, idx) => (
              <Reveal key={tech.name} delay={idx * 100} from="scale" className="flex flex-col items-center group relative">
                {/* Spotlight background glow for hover */}
                <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 size-40 rounded-full blur-2xl opacity-10 group-hover:opacity-60 transition-all duration-700 bg-radial from-gold/20 to-transparent" />

                {/* Floating SVG Logo above capitel */}
                <div className="relative size-16 flex items-center justify-center mb-6 select-none transition-all duration-300 ease-out group-hover:animate-float-hover">
                  {"svg" in tech ? tech.svg : <img src={tech.icon} alt={tech.name} className="size-10 object-contain" />}
                </div>

                {/* Greek Column Pedestal Structure */}
                <div className="relative w-20 flex flex-col items-center select-none">
                  {/* Capitel (Top step of column) */}
                  <div className="w-16 h-2 bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800 border-b border-white/5 shadow-inner" />
                  
                  {/* Fuste (The Column with realistic fluted grooves) */}
                  <div 
                    className="w-11 h-20 bg-neutral-900 border-x border-neutral-950 flex justify-between px-1"
                    style={{
                      backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0.05) 20%, rgba(0,0,0,0.6) 40%, rgba(255,255,255,0.05) 60%, rgba(0,0,0,0.6) 80%, rgba(255,255,255,0.02) 100%)"
                    }}
                  >
                    {/* Fluting vertical lines in column shaft */}
                    <span className="w-[1px] h-full bg-black/40" />
                    <span className="w-[1px] h-full bg-black/40" />
                    <span className="w-[1px] h-full bg-black/40" />
                    <span className="w-[1px] h-full bg-black/40" />
                  </div>

                  {/* Basa (Pedestal Base - stepped square platform) */}
                  <div className="w-16 h-2 bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800 border-t border-neutral-950" />
                  <div className="w-20 h-4 bg-gradient-to-r from-neutral-800 via-neutral-950 to-neutral-800 border border-white/5 relative flex items-center justify-center">
                    {/* Plaque of Bronze Cepillado incrustada */}
                    <div className="absolute inset-x-2 top-0.5 bottom-0.5 border border-gold/10 bg-gradient-to-b from-neutral-950 to-neutral-900 rounded-[1px] flex items-center justify-center shadow-inner group-hover:border-gold/30 transition-all duration-300">
                      <span className="font-mono text-[7px] font-bold text-gold/80 tracking-widest uppercase text-center scale-90 sm:scale-100 group-hover:text-gold transition-all">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SALA UNO INTRO ---------- */}
      <section id="sala-uno" className="relative px-6 min-h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Persistent dust motes in Sala Uno */}
        <DustMotes count={15} />

        <div className="mx-auto max-w-6xl relative z-10">
          <Reveal className="text-center flex flex-col items-center">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-gold">
              {t("sala_one_tag")}
            </p>
            <h2 className="mt-4 text-balance font-serif text-4xl font-bold text-foreground sm:text-5xl">
              {t("sala_one_title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground text-sm sm:text-base">
              {t("sala_one_desc")}
            </p>
            
            <div className="mx-auto mt-12 h-16 w-px bg-gradient-to-b from-gold/60 to-transparent" />

            {/* Scroll 1 - Sello curatorial de la Sala Uno */}
            <div className="mt-10 opacity-45 hover:opacity-90 transition-opacity duration-700 select-none pointer-events-auto cursor-default">
              <Image
                src="/scroll/scroll-1.png"
                alt="Scroll ornament 1"
                width={240}
                height={158}
                className="w-32 sm:w-40 md:w-48 h-auto object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- SALA UNO ARTWORKS ---------- */}
      <section className="relative px-6 py-20 sm:px-10">
        {/* Scroll 2 - Boceto de tiza blanca en la pared izquierda */}
        <div 
          style={{ transform: "translateY(calc(var(--scroll-y, 0) * -0.08px)) rotate(-6deg)" }}
          className="absolute left-[6vw] top-[35%] z-0 select-none pointer-events-auto cursor-default opacity-30 hover:opacity-70 transition-opacity duration-1000 hidden sm:block"
        >
          <Reveal from="left" delay={300}>
            <Image
              src="/scroll/scroll-2.png"
              alt="Scroll ornament 2"
              width={300}
              height={224}
              className="w-32 sm:w-44 md:w-52 h-auto object-contain"
            />
          </Reveal>
        </div>

        <div className="mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col gap-[50vh] pb-[20vh]">
            {salaUno.map((artwork, i) => (
              <FramedArtwork
                key={artwork.id}
                artwork={artwork}
                reverse={i % 2 === 1}
                onSelectVideo={setSelectedVideo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CORREDOR / TRANSICIÓN ---------- */}
      <section id="corredor" className="relative border-y border-gold/15 bg-black/20 px-6 min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Dynamic transition dust motes */}
        <DustMotes count={10} />

        <Reveal className="relative z-10 flex flex-col items-center">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {t("corredor_tag")}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-balance font-serif text-2xl italic leading-snug text-foreground sm:text-3xl">
            {t("corredor_quote")}
          </p>
          <div className="mx-auto mt-12 h-20 w-px bg-gradient-to-b from-gold/60 to-transparent" />

          {/* Scroll 3 - Sello de cierre del Corredor */}
          <div className="mt-8 opacity-40 hover:opacity-85 transition-opacity duration-700 select-none pointer-events-auto cursor-default">
            <Image
              src="/scroll/scroll-3.png"
              alt="Scroll ornament 3"
              width={300}
              height={224}
              className="w-32 sm:w-40 md:w-48 h-auto object-contain"
            />
          </div>
        </Reveal>
      </section>

      {/* ---------- SALA DOS INTRO ---------- */}
      <section id="sala-dos" className="relative px-6 min-h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Persistent dust motes in Sala Dos */}
        <DustMotes count={15} />

        <div className="mx-auto max-w-6xl relative z-10">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-gold">
              {t("sala_two_tag")}
            </p>
            <h2 className="mt-4 text-balance font-serif text-4xl font-bold text-foreground sm:text-5xl">
              {t("sala_two_title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground text-sm sm:text-base">
              {t("sala_two_desc")}
            </p>
            <div className="mx-auto mt-12 h-16 w-px bg-gradient-to-b from-gold/60 to-transparent" />
          </Reveal>
        </div>
      </section>

      {/* ---------- SALA DOS ARTWORK ---------- */}
      <section className="relative px-6 py-20 sm:px-10 mb-[25vh]">
        <Masterpiece onSelectVideo={setSelectedVideo} />
      </section>

      {/* ---------- SALIDA & ATELIER PORTAL 3D ---------- */}
      <section id="portal" className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 border-t border-border/20 bg-black/10 overflow-hidden">
        {/* Atmospheric final room dust motes */}
        <DustMotes count={15} />

        <Reveal className="text-center mb-12 relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-gold">
            {t("portal_title")}
          </p>
          <h2 className="mt-4 text-balance font-serif text-4xl font-bold text-foreground sm:text-5xl">
            {t("portal_title")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            {t("portal_desc")}
          </p>
        </Reveal>

        {/* 3D Door Portal Wrapper */}
        <Reveal from="scale" className="group relative w-[90vw] sm:w-[680px] h-[60vh] sm:h-[480px] mb-16 select-none cursor-pointer" delay={100}>
          {/* Ceiling spotlight specifically for the portal */}
          <div 
            className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[140%] -translate-x-1/2 rounded-full blur-3xl opacity-50"
            style={{ background: "radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, transparent 70%)" }}
          />

          {/* Perspective 3D Box Container */}
          <div 
            onClick={handleEnterAtelier}
            className="relative w-full h-full border-t-4 border-x-4 border-neutral-900 rounded-t-full bg-neutral-950 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.95)]"
            style={{ perspective: "1200px" }}
          >
            {/* The Future Glow & Text (Inside the portal) */}
            <div 
              className="absolute inset-0 flex flex-col justify-center items-center px-12 text-center bg-black transition-all duration-700 opacity-20 group-hover:opacity-100"
              style={{
                backgroundImage: "radial-gradient(circle at center, rgba(197, 160, 89, 0.15) 0%, rgba(10, 10, 10, 0.95) 75%)"
              }}
            >
              <h4 className="font-serif text-xl font-bold text-gold tracking-widest uppercase mb-4 scale-95 group-hover:scale-100 transition-transform duration-1000 ease-out">
                {t("future_title")}
              </h4>
              <p className="max-w-lg text-[12px] sm:text-sm leading-relaxed text-muted-foreground scale-95 group-hover:scale-100 transition-transform duration-1000 ease-out delay-100">
                {t("future_text")}
              </p>
              
              {/* Pulsing light node inside */}
              <div className="absolute size-44 rounded-full bg-gold/10 blur-2xl animate-pulse pointer-events-none -z-10" />

              {/* Call To Action button for entering "El Atelier" */}
              <div className="mt-6 transition-all duration-1000 delay-200 scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 flex items-center justify-center pointer-events-auto">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/40 bg-gold/10 text-gold font-mono text-[9px] sm:text-[10px] uppercase tracking-widest animate-pulse shadow-[0_0_15px_rgba(197,160,89,0.3)] hover:bg-gold hover:text-black transition-all">
                  {language === "EU" ? "Atelierrean sartu →" : language === "ES" ? "Entrar al Atelier →" : "Enter the Atelier →"}
                </span>
              </div>
            </div>

            {/* Glowing central vertical slit when closed */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full bg-gold/50 shadow-[0_0_15px_rgba(197,160,89,0.9)] z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700 animate-pulse" />

            {/* Left Door Sheet */}
            <div 
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-r border-neutral-800/30 origin-left transition-transform duration-1000 ease-out group-hover:[transform:rotateY(-115deg)] shadow-2xl"
              style={{ 
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              {/* Ornate Inner Metal Panel */}
              <div className="absolute inset-5 border border-gold/15 rounded-l-[8px] bg-neutral-950/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-end pr-1">
                {/* Decorative Rivets in left panel corners */}
                <span className="absolute top-3 left-3 size-1.5 rounded-full bg-gold/40 border border-black/30 shadow-inner" />
                <span className="absolute bottom-3 left-3 size-1.5 rounded-full bg-gold/40 border border-black/30 shadow-inner" />
                <span className="absolute top-3 right-3 size-1.5 rounded-full bg-gold/40 border border-black/30 shadow-inner" />
                <span className="absolute bottom-3 right-3 size-1.5 rounded-full bg-gold/40 border border-black/30 shadow-inner" />
                
                {/* Left Half Circular Majestic Lock Handle */}
                <div className="size-20 rounded-l-full border-2 border-gold/50 bg-gradient-to-r from-gold/30 via-gold/15 to-neutral-900 shadow-[inset_3px_0_12px_rgba(197,160,89,0.4)] flex items-center justify-end pr-0.5 relative">
                  {/* Inner Groove */}
                  <div className="size-12 rounded-l-full border border-gold/30 flex items-center justify-end pr-0.5">
                    {/* Glowing Golden Gem Core */}
                    <div className="size-5 rounded-l-full bg-gold shadow-[0_0_15px_rgba(197,160,89,0.9)] animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Door Sheet */}
            <div 
              className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-950 via-neutral-900 to-neutral-950 origin-right transition-transform duration-1000 ease-out group-hover:[transform:rotateY(115deg)] shadow-2xl"
              style={{ 
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              {/* Ornate Inner Metal Panel */}
              <div className="absolute inset-5 border border-gold/15 rounded-r-[8px] bg-neutral-950/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-start pl-1">
                {/* Decorative Rivets in right panel corners */}
                <span className="absolute top-3 right-3 size-1.5 rounded-full bg-gold/40 border border-black/30 shadow-inner" />
                <span className="absolute bottom-3 right-3 size-1.5 rounded-full bg-gold/40 border border-black/30 shadow-inner" />
                <span className="absolute top-3 left-3 size-1.5 rounded-full bg-gold/40 border border-black/30 shadow-inner" />
                <span className="absolute bottom-3 left-3 size-1.5 rounded-full bg-gold/40 border border-black/30 shadow-inner" />

                {/* Right Half Circular Majestic Lock Handle */}
                <div className="size-20 rounded-r-full border-2 border-gold/50 bg-gradient-to-l from-gold/30 via-gold/15 to-neutral-900 shadow-[inset_-3px_0_12px_rgba(197,160,89,0.4)] flex items-center justify-start pl-0.5 relative">
                  {/* Inner Groove */}
                  <div className="size-12 rounded-r-full border border-gold/30 flex items-center justify-start pl-0.5">
                    {/* Glowing Golden Gem Core */}
                    <div className="size-5 rounded-r-full bg-gold shadow-[0_0_15px_rgba(197,160,89,0.9)] animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wall shadow below the portal */}
          <div className="mx-auto mt-4 h-6 w-1/2 rounded-[100%] bg-black/70 blur-md transition-all duration-1000 group-hover:scale-x-110 group-hover:opacity-40" />
        </Reveal>

        {/* Dual Museum Plaques (CodeSyntax & Mondragon Unibertsitatea side-by-side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto mt-12 mb-8 relative z-10">
          {/* Left Plaque: CodeSyntax */}
          <Reveal delay={200} className="w-full">
            <div className="relative h-full flex flex-col justify-between border border-white/10 bg-gradient-to-b from-neutral-900/60 to-neutral-950/40 p-6 sm:p-8 rounded-md text-center shadow-xl backdrop-blur-sm overflow-hidden">
              {/* Corner Screws */}
              <span className="absolute top-3 left-3 size-1.5 rounded-full bg-neutral-800 border border-white/5 shadow-inner" />
              <span className="absolute top-3 right-3 size-1.5 rounded-full bg-neutral-800 border border-white/5 shadow-inner" />
              <span className="absolute bottom-3 left-3 size-1.5 rounded-full bg-neutral-800 border border-white/5 shadow-inner" />
              <span className="absolute bottom-3 right-3 size-1.5 rounded-full bg-neutral-800 border border-white/5 shadow-inner" />

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold/80 mb-2">
                  {t("plaque_tag")}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-foreground uppercase mb-4">
                  CodeSyntax
                </h3>
                <span className="mx-auto block h-px w-16 bg-gold/30 mb-5" />
                
                <p className="text-pretty text-xs sm:text-sm leading-relaxed text-muted-foreground italic max-w-md mx-auto mb-8">
                  "{t("plaque_text")}"
                </p>
              </div>

              {/* Company Tutor Section */}
              <div className="pt-4 border-t border-white/5">
                <p className="font-mono text-[11px] sm:text-xs tracking-wider text-gold font-bold uppercase">
                  {t("plaque.tutor_company")}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Plaque: Mondragon Unibertsitatea */}
          <Reveal delay={300} className="w-full">
            <div className="relative h-full flex flex-col justify-between border border-white/10 bg-gradient-to-b from-neutral-900/60 to-neutral-950/40 p-6 sm:p-8 rounded-md text-center shadow-xl backdrop-blur-sm overflow-hidden">
              {/* Corner Screws */}
              <span className="absolute top-3 left-3 size-1.5 rounded-full bg-neutral-800 border border-white/5 shadow-inner" />
              <span className="absolute top-3 right-3 size-1.5 rounded-full bg-neutral-800 border border-white/5 shadow-inner" />
              <span className="absolute bottom-3 left-3 size-1.5 rounded-full bg-neutral-800 border border-white/5 shadow-inner" />
              <span className="absolute bottom-3 right-3 size-1.5 rounded-full bg-neutral-800 border border-white/5 shadow-inner" />

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold/80 mb-2">
                  {t("plaque.uni_tag")}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-foreground uppercase mb-4">
                  Mondragon Unibertsitatea
                </h3>
                <span className="mx-auto block h-px w-16 bg-gold/30 mb-5" />
                
                <p className="text-pretty text-xs sm:text-sm leading-relaxed text-muted-foreground italic max-w-md mx-auto mb-8">
                  "{t("plaque.uni_text")}"
                </p>
              </div>

              {/* University Tutor Section */}
              <div className="pt-4 border-t border-white/5">
                <p className="font-mono text-[11px] sm:text-xs tracking-wider text-gold font-bold uppercase">
                  {t("plaque.tutor_uni")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Tiny clean final copyright line */}
        <div className="mt-20 font-mono text-[9px] uppercase tracking-[0.4em] text-neutral-600">
          {t("copyright")}
        </div>
      </section>

      {/* Interactive Gallery Floor Map */}
      <GalleryMap 
        showAtelier={showAtelier} 
        onEnterAtelier={handleEnterAtelier}
        onExitAtelier={() => setShowAtelier(false)}
      />

      {/* Video Modal Overlay */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-all duration-300 cursor-pointer"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 size-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer font-sans text-xl"
            onClick={() => setSelectedVideo(null)}
          >
            ✕
          </button>

          {/* Video Container */}
          <div 
            className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black cursor-default"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the video itself
          >
            <video 
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Cinematic Gold Flash Overlay */}
      {showFlash && (
        <div className="fixed inset-0 z-[200] bg-white animate-flash-gold pointer-events-none" />
      )}

      {/* El Atelier - Fullscreen Final Canvas */}
      {showAtelier && (
        <div className="fixed inset-0 z-[150] bg-black text-foreground overflow-y-auto flex flex-col justify-center items-center p-6 text-center wall-texture">
          {/* Background dust motes */}
          <DustMotes count={25} />

          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-gold mb-4 animate-pulse">
              {language === "EU" ? "SORTZAILEAREN ATELIERRA" : language === "ES" ? "EL ATELIER DEL CREADOR" : "THE CREATOR'S ATELIER"}
            </p>

            <h2 className="font-serif text-5xl sm:text-7xl font-bold italic text-gold tracking-wide mb-8">
              Asier Iglesias Alconero
            </h2>

            <div className="w-16 h-px bg-gold/40 my-4" />

            <p className="max-w-2xl text-pretty text-sm sm:text-base leading-relaxed text-muted-foreground italic mb-10">
              {t("atelier.text")}
            </p>

            {/* Elegant Handwritten-Style Calligraphic Signature in Gold */}
            <div className="mb-12 relative w-48 h-20 select-none">
              <svg viewBox="0 0 100 50" className="w-full h-full stroke-gold fill-none stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
                {/* Artistic handwritten signature lines representing 'Asier' */}
                <path d="M 10 35 C 15 25, 20 10, 25 15 C 30 20, 28 35, 33 35 C 38 35, 41 25, 44 28 C 47 31, 46 36, 50 34 C 54 32, 57 20, 60 22 C 63 24, 62 33, 66 31 C 70 29, 74 15, 78 18 C 82 21, 80 34, 85 30 L 95 25" className="draw-signature" />
                <path d="M 8 38 L 92 38" className="draw-line" />
              </svg>
            </div>

            {/* Dynamic Social / Contact Action Links */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a
                href="https://github.com/asieriglesias"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-gold/40 bg-gold/5 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-gold hover:bg-gold hover:text-black transition-all duration-300"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/asier-iglesias-alconero"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-gold/40 bg-gold/5 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-gold hover:bg-gold hover:text-black transition-all duration-300"
              >
                LinkedIn
              </a>
              <a
                href="mailto:asier.iglesias.alconero@gmail.com"
                className="px-5 py-2.5 rounded-full border border-gold/40 bg-gold/5 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-gold hover:bg-gold hover:text-black transition-all duration-300"
              >
                {language === "EU" ? "E-posta" : language === "ES" ? "Correo" : "Email"}
              </a>
              <button
                onClick={() => setShowAtelier(false)}
                className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/80 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              >
                {language === "EU" ? "Galeriara bueltatu" : language === "ES" ? "Volver a la Galería" : "Return to Gallery"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Plaque Modal Overlay (z-40 so header z-50 stays interactable on top) */}
      {showIntro && (
        <div className="fixed inset-0 z-[40] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
          <div className="relative w-full max-w-xl border border-gold/15 bg-gradient-to-b from-neutral-900/90 to-neutral-950/95 p-6 sm:p-8 rounded shadow-2xl text-center backdrop-blur-md overflow-hidden animate-scale-up">
            {/* Elegant gold close button in the top-right corner */}
            <button
              onClick={handleDismissIntro}
              className="absolute top-4 right-4 size-7 flex items-center justify-center rounded-full border border-gold/15 bg-neutral-900/40 text-gold/80 hover:text-gold hover:border-gold/30 hover:bg-neutral-900/60 transition-all cursor-pointer font-sans text-[10px]"
              title="Close Guide"
            >
              ✕
            </button>

            {/* Corner screws representing a realistic museum plaque */}
            <span className="absolute top-3 left-3 size-2 rounded-full bg-neutral-800 border border-white/5 shadow-inner" />
            <span className="absolute top-3 right-3 size-2 rounded-full bg-neutral-800 border border-white/5 shadow-inner" />
            <span className="absolute bottom-3 left-3 size-2 rounded-full bg-neutral-800 border border-white/5 shadow-inner" />
            <span className="absolute bottom-3 right-3 size-2 rounded-full bg-neutral-800 border border-white/5 shadow-inner" />

            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold/80 mb-2">
              ASIER IGLESIAS ALCONERO · TFG
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-foreground uppercase mb-6 text-balance">
              {t("intro.title")}
            </h3>
            <span className="mx-auto block h-px w-16 bg-gold/20 mb-6" />

            <div className="text-left space-y-4 mb-8 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <div className="flex gap-3 items-start">
                <span className="font-mono text-gold font-bold text-xs sm:text-sm">I.</span>
                <p>{t("intro.p1")}</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-mono text-gold font-bold text-xs sm:text-sm">II.</span>
                <p>{t("intro.p2")}</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-mono text-gold font-bold text-xs sm:text-sm">III.</span>
                <p>{t("intro.p3")}</p>
              </div>
            </div>

            <button
              onClick={handleDismissIntro}
              className="px-6 py-3 rounded-full border border-gold/50 bg-gold/5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gold hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(197,160,89,0.15)]"
            >
              {t("intro.btn")}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
