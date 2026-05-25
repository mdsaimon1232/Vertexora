"use client";
import { useState } from "react";
import { ProjectCard } from "./project-card";
import { motion, AnimatePresence, Variants } from "framer-motion";

const DUMMY_PROJECTS = [
  { title: "AI Studio", description: "Agentic workflow platform" },
  { title: "Vertex Flow", description: "Design automation tool" },
  { title: "Nova App", description: "Cloud native ecosystem" },
  { title: "Quantum Deck", description: "Advanced visualization engine" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    }
  },
};

export function ProjectSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 tracking-tight"
      >
        Selected Works
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {DUMMY_PROJECTS.slice(0, 3).map((p, i) => (
          <ProjectCard key={i} project={p} variants={itemVariants} />
        ))}
      </motion.div>
      
      <div className="mt-12 flex justify-center">
        {!showAll && (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(true)}
            className="px-8 py-3 rounded-full glass border border-white/20 font-bold hover:bg-white/10 dark:hover:bg-white/5 transition-all"
          >
            Show All Projects
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showAll && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
          >
            <ProjectCard project={DUMMY_PROJECTS[3]} variants={itemVariants} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
