"use client"

import type { CSSProperties, ReactNode } from "react"
import { HudNav } from "@/components/hud-nav"
import { useGame } from "@/lib/game-context"
import { Monitor, Sparkles, ScanLine, Layers } from "lucide-react"
import { itemVariants, listVariants, motion, panelHover } from "@/components/motion-kit"

const QUALITY_OPTIONS = ["low", "medium", "high", "ultra"] as const

export function SettingsScreen() {
  const { settings, updateSettings } = useGame()

  return (
    <div className="screen-scroll" style={{ "--screen-max": "42rem" } as CSSProperties}>
      <HudNav title="SETTINGS" subtitle="VISUAL & PERFORMANCE" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 aurora-field opacity-35" />
      </div>

      <div className="screen-content">
        <div className="mb-8">
          <div className="hud-label text-primary/60 mb-2">// SYSTEM SETTINGS</div>
          <h1 className="screen-title font-sans font-bold text-foreground">
            <span className="text-primary neon-glow">SETTINGS</span>
          </h1>
        </div>

        {/* Graphics Quality */}
        <motion.div className="hud-panel hud-corner rounded-xl p-5 mb-4" variants={itemVariants} initial="initial" animate="animate" whileHover={panelHover}>
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="w-6 h-6 text-primary" />
            <h3 className="text-base font-sans font-bold tracking-wider text-primary">
              GRAPHICS PRESET
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {QUALITY_OPTIONS.map((q) => (
              <motion.button
                key={q}
                onClick={() => updateSettings({ quality: q })}
                className="hud-action glass-card px-3 py-2.5 rounded-lg text-sm font-mono uppercase transition-all duration-200"
                aria-pressed={settings.quality === q}
                whileTap={{ scale: 0.96 }}
                style={{
                  color: settings.quality === q ? "var(--primary)" : "var(--muted-foreground)",
                  boxShadow: settings.quality === q ? "0 0 18px var(--glow-primary-soft)" : undefined,
                }}
              >
                {q}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Toggles */}
        <motion.div className="hud-panel hud-corner rounded-xl p-5 mb-4" variants={itemVariants} initial="initial" animate="animate" whileHover={panelHover}>
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-6 h-6 text-primary" />
            <h3 className="text-base font-sans font-bold tracking-wider text-primary">
              VISUAL EFFECTS
            </h3>
          </div>
          <motion.div className="flex flex-col gap-3" variants={listVariants} initial="initial" animate="animate">
            <ToggleRow
              icon={<Sparkles className="w-5 h-5" />}
              label="Bloom"
              description="Post-processing glow effects"
              value={settings.bloom}
              onChange={(v) => updateSettings({ bloom: v })}
            />
            <ToggleRow
              icon={<Sparkles className="w-5 h-5" />}
              label="Particles"
              description="Floating particle effects"
              value={settings.particles}
              onChange={(v) => updateSettings({ particles: v })}
            />
            <ToggleRow
              icon={<ScanLine className="w-5 h-5" />}
              label="Scanlines"
              description="CRT scanline overlay"
              value={settings.scanlines}
              onChange={(v) => updateSettings({ scanlines: v })}
            />
          </motion.div>
        </motion.div>

        {/* Info */}
        <div className="text-xs font-mono text-muted-foreground text-center mt-6">
          Settings are stored in session // Reloading will reset to defaults
        </div>
      </div>
    </div>
  )
}

function ToggleRow({
  icon,
  label,
  description,
  value,
  onChange,
}: {
  icon: ReactNode
  label: string
  description: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <motion.div className="flex items-center justify-between gap-4 py-3 border-b border-primary/5 last:border-0" variants={itemVariants}>
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground">{icon}</span>
        <div>
          <p className="text-sm font-sans font-semibold tracking-wider text-foreground">{label}</p>
          <p className="text-xs font-mono text-muted-foreground">{description}</p>
        </div>
      </div>
      <motion.button
        onClick={() => onChange(!value)}
        className="hud-action relative h-11 w-14 shrink-0 rounded-full transition-all duration-300"
        role="switch"
        aria-checked={value}
        aria-label={`Toggle ${label}`}
        whileTap={{ scale: 0.94 }}
        style={{
          background: value ? "var(--glow-primary-soft)" : "var(--secondary)",
          border: `1px solid ${value ? "var(--glass-border)" : "var(--border)"}`,
        }}
      >
        <motion.div
          className="absolute top-[13px] w-4 h-4 rounded-full transition-all duration-300"
          style={{
            left: value ? "calc(100% - 22px)" : "6px",
            background: value ? "var(--primary)" : "var(--muted-foreground)",
            boxShadow: value ? "0 0 10px var(--glow-primary-soft)" : "none",
          }}
        />
      </motion.button>
    </motion.div>
  )
}
