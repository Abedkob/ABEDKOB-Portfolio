"use client"

import type { CSSProperties } from "react"
import { HudNav } from "@/components/hud-nav"
import { SKILL_TREE, type SkillCategory } from "@/lib/portfolio-data"
import { itemVariants, listVariants, motion } from "@/components/motion-kit"

const rarityColors: Record<string, string> = {
  Legendary: "text-neon-pink border-neon-pink/35 bg-neon-pink/10",
  Epic: "text-neon-cyan border-neon-cyan/35 bg-neon-cyan/10",
  Rare: "text-primary border-primary/25 bg-primary/10",
  Common: "text-foreground/60 border-border bg-secondary/70",
}

const rarityGlow: Record<string, string> = {
  Legendary: "0 0 12px var(--glow-accent)",
  Epic: "0 0 12px var(--glow-primary-soft)",
  Rare: "0 0 10px var(--glow-primary-soft)",
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
  skill: { name: string; level: number; rarity: string; evidence: string }
  branchColor: string
}) {
  return (
    <motion.div
      className="group relative"
      variants={itemVariants}
    >
      <div
        className={`loadout-skill glass-card relative overflow-hidden rounded-xl px-4 py-3 transition-[box-shadow,border-color,background-color] duration-200 cursor-default ${rarityColors[skill.rarity]}`}
        style={{ "--skill-hover-shadow": rarityGlow[skill.rarity] } as CSSProperties}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <span className="text-sm font-sans font-bold tracking-wider">{skill.name}</span>
            <p className="mt-1 text-xs font-serif leading-relaxed text-foreground/68">{skill.evidence}</p>
          </div>
          <span className="shrink-0 text-xs font-mono opacity-60">{skill.rarity.toUpperCase()}</span>
        </div>

        {/* Level bar */}
        <div className="h-1.5 bg-background/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full origin-left rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: skill.level / 100 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            style={{
              width: "100%",
              background: branchColor,
              boxShadow: `0 0 5px ${branchColor}`,
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs font-mono opacity-40">CONFIDENCE</span>
          <span className="text-xs font-mono opacity-60">{skill.level}/100</span>
        </div>
      </div>
    </motion.div>
  )
}

function SkillBranch({ category }: { category: SkillCategory }) {
  const color = branchColorMap[category.color] || "var(--neon-cyan)"

  return (
    <motion.div className="hud-panel hud-corner p-5 rounded-xl" variants={itemVariants}>
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
    </motion.div>
  )
}

export function LoadoutScreen() {
  const totalSkills = SKILL_TREE.reduce((acc, c) => acc + c.skills.length, 0)
  const legendary = SKILL_TREE.reduce(
    (acc, c) => acc + c.skills.filter((s) => s.rarity === "Legendary").length,
    0
  )

  return (
    <div className="screen-scroll" style={{ "--screen-max": "72rem" } as CSSProperties}>
      <HudNav title="LOADOUT" subtitle="SKILL ARSENAL" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 aurora-field opacity-25" />
      </div>

      <div className="screen-content">
        {/* Header */}
        <div className="mb-8">
          <div className="hud-label text-primary/60 mb-2">// SKILL TREE</div>
          <h1 className="screen-title font-sans font-bold text-foreground">
            ACTIVE <span className="text-accent accent-glow">LOADOUT</span>
          </h1>
          <p className="copy-measure mt-3 text-base font-serif leading-relaxed text-foreground/72">
            Skills are grouped by domain and paired with project evidence, so the loadout reads like capability plus proof.
          </p>
          <p className="text-sm font-mono text-muted-foreground mt-3">
            {totalSkills} skills equipped // {legendary} legendary tier
          </p>
        </div>

        {/* Skill tree grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={listVariants}
          initial="initial"
          animate="animate"
        >
          {SKILL_TREE.map((category) => (
            <SkillBranch key={category.branch} category={category} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
