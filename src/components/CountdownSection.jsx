import { motion } from "framer-motion";
import Countdown from "./Countdown";
import { Sparkles } from "lucide-react";

export default function CountdownSection() {
  // Target date matching HeroSection's previous hardcoded value
  const targetDate = "2026-04-09T09:00:00";

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-cyber-deep">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-cyber-cyan/5 rounded-full blur-[120px]" />
        
        {/* Poster Light Streaks */}
        <div className="light-streak opacity-20 top-1/3 left-0" style={{ transform: 'rotate(25deg)' }} />
        <div className="light-streak opacity-20 top-2/3 right-0" style={{ transform: 'rotate(-25deg)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-cyan border border-cyber-cyan/20 mb-6 group cursor-default">
            <Sparkles className="w-4 h-4 text-cyber-cyan group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-heading font-medium tracking-[0.3em] text-cyber-cyan uppercase">
              The Countdown has Begun
            </span>
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Get Ready for the <span className="text-cyber-cyan drop-shadow-[0_0_10px_rgba(0,242,255,0.3)]">Fusion</span>
          </h2>
          
          <p className="max-w-2xl mx-auto font-body text-white/40 text-lg leading-relaxed">
            Join thousands of innovators, creators, and tech enthusiasts for the most anticipated project expo of the year.
          </p>
        </motion.div>

        <div className="glass-strong p-8 sm:p-12 rounded-[2.5rem] border border-cyber-cyan/10 relative group bg-grid overflow-hidden">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
          
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/2 bg-[length:100%_4px] pointer-events-none" />
          
          <Countdown targetDate={targetDate} />
        </div>
        
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="mt-12 flex justify-center items-center gap-12 text-white/30 font-heading text-sm tracking-widest uppercase"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse shadow-[0_0_10px_rgba(0,242,255,0.8)]" /> 
            <span className="hover:text-cyber-cyan transition-colors">Live in 2026</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/5 rotate-12" />
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" /> 
            <span className="hover:text-white transition-colors">Registration Open</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
