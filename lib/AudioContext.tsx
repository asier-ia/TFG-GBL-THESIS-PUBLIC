"use client"

import React, { createContext, useContext, useState, useEffect, useRef } from "react"

type AudioContextType = {
  isPlaying: boolean
  togglePlay: () => void
  volume: number
  setVolume: (val: number) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.3) // Default 30% volume
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    // Create ambient audio player with new classical art music
    const audio = new Audio("/audio/sonican-art-classical-art-music-507426.mp3")
    audio.loop = true
    audio.volume = 0 // Start muted for fade-in
    audioRef.current = audio

    return () => {
      audio.pause()
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (audioContextRef.current) audioContextRef.current.close()
    }
  }, [])

  const setVolume = (val: number) => {
    setVolumeState(val)
    if (audioRef.current) {
      audioRef.current.volume = val
    }
  }

  const startAnalyser = (streamSource: MediaElementAudioSourceNode) => {
    if (!audioContextRef.current) return

    const analyser = audioContextRef.current.createAnalyser()
    analyser.fftSize = 64
    analyserRef.current = analyser

    streamSource.connect(analyser)
    analyser.connect(audioContextRef.current.destination)

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const updatePulse = () => {
      if (!analyserRef.current) return

      analyserRef.current.getByteFrequencyData(dataArray)

      // Measure low frequencies (bass range) to modulate atmospheric elements
      let sum = 0
      const bassBins = Math.min(6, bufferLength)
      for (let i = 0; i < bassBins; i++) {
        sum += dataArray[i]
      }
      const avg = sum / bassBins
      const normVal = avg / 255

      // Map to slow pulsing scale [0.0 to 1.0] representing energy
      // Write directly to CSS root variables for peak performance (rendering on GPU)
      document.documentElement.style.setProperty("--audio-pulse", normVal.toString())

      animationFrameRef.current = requestAnimationFrame(updatePulse)
    }

    updatePulse()
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (!isPlaying) {
      // Initialize AudioContext on first user gesture
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        const ctx = new AudioContextClass()
        audioContextRef.current = ctx

        const source = ctx.createMediaElementSource(audio)
        startAnalyser(source)
      }

      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume()
      }

      audio.play()
      setIsPlaying(true)

      // 2-second volume fade-in up to current selected volume
      let vol = 0
      audio.volume = 0
      const interval = setInterval(() => {
        vol += 0.05
        if (vol >= volume) {
          audio.volume = volume
          clearInterval(interval)
        } else {
          audio.volume = vol
        }
      }, 100)
    } else {
      // 2-second volume fade-out
      let vol = audio.volume
      const interval = setInterval(() => {
        vol -= 0.05
        if (vol <= 0) {
          audio.volume = 0
          audio.pause()
          setIsPlaying(false)
          clearInterval(interval)
        } else {
          audio.volume = vol
        }
      }, 100)
    }
  }

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
