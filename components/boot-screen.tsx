"use client"

import { useState, useEffect } from "react"
import { useGame } from "@/lib/game-context"
import { motion } from "@/components/motion-kit"

export function BootScreen() {
  const { navigateTo, setBootComplete } = useGame()
  const [phase, setPhase] = useState<"logo" | "loading" | "press">("logo")
  const [progress, setProgress] = useState(0)
  const [showPress, setShowPress] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("loading"), 900)
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
        return p + Math.random() * 14 + 6
      })
    }, 60)
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

  const enterPortfolio = () => {
    setBootComplete(true)
    navigateTo("menu")
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 text-center">
      <div className="absolute inset-0 aurora-field opacity-70" />
      <div className="absolute inset-0 star-grid opacity-45" />
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="boot-scanline absolute inset-0" />
      </div>

      {/* Logo phase */}
      <motion.div
        className="flex w-full max-w-3xl flex-col items-center gap-6 transition-all duration-700"
        initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 170, damping: 24 }}
        style={{ opacity: phase === "logo" ? 1 : phase === "loading" ? 0.8 : 0.9 }}
      >
        {/* Studio Logo */}
        <div className="relative">
          <h1
            className="glitch-text neon-glow text-[clamp(2.25rem,13vw,4.5rem)] font-sans font-bold tracking-[0.1em] text-primary sm:text-5xl sm:tracking-[0.24em] md:text-7xl md:tracking-[0.3em]"
            data-text="ABEDKOB"
          >
            ABEDKOB
          </h1>
          <div className="mt-3 flex w-full items-center justify-center gap-2 sm:gap-3">
            <div className="h-px flex-1 bg-primary/50" />
            <span className="font-mono text-xs tracking-[0.28em] text-primary/70 sm:text-sm sm:tracking-[0.42em] md:text-base md:tracking-[0.5em]">STUDIOS</span>
            <div className="h-px flex-1 bg-primary/50" />
          </div>
        </div>

        {/* Loading bar */}
        {phase === "loading" && (
          <div className="mt-8 w-full max-w-xs sm:mt-12 md:max-w-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-muted-foreground sm:text-sm">INITIALIZING SYSTEMS</span>
              <span className="text-sm font-mono text-primary">{Math.min(100, Math.floor(progress))}%</span>
            </div>
            <div className="h-1.5 bg-secondary/70 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary transition-all duration-100 ease-out"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, progress)}%` }}
                style={{
                  boxShadow: "0 0 10px var(--glow-primary), 0 0 20px var(--glow-primary-soft)",
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
          <div className="mt-10 flex w-full flex-col items-center gap-3 animate-in fade-in duration-700 sm:mt-16 sm:gap-4">
            <span
              className="hud-action flex min-h-11 w-full max-w-[18rem] items-center justify-center rounded-full border border-primary/20 px-4 py-2 text-xs font-mono tracking-[0.14em] text-primary sm:max-w-none sm:px-6 sm:text-base sm:tracking-[0.3em]"
              style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
            >
              PRESS ANY KEY TO START
            </span>
            <span className="text-xs font-mono text-muted-foreground">v1.0.0 // BUILD 2025.01</span>
          </div>
        )}
      </motion.div>

      <button
        type="button"
        onClick={enterPortfolio}
        aria-label="Skip intro and open portfolio menu"
        className="hud-action glass-card absolute right-4 top-4 z-20 inline-flex min-h-10 items-center justify-center rounded-full border-primary/25 px-3 py-2 text-[10px] font-mono tracking-[0.1em] text-primary/85 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary sm:right-8 sm:top-8 sm:min-h-11 sm:px-4 sm:text-[11px] sm:tracking-[0.12em]"
      >
        <span className="sm:hidden">SKIP</span>
        <span className="hidden sm:inline">SKIP INTRO</span>
      </button>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-primary/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-primary/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-primary/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-primary/30" />
    </div>
  )
}
