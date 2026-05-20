"use client";

import { motion, AnimatePresence, useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { 
  Code, Smartphone, Database, Zap, Cpu, Server, 
  Menu, X, ArrowRight, CheckCircle2,
  Mail, MessageCircle, Github, Linkedin, Twitter,
  ChevronDown, Globe
} from "lucide-react";
import Image from "next/image";
import { PrismaHero } from "@/components/ui/prisma-hero";

// Counter component for stats
function Counter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (inView && ref.current) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          ref.current!.textContent = String(end) + suffix;
        } else {
          ref.current!.textContent = String(Math.floor(start)) + suffix;
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-violet-500/30 font-sans">
      
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-panel py-4 shadow-2xl shadow-black" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00E5FF] to-[#7C3AED] flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all">
                V
              </div>
              <span className="font-[family-name:var(--font-display)] font-bold text-xl tracking-tight">Vertexora</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  {link.name}
                </a>
              ))}
              <a href="#contact" className="ml-4 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                Start Project
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-[family-name:var(--font-display)] font-semibold border-b border-white/10 pb-4"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 px-6 py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-white text-center font-semibold text-lg"
            >
              Start Your Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO SECTION */}
        <div id="home">
          <PrismaHero />
        </div>

        {/* TRUSTED BY MARQUEE */}
        <section className="py-12 border-y border-white/[0.05] bg-white/[0.01] overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          
          <div className="container mx-auto px-6 mb-8 relative z-20">
            <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-[0.2em]">Trusted by innovative companies worldwide</p>
          </div>
          
          <div className="flex w-full relative opacity-50">
            <motion.div 
              className="flex whitespace-nowrap gap-16 px-8 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-20 items-center">
                  <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-gray-400">NEXUS</span>
                  <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-gray-400">Aurora.</span>
                  <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-gray-400">Quantum</span>
                  <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-gray-400">Vanguard</span>
                  <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-gray-400">STELAR</span>
                  <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-gray-400">Pinnacle</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 sm:py-32 relative">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold tracking-tight mb-6">Our Capabilities</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">We deliver end-to-end engineering excellence across the entire modern tech stack.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Code className="w-8 h-8 text-[#00E5FF]" />, title: "Website Development", desc: "High-performance, beautifully designed marketing websites that convert visitors into customers." },
                { icon: <Server className="w-8 h-8 text-indigo-400" />, title: "Web Applications", desc: "Scalable, secure, and complex SaaS and web apps built with Next.js and React." },
                { icon: <Smartphone className="w-8 h-8 text-[#7C3AED]" />, title: "Mobile Apps", desc: "Native-feel iOS and Android applications developed for maximum user engagement." },
                { icon: <Database className="w-8 h-8 text-[#00E5FF]" />, title: "Backend & APIs", desc: "Robust data architectures, RESTful APIs, and GraphQL endpoints built for scale." },
                { icon: <Zap className="w-8 h-8 text-indigo-400" />, title: "Automation Systems", desc: "Intelligent workflow automations that digitize operations and save thousands of hours." },
                { icon: <Cpu className="w-8 h-8 text-[#7C3AED]" />, title: "AI Solutions", desc: "Integrating LLMs, custom ML layers, and AI agents directly into your products." },
              ].map((service, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-panel p-8 rounded-3xl group hover:bg-white/[0.05] transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                  <div className="mb-6 bg-white/[0.05] w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-white/20 transition-colors relative z-10">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-display)] relative z-10">{service.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed relative z-10">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK / PORTFOLIO SECTION */}
        <section id="work" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
          
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold tracking-tight mb-4">Selected Work</h2>
                <p className="text-gray-400 text-lg max-w-md">Explore how we've helped category-leading companies build exceptional digital experiences.</p>
              </div>
              <a href="#contact" className="group flex items-center gap-2 text-[#00E5FF] font-semibold hover:text-white transition-colors cursor-pointer">
                View All Projects <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {[
                { 
                  title: "FinTech Analytics Dashboard", 
                  category: "Web Application", 
                  image: "https://picsum.photos/seed/fin3/1000/800",
                  tags: ["Next.js", "PostgreSQL", "Tailwind"]
                },
                { 
                  title: "Aura Health & Fitness Tracker", 
                  category: "Mobile Application", 
                  image: "https://picsum.photos/seed/health4/1000/800",
                  tags: ["React Native", "Node.js", "Firebase"]
                },
                { 
                  title: "Nexus E-Commerce Platform", 
                  category: "Enterprise Website", 
                  image: "https://picsum.photos/seed/ecomm9/1000/800",
                  tags: ["Shopify Plus", "React", "GraphQL"]
                },
                { 
                  title: "Automated Supply Chain SaaS", 
                  category: "SaaS Platform", 
                  image: "https://picsum.photos/seed/saas3/1000/800",
                  tags: ["Vue", "Django", "AWS"]
                }
              ].map((project, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-6 border border-white/5 bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      unoptimized
                    />
                    <div className="absolute bottom-6 left-6 z-20 flex gap-2 flex-wrap pr-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-medium tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-1 group-hover:text-[#00E5FF] transition-colors">{project.title}</h3>
                    <p className="text-gray-400">{project.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-20 border-y border-white/[0.05] bg-[#0A0A0A]">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/[0.05]">
              {[
                { label: "Projects Delivered", value: 150, suffix: "+" },
                { label: "Happy Clients", value: 85, suffix: "+" },
                { label: "Client Satisfaction", value: 99, suffix: "%" },
                { label: "Countries Served", value: 12, suffix: "+" },
              ].map((stat, idx) => (
                <div key={idx} className={`pl-4 md:pl-8 ${idx === 0 ? 'pl-0 border-l-0' : ''}`}>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-display)] font-bold text-white mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="py-24 sm:py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl z-10 relative">
            <div className="text-center mb-20">
              <span className="text-[#7C3AED] font-semibold tracking-[0.2em] uppercase text-sm mb-4 block">How We Work</span>
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold tracking-tight">Our 4-Step Process</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 z-10 relative">
              <div className="hidden md:block absolute top-10 left-10 w-[calc(100%-5rem)] h-[1px] bg-gradient-to-r from-[#00E5FF]/20 via-[#7C3AED]/50 to-transparent z-0" />
              {[
                { num: "01", title: "Discovery", desc: "Understanding your goals, target audience, and functional requirements." },
                { num: "02", title: "Design", desc: "Crafting modern wireframes and high-fidelity UI/UX aesthetic designs." },
                { num: "03", title: "Development", desc: "Writing clean, scalable code using modern frameworks and best-in-class architectures." },
                { num: "04", title: "Launch & Scale", desc: "Rigorous testing, optimized cloud deployment, and ongoing optimization." }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group cursor-default"
                >
                  <div className="w-20 h-20 rounded-full bg-black glass-panel flex items-center justify-center text-2xl font-bold font-[family-name:var(--font-display)] text-gradient mb-6 relative z-10 border-[#00E5FF]/20 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-display)] group-hover:text-[#00E5FF] transition-colors">{step.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold tracking-tight mb-16 text-center">Client Love</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Sarah Jenkins", role: "CTO, Fintech Startup", text: "Vertexora delivered an exceptional SaaS platform that helped us secure our Series A funding. Their code quality and design aesthetic are unmatched." },
                { name: "Marcus Wright", role: "Founder, HealthApp", text: "Working with them on our mobile app was a breeze. They handled everything from UX to the complex backend infrastructure seamlessly." },
                { name: "Elena Rostova", role: "Director, Global Retail", text: "The automation workflows Vertexora built for us saved our operations team over 40 hours a week. Truly transformative development effort." },
              ].map((test, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-panel p-8 rounded-3xl relative"
                >
                  <div className="text-[#7C3AED] mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 mb-8 leading-relaxed font-light">"{test.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden relative border border-white/10 shrink-0">
                      <Image src={`https://picsum.photos/seed/user${idx+5}/100/100`} fill className="object-cover" alt={test.name} unoptimized />
                    </div>
                    <div>
                      <h4 className="font-bold font-[family-name:var(--font-display)] tracking-wide">{test.name}</h4>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{test.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-24 sm:py-32 relative">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold tracking-tight mb-6">Common Questions</h2>
            </div>

            <div className="space-y-4">
              {[
                { q: "What is your typical project timeline?", a: "Project timelines vary depending on complexity. A standard marketing website might take 4-6 weeks, while a complex SaaS web application can take 3-6 months. We provide clear, milestone-based timelines during discovery." },
                { q: "Do you provide ongoing support?", a: "Yes, we offer custom maintenance and support retainers to ensure your product stays secure, updated, and continues to perform optimally as your business scales." },
                { q: "What tech stack do you primarily use?", a: "We specialize in modern, high-performance technologies including Next.js, React, Node.js, Python/Django, PostgreSQL, and AWS/Vercel for deployment." },
                { q: "Can you help integrate AI into our existing product?", a: "Absolutely. We have extensive experience integrating OpenAI models, creating custom AI agents, and building automated data pipelines into existing architectures." },
              ].map((faq, idx) => (
                <div key={idx} className="glass-panel border border-white/5 rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left px-6 py-6 flex items-center justify-between font-semibold focus:outline-none hover:bg-white/[0.05] transition-colors cursor-pointer"
                  >
                    <span className="text-lg pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${activeFaq === idx ? "rotate-180 text-[#00E5FF]" : "text-gray-500"}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-gray-400 font-light leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#00E5FF]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
          
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="glass-panel rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 border border-white/[0.08] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#7C3AED]/20 to-transparent rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
                <div>
                  <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-display)] font-bold tracking-tight mb-6 leading-tight">
                    Let's Build Something <br className="hidden md:block"/><span className="text-gradient">Extraordinary.</span>
                  </h2>
                  <p className="text-gray-400 text-lg mb-12 font-light max-w-md">
                    Ready to transform your digital presence? Fill out the form or reach out directly to speak with an engineer.
                  </p>
                  
                  <div className="space-y-6">
                    <a href="mailto:hello@vertexora.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group w-fit cursor-pointer">
                      <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:bg-[#00E5FF]/10 group-hover:border-[#00E5FF]/50 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span className="font-medium tracking-wide">hello@vertexora.com</span>
                    </a>
                    <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group w-fit cursor-pointer">
                      <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:bg-green-500/10 group-hover:border-green-500/50 transition-colors">
                        <MessageCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="font-medium tracking-wide">Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 uppercase tracking-widest text-[10px]">Full Name</label>
                        <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#7C3AED] transition-colors text-white" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 uppercase tracking-widest text-[10px]">Email Address</label>
                        <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#7C3AED] transition-colors text-white" placeholder="john@company.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 uppercase tracking-widest text-[10px]">Project Type</label>
                      <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#7C3AED] transition-colors text-white appearance-none cursor-pointer">
                        <option value="">Select a service...</option>
                        <option value="web">Website Development</option>
                        <option value="app">Web / Mobile Application</option>
                        <option value="api">Backend & API</option>
                        <option value="auto">Automation / AI Layer</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 uppercase tracking-widest text-[10px]">Project Details</label>
                      <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#7C3AED] transition-colors text-white resize-none" placeholder="Tell us roughly about your functional goals..."></textarea>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="pt-20 pb-10 border-t border-white/[0.05] bg-[#020202]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <a href="#" className="flex items-center gap-2 mb-6 cursor-pointer">
                <div className="w-6 h-6 rounded bg-gradient-to-tr from-[#00E5FF] to-[#7C3AED] flex items-center justify-center font-bold text-white text-xs">
                  V
                </div>
                <span className="font-[family-name:var(--font-display)] font-bold text-lg tracking-tight">Vertexora</span>
              </a>
              <p className="text-gray-400 text-sm mb-6 max-w-xs font-light leading-relaxed">
                Building scalable digital solutions and intelligent automations for modern businesses worldwide.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-500 hover:text-white transition-colors cursor-pointer"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors cursor-pointer"><Github className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors cursor-pointer"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 font-[family-name:var(--font-display)] tracking-wide">Services</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Website Development</a></li>
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Web Applications</a></li>
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Mobile Development</a></li>
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">API & Backend</a></li>
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">AI & Automation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 font-[family-name:var(--font-display)] tracking-wide">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#work" className="hover:text-white transition-colors">Our Work</a></li>
                <li><a href="#process" className="hover:text-white transition-colors">Process</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 font-[family-name:var(--font-display)] tracking-wide">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Vertexora Solutions. All rights reserved.</p>
            <a href="#home" className="text-gray-500 hover:text-white text-sm font-medium transition-colors">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
