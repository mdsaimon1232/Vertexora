"use client";
import { useState } from "react";
import { ProjectCard } from "./project-card";
import { motion, AnimatePresence } from "framer-motion";

const DUMMY_PROJECTS = [
  { title: "AI Studio", description: "Agentic workflow platform" },
  { title: "Vertex Flow", description: "Design automation tool" },
  { title: "Nova App", description: "Cloud native ecosystem" },
  { title: "Quantum Deck", description: "Advanced visualization engine" },
];

export function ProjectSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 tracking-tight">Selected Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {DUMMY_PROJECTS.slice(0, 3).map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 rounded-full glass border border-glass-border-white font-bold hover:bg-white/10 dark:hover:bg-white/5 transition-all active:scale-95"
          >
            Show All Projects
          </button>
        )}
      </div>

      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
          >
            <ProjectCard project={DUMMY_PROJECTS[3]} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
