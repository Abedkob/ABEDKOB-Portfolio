"use client"

import { GameProvider } from "@/lib/game-context"
import { GameShell } from "@/components/game-shell"

export default function Home() {
  return (
    <GameProvider>
      <GameShell />
    </GameProvider>
  )
}
