"use client"
import Image from "next/image"
import { HudNav } from "@/components/hud-nav"
import { PLAYER, EDUCATION } from "@/lib/portfolio-data"
import { MapPin, Mail, Github, GraduationCap, Code2, User } from "lucide-react"

export function ArchivesScreen() {
  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      <HudNav title="ARCHIVES" subtitle="DOSSIER & TRAINING" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_oklch(0.78_0.2_145_/_0.05),transparent_50%)]" />
      </div>

      <div className="relative z-10 pt-20 pb-16 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-mono text-primary/60 mb-2">// CLASSIFIED ARCHIVES</div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-wider text-foreground">
            AGENT <span className="text-neon-green neon-text-green">DOSSIER</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* About card */}
          <div className="hud-panel hud-corner p-6 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-primary" />
              <h3 className="text-base font-sans font-bold tracking-wider text-primary">IDENTITY</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar area */}
              <div className="flex-shrink-0">
                <div className="w-28 h-28 rounded-sm border-2 border-primary/30 flex items-center justify-center bg-primary/5">
                <Image
              src="/images/profile.jpg"
              alt="Abed Al-Nabe Koubeissy"
              width={48}
              height={48}
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
                      className="text-sm font-mono text-primary hover:underline"
                    >
                      {PLAYER.github}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education card */}
          <div className="hud-panel hud-corner p-6">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-neon-green" />
              <h3 className="text-base font-sans font-bold tracking-wider text-neon-green">TRAINING RECORD</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-base font-serif font-semibold text-foreground">{EDUCATION.degree}</p>
                <p className="text-sm font-mono text-muted-foreground mt-1">{EDUCATION.institution}</p>
              </div>
              <div className="h-px bg-primary/10" />
              <div>
                <p className="text-xs font-mono text-primary/60">// SPECIALIZATION</p>
                <p className="text-sm font-serif text-foreground/70 mt-1">{EDUCATION.focus}</p>
              </div>
            </div>
          </div>

          {/* Tech Arsenal summary */}
          <div className="hud-panel hud-corner p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-6 h-6 text-neon-cyan" />
              <h3 className="text-base font-sans font-bold tracking-wider text-neon-cyan">PRIMARY ARSENAL</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {PLAYER.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-mono rounded-sm bg-primary/10 text-primary border border-primary/30"
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
          </div>
        </div>
      </div>
    </div>
  )
}
