"use client"

import { useState, useEffect } from "react"
import { HudNav } from "@/components/hud-nav"
import { ACHIEVEMENTS, type Achievement } from "@/lib/portfolio-data"
import { Trophy, CheckCircle2 } from "lucide-react"

function AchievementToast({ achievement }: { achievement: Achievement }) {
  return (
    <div
      className="fixed top-20 right-4 z-50 flex items-center gap-3 px-5 py-3.5 rounded-sm bg-background border border-neon-orange/50"
      style={{
        animation: "achievement-pop 3s ease-in-out forwards",
        boxShadow: "0 0 20px oklch(0.78 0.17 60 / 0.2)",
      }}
    >
      <Trophy className="w-6 h-6 text-neon-orange flex-shrink-0" />
      <div>
        <p className="text-xs font-mono text-neon-orange">ACHIEVEMENT UNLOCKED</p>
        <p className="text-sm font-sans font-bold tracking-wider text-foreground">{achievement.title}</p>
      </div>
    </div>
  )
}

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="hud-panel hud-corner p-5 transition-all duration-300 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center"
          style={{
            background: achievement.unlocked
              ? "oklch(0.78 0.17 60 / 0.15)"
              : "oklch(0.2 0 0)",
            border: `1px solid ${achievement.unlocked ? "oklch(0.78 0.17 60 / 0.4)" : "oklch(0.3 0 0)"}`,
          }}
        >
          {achievement.unlocked ? (
            <CheckCircle2 className="w-6 h-6 text-neon-orange" />
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
      {expanded && (
        <div className="mt-4 pt-4 border-t border-primary/10 animate-in fade-in slide-in-from-top-2 duration-300">
          <h4 className="text-xs font-mono text-primary/60 mb-2">// OPERATIONS LOG</h4>
          <ul className="flex flex-col gap-2">
            {achievement.description.map((desc, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-xs font-mono text-primary mt-0.5">{">"}</span>
                <span className="text-sm font-serif text-foreground/70">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
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
    <div className="fixed inset-0 bg-background overflow-auto">
      <HudNav title="OPERATIONS" subtitle="CAREER TIMELINE" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,_oklch(0.78_0.17_60_/_0.04),transparent_50%)]" />
      </div>

      <div className="relative z-10 pt-20 pb-16 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="text-xs font-mono text-primary/60 mb-2">// OPERATIONS HISTORY</div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-wider text-foreground">
            CAREER <span className="text-neon-orange" style={{ textShadow: "0 0 7px oklch(0.78 0.17 60)" }}>ACHIEVEMENTS</span>
          </h1>
          <p className="text-sm font-mono text-muted-foreground mt-2">
            {ACHIEVEMENTS.length} achievements // {ACHIEVEMENTS.filter((a) => a.unlocked).length} unlocked
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-primary/10" />

          <div className="flex flex-col gap-4">
            {ACHIEVEMENTS.map((achievement, i) => (
              <div key={achievement.id} className="relative pl-14">
                {/* Timeline dot */}
                <div
                  className="absolute left-[18px] top-6 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: achievement.unlocked ? "var(--neon-orange)" : "var(--muted-foreground)",
                    background: achievement.unlocked ? "oklch(0.78 0.17 60 / 0.3)" : "transparent",
                    boxShadow: achievement.unlocked ? "0 0 8px oklch(0.78 0.17 60 / 0.4)" : "none",
                  }}
                />
                <AchievementCard achievement={achievement} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement toast */}
      {showToast && toastAchievement && <AchievementToast achievement={toastAchievement} />}
    </div>
  )
}
