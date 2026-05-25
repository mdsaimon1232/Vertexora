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
import { Hero } from "@/components/hero";
import { ProjectSection } from "@/components/project-section";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

const timelineData = [
  {
    id: 1,
    title: "Web Dev",
    date: "Current",
    content: "High-performance, beautifully designed marketing websites and complex SaaS applications.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "Mobile Apps",
    date: "Current",
    content: "Native-feel iOS and Android applications developed for maximum user engagement.",
    category: "Mobile",
    icon: Smartphone,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Backend",
    date: "Current",
    content: "Robust data architectures, RESTful APIs, and GraphQL endpoints built for scale.",
    category: "Infrastructure",
    icon: Server,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "Automation",
    date: "Current",
    content: "Intelligent workflow automations that digitize operations and save thousands of hours.",
    category: "Efficiency",
    icon: Zap,
    relatedIds: [2, 6],
    status: "in-progress" as const,
    energy: 80,
  },
  {
    id: 5,
    title: "AI Layer",
    date: "Current",
    content: "Integrating LLMs, custom ML layers, and AI agents directly into your products.",
    category: "AI",
    icon: Cpu,
    relatedIds: [3, 4],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 6,
    title: "Cloud Ops",
    date: "Current",
    content: "Optimized cloud deployment and infrastructure management for modern growth.",
    category: "Infrastructure",
    icon: Globe,
    relatedIds: [5],
    status: "pending" as const,
    energy: 70,
  },
];

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
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 font-sans">
      
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
                <a key={link.name} href={link.href} className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
                  {link.name}
                </a>
              ))}
              <a href="#contact" className="ml-4 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2">
                Start Project
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-[family-name:var(--font-display)] font-semibold border-b border-foreground/10 pb-4"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 px-6 py-4 rounded-xl bg-primary text-white text-center font-semibold text-lg"
            >
              Start Your Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <FlowArt>
          {/* HERO SECTION - Keep background clear */}
          <FlowSection style={{ backgroundColor: 'transparent' }}>
            <div id="home">
              <Hero />
            </div>
          </FlowSection>

          {/* SERVICES & CAPABILITIES - Orange Style from try.txt */}
          <FlowSection style={{ backgroundColor: '#fd5200', color: '#fff' }}>
            {/* TRUSTED BY MARQUEE */}
            <section className="py-12 border-y border-black/[0.05] bg-black/[0.01] overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
              
              <div className="container mx-auto px-6 mb-8 relative z-20">
                <p className="text-center text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">Trusted by innovative companies worldwide</p>
              </div>
              
              <div className="flex w-full relative opacity-50">
                <motion.div 
                  className="flex whitespace-nowrap gap-16 px-8 items-center"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                >
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-20 items-center">
                      <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-white/40">NEXUS</span>
                      <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-white/40">Aurora.</span>
                      <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-white/40">Quantum</span>
                      <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-white/40">Vanguard</span>
                      <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-white/40">STELAR</span>
                      <span className="text-3xl font-[family-name:var(--font-display)] font-bold text-white/40">Pinnacle</span>
                    </div>

                  ))}
                </motion.div>
              </div>
            </section>

            <section id="services" className="py-24 sm:py-32 relative">
              <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16 md:mb-24">
                  <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold tracking-tight mb-6 text-white">Our Capabilities</h2>
                  <p className="text-white/80 max-w-2xl mx-auto text-lg">We deliver end-to-end engineering excellence across the entire modern tech stack.</p>
                </div>
                
                <div className="relative">
                  <RadialOrbitalTimeline timelineData={timelineData} />
                </div>
              </div>
            </section>
          </FlowSection>

          {/* WORK SECTION - Vibrant Blue Style */}
          <FlowSection style={{ backgroundColor: '#1A3DE8', color: '#fff' }}>
            <div id="work">
              <ProjectSection />
            </div>
          </FlowSection>

          {/* PROCESS & STATS - Soft Light Style */}
          <FlowSection style={{ backgroundColor: '#F5F0E8', color: '#000' }}>
            <section className="py-20 border-y border-black/[0.05]">
              <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-black/[0.05]">
                  {[
                    { label: "Projects Delivered", value: 150, suffix: "+" },
                    { label: "Happy Clients", value: 85, suffix: "+" },
                    { label: "Client Satisfaction", value: 99, suffix: "%" },
                    { label: "Countries Served", value: 12, suffix: "+" },
                  ].map((stat, idx) => (
                    <div key={idx} className={`pl-4 md:pl-8 ${idx === 0 ? 'pl-0 border-l-0' : ''}`}>
                      <div className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-display)] font-bold text-black mb-2">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="process" className="py-24 sm:py-32 relative overflow-hidden">
              <div className="container mx-auto px-6 max-w-7xl z-10 relative">
                <div className="text-center mb-20">
                  <span className="text-blue-600 font-semibold tracking-[0.2em] uppercase text-sm mb-4 block">How We Work</span>
                  <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold tracking-tight text-black">Our 4-Step Process</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 z-10 relative">
                  <div className="hidden md:block absolute top-10 left-10 w-[calc(100%-5rem)] h-[1px] bg-blue-500/20 z-0" />
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
                      <div className="w-20 h-20 rounded-full bg-white border border-blue-100 flex items-center justify-center text-2xl font-bold font-[family-name:var(--font-display)] text-blue-600 mb-6 relative z-10 group-hover:scale-110 transition-transform shadow-sm">
                        {step.num}
                      </div>
                      <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-display)] group-hover:text-blue-600 transition-colors text-black">{step.title}</h3>
                      <p className="text-gray-500 font-light leading-relaxed">{step.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </FlowSection>

          {/* TESTIMONIALS & FAQ - White Style */}
          <FlowSection style={{ backgroundColor: '#ffffff', color: '#000' }}>
            <section className="py-24 relative overflow-hidden">
              <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold tracking-tight mb-16 text-center text-black">Client Love</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: "Sarah Jenkins", role: "CTO, Fintech Startup", text: "Vertexora delivered an exceptional SaaS platform that helped us secure our Series A funding. Their code quality and design aesthetic are unmatched." },
                    { name: "Marcus Wright", role: "Founder, HealthApp", text: "Working with them on our mobile app was a breeze. They handled everything from UX to the complex backend infrastructure seamlessly." },
                    { name: "Elena Rostova", role: "Director, Global Retail", text: "The automation workflows Vertexora built for us saved our operations team over 40 hours a week. Truly transformative development effort." },
                  ].map((test, idx) => (
                    <motion.div 
                      key={idx}
                      className="p-8 rounded-3xl relative bg-gray-50 border border-gray-100 shadow-sm"
                    >
                      <div className="text-blue-600 mb-6">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 mb-8 leading-relaxed font-light italic">&quot;{test.text}&quot;</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden relative border border-blue-50 shrink-0">
                          <Image src={`https://picsum.photos/seed/user${idx+5}/100/100`} fill className="object-cover" alt={test.name} unoptimized />
                        </div>
                        <div>
                          <h4 className="font-bold font-[family-name:var(--font-display)] tracking-wide text-black">{test.name}</h4>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">{test.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section id="faq" className="py-24 sm:py-32 relative">
              <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold tracking-tight mb-6 text-black">Common Questions</h2>
                </div>

                <div className="space-y-4">
                  {[
                    { q: "What is your typical project timeline?", a: "Project timelines vary depending on complexity. A standard marketing website might take 4-6 weeks, while a complex SaaS web application can take 3-6 months." },
                    { q: "Do you provide ongoing support?", a: "Yes, we offer custom maintenance and support retainers to ensure your product stays secure and updated." },
                    { q: "What tech stack do you primarily use?", a: "We specialize in modern, high-performance technologies including Next.js, React, Node.js, and AWS/Vercel." },
                  ].map((faq, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden">
                      <button 
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full text-left px-6 py-6 flex items-center justify-between font-semibold focus:outline-none hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <span className="text-lg pr-4 text-black">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${activeFaq === idx ? "rotate-180 text-blue-600" : "text-gray-400"}`} />
                      </button>
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 text-gray-600 font-light leading-relaxed">
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
          </FlowSection>

          {/* CONTACT SECTION - Dynamic Flow */}
          <FlowSection style={{ backgroundColor: '#ffffff', color: '#000' }}>
            <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
              <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[150px] mix-blend-multiply pointer-events-none" />
              
              <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="bg-white border border-gray-100 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-50/50 to-transparent rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
                    <div>
                      <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-display)] font-bold tracking-tight mb-6 leading-tight text-black">
                        Let&apos;s Build Something <br className="hidden md:block"/><span className="text-blue-600">Extraordinary.</span>
                      </h2>
                      <p className="text-gray-500 text-lg mb-12 font-light max-w-md">
                        Ready to transform your digital presence? Reach out directly to speak with an engineer.
                      </p>
                      
                      <div className="space-y-6">
                        <a href="mailto:hello@vertexora.com" className="flex items-center gap-4 text-gray-600 hover:text-blue-600 transition-colors group w-fit cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                            <Mail className="w-5 h-5" />
                          </div>
                          <span className="font-medium tracking-wide">hello@vertexora.com</span>
                        </a>
                      </div>
                    </div>

                    <div>
                      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Full Name</label>
                            <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition-colors text-black" placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Email Address</label>
                            <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition-colors text-black" placeholder="john@company.com" />
                          </div>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg cursor-pointer"
                        >
                          Send Message
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FlowSection>
        </FlowArt>
      </main>

      {/* FOOTER */}
      <footer className="pt-20 pb-10 border-t border-gray-100 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <a href="#" className="flex items-center gap-2 mb-6 cursor-pointer">
                <div className="w-6 h-6 rounded bg-gradient-to-tr from-[#00E5FF] to-[#7C3AED] flex items-center justify-center font-bold text-white text-xs">
                  V
                </div>
                <span className="font-[family-name:var(--font-display)] font-bold text-lg tracking-tight text-black">Vertexora</span>
              </a>
              <p className="text-gray-400 text-sm mb-6 max-w-xs font-light leading-relaxed">
                Building scalable digital solutions and intelligent automations for modern businesses worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 font-[family-name:var(--font-display)] tracking-wide text-black">Services</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Website Development</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Web Applications</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Mobile Development</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Vertexora Solutions. All rights reserved.</p>
            <a href="#home" className="text-gray-500 hover:text-black text-sm font-medium transition-colors">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
