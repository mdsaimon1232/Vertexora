"use client";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative glass p-6 rounded-3xl border border-glass-border-white bg-glass-white dark:bg-glass-black overflow-hidden backdrop-blur-md"
    >
      <div className="aspect-video rounded-2xl bg-slate-800 mb-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500" />
      </div>
      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
      <p className="text-foreground/60 text-sm">{project.description}</p>
    </motion.div>
  );
}
