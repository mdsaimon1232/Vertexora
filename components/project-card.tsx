"use client";
import { motion, Variants } from "framer-motion";

interface Project {
  title: string;
  description: string;
}

export function ProjectCard({ project, variants }: { project: Project; variants?: Variants }) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative glass p-0 rounded-2xl border border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/20 overflow-hidden backdrop-blur-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
    >
      {/* Mac OS Window Header */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-white/5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm shadow-[#ff5f56]/20" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm shadow-[#ffbd2e]/20" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm shadow-[#27c93f]/20" />
      </div>
      
      <div className="p-6">
        <div className="aspect-video rounded-xl bg-slate-800/50 mb-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:scale-110 transition-transform duration-700" />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <span className="text-white text-lg">↗</span>
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
        <p className="text-foreground/60 text-sm leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  );
}
