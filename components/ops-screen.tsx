"use client"

import { useState, useEffect } from "react"
import type { CSSProperties } from "react"
import { HudNav } from "@/components/hud-nav"
import { ACHIEVEMENTS, type Achievement } from "@/lib/portfolio-data"
import { Trophy, CheckCircle2 } from "lucide-react"
import { AnimatePresence, itemVariants, listVariants, motion, panelHover } from "@/components/motion-kit"

function AchievementToast({ achievement }: { achievement: Achievement }) {
  return (
    <motion.div
      className="glass-card fixed top-20 right-4 z-50 flex items-center gap-3 rounded-xl px-5 py-3.5"
      initial={{ opacity: 0, x: 48, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 48, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      <Trophy className="w-6 h-6 text-neon-orange flex-shrink-0" />
      <div>
        <p className="hud-label text-neon-orange">ACHIEVEMENT UNLOCKED</p>
        <p className="text-sm font-sans font-bold tracking-wider text-foreground">{achievement.title}</p>
      </div>
    </motion.div>
  )
}

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      className="hud-action hud-panel hud-corner w-full rounded-xl p-5 text-left transition-all duration-300"
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setExpanded(!expanded)
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${expanded ? "Collapse" : "Expand"} ${achievement.role}`}
      variants={itemVariants}
      whileHover={panelHover}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center"
          style={{
            background: achievement.unlocked ? "var(--glow-primary-soft)" : "var(--secondary)",
            border: `1px solid ${achievement.unlocked ? "var(--glass-border)" : "var(--border)"}`,
          }}
        >
          {achievement.unlocked ? (
            <CheckCircle2 className="w-6 h-6 text-primary" />
          ) : (
            <span className="text-sm font-mono text-muted-foreground">?</span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-sans font-bold tracking-wider text-foreground">
              {achievement.title}
            </h3>
            <span className="text-xs font-mono text-muted-foreground">{achievement.id}</span>
          </div>
          <p className="text-sm font-serif font-medium text-primary">{achievement.role}</p>
          <p className="text-xs font-mono text-muted-foreground">{achievement.company}</p>
          <p className="text-xs font-mono text-neon-green mt-1">{achievement.period}</p>
        </div>
      </div>

      {/* Details (expanded) */}
      <AnimatePresence initial={false}>
        {expanded && (
        <motion.div
          className="mt-4 pt-4 border-t border-primary/10"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
        >
          <h4 className="hud-label text-primary/60 mb-2">// OPERATIONS LOG</h4>
          <ul className="flex flex-col gap-2">
            {achievement.description.map((desc, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-xs font-mono text-primary mt-0.5">{">"}</span>
                <span className="text-sm font-serif text-foreground/70">{desc}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function OpsScreen() {
  const [showToast, setShowToast] = useState(false)
  const [toastAchievement, setToastAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      setToastAchievement(ACHIEVEMENTS[0])
      setShowToast(true)
    }, 600)
    const t2 = setTimeout(() => setShowToast(false), 3600)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="screen-scroll" style={{ "--screen-max": "56rem" } as CSSProperties}>
      <HudNav title="OPERATIONS" subtitle="CAREER TIMELINE" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 aurora-field opacity-35" />
      </div>

      <div className="screen-content">
        <div className="mb-8">
          <div className="hud-label text-primary/60 mb-2">// OPERATIONS HISTORY</div>
          <h1 className="screen-title font-sans font-bold text-foreground">
            CAREER <span className="text-primary neon-glow">ACHIEVEMENTS</span>
          </h1>
          <p className="text-sm font-mono text-muted-foreground mt-2">
            {ACHIEVEMENTS.length} achievements // {ACHIEVEMENTS.filter((a) => a.unlocked).length} unlocked
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-primary/10" />

          <motion.div className="flex flex-col gap-4" variants={listVariants} initial="initial" animate="animate">
            {ACHIEVEMENTS.map((achievement, i) => (
              <div key={achievement.id} className="relative pl-14">
                {/* Timeline dot */}
                <div
                  className="absolute left-[18px] top-6 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: achievement.unlocked ? "var(--neon-orange)" : "var(--muted-foreground)",
                    background: achievement.unlocked ? "var(--glow-primary-soft)" : "transparent",
                    boxShadow: achievement.unlocked ? "0 0 10px var(--glow-primary-soft)" : "none",
                  }}
                />
                <AchievementCard achievement={achievement} index={i} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Achievement toast */}
      <AnimatePresence>
        {showToast && toastAchievement && <AchievementToast achievement={toastAchievement} />}
      </AnimatePresence>
    </div>
  )
}
