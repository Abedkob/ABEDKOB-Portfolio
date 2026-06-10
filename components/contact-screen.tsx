"use client"

import { useState, useEffect, useRef } from "react"
import type { CSSProperties, FormEvent } from "react"
import { HudNav } from "@/components/hud-nav"
import { PLAYER } from "@/lib/portfolio-data"
import { Mail, Github, MapPin, Send, Terminal, User } from "lucide-react"
import { AnimatePresence, itemVariants, listVariants, motion, panelHover, useReducedMotion } from "@/components/motion-kit"

const TERMINAL_LINES = [
  { text: "Establishing secure connection...", delay: 0 },
  { text: "Routing through encrypted channel...", delay: 500 },
  { text: "Connection established.", delay: 1200, className: "text-neon-green" },
  { text: `Agent: ${PLAYER.name}`, delay: 1800 },
  { text: `Location: ${PLAYER.location}`, delay: 2200 },
  { text: "Comms channel OPEN. Ready for transmission.", delay: 2800, className: "text-primary" },
]

export function ContactScreen() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [senderName, setSenderName] = useState("")
  const [senderEmail, setSenderEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setVisibleLines(TERMINAL_LINES.length)
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    TERMINAL_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay))
    })
    return () => timers.forEach(clearTimeout)
  }, [reduceMotion])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!message.trim() || !senderName.trim() || !senderEmail.trim()) return
    const body = [
      `Name: ${senderName.trim()}`,
      `Email: ${senderEmail.trim()}`,
      "",
      message.trim(),
    ].join("\n")
    const mailtoLink = `mailto:${PLAYER.email}?subject=${encodeURIComponent("Portfolio Contact")}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
    setSubmitted(true)
  }

  return (
    <div className="screen-scroll" style={{ "--screen-max": "48rem" } as CSSProperties}>
      <HudNav title="CONTACT" subtitle="COMMS CHANNEL" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 aurora-field opacity-40" />
      </div>

      <div className="screen-content">
        <div className="mb-8">
          <div className="hud-label text-primary/60 mb-2">// COMMUNICATIONS TERMINAL</div>
          <h1 className="screen-title font-sans font-bold text-foreground">
            OPEN <span className="text-primary neon-glow">CHANNEL</span>
          </h1>
          <p className="copy-measure mt-3 text-base font-serif leading-relaxed text-foreground/72">
            Send a concise message with your contact details. The terminal opens your email client with the payload ready to transmit.
          </p>
        </div>

        {/* Terminal window */}
        <motion.div className="hud-panel hud-corner rounded-xl p-5 mb-6" variants={itemVariants} initial="initial" animate="animate" whileHover={panelHover}>
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-primary/10">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="hud-label text-primary">SECURE_TERMINAL v2.1</span>
          </div>
          <div className="flex flex-col gap-1.5 font-mono text-sm min-h-[120px]">
            {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22 }}
              >
                <span className="text-muted-foreground">{">"}</span>
                <span className={line.className ?? "text-foreground/70"}>
                  {line.text}
                </span>
              </motion.div>
            ))}
            {visibleLines < TERMINAL_LINES.length && (
              <span className="text-primary animate-pulse">{"_"}</span>
            )}
          </div>
        </motion.div>

        {/* Contact cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" variants={listVariants} initial="initial" animate="animate">
          <motion.a
            href={`mailto:${PLAYER.email}`}
            className="hud-action glass-card rounded-xl p-4 flex min-h-16 items-center gap-3 hover:bg-primary/5 transition-colors"
            variants={itemVariants}
            whileHover={panelHover}
          >
            <Mail className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs font-mono text-primary/60">EMAIL</p>
              <p className="text-[12px] font-mono text-foreground truncate">{PLAYER.email}</p>
            </div>
          </motion.a>

          <motion.a
            href={PLAYER.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hud-action glass-card rounded-xl p-4 flex min-h-16 items-center gap-3 hover:bg-primary/5 transition-colors"
            variants={itemVariants}
            whileHover={panelHover}
          >
            <Github className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs font-mono text-primary/60">GITHUB</p>
              <p className="text-sm font-mono text-foreground">Abedkob</p>
            </div>
          </motion.a>

          <motion.div className="glass-card rounded-xl p-4 flex min-h-16 items-center gap-3" variants={itemVariants} whileHover={panelHover}>
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs font-mono text-primary/60">LOCATION</p>
              <p className="text-sm font-mono text-foreground">{PLAYER.location}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Message form */}
        <motion.div className="hud-panel hud-corner rounded-xl p-5" variants={itemVariants} initial="initial" animate="animate">
          <h3 className="text-base font-sans font-bold tracking-wider text-primary mb-4">
            TRANSMIT MESSAGE
          </h3>
          <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="sent"
              className="text-center py-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-base font-mono text-neon-green">{">"} Message client opened successfully.</p>
              <p className="text-sm font-mono text-muted-foreground mt-2">
                Your email client should have opened. Send the message to complete transmission.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="hud-action glass-card mt-4 rounded-lg px-5 py-2.5 text-sm font-mono text-primary hover:bg-primary/10 transition-colors"
              >
                NEW TRANSMISSION
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="hud-label mb-2 block text-primary/70">
                    NAME
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="contact-name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                      className="min-h-11 w-full rounded-lg border border-border bg-secondary/70 py-2.5 pl-10 pr-3 text-base font-mono text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="hud-label mb-2 block text-primary/70">
                    EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="contact-email"
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="min-h-11 w-full rounded-lg border border-border bg-secondary/70 py-2.5 pl-10 pr-3 text-base font-mono text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="hud-label mb-2 block text-primary/70">
                  MESSAGE PAYLOAD
                </label>
                <textarea
                  id="contact-message"
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me what you want to build, fix, or discuss..."
                  rows={5}
                  required
                  className="min-h-36 w-full p-3 bg-secondary/70 border border-border rounded-lg text-base font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 resize-y"
                />
              </div>
              <button
                type="submit"
                disabled={!message.trim() || !senderName.trim() || !senderEmail.trim()}
                className="hud-action glass-card neon-glow self-end flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-mono text-primary hover:bg-primary/15 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                TRANSMIT
              </button>
            </motion.form>
          )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
