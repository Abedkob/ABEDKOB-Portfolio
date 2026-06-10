"use client"
import type { CSSProperties } from "react"
import Image from "next/image"
import { HudNav } from "@/components/hud-nav"
import { PLAYER, EDUCATION } from "@/lib/portfolio-data"
import { MapPin, Mail, Github, GraduationCap, Code2, User } from "lucide-react"
import { itemVariants, listVariants, motion, panelHover } from "@/components/motion-kit"

export function ArchivesScreen() {
  return (
    <div className="screen-scroll" style={{ "--screen-max": "56rem" } as CSSProperties}>
      <HudNav title="ARCHIVES" subtitle="DOSSIER & TRAINING" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 aurora-field opacity-35" />
      </div>

      <div className="screen-content">
        {/* Header */}
        <div className="mb-8">
          <div className="hud-label text-primary/60 mb-2">// CLASSIFIED ARCHIVES</div>
          <h1 className="screen-title font-sans font-bold text-foreground">
            AGENT <span className="text-primary neon-glow">DOSSIER</span>
          </h1>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={listVariants} initial="initial" animate="animate">
          {/* About card */}
          <motion.div className="hud-panel hud-corner rounded-xl p-6 md:col-span-2" variants={itemVariants} whileHover={panelHover}>
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-primary" />
              <h3 className="text-base font-sans font-bold tracking-wider text-primary">IDENTITY</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar area */}
              <div className="flex-shrink-0">
                <div className="w-28 h-28 overflow-hidden rounded-xl border-2 border-primary/30 bg-primary/5 shadow-[0_0_22px_var(--glow-primary-soft)]">
                  <Image
                    src="/images/profile.jpg"
                    alt="Abed Al-Nabe Koubeissy"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-sans font-bold tracking-wider text-foreground mb-1">{PLAYER.name}</h2>
                <p className="text-sm font-mono text-primary mb-3">{PLAYER.role}</p>
                <p className="text-base font-serif leading-relaxed text-foreground/70">{PLAYER.bio}</p>

                <div className="flex flex-col gap-2.5 mt-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-mono text-foreground/70">{PLAYER.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-mono text-foreground/70">{PLAYER.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={PLAYER.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm text-sm font-mono text-primary hover:underline"
                    >
                      {PLAYER.github}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education card */}
          <motion.div className="hud-panel hud-corner rounded-xl p-6" variants={itemVariants} whileHover={panelHover}>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h3 className="text-base font-sans font-bold tracking-wider text-primary">TRAINING RECORD</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-base font-serif font-semibold text-foreground">{EDUCATION.degree}</p>
                <p className="text-sm font-mono text-muted-foreground mt-1">{EDUCATION.institution}</p>
              </div>
              <div className="h-px bg-primary/10" />
              <div>
                <p className="hud-label text-primary/60">// SPECIALIZATION</p>
                <p className="text-sm font-serif text-foreground/70 mt-1">{EDUCATION.focus}</p>
              </div>
            </div>
          </motion.div>

          {/* Tech Arsenal summary */}
          <motion.div className="hud-panel hud-corner rounded-xl p-6" variants={itemVariants} whileHover={panelHover}>
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-6 h-6 text-neon-cyan" />
              <h3 className="text-base font-sans font-bold tracking-wider text-neon-cyan">PRIMARY ARSENAL</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {PLAYER.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-mono rounded-lg bg-primary/10 text-primary border border-primary/30"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-primary/10">
              <p className="text-xs font-mono text-muted-foreground">
                Full arsenal available in LOADOUT section
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
