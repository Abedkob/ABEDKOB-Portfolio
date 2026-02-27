"use client"

import { useState, useEffect, useRef } from "react"
import { HudNav } from "@/components/hud-nav"
import { PLAYER } from "@/lib/portfolio-data"
import { Mail, Github, MapPin, Send, Terminal } from "lucide-react"

const TERMINAL_LINES = [
  { text: "Establishing secure connection...", delay: 0 },
  { text: "Routing through encrypted channel...", delay: 500 },
  { text: "Connection established.", delay: 1200, color: "neon-green" },
  { text: `Agent: ${PLAYER.name}`, delay: 1800 },
  { text: `Location: ${PLAYER.location}`, delay: 2200 },
  { text: "Comms channel OPEN. Ready for transmission.", delay: 2800, color: "neon-cyan" },
]

export function ContactScreen() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    TERMINAL_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay))
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleSubmit = () => {
    if (!message.trim()) return
    const mailtoLink = `mailto:${PLAYER.email}?subject=Portfolio Contact&body=${encodeURIComponent(message)}`
    window.open(mailtoLink)
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      <HudNav title="CONTACT" subtitle="COMMS CHANNEL" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_oklch(0.75_0.18_195_/_0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 pt-20 pb-16 px-4 md:px-8 lg:px-16 max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="text-xs font-mono text-primary/60 mb-2">// COMMUNICATIONS TERMINAL</div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-wider text-foreground">
            OPEN <span className="text-primary neon-text-cyan">CHANNEL</span>
          </h1>
        </div>

        {/* Terminal window */}
        <div className="hud-panel hud-corner p-5 mb-6">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-primary/10">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="text-xs font-mono text-primary">SECURE_TERMINAL v2.1</span>
          </div>
          <div className="flex flex-col gap-1.5 font-mono text-sm min-h-[120px]">
            {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="flex items-start gap-2 animate-in fade-in duration-300">
                <span className="text-muted-foreground">{">"}</span>
                <span className={line.color ? `text-${line.color}` : "text-foreground/70"}>
                  {line.text}
                </span>
              </div>
            ))}
            {visibleLines < TERMINAL_LINES.length && (
              <span className="text-primary animate-pulse">{"_"}</span>
            )}
          </div>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <a
            href={`mailto:${PLAYER.email}`}
            className="hud-panel hud-corner p-4 flex items-center gap-3 hover:bg-primary/5 transition-colors"
          >
            <Mail className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs font-mono text-primary/60">EMAIL</p>
              <p className="text-[12px] font-mono text-foreground truncate">
  {PLAYER.email}
</p>
            </div>
          </a>

          <a
            href={PLAYER.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hud-panel hud-corner p-4 flex items-center gap-3 hover:bg-primary/5 transition-colors"
          >
            <Github className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs font-mono text-primary/60">GITHUB</p>
              <p className="text-sm font-mono text-foreground">Abedkob</p>
            </div>
          </a>

          <div className="hud-panel hud-corner p-4 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs font-mono text-primary/60">LOCATION</p>
              <p className="text-sm font-mono text-foreground">{PLAYER.location}</p>
            </div>
          </div>
        </div>

        {/* Message form */}
        <div className="hud-panel hud-corner p-5">
          <h3 className="text-base font-sans font-bold tracking-wider text-primary mb-4">
            TRANSMIT MESSAGE
          </h3>
          {submitted ? (
            <div className="text-center py-6">
              <p className="text-base font-mono text-neon-green">{">"} Message client opened successfully.</p>
              <p className="text-sm font-mono text-muted-foreground mt-2">
                Your email client should have opened. Send the message to complete transmission.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2.5 text-sm font-mono text-primary border border-primary/30 rounded-sm hover:bg-primary/10 transition-colors"
              >
                NEW TRANSMISSION
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message here..."
                rows={4}
                className="w-full p-3 bg-secondary border border-border rounded-sm text-base font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 resize-none"
              />
              <button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="self-end flex items-center gap-2 px-5 py-2.5 rounded-sm bg-primary/10 border border-primary/40 text-primary text-sm font-mono hover:bg-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                TRANSMIT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
