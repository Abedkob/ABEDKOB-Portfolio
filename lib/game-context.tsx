"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { MenuItemId } from "@/lib/portfolio-data"

export type GameState = "boot" | "menu" | "missions" | "loadout" | "archives" | "ops" | "contact" | "settings"

type SettingsState = {
  bloom: boolean
  particles: boolean
  scanlines: boolean
  quality: "low" | "medium" | "high" | "ultra"
}

type GameContextType = {
  gameState: GameState
  setGameState: (state: GameState) => void
  transitioning: boolean
  setTransitioning: (v: boolean) => void
  settings: SettingsState
  updateSettings: (partial: Partial<SettingsState>) => void
  navigateTo: (state: GameState) => void
  bootComplete: boolean
  setBootComplete: (v: boolean) => void
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>("boot")
  const [transitioning, setTransitioning] = useState(false)
  const [bootComplete, setBootComplete] = useState(false)
  const [settings, setSettings] = useState<SettingsState>({
    bloom: true,
    particles: true,
    scanlines: true,
    quality: "high",
  })

  const updateSettings = useCallback((partial: Partial<SettingsState>) => {
    setSettings((prev) => ({ ...prev, ...partial }))
  }, [])

  const navigateTo = useCallback(
    (state: GameState) => {
      setTransitioning(true)
      setTimeout(() => {
        setGameState(state)
        setTimeout(() => setTransitioning(false), 400)
      }, 400)
    },
    []
  )

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        transitioning,
        setTransitioning,
        settings,
        updateSettings,
        navigateTo,
        bootComplete,
        setBootComplete,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) throw new Error("useGame must be used within GameProvider")
  return context
}

export function menuIdToState(id: MenuItemId): GameState {
  switch (id) {
    case "missions":
      return "missions"
    case "loadout":
      return "loadout"
    case "archives":
      return "archives"
    case "ops":
      return "ops"
    case "contact":
      return "contact"
    case "settings":
      return "settings"
    default:
      return "menu"
  }
}
