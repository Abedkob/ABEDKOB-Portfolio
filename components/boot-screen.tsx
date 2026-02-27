"use client"

import { useState, useEffect } from "react"
import { useGame } from "@/lib/game-context"

export function BootScreen() {
  const { navigateTo, setBootComplete } = useGame()
  const [phase, setPhase] = useState<"logo" | "loading" | "press">("logo")
  const [progress, setProgress] = useState(0)
  const [showPress, setShowPress] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("loading"), 2000)
    return () => clearTimeout(timer1)
  }, [])

  useEffect(() => {
    if (phase !== "loading") return
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setPhase("press")
          return 100
        }
        return p + Math.random() * 8 + 2
      })
    }, 80)
    return () => clearInterval(interval)
  }, [phase])

  useEffect(() => {
    if (phase === "press") {
      const t = setTimeout(() => setShowPress(true), 300)
      return () => clearTimeout(t)
    }
  }, [phase])

  useEffect(() => {
    if (!showPress) return
    const handler = (e: KeyboardEvent | MouseEvent) => {
      e.preventDefault()
      setBootComplete(true)
      navigateTo("menu")
    }
    window.addEventListener("keydown", handler)
    window.addEventListener("click", handler)
    return () => {
      window.removeEventListener("keydown", handler)
      window.removeEventListener("click", handler)
    }
  }, [showPress, navigateTo, setBootComplete])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,220,255,0.03) 2px, rgba(0,220,255,0.03) 4px)",
          }}
        />
      </div>

      {/* Logo phase */}
      <div
        className="flex flex-col items-center gap-6 transition-all duration-700"
        style={{ opacity: phase === "logo" ? 1 : phase === "loading" ? 0.8 : 0.9 }}
      >
        {/* Studio Logo */}
        <div className="relative">
          <h1
            className="text-5xl md:text-7xl font-sans font-bold tracking-[0.3em] text-primary glitch-text"
            data-text="ABEDKOB"
          >
            ABEDKOB
          </h1>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px flex-1 bg-primary/50" />
            <span className="text-sm md:text-base font-mono tracking-[0.5em] text-primary/70">STUDIOS</span>
            <div className="h-px flex-1 bg-primary/50" />
          </div>
        </div>

        {/* Loading bar */}
        {phase === "loading" && (
          <div className="mt-12 w-72 md:w-96">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono text-muted-foreground">INITIALIZING SYSTEMS</span>
              <span className="text-sm font-mono text-primary">{Math.min(100, Math.floor(progress))}%</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-100 ease-out"
                style={{
                  width: `${Math.min(100, progress)}%`,
                  boxShadow: "0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan)",
                }}
              />
            </div>
            <div className="mt-3 flex flex-col gap-1.5">
              {progress > 10 && (
                <span className="text-xs font-mono text-muted-foreground animate-in fade-in">
                  {">"} Loading shader modules...
                </span>
              )}
              {progress > 35 && (
                <span className="text-xs font-mono text-muted-foreground animate-in fade-in">
                  {">"} Initializing hub environment...
                </span>
              )}
              {progress > 60 && (
                <span className="text-xs font-mono text-muted-foreground animate-in fade-in">
                  {">"} Connecting to mission database...
                </span>
              )}
              {progress > 85 && (
                <span className="text-xs font-mono text-neon-green animate-in fade-in">
                  {">"} All systems operational.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Press any key */}
        {showPress && (
          <div className="mt-16 flex flex-col items-center gap-4 animate-in fade-in duration-700">
            <span
              className="text-base font-mono tracking-[0.3em] text-primary"
              style={{ animation: "pulse-glow 2s ease-in-out infinite", padding: "8px 24px" }}
            >
              PRESS ANY KEY TO START
            </span>
            <span className="text-xs font-mono text-muted-foreground">v1.0.0 // BUILD 2025.01</span>
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-primary/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-primary/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-primary/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-primary/30" />
    </div>
  )
}
