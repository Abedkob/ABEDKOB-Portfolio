"use client"

import { useEffect, useMemo, useState } from "react"
import type { CSSProperties } from "react"
import { HudNav } from "@/components/hud-nav"
import { MISSIONS, type Mission, type MissionCategory } from "@/lib/portfolio-data"
import { CheckCircle2, ChevronRight, ExternalLink, X } from "lucide-react"
import { AnimatePresence, itemVariants, listVariants, motion, panelHover } from "@/components/motion-kit"

const difficultyColors: Record<string, string> = {
  S: "text-neon-pink",
  A: "text-neon-cyan",
  B: "text-primary",
  C: "text-muted-foreground",
}

const difficultyBg: Record<string, string> = {
  S: "bg-neon-pink/10 border-neon-pink/40",
  A: "bg-neon-cyan/10 border-neon-cyan/40",
  B: "bg-primary/10 border-primary/30",
  C: "bg-secondary border-border",
}

const FILTERS: Array<"All" | MissionCategory> = ["All", "Full-stack", "Mobile", "AI", "Backend", "Desktop"]

function MissionCard({
  mission,
  onSelect,
}: {
  mission: Mission
  onSelect: (m: Mission) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      onClick={() => onSelect(mission)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="hud-action glass-card relative group w-full overflow-hidden rounded-xl p-5 text-left focus-visible:bg-primary/10"
      aria-label={`Open details for ${mission.title}`}
      variants={itemVariants}
      whileHover={panelHover}
      whileTap={{ scale: 0.985 }}
      style={{
        borderColor: hovered ? "var(--primary)" : undefined,
        boxShadow: hovered ? "0 0 28px var(--glow-primary-soft), inset 0 0 20px var(--glow-primary-soft)" : undefined,
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-70" />
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">{mission.id}</span>
            <span className="rounded-sm border border-primary/25 bg-primary/10 px-2 py-0.5 text-xs font-mono text-primary">
              {mission.category}
            </span>
          </div>
          <h3 className="text-base font-sans font-bold tracking-wider text-primary">
            {mission.codename}
          </h3>
          <p className="mt-1 text-sm font-serif font-semibold text-foreground">{mission.title}</p>
        </div>
        <span
          className={`shrink-0 rounded-lg border px-2 py-0.5 text-xs font-sans font-bold sm:text-sm ${difficultyColors[mission.difficulty]} ${difficultyBg[mission.difficulty]}`}
        >
          RANK {mission.difficulty}
        </span>
      </div>

      <div className="mb-4 rounded-lg border border-primary/10 bg-background/25 p-3">
        <p className="hud-label mb-1 text-primary/60">// IMPACT</p>
        <p className="text-sm font-serif leading-relaxed text-foreground/78">{mission.impact}</p>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        {mission.highlights.slice(0, 3).map((item) => (
          <span key={item} className="flex items-start gap-2 text-sm font-serif text-foreground/72">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon-green" />
            {item}
          </span>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {mission.tech.slice(0, 5).map((t) => (
          <span
            key={t}
            className="text-xs font-mono px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground border border-border"
          >
            {t}
          </span>
        ))}
        {mission.tech.length > 5 && (
          <span className="text-xs font-mono px-2 py-0.5 rounded-sm border border-border text-muted-foreground">
            +{mission.tech.length - 5}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className={`rounded-full border px-2 py-0.5 text-xs font-mono ${mission.status === "COMPLETE" ? "status-complete" : "status-progress"}`}>
          {mission.status.replace("_", " ")}
        </span>
        <ChevronRight className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
      </div>
    </motion.button>
  )
}

function MissionDetail({ mission, onClose }: { mission: Mission; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="glass-modal hud-corner relative max-h-[calc(100dvh-1.25rem)] w-full max-w-3xl overflow-y-auto rounded-2xl p-4 sm:p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        <button
          onClick={onClose}
          className="hud-action glass-card absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-lg hover:bg-primary/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-primary" />
        </button>

        <div className="mb-4 flex flex-wrap items-center gap-3 pr-12">
          <span className="text-xs font-mono text-muted-foreground">{mission.id}</span>
          <span className="rounded-sm border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-xs font-mono text-primary">
            {mission.category}
          </span>
          <span
            className={`rounded-lg border px-2.5 py-0.5 text-sm font-sans font-bold ${difficultyColors[mission.difficulty]} ${difficultyBg[mission.difficulty]}`}
          >
            RANK {mission.difficulty}
          </span>
          <span className="text-xs font-mono text-neon-green">{mission.status.replace("_", " ")}</span>
        </div>

        <h2 id="mission-title" className="text-2xl md:text-3xl font-sans font-bold tracking-wider text-primary neon-glow mb-1">
          {mission.codename}
        </h2>
        <h3 className="text-base font-serif font-medium text-foreground mb-5">{mission.title}</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="glass-card rounded-xl p-4">
            <h4 className="hud-label text-primary/60 mb-2">// PROBLEM</h4>
            <p className="text-base font-serif leading-relaxed text-foreground/80">{mission.problem}</p>
          </section>
          <section className="glass-card rounded-xl p-4">
            <h4 className="hud-label text-primary/60 mb-2">// OUTCOME</h4>
            <p className="text-base font-serif leading-relaxed text-foreground/80">{mission.impact}</p>
          </section>
        </div>

        <section className="mt-5">
          <h4 className="hud-label text-primary/60 mb-2">// BUILD HIGHLIGHTS</h4>
          <div className="grid gap-2 sm:grid-cols-3">
            {mission.highlights.map((item) => (
              <div key={item} className="glass-card rounded-lg p-3 text-sm font-serif text-foreground/75">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h4 className="hud-label text-primary/60 mb-2">// TECH DEPLOYED</h4>
          <div className="flex flex-wrap gap-2">
            {mission.tech.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-mono text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={mission.repoUrl ?? "https://github.com/Abedkob"}
            target="_blank"
            rel="noopener noreferrer"
            className="hud-action glass-card neon-glow flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-mono text-primary hover:bg-primary/15 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            LAUNCH REPO
          </a>
          {mission.liveUrl && (
            <a
              href={mission.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-action glass-card flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-mono text-primary hover:bg-primary/15 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              VIEW LIVE
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function MissionsScreen() {
  const [selected, setSelected] = useState<Mission | null>(null)
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All")

  const filteredMissions = useMemo(() => {
    if (activeFilter === "All") return MISSIONS
    return MISSIONS.filter((mission) => mission.category === activeFilter)
  }, [activeFilter])

  return (
    <div className="screen-scroll" style={{ "--screen-max": "72rem" } as CSSProperties}>
      <HudNav title="MISSIONS" subtitle="PROJECT DATABASE" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 aurora-field opacity-45" />
      </div>

      <div className="screen-content">
        <div className="mb-8">
          <div className="hud-label text-primary/60 mb-2">// MISSION DATABASE</div>
          <h1 className="screen-title font-sans font-bold text-foreground">
            PROJECT <span className="text-primary neon-glow">PROOF</span>
          </h1>
          <p className="copy-measure mt-3 text-base font-serif leading-relaxed text-foreground/72">
            Real projects grouped by domain, with the problem, outcome, and build highlights visible before you open the details.
          </p>
          <p className="text-sm font-mono text-muted-foreground mt-3">
            {filteredMissions.length}/{MISSIONS.length} missions visible // {MISSIONS.filter((m) => m.status === "COMPLETE").length} completed
          </p>
        </div>

        <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((filter) => {
            const active = activeFilter === filter

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="hud-action glass-card shrink-0 rounded-lg px-3 py-2 text-xs font-mono transition-colors"
                style={{
                  borderColor: active ? "var(--primary)" : undefined,
                  color: active ? "var(--primary)" : "var(--muted-foreground)",
                  boxShadow: active ? "0 0 18px var(--glow-primary-soft)" : undefined,
                }}
              >
                {filter.toUpperCase()}
              </button>
            )
          })}
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          variants={listVariants}
          initial="initial"
          animate="animate"
          key={activeFilter}
        >
          {filteredMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} onSelect={setSelected} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <MissionDetail mission={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}
