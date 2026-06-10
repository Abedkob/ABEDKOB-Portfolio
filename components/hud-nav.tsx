"use client"

import { menuIdToState, useGame } from "@/lib/game-context"
import { MENU_ITEMS } from "@/lib/portfolio-data"
import { ArrowLeft, BookOpen, Briefcase, Mail, Settings, Shield, Target } from "lucide-react"
import { motion } from "@/components/motion-kit"

const mobileIconMap = {
  target: Target,
  shield: Shield,
  book: BookOpen,
  briefcase: Briefcase,
  mail: Mail,
  settings: Settings,
}

export function HudNav({ title, subtitle }: { title: string; subtitle?: string }) {
  const { gameState, navigateTo } = useGame()

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none bg-background/20 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 p-3 sm:p-4 md:p-6">
          {/* Back button */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              onClick={() => navigateTo("menu")}
              className="hud-action glass-card flex min-h-11 items-center gap-2 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-primary/10 sm:px-4"
              aria-label="Back to menu"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
              <span className="text-xs font-mono text-primary hidden md:inline">MENU</span>
            </button>
          </div>

          {/* Section title */}
          <div className="min-w-0 text-right">
            <h2 className="truncate text-sm font-sans font-bold tracking-[0.14em] text-primary neon-glow sm:text-base md:text-lg">
              {title}
            </h2>
            {subtitle && (
              <p className="truncate text-[11px] font-mono text-muted-foreground sm:text-xs">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Top HUD line */}
        <div className="mx-4 md:mx-6 h-px bg-primary/20" />
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-6 gap-1 border-t border-primary/20 bg-background/78 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden"
        aria-label="Quick section navigation"
      >
        {MENU_ITEMS.map((item) => {
          const Icon = mobileIconMap[item.icon]
          const target = menuIdToState(item.id)
          const active = gameState === target

          return (
            <motion.button
              key={item.id}
              onClick={() => navigateTo(target)}
              className="hud-action flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[9px] font-mono transition-colors min-[390px]:text-[10px]"
              whileTap={{ scale: 0.96 }}
              style={{
                color: active ? "var(--primary)" : "var(--muted-foreground)",
                background: active ? "var(--glow-primary-soft)" : "transparent",
                boxShadow: active ? "0 0 14px var(--glow-primary-soft)" : undefined,
              }}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label.slice(0, 4)}</span>
            </motion.button>
          )
        })}
      </nav>
    </>
  )
}
