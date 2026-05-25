# Portfolio Makeover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio into a high-end, agent-driven site with glassmorphism, Framer Motion animations, and full dark/light mode support.

**Architecture:** Use Next.js App Router with Tailwind CSS 4. Components will be built with a "glass" primitive and enhanced with Framer Motion for interactivity. Theme management will leverage Tailwind's native dark mode capabilities.

**Tech Stack:** Next.js 15, Tailwind CSS 4, Framer Motion, Lucide React.

---

### Task 1: Setup Theme Support (Dark/Light Mode)

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `components/theme-provider.tsx`
- Create: `components/theme-toggle.tsx`

- [ ] **Step 1: Update globals.css with base glass variables**

```css
@import "tailwindcss";

@theme {
  --color-glass-white: rgba(255, 255, 255, 0.1);
  --color-glass-black: rgba(0, 0, 0, 0.3);
  --color-glass-border-white: rgba(255, 255, 255, 0.2);
  --color-glass-border-black: rgba(255, 255, 255, 0.1);
}

:root {
  --background: #ffffff;
  --foreground: #020617;
}

.dark {
  --background: #020617;
  --foreground: #f8fafc;
}

body {
  background: var(--background);
  color: var(--foreground);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

- [ ] **Step 2: Create ThemeToggle component**

```tsx
"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full glass border border-glass-border-white hover:scale-110 transition-transform"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/globals.css components/theme-toggle.tsx
git commit -m "feat: add theme toggle and glass variables"
```

---

### Task 2: Implement Glass Layout and Background

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/animated-background.tsx`

- [ ] **Step 1: Create AnimatedBackground with mouse-tracking**

```tsx
"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px]"
        style={{ x: springX, y: springY, left: -250, top: -250 }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] animate-pulse" />
    </div>
  );
}
```

- [ ] **Step 2: Update Layout to include toggle and background**

```tsx
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedBackground } from "@/components/animated-background";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-blue-500/30">
        <AnimatedBackground />
        <nav className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </nav>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/animated-background.tsx app/layout.tsx
git commit -m "feat: add mouse-tracking background and layout nav"
```

---

### Task 3: High-End Hero Section

**Files:**
- Modify: `app/page.tsx`
- Create: `components/hero.tsx`

- [ ] **Step 1: Create Hero component with typography animations**

```tsx
"use client";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-7xl md:text-9xl font-bold tracking-tighter text-center bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent"
      >
        Vertexora <br /> Solutions
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6 text-xl text-foreground/60 max-w-lg text-center font-medium"
      >
        Building the future with agentic intelligence and elite design.
      </motion.p>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: add high-end hero section"
```

---

### Task 4: Glass Project Showcase

**Files:**
- Create: `components/project-card.tsx`
- Create: `components/project-section.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create ProjectCard with glass effect**

```tsx
"use client";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  image: string;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative glass p-6 rounded-3xl border border-glass-border-white bg-glass-white dark:bg-glass-black overflow-hidden"
    >
      <div className="aspect-video rounded-2xl bg-slate-800 mb-4 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500" />
      </div>
      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
      <p className="text-foreground/60 text-sm">{project.description}</p>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create ProjectSection with 3+1 logic**

```tsx
"use client";
import { useState } from "react";
import { ProjectCard } from "./project-card";
import { motion, AnimatePresence } from "framer-motion";

const DUMMY_PROJECTS = [
  { title: "AI Studio", description: "Agentic workflow platform", image: "" },
  { title: "Vertex Flow", description: "Design automation tool", image: "" },
  { title: "Nova App", description: "Cloud native ecosystem", image: "" },
  { title: "Quantum Deck", description: "Advanced visualization engine", image: "" },
];

export function ProjectSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-12">Selected Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {DUMMY_PROJECTS.slice(0, 3).map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 rounded-full glass border border-glass-border-white font-bold hover:bg-white/10 transition-colors"
          >
            Show All Projects
          </button>
        )}
      </div>

      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
          >
            <ProjectCard project={DUMMY_PROJECTS[3]} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
```

- [ ] **Step 3: Update page.tsx to assemble sections**

```tsx
import { Hero } from "@/components/hero";
import { ProjectSection } from "@/components/project-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectSection />
    </main>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/project-card.tsx components/project-section.tsx app/page.tsx
git commit -m "feat: add project showcase with 3+1 glass cards"
```

---

### Task 5: Verification and Polish

- [ ] **Step 1: Verify Theme Switching**
Run: `npm run dev`
Expected: Toggle works, background and cards adapt colors.

- [ ] **Step 2: Verify Mobile Responsiveness**
Expected: Project grid collapses to 1 column, font sizes scale.

- [ ] **Step 3: Final Commit**
```bash
git commit -m "chore: final polish and verification"
```
