"use client"

import { useState, useEffect, useCallback } from "react"
import { useGame, menuIdToState } from "@/lib/game-context"
import { MENU_ITEMS, PLAYER, type MenuItemId } from "@/lib/portfolio-data"
import Image from "next/image"
import {
  Play,
  Target,
  Shield,
  BookOpen,
  Briefcase,
  Mail,
  Settings,
  ChevronRight,
} from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  play: Play,
  target: Target,
  shield: Shield,
  book: BookOpen,
  briefcase: Briefcase,
  mail: Mail,
  settings: Settings,
}

export function MainMenu() {
  const { navigateTo } = useGame()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  const activeIndex = hoverIndex ?? selectedIndex

  const handleSelect = useCallback(
    (id: MenuItemId) => {
      navigateTo(menuIdToState(id))
    },
    [navigateTo]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "s") {
        setSelectedIndex((p) => (p + 1) % MENU_ITEMS.length)
      } else if (e.key === "ArrowUp" || e.key === "w") {
        setSelectedIndex((p) => (p - 1 + MENU_ITEMS.length) % MENU_ITEMS.length)
      } else if (e.key === "Enter" || e.key === " ") {
        handleSelect(MENU_ITEMS[selectedIndex].id)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [selectedIndex, handleSelect])

  return (
    <div className="fixed inset-0 flex bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_oklch(0.75_0.18_195_/_0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,_oklch(0.72_0.22_340_/_0.05),transparent_50%)]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Left side - branding + menu */}
      <div className="relative z-10 flex flex-col justify-between w-full lg:w-2/3 p-6 md:p-12 lg:p-16">
        {/* Top - logo */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-[0.2em] text-primary neon-text-cyan">
            ABEDKOB
          </h1>
          <p className="text-sm font-mono tracking-[0.3em] text-muted-foreground mt-1">
            INTERACTIVE PORTFOLIO // v1.0
          </p>
        </div>

        {/* Menu items */}
        <nav className="flex flex-col gap-1.5 max-w-lg" role="menu">
          {MENU_ITEMS.map((item, i) => {
            const Icon = iconMap[item.icon]
            const isActive = activeIndex === i
            return (
              <button
                key={item.id}
                role="menuitem"
                onClick={() => handleSelect(item.id)}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className="group relative flex items-center gap-4 px-5 py-3.5 text-left transition-all duration-300 rounded-sm"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-40px)",
                  transitionDelay: `${150 + i * 80}ms`,
                  background: isActive ? "oklch(0.75 0.18 195 / 0.08)" : "transparent",
                  borderLeft: isActive ? "2px solid var(--neon-cyan)" : "2px solid transparent",
                }}
              >
                {/* Selection bracket */}
                {isActive && (
                  <ChevronRight
                    className="absolute -left-1 w-5 h-5 text-primary"
                    style={{ filter: "drop-shadow(0 0 4px var(--neon-cyan))" }}
                  />
                )}

                <Icon
                  className="w-6 h-6 transition-colors duration-200"
                  style={{ color: isActive ? "var(--neon-cyan)" : "var(--muted-foreground)" }}
                />

                <div className="flex flex-col">
                  <span
                    className="text-base font-sans font-semibold tracking-widest transition-colors duration-200"
                    style={{ color: isActive ? "var(--neon-cyan)" : "var(--foreground)" }}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {item.description}
                  </span>
                </div>

                {/* HUD line on active */}
                {isActive && (
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-primary/20" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom - player info */}
        <div
          className="flex items-center gap-4 transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "800ms",
          }}
        >
          <div className="w-12 h-12 rounded-sm border border-primary/40 overflow-hidden bg-primary/5">
            <Image
              src="/images/profile.jpg"
              alt="Abed Al-Nabe Koubeissy"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-mono text-foreground">{PLAYER.name}</p>
            <p className="text-xs font-mono text-muted-foreground">{PLAYER.role}</p>
          </div>
        </div>
      </div>

      {/* Right side - decorative HUD panel */}
      <div className="hidden lg:flex flex-col items-end justify-center w-1/3 p-12 relative">
        <div
          className="hud-panel hud-corner relative p-6 max-w-xs w-full transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(40px)",
            transitionDelay: "600ms",
          }}
        >
          <div className="text-xs font-mono text-primary/60 mb-3">// SYSTEM STATUS</div>
          <div className="flex flex-col gap-2.5">
            {[
              { label: "CORE_SYS", value: "ONLINE", color: "neon-green" },
              { label: "NAV_MODULE", value: "READY", color: "neon-green" },
              { label: "MISSION_DB", value: "SYNCED", color: "neon-cyan" },
              { label: "COMMS", value: "STANDBY", color: "neon-orange" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">{s.label}</span>
                <span className={`text-xs font-mono text-${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-primary/20">
            <div className="text-xs font-mono text-muted-foreground">LOCATION</div>
            <div className="text-sm font-mono text-foreground mt-1">{PLAYER.location}</div>
          </div>

          <div className="mt-4">
            <div className="text-xs font-mono text-muted-foreground">ACTIVE LOADOUT</div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PLAYER.stack.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2 py-0.5 rounded-sm bg-primary/10 text-primary border border-primary/20"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Keyboard hint */}
        <div
          className="mt-6 text-xs font-mono text-muted-foreground text-right transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transitionDelay: "1000ms",
          }}
        >
          <span className="text-primary/50">[W/S]</span> Navigate{" "}
          <span className="text-primary/50 ml-2">[ENTER]</span> Select
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-primary/20" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-primary/20" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-primary/20" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-primary/20" />
    </div>
  )
}
