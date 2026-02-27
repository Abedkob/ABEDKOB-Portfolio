"use client"

import { HudNav } from "@/components/hud-nav"
import { useGame } from "@/lib/game-context"
import { Monitor, Sparkles, ScanLine, Layers } from "lucide-react"

const QUALITY_OPTIONS = ["low", "medium", "high", "ultra"] as const

export function SettingsScreen() {
  const { settings, updateSettings } = useGame()

  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      <HudNav title="SETTINGS" subtitle="VISUAL & PERFORMANCE" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_oklch(0.75_0.18_195_/_0.04),transparent_50%)]" />
      </div>

      <div className="relative z-10 pt-20 pb-16 px-4 md:px-8 lg:px-16 max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="text-xs font-mono text-primary/60 mb-2">// SYSTEM SETTINGS</div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-wider text-foreground">
            <span className="text-primary neon-text-cyan">SETTINGS</span>
          </h1>
        </div>

        {/* Graphics Quality */}
        <div className="hud-panel hud-corner p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="w-6 h-6 text-primary" />
            <h3 className="text-base font-sans font-bold tracking-wider text-primary">
              GRAPHICS PRESET
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {QUALITY_OPTIONS.map((q) => (
              <button
                key={q}
                onClick={() => updateSettings({ quality: q })}
                className="px-3 py-2.5 rounded-sm text-sm font-mono uppercase transition-all duration-200"
                style={{
                  background: settings.quality === q ? "oklch(0.75 0.18 195 / 0.15)" : "transparent",
                  border: `1px solid ${settings.quality === q ? "var(--neon-cyan)" : "oklch(0.25 0.04 195)"}`,
                  color: settings.quality === q ? "var(--neon-cyan)" : "var(--muted-foreground)",
                  boxShadow: settings.quality === q ? "0 0 10px oklch(0.75 0.18 195 / 0.2)" : "none",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="hud-panel hud-corner p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-6 h-6 text-primary" />
            <h3 className="text-base font-sans font-bold tracking-wider text-primary">
              VISUAL EFFECTS
            </h3>
          </div>
          <div className="flex flex-col gap-3">
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
          </div>
        </div>

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
  icon: React.ReactNode
  label: string
  description: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-primary/5 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground">{icon}</span>
        <div>
          <p className="text-sm font-sans font-semibold tracking-wider text-foreground">{label}</p>
          <p className="text-xs font-mono text-muted-foreground">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className="relative w-11 h-6 rounded-full transition-all duration-300"
        role="switch"
        aria-checked={value}
        aria-label={`Toggle ${label}`}
        style={{
          background: value ? "oklch(0.75 0.18 195 / 0.3)" : "oklch(0.2 0 0)",
          border: `1px solid ${value ? "var(--neon-cyan)" : "oklch(0.3 0 0)"}`,
        }}
      >
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300"
          style={{
            left: value ? "calc(100% - 20px)" : "2px",
            background: value ? "var(--neon-cyan)" : "oklch(0.5 0 0)",
            boxShadow: value ? "0 0 6px var(--neon-cyan)" : "none",
          }}
        />
      </button>
    </div>
  )
}
