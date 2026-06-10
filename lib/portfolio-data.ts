export const PLAYER = {
  name: "Abed Al-Nabi Koubeissy",
  callsign: "ABEDKOB",
  location: "Nabatiyeh, Lebanon",
  email: "abedkoubiessy@gmail.com",
  github: "https://github.com/Abedkob",
  resumeSubject: "CV Request from Portfolio",
  role: "Full-Stack Developer & Computer Science Graduate",
  stack: ["React", "Next.js", "TypeScript", "Node.js", "Flutter", "Supabase", "PHP"],
  bio: "Full-stack developer who ships production web and mobile apps end-to-end, from database schema to UI. Strongest in React, TypeScript, and Node, with hands-on work in Python/ML, Flutter, and secure PHP backends.",
}

export type MissionCategory = "Full-stack" | "Mobile" | "AI" | "Backend" | "Desktop"

export type Mission = {
  id: string
  codename: string
  title: string
  category: MissionCategory
  description: string
  problem: string
  impact: string
  highlights: string[]
  tech: string[]
  difficulty: "S" | "A" | "B" | "C"
  status: "COMPLETE" | "IN_PROGRESS" | "CLASSIFIED"
  repoUrl?: string
  liveUrl?: string
}

export const MISSIONS: Mission[] = [
  {
    id: "MSN-001",
    codename: "VIGIL",
    title: "Driver Drowsiness Detection System",
    category: "AI",
    description:
      "Final Year Project. A real-time, multi-signal drowsiness detector that fuses MediaPipe FaceMesh landmarks, two MobileNetV2 CNNs, and nine temporal trackers into a weighted scorer with a hysteresis state machine, wired to an Arduino unit for live alerts.",
    problem: "Driver fatigue needed to be detected reliably and early enough to trigger a physical warning.",
    impact: "Combined computer vision, temporal scoring, and hardware alerts into a working real-time safety prototype, benchmarked on the SUST-DDD dataset.",
    highlights: ["MediaPipe FaceMesh + dual MobileNetV2", "Weighted scorer with hysteresis state machine", "Arduino hardware alert unit"],
    tech: ["Python", "MediaPipe", "TensorFlow", "OpenCV", "Arduino"],
    difficulty: "S",
    status: "COMPLETE",
  },
  {
    id: "MSN-002",
    codename: "STOREFRONT",
    title: "ElectroShop E-Commerce Platform",
    category: "Full-stack",
    description:
      "A production e-commerce platform with Stripe and cash-on-delivery payments, guest checkout with order claiming, scheduled sale pricing, and a full admin dashboard that includes a built-in point-of-sale system.",
    problem: "The store needed online sales with flexible checkout, scheduled promotions, and in-house admin control.",
    impact: "Shipped a live storefront handling payments, order flows, sale scheduling, and POS, hardened by a full security audit.",
    highlights: ["Stripe and COD checkout", "Guest order claiming + scheduled sales", "Admin dashboard with built-in POS"],
    tech: ["React", "Vite", "TypeScript", "Supabase", "Stripe", "Vercel"],
    difficulty: "A",
    status: "COMPLETE",
    liveUrl: "https://sts-shop.online",
  },
  {
    id: "MSN-003",
    codename: "KEYVAULT",
    title: "License Management ERP System",
    category: "Backend",
    description:
      "A self-hosted ERP for issuing and tracking software licenses and client payments, built on a custom PHP MVC stack with TOTP two-factor auth, bcrypt hashing, per-route permissions, full audit logging, and PDO prepared statements throughout.",
    problem: "License issuing, client payments, and administrative access needed to be tracked securely in one auditable system.",
    impact: "Delivered a hardened PHP MVC application with 2FA, route-level permissions, and a complete audit trail of every action.",
    highlights: ["TOTP two-factor authentication", "Per-route permission system", "Full audit logging + PDO prepared statements"],
    tech: ["PHP", "MySQL", "PDO", "Composer", "MVC"],
    difficulty: "A",
    status: "COMPLETE",
    repoUrl: "https://github.com/Abedkob/License-Management-ERP-System",
  },
  {
    id: "MSN-004",
    codename: "STORE_POS",
    title: "Store POS Management System",
    category: "Mobile",
    description:
      "A multi-app retail POS ecosystem: a client mobile app for barcode scanning and price lookup, an admin mobile app for product and inventory management, and a PHP backend handling storage, API communication, and centralized database logic.",
    problem: "Retail staff and customers needed faster product lookup, live inventory updates, and centralized admin control.",
    impact: "Connected mobile scanning, inventory management, and backend APIs into one coordinated retail workflow.",
    highlights: ["Barcode scanning + price lookup", "Admin inventory controls", "PHP/MySQL API backend"],
    tech: ["Flutter", "Dart", "PHP", "MySQL", "REST APIs"],
    difficulty: "A",
    status: "COMPLETE",
  },
  {
    id: "MSN-005",
    codename: "EMOTION_AI",
    title: "AI Emotion Detection from Text",
    category: "AI",
    description:
      "A machine learning pipeline that preprocesses social-media text and classifies it into seven emotional categories using natural-language preprocessing and multi-class classification.",
    problem: "Unstructured social text needed automatic emotional classification for faster analysis.",
    impact: "Built a repeatable NLP pipeline for cleaning text and predicting emotion classes, with a clear evaluation workflow.",
    highlights: ["Text preprocessing pipeline", "Seven-class classifier", "Model evaluation workflow"],
    tech: ["Python", "NLP", "Scikit-learn", "Pandas"],
    difficulty: "B",
    status: "COMPLETE",
  },
  {
    id: "MSN-006",
    codename: "HOTEL_ERP",
    title: "Hotel ERP System",
    category: "Full-stack",
    description:
      "A full-stack hotel management system covering room allocation, reservations, guests, payments, and services, with a structured MVC backend, a React admin dashboard, role-based access control, and activity logging.",
    problem: "Hotel operations needed one system for reservations, rooms, payments, and controlled staff access.",
    impact: "Centralized core hotel workflows behind authenticated roles and an auditable record of activity.",
    highlights: ["Room and reservation management", "Role-based access control", "Activity logging"],
    tech: ["React", "Node.js", "Express", "MySQL", "REST", "JWT Auth"],
    difficulty: "B",
    status: "COMPLETE",
    repoUrl: "https://github.com/Abedkob/Hotel-ERP-Sytem",
  },
  {
    id: "MSN-007",
    codename: "TIMETABLE",
    title: "University Course Scheduler",
    category: "Desktop",
    description:
      "A desktop app that generates conflict-free university timetables from Excel input using a backtracking constraint-satisfaction engine, credit-aware priority scheduling, and an interactive Swing GUI.",
    problem: "Academic scheduling needed conflict detection and prioritization without manual spreadsheet juggling.",
    impact: "Automated conflict-free timetable generation from structured inputs inside an interactive desktop workflow.",
    highlights: ["Backtracking CSP engine", "Credit-aware priority scheduling", "Swing desktop UI with Excel import"],
    tech: ["Java", "Swing", "Apache POI", "CSP", "OOP"],
    difficulty: "B",
    status: "COMPLETE",
    repoUrl: "https://github.com/Abedkob/Phoenicia-university-schedular-project",
  },
  {
    id: "MSN-008",
    codename: "ART_CANVAS",
    title: "Abed ArtCanvas",
    category: "Full-stack",
    description:
      "A TypeScript web app that lets users request custom artwork by submitting reference images through an online form with image-upload handling.",
    problem: "Artists needed a clear request flow for collecting references and custom order details.",
    impact: "Created a structured intake experience that cuts back-and-forth before production starts.",
    highlights: ["Reference image upload", "Typed request workflow", "Responsive form UI"],
    tech: ["TypeScript", "Web APIs", "HTML/CSS"],
    difficulty: "C",
    status: "COMPLETE",
  },
  {
    id: "MSN-009",
    codename: "ASCEND",
    title: "Growth App Self-Discipline Companion",
    category: "Mobile",
    description:
      "A cross-platform productivity app for commitments, goals, milestones, and reflections, with local SQLite persistence, full CRUD, Provider state management, gamified levels and streaks, and SHA-256 auth.",
    problem: "Users needed a lightweight, offline-first companion for commitments, reflection, and habit momentum.",
    impact: "Built an offline-first Flutter app with local persistence and gamified progress feedback.",
    highlights: ["Local SQLite persistence + CRUD", "Provider state management", "Goals, milestones, and streaks"],
    tech: ["Flutter", "Dart", "SQLite", "Provider"],
    difficulty: "C",
    status: "COMPLETE",
    repoUrl: "https://github.com/Abedkob/Growth-App",
  },
]

export type SkillCategory = {
  name: string
  branch: string
  color: string
  skills: { name: string; level: number; rarity: "Legendary" | "Epic" | "Rare" | "Common"; evidence: string }[]
}

export const SKILL_TREE: SkillCategory[] = [
  {
    name: "Languages",
    branch: "CORE",
    color: "neon-cyan",
    skills: [
      { name: "JavaScript", level: 88, rarity: "Epic", evidence: "React dashboards, API clients, and interactive portfolio UI." },
      { name: "TypeScript", level: 82, rarity: "Epic", evidence: "Typed React/Vite apps: ElectroShop storefront and this portfolio." },
      { name: "Python", level: 78, rarity: "Epic", evidence: "NLP emotion classifier and the drowsiness-detection pipeline." },
      { name: "Java", level: 70, rarity: "Rare", evidence: "Desktop timetable generator with Swing and CSP logic." },
      { name: "PHP", level: 72, rarity: "Rare", evidence: "Custom MVC ERP backends with 2FA, PDO, and auth." },
      { name: "SQL", level: 82, rarity: "Epic", evidence: "Schema design for hotel, license, POS, and inventory systems." },
    ],
  },
  {
    name: "Frontend",
    branch: "FRONTEND",
    color: "neon-pink",
    skills: [
      { name: "React.js", level: 88, rarity: "Epic", evidence: "Hotel ERP admin UI and production storefront work." },
      { name: "Next.js", level: 68, rarity: "Rare", evidence: "This interactive portfolio shell and its route structure." },
      { name: "TailwindCSS", level: 82, rarity: "Epic", evidence: "Responsive HUD system, cards, states, and forms." },
      { name: "Bootstrap", level: 68, rarity: "Rare", evidence: "Traditional admin screens and rapid PHP UI builds." },
    ],
  },
  {
    name: "Backend",
    branch: "BACKEND",
    color: "neon-green",
    skills: [
      { name: "Node.js", level: 80, rarity: "Epic", evidence: "REST APIs, authentication, and ERP service layers." },
      { name: "Express.js", level: 78, rarity: "Epic", evidence: "Hotel ERP backend routes and middleware." },
      { name: "Supabase", level: 74, rarity: "Rare", evidence: "Postgres, auth, and storage for ElectroShop and current builds." },
      { name: "Django", level: 62, rarity: "Rare", evidence: "Backend foundations and structured server patterns." },
    ],
  },
  {
    name: "Mobile",
    branch: "MOBILE",
    color: "neon-orange",
    skills: [
      { name: "Flutter", level: 74, rarity: "Epic", evidence: "POS scanner app and the self-discipline companion." },
      { name: "Dart", level: 74, rarity: "Epic", evidence: "Provider state, local SQLite CRUD, and mobile UI." },
    ],
  },
  {
    name: "Tools",
    branch: "TOOLS",
    color: "neon-cyan",
    skills: [
      { name: "Git", level: 82, rarity: "Epic", evidence: "Branching, collaboration, and release workflows." },
      { name: "GitHub", level: 82, rarity: "Epic", evidence: "Public repositories and project documentation." },
      { name: "REST APIs", level: 82, rarity: "Epic", evidence: "Mobile, ERP, e-commerce, and automation integrations." },
      { name: "Agile", level: 72, rarity: "Rare", evidence: "Internship teamwork: tasks, reviews, and delivery cadence." },
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
    role: "Full-Stack & Flutter Developer Intern",
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