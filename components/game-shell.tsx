"use client"

import dynamic from "next/dynamic"
import { useGame } from "@/lib/game-context"
import { BootScreen } from "@/components/boot-screen"
import { MainMenu } from "@/components/main-menu"
import { MissionsScreen } from "@/components/missions-screen"
import { LoadoutScreen } from "@/components/loadout-screen"
import { ArchivesScreen } from "@/components/archives-screen"
import { OpsScreen } from "@/components/ops-screen"
import { ContactScreen } from "@/components/contact-screen"
import { SettingsScreen } from "@/components/settings-screen"

const HubWorld = dynamic(
  () => import("@/components/hub-world").then((mod) => mod.HubWorld),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-primary">INITIALIZING HUB...</span>
        </div>
      </div>
    ),
  }
)

export function GameShell() {
  const { gameState, transitioning, settings } = useGame()

  return (
    <div className={`relative w-screen h-screen ${settings.scanlines ? "scanlines" : ""}`}>
      {/* Transition overlay */}
      <div
        className="fixed inset-0 bg-background z-[100] pointer-events-none transition-opacity duration-400"
        style={{ opacity: transitioning ? 1 : 0 }}
      />

      {/* Game screens */}
      {gameState === "boot" && <BootScreen />}
      {gameState === "menu" && <MainMenu />}
      {gameState === "missions" && <MissionsScreen />}
      {gameState === "loadout" && <LoadoutScreen />}
      {gameState === "archives" && <ArchivesScreen />}
      {gameState === "ops" && <OpsScreen />}
      {gameState === "contact" && <ContactScreen />}
      {gameState === "settings" && <SettingsScreen />}

      {/* Film grain overlay (subtle) */}
      {settings.bloom && (
        <div
          className="fixed inset-0 pointer-events-none z-[98] mix-blend-overlay opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[97]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, oklch(0.08 0.01 260 / 0.6) 100%)",
        }}
      />
    </div>
  )
}
