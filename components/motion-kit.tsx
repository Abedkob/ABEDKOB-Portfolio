"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion"
import type { TargetAndTransition, Variants } from "framer-motion"

export { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion"

export const screenVariants: Variants = {
  initial: { opacity: 0, y: 10, scale: 0.992, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 130, damping: 26, mass: 0.75 },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.996,
    filter: "blur(3px)",
    transition: { duration: 0.16, ease: "easeInOut" },
  },
}

export const listVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.032,
      delayChildren: 0.025,
    },
  },
}

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 12, scale: 0.992 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 24, mass: 0.7 },
  },
}

export const panelHover: TargetAndTransition = {
  y: -2,
  scale: 1.006,
  transition: { type: "spring", stiffness: 220, damping: 26 },
}

export function ScreenFrame({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const reduceMotion = useReducedMotion()
  const spring = useSpring(0, { stiffness: 95, damping: 22, mass: 0.75 })
  const rounded = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`)
  const [display, setDisplay] = useState(reduceMotion ? `${value}${suffix}` : `0${suffix}`)

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(`${value}${suffix}`)
      return
    }

    const unsubscribe = rounded.on("change", setDisplay)
    spring.set(value)
    return unsubscribe
  }, [reduceMotion, rounded, spring, suffix, value])

  return <>{display}</>
}
