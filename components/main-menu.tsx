"use client"

import { useState, useEffect, useCallback } from "react"
import type { ComponentType, CSSProperties } from "react"
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
  Download,
  Github,
} from "lucide-react"
import { itemVariants, listVariants, motion, panelHover } from "@/components/motion-kit"

const iconMap: Record<string, ComponentType<{ className?: string; style?: CSSProperties }>> = {
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

  const requestCvHref = `mailto:${PLAYER.email}?subject=${encodeURIComponent(PLAYER.resumeSubject)}&body=${encodeURIComponent(
    `Hi ${PLAYER.name},\n\nI found your portfolio and would like to request your CV.\n\nThanks,`
  )}`

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
    <div className="fixed inset-0 flex overflow-x-hidden overflow-y-auto bg-transparent">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 aurora-field opacity-70" />
        <div className="absolute inset-0 star-grid opacity-45" />
      </div>

      {/* Left side - branding + menu */}
      <div className="relative z-10 flex min-h-dvh w-full flex-col justify-between gap-8 px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6 sm:px-6 md:p-12 lg:w-2/3 lg:p-16">
        {/* Top - logo */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          <h1 className="text-3xl font-sans font-bold tracking-[0.16em] text-primary neon-glow sm:text-4xl md:text-5xl">
            ABEDKOB
          </h1>
          <p className="hud-label text-muted-foreground mt-2">
            INTERACTIVE PORTFOLIO // v1.0
          </p>
          <p className="copy-measure mt-5 text-base font-serif leading-relaxed text-foreground/78">
            Full-stack developer building React, Node.js, Flutter, PHP/MySQL, and AI-powered systems.
            Explore the game layer, or jump straight to the proof.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 min-[460px]:grid-cols-2 sm:flex sm:flex-wrap">
            <button
              onClick={() => navigateTo("missions")}
              className="hud-action glass-card neon-glow flex min-h-11 items-center justify-center gap-2 rounded-lg border-primary/45 px-4 py-2.5 text-sm font-mono text-primary transition-colors hover:bg-primary/15 sm:justify-start"
            >
              <Target className="h-4 w-4" />
              VIEW PROJECTS
            </button>
            <a
              href={requestCvHref}
              className="hud-action glass-card flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-mono text-foreground/85 transition-colors hover:bg-primary/10 sm:justify-start"
            >
              <Download className="h-4 w-4 text-primary" />
              REQUEST CV
            </a>
            <a
              href={PLAYER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-action glass-card flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-mono text-foreground/85 transition-colors hover:bg-primary/10 sm:justify-start"
            >
              <Github className="h-4 w-4 text-primary" />
              GITHUB
            </a>
            <button
              onClick={() => navigateTo("contact")}
              className="hud-action glass-card flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-mono text-foreground/85 transition-colors hover:bg-primary/10 sm:justify-start"
            >
              <Mail className="h-4 w-4 text-primary" />
              CONTACT
            </button>
          </div>
        </div>

        {/* Menu items */}
        <motion.nav
          className="flex flex-col gap-2 max-w-lg"
          role="menu"
          aria-label="Portfolio sections"
          variants={listVariants}
          initial="initial"
          animate="animate"
        >
          {MENU_ITEMS.map((item, i) => {
            const Icon = iconMap[item.icon]
            const isActive = activeIndex === i
            return (
              <motion.button
                key={item.id}
                role="menuitem"
                onClick={() => handleSelect(item.id)}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className="hud-action glass-card group relative flex min-h-14 items-center gap-3 overflow-hidden rounded-lg px-4 py-3.5 text-left focus-visible:bg-primary/10 sm:gap-4 sm:px-5"
                variants={itemVariants}
                whileHover={panelHover}
                whileTap={{ scale: 0.985 }}
                style={{
                  borderLeft: isActive ? "2px solid var(--primary)" : "2px solid transparent",
                  boxShadow: isActive ? "inset 0 0 26px var(--glow-primary-soft), 0 0 22px var(--glow-primary-soft)" : undefined,
                }}
              >
                {/* Selection bracket */}
                {isActive && (
                  <ChevronRight
                    className="absolute -left-1 w-5 h-5 text-primary"
                    style={{ filter: "drop-shadow(0 0 4px var(--primary))" }}
                  />
                )}

                <Icon
                  className="w-6 h-6 transition-colors duration-200"
                  style={{ color: isActive ? "var(--neon-cyan)" : "var(--muted-foreground)" }}
                />

                <div className="flex min-w-0 flex-col">
                  <span
                    className="truncate text-sm font-sans font-semibold tracking-widest transition-colors duration-200 sm:text-base"
                    style={{ color: isActive ? "var(--primary)" : "var(--foreground)" }}
                  >
                    {item.label}
                  </span>
                  <span className="truncate text-xs font-mono text-muted-foreground">
                    {item.description}
                  </span>
                </div>

                {/* HUD line on active */}
                {isActive && (
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-primary/20" />
                )}
              </motion.button>
            )
          })}
        </motion.nav>

        {/* Bottom - player info */}
        <div
          className="flex items-center gap-4 transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "800ms",
          }}
        >
          <div className="w-12 h-12 rounded-lg border border-primary/40 overflow-hidden bg-primary/5 shadow-[0_0_18px_var(--glow-primary-soft)]">
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
        <motion.div
          className="hud-panel hud-corner relative p-6 max-w-xs w-full rounded-xl transition-all duration-700"
          whileHover={panelHover}
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(40px)",
            transitionDelay: "600ms",
          }}
        >
          <div className="hud-label text-primary/70 mb-3">// SYSTEM STATUS</div>
          <div className="flex flex-col gap-2.5">
            {[
              { label: "CORE_SYS", value: "ONLINE", className: "status-complete" },
              { label: "NAV_MODULE", value: "READY", className: "status-complete" },
              { label: "MISSION_DB", value: "SYNCED", className: "text-primary" },
              { label: "COMMS", value: "STANDBY", className: "status-progress" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">{s.label}</span>
                <span className={`rounded-full border px-2 py-0.5 text-xs font-mono ${s.className}`}>{s.value}</span>
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
        </motion.div>

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
