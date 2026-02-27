"use client"

import { useState } from "react"
import { HudNav } from "@/components/hud-nav"
import { MISSIONS, type Mission } from "@/lib/portfolio-data"
import { ExternalLink, ChevronRight, X } from "lucide-react"

const difficultyColors: Record<string, string> = {
  S: "text-neon-pink",
  A: "text-neon-cyan",
  B: "text-neon-green",
  C: "text-neon-orange",
}

const difficultyBg: Record<string, string> = {
  S: "bg-neon-pink/10 border-neon-pink/40",
  A: "bg-neon-cyan/10 border-neon-cyan/40",
  B: "bg-neon-green/10 border-neon-green/40",
  C: "bg-neon-orange/10 border-neon-orange/40",
}

function MissionCard({
  mission,
  index,
  onSelect,
}: {
  mission: Mission
  index: number
  onSelect: (m: Mission) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={() => onSelect(mission)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group text-left w-full hud-panel hud-corner p-5 transition-all duration-300 rounded-sm"
      style={{
        borderColor: hovered ? "var(--neon-cyan)" : undefined,
        boxShadow: hovered ? "0 0 20px rgba(0,220,255,0.15), inset 0 0 20px rgba(0,220,255,0.05)" : undefined,
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Mission ID */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-muted-foreground">{mission.id}</span>
        <span
          className={`text-sm font-sans font-bold px-2.5 py-0.5 rounded-sm border ${difficultyColors[mission.difficulty]} ${difficultyBg[mission.difficulty]}`}
        >
          RANK {mission.difficulty}
        </span>
      </div>

      {/* Codename */}
      <h3 className="text-base font-sans font-bold tracking-wider text-primary mb-1">
        {mission.codename}
      </h3>
      <p className="text-sm font-serif font-medium text-foreground mb-3">{mission.title}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {mission.tech.map((t) => (
          <span
            key={t}
            className="text-xs font-mono px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground border border-border"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-neon-green">
          {mission.status === "COMPLETE" ? "[ COMPLETE ]" : "[ IN PROGRESS ]"}
        </span>
        <ChevronRight className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
      </div>
    </button>
  )
}

function MissionDetail({ mission, onClose }: { mission: Mission; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative hud-panel hud-corner p-6 md:p-8 max-w-2xl w-full animate-in fade-in zoom-in-95 duration-300">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-sm hover:bg-primary/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-primary" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-muted-foreground">{mission.id}</span>
          <span
            className={`text-sm font-sans font-bold px-2.5 py-0.5 rounded-sm border ${difficultyColors[mission.difficulty]} ${difficultyBg[mission.difficulty]}`}
          >
            RANK {mission.difficulty}
          </span>
          <span className="text-xs font-mono text-neon-green">{mission.status}</span>
        </div>

        <h2
          className="text-2xl md:text-3xl font-sans font-bold tracking-wider text-primary neon-text-cyan mb-1"
          style={{ textShadow: "0 0 7px var(--neon-cyan)" }}
        >
          {mission.codename}
        </h2>
        <h3 className="text-base font-serif font-medium text-foreground mb-4">{mission.title}</h3>

        {/* Divider */}
        <div className="h-px bg-primary/20 mb-4" />

        {/* Objective */}
        <div className="mb-6">
          <h4 className="text-xs font-mono text-primary/60 mb-2">// MISSION OBJECTIVE</h4>
          <p className="text-base font-serif leading-relaxed text-foreground/80">{mission.description}</p>
        </div>

        {/* Tech */}
        <div className="mb-6">
          <h4 className="text-xs font-mono text-primary/60 mb-2">// TECH DEPLOYED</h4>
          <div className="flex flex-wrap gap-2">
            {mission.tech.map((t) => (
              <span
                key={t}
                className="text-sm font-mono px-3 py-1 rounded-sm bg-primary/10 text-primary border border-primary/30"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="flex gap-3">
          <a
            href="https://github.com/Abedkob"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-primary/10 border border-primary/40 text-primary text-sm font-mono hover:bg-primary/20 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            LAUNCH REPO
          </a>
        </div>
      </div>
    </div>
  )
}

export function MissionsScreen() {
  const [selected, setSelected] = useState<Mission | null>(null)

  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      <HudNav title="MISSIONS" subtitle="PROJECT DATABASE" />

      {/* Background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_oklch(0.75_0.18_195_/_0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 pt-20 pb-16 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-mono text-primary/60 mb-2">// MISSION DATABASE</div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-wider text-foreground">
            ACTIVE <span className="text-primary neon-text-cyan">MISSIONS</span>
          </h1>
          <p className="text-sm font-mono text-muted-foreground mt-2">
            {MISSIONS.length} missions loaded // {MISSIONS.filter((m) => m.status === "COMPLETE").length} completed
          </p>
        </div>

        {/* Mission grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MISSIONS.map((mission, i) => (
            <MissionCard key={mission.id} mission={mission} index={i} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {selected && <MissionDetail mission={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
