"use client"

import { useState } from "react"
import { HudNav } from "@/components/hud-nav"
import { SKILL_TREE, type SkillCategory } from "@/lib/portfolio-data"

const rarityColors: Record<string, string> = {
  Legendary: "text-neon-orange border-neon-orange/40 bg-neon-orange/10",
  Epic: "text-neon-pink border-neon-pink/40 bg-neon-pink/10",
  Rare: "text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10",
  Common: "text-foreground/60 border-border bg-secondary",
}

const rarityGlow: Record<string, string> = {
  Legendary: "0 0 10px oklch(0.78 0.17 60 / 0.3)",
  Epic: "0 0 10px oklch(0.72 0.22 340 / 0.3)",
  Rare: "0 0 10px oklch(0.82 0.19 195 / 0.3)",
  Common: "none",
}

const branchColorMap: Record<string, string> = {
  "neon-cyan": "var(--neon-cyan)",
  "neon-pink": "var(--neon-pink)",
  "neon-green": "var(--neon-green)",
  "neon-orange": "var(--neon-orange)",
}

function SkillNode({
  skill,
  branchColor,
}: {
  skill: { name: string; level: number; rarity: string }
  branchColor: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative px-4 py-3 rounded-sm border transition-all duration-300 cursor-default ${rarityColors[skill.rarity]}`}
        style={{ boxShadow: hovered ? rarityGlow[skill.rarity] : "none" }}
      >
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-sm font-sans font-bold tracking-wider">{skill.name}</span>
          <span className="text-xs font-mono opacity-60">{skill.rarity.toUpperCase()}</span>
        </div>

        {/* Level bar */}
        <div className="h-1.5 bg-background/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${skill.level}%`,
              background: branchColorMap[SKILL_TREE.find(b => b.skills.some(s => s.name === skill.name))?.color || "neon-cyan"] || branchColor,
              boxShadow: `0 0 6px ${branchColor}`,
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs font-mono opacity-40">LVL</span>
          <span className="text-xs font-mono opacity-60">{skill.level}/100</span>
        </div>
      </div>

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-sm bg-background border border-primary/40 pointer-events-none"
          style={{ boxShadow: "0 0 15px rgba(0,220,255,0.15)", minWidth: "180px" }}
        >
          <div className="text-xs font-mono text-primary mb-1">{skill.name}</div>
          <div className="text-xs font-mono text-muted-foreground">
            Proficiency: {skill.level}%
          </div>
          <div className={`text-xs font-mono mt-1 ${rarityColors[skill.rarity].split(" ")[0]}`}>
            {skill.rarity} Tier
          </div>
        </div>
      )}
    </div>
  )
}

function SkillBranch({ category }: { category: SkillCategory }) {
  const color = branchColorMap[category.color] || "var(--neon-cyan)"

  return (
    <div className="hud-panel hud-corner p-5 rounded-sm">
      {/* Branch header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
        <div>
          <h3 className="text-base font-sans font-bold tracking-wider" style={{ color }}>
            {category.name.toUpperCase()}
          </h3>
          <span className="text-xs font-mono text-muted-foreground">
            BRANCH: {category.branch} // {category.skills.length} ITEMS
          </span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-2">
        {category.skills.map((skill) => (
          <SkillNode key={skill.name} skill={skill} branchColor={color} />
        ))}
      </div>
    </div>
  )
}

export function LoadoutScreen() {
  const totalSkills = SKILL_TREE.reduce((acc, c) => acc + c.skills.length, 0)
  const legendary = SKILL_TREE.reduce(
    (acc, c) => acc + c.skills.filter((s) => s.rarity === "Legendary").length,
    0
  )

  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      <HudNav title="LOADOUT" subtitle="SKILL ARSENAL" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_oklch(0.72_0.22_340_/_0.05),transparent_50%)]" />
      </div>

      <div className="relative z-10 pt-20 pb-16 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-mono text-primary/60 mb-2">// SKILL TREE</div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-wider text-foreground">
            ACTIVE <span className="text-accent neon-text-pink">LOADOUT</span>
          </h1>
          <p className="text-sm font-mono text-muted-foreground mt-2">
            {totalSkills} skills equipped // {legendary} legendary tier
          </p>
        </div>

        {/* Skill tree grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_TREE.map((category) => (
            <SkillBranch key={category.branch} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}
