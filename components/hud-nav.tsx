"use client"

import { useGame } from "@/lib/game-context"
import { ArrowLeft, Home } from "lucide-react"

export function HudNav({ title, subtitle }: { title: string; subtitle?: string }) {
  const { navigateTo, gameState } = useGame()

  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      <div className="flex items-center justify-between p-4 md:p-6">
        {/* Back button */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => navigateTo("menu")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm transition-all duration-200 hud-panel hover:bg-primary/10"
            aria-label="Back to menu"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
            <span className="text-xs font-mono text-primary hidden md:inline">MENU</span>
          </button>

          
        </div>

        {/* Section title */}
        <div className="text-right">
          <h2 className="text-base md:text-lg font-sans font-bold tracking-[0.15em] text-primary neon-text-cyan">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs font-mono text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Top HUD line */}
      <div className="mx-4 md:mx-6 h-px bg-primary/20" />
    </div>
  )
}
