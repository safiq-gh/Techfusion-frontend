import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, ShieldCheck, Cpu, Lightbulb, ArrowUpRight, Zap, Sparkles } from "lucide-react";

const categories = [
  {
    icon: Globe,
    title: "Mobile & Web",
    subtitle: "App Development",
    desc: "Build innovative web apps and mobile solutions that solve real-world problems.",
    color: "var(--color-cyber-cyan)",
    gradient: "from-cyber-cyan/20 to-cyber-cyan/5",
    features: ["React / Next.js", "Flutter / Native", "Full Stack"],
  },
  {
    icon: Zap,
    title: "AI / ML / DS",
    subtitle: "Data Intelligence",
    desc: "Harness the power of data and machine learning to build intelligent systems.",
    color: "var(--color-cyber-cyan)",
    gradient: "from-cyber-cyan/20 to-cyber-cyan/5",
    features: ["Deep Learning", "Predictive Models", "Data Insights"],
  },
  {
    icon: Cpu,
    title: "IoT / Robotics",
    subtitle: "Hardware Systems",
    desc: "Showcase hardware-software integration, smart devices, and automation.",
    color: "var(--color-cyber-cyan)",
    gradient: "from-cyber-cyan/20 to-cyber-cyan/5",
    features: ["Arduino / RPi", "Smart Systems", "Robotics"],
  },
  {
    icon: Sparkles,
    title: "Agentic AI",
    subtitle: "Autonomous Agents",
    desc: "Develop autonomous AI agents that can reason, plan, and execute tasks.",
    color: "var(--color-cyber-cyan)",
    gradient: "from-cyber-cyan/20 to-cyber-cyan/5",
    features: ["LLM Agents", "Reasoning Chains", "Task Automation"],
  },
];

function CategoryCard({ category, index }) {
  const { icon: Icon, title, subtitle, desc, color, gradient, features } = category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative card-hover"
    >
      {/* Glow Effect */}
      <div
        className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${color}40, transparent)` }}
      />

      {/* Card */}
      <div className="relative poster-box p-8 sm:p-10 transition-all duration-500 h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center border border-white/5`}
          >
            <Icon className="w-8 h-8" style={{ color }} />
          </motion.div>

          <div
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover-indicator"
          >
            <ArrowUpRight className="w-5 h-5 text-white/50" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold mb-1">
          <span className="text-white">{title}</span>
          <br />
          <span style={{ color }}>{subtitle}</span>
        </h3>

        {/* Description */}
        <p className="font-body text-white/40 text-sm sm:text-base mt-4 mb-6 leading-relaxed">
          {desc}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {features.map((feature, i) => (
            <motion.span
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="px-3 py-1.5 rounded-full text-xs font-heading font-medium bg-white/3 border border-white/5 text-white/50 hover:text-white hover:border-white/20 transition-all"
            >
              {feature}
            </motion.span>
          ))}
        </div>

        {/* Bottom Glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        {/* Sparkle Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4"
        >
          <Zap className="w-4 h-4" style={{ color }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function EventCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="categories" ref={ref} className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-void-black" />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            className="poster-beam"
            style={{ 
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 90 + 22.5}deg)`,
              height: '100vh',
            }}
          />
        ))}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-blue/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block font-heading text-sm tracking-[0.3em] uppercase text-cyber-purple/60 mb-4">
            Choose Your Domain
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Event </span>
            <span className="text-gradient">Categories</span>
          </h2>
          <p className="font-body text-white/40 max-w-xl mx-auto text-base sm:text-lg">
            Four exciting domains to showcase your skills. Pick your arena and compete for glory.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category, i) => (
            <CategoryCard key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}