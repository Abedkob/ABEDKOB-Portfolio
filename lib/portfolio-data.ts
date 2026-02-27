export const PLAYER = {
  name: "Abed Al-Nabe Koubeissy",
  callsign: "ABEDKOB",
  location: "Nabatiyeh, Lebanon",
  email: "abedkoubiessy@gmail.com",
  github: "https://github.com/Abedkob",
  role: "Computer Science Student & Full-Stack Developer",
  stack: ["React.js", "Node.js", "Express.js", "Flutter", "PHP", "MySQL"],
  bio: "Passionate developer building immersive digital experiences. Specializing in full-stack web development and mobile applications with a keen eye for design and user experience.",
}

export type Mission = {
  id: string
  codename: string
  title: string
  description: string
  tech: string[]
  difficulty: "S" | "A" | "B" | "C"
  status: "COMPLETE" | "IN_PROGRESS" | "CLASSIFIED"
}

export const MISSIONS: Mission[] = [
  {
    id: "MSN-001",
    codename: "ART_CANVAS",
    title: "Abed ArtCanvas",
    description:
      "A TypeScript-based web application that allows users to request custom artwork by submitting reference images through an online form with image upload handling.",
    tech: ["TypeScript", "Web APIs", "HTML/CSS"],
    difficulty: "B",
    status: "COMPLETE",
  },
  {
    id: "MSN-002",
    codename: "STORE_POS",
    title: "Store POS Management System",
    description:
      "A multi-application retail POS ecosystem including a client mobile app for barcode scanning and price lookup, an admin mobile app for product and inventory management, and a PHP backend handling product storage, API communication, and centralized database logic.",
    tech: ["Flutter", "Dart", "PHP", "MySQL", "REST APIs"],
    difficulty: "S",
    status: "COMPLETE",
  },
  {
    id: "MSN-003",
    codename: "HOTEL_ERP",
    title: "Hotel ERP System",
    description:
      "A full-stack hotel management system handling room allocation, reservations, payments, services, activity logs, and role-based authentication using a structured MVC backend architecture.",
    tech: ["React", "Node.js", "Express.js", "SQL", "REST API", "JWT Auth"],
    difficulty: "S",
    status: "COMPLETE",
  },
  {
    id: "MSN-004",
    codename: "EMOTION_AI",
    title: "AI Emotion Detection from Text",
    description:
      "A machine learning system that processes social media text and classifies it into seven emotional categories using natural language preprocessing and multi-class classification techniques.",
    tech: ["Python", "NLP", "Scikit-learn", "Pandas"],
    difficulty: "A",
    status: "COMPLETE",
  },
  {
    id: "MSN-005",
    codename: "LICENSE_ERP",
    title: "License Management ERP Dashboard",
    description:
      "A secure ERP-style dashboard application for managing licenses and viewing statistical data, including authentication, session management, and structured backend logic.",
    tech: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
    difficulty: "A",
    status: "COMPLETE",
  },
  {
    id: "MSN-006",
    codename: "COURSE_SCHED",
    title: "University Course Scheduler",
    description:
      "A constraint-based academic scheduling engine that generates university timetables using recursive backtracking, inheritance-based modeling, and Excel data import.",
    tech: ["OOP", "Java", "Backtracking Algorithm", "Excel Parsing"],
    difficulty: "A",
    status: "COMPLETE",
  },
  {
    id: "MSN-007",
    codename: "WHATSAPP_API",
    title: "WhatsApp API Integration Tool",
    description:
      "An experimental backend automation tool developed to explore third-party messaging API integration and request handling.",
    tech: ["PHP", "Python", "REST APIs"],
    difficulty: "B",
    status: "COMPLETE",
  },
]

export type SkillCategory = {
  name: string
  branch: string
  color: string
  skills: { name: string; level: number; rarity: "Legendary" | "Epic" | "Rare" | "Common" }[]
}

export const SKILL_TREE: SkillCategory[] = [
  {
    name: "Languages",
    branch: "CORE",
    color: "neon-cyan",
    skills: [
      { name: "JavaScript", level: 90, rarity: "Legendary" },
      { name: "Python", level: 80, rarity: "Epic" },
      { name: "Java", level: 75, rarity: "Epic" },
      { name: "PHP", level: 70, rarity: "Rare" },
      { name: "SQL", level: 85, rarity: "Legendary" },
    ],
  },
  {
    name: "Frontend",
    branch: "FRONTEND",
    color: "neon-pink",
    skills: [
      { name: "React.js", level: 90, rarity: "Legendary" },
      { name: "Next.js", level: 75, rarity: "Epic" },
      { name: "TailwindCSS", level: 85, rarity: "Legendary" },
      { name: "Bootstrap", level: 70, rarity: "Rare" },
    ],
  },
  {
    name: "Backend",
    branch: "BACKEND",
    color: "neon-green",
    skills: [
      { name: "Node.js", level: 88, rarity: "Legendary" },
      { name: "Express.js", level: 85, rarity: "Legendary" },
      { name: "Django", level: 65, rarity: "Rare" },
    ],
  },
  {
    name: "Mobile",
    branch: "MOBILE",
    color: "neon-orange",
    skills: [
      { name: "Flutter", level: 75, rarity: "Epic" },
      { name: "Dart", level: 75, rarity: "Epic" },
    ],
  },
  {
    name: "Tools",
    branch: "TOOLS",
    color: "neon-cyan",
    skills: [
      { name: "Git", level: 85, rarity: "Epic" },
      { name: "GitHub", level: 85, rarity: "Epic" },
      { name: "REST APIs", level: 88, rarity: "Legendary" },
      { name: "Agile", level: 75, rarity: "Rare" },
    ],
  },
]

export type Achievement = {
  id: string
  title: string
  company: string
  role: string
  period: string
  description: string[]
  unlocked: boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ACH-001",
    title: "FULL_STACK_OPERATIVE",
    company: "Cedars Software Solutions",
    role: "Full Stack & Flutter Developer Intern",
    period: "Jul 2025 - Sep 2025",
    description: [
      "Built React + Express applications",
      "Developed Flutter UI + REST APIs",
      "Created PHP/MySQL modules",
      "Agile teamwork & Git workflows",
    ],
    unlocked: true,
  },
  {
    id: "ACH-002",
    title: "3D_ARCHITECT",
    company: "H & H",
    role: "3D Animation Intern",
    period: "Jul 2020 - Sep 2020",
    description: [
      "Lumion 3D architectural animations",
      "Promotional video editing",
      "Client communication & delivery",
    ],
    unlocked: true,
  },
]

export const EDUCATION = {
  degree: "Bachelor of Computer Science",
  institution: "Phoenicia University",
  focus: "Full-Stack Development & Software Engineering",
}

export const MENU_ITEMS = [
  { id: "missions", label: "MISSIONS", description: "View Projects", icon: "target" },
  { id: "loadout", label: "LOADOUT", description: "Skills & Arsenal", icon: "shield" },
  { id: "archives", label: "ARCHIVES", description: "About & Education", icon: "book" },
  { id: "ops", label: "OPERATIONS", description: "Career Timeline", icon: "briefcase" },
  { id: "contact", label: "CONTACT", description: "Open Comms Channel", icon: "mail" },
  { id: "settings", label: "SETTINGS", description: "Visual & Performance", icon: "settings" },
] as const

export type MenuItemId = (typeof MENU_ITEMS)[number]["id"]
