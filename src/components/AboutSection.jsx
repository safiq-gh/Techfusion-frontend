import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, Target } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Innovation First",
    desc: "Unleash your creativity and push the boundaries of what's possible in tech.",
    color: "var(--color-cyber-cyan)"
  },
  {
    icon: Target,
    title: "Real-world Impact",
    desc: "Build solutions that address actual challenges faced by industries today.",
    color: "var(--color-cyber-cyan)"
  },
  {
    icon: Shield,
    title: "Elite Competition",
    desc: "Compete with the brightest minds from across the nation for the ultimate title.",
    color: "var(--color-cyber-cyan)"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="section relative overflow-hidden py-32 bg-void-black">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            className="poster-beam"
            style={{ 
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 90}deg)`,
              height: '100vh',
            }}
          />
        ))}
      </div>
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-cyber-blue/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-cyber-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full poster-box border-cyber-cyan/30 mb-8 group hover:border-cyber-cyan/60 transition-all">
              <Sparkles className="w-4 h-4 text-cyber-cyan animate-pulse" />
              <span className="font-heading text-xs uppercase tracking-[0.3em] text-cyber-cyan poster-glow-text font-bold">The Future is Here</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-none tracking-tight text-white">
              A National Level <br />
              <span className="text-cyber-cyan drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]">Project Expo</span>
            </h2>
            
            <p className="font-body text-white/40 text-lg mb-12 leading-relaxed max-w-xl">
              Techfusion '26 is a premium platform for engineering students to showcase their visionary projects. 
              Organized by the Department of IT at Crescent Institute, it brings together innovation, 
              talent, and industry recognized standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-8 poster-box card-hover overflow-hidden relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-cyber-cyan/5 -mr-8 -mt-8 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                <h4 className="font-display text-cyber-cyan text-3xl font-black mb-1 poster-glow-text">15+</h4>
                <p className="font-heading text-white/30 text-xs uppercase tracking-[0.2em] font-bold">Domains Covered</p>
              </div>
              <div className="p-8 poster-box border-poster-gold/30 shadow-[0_0_20px_rgba(255,215,0,0.1)] card-hover overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-poster-gold/5 -mr-8 -mt-8 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                <h4 className="font-display text-poster-gold text-3xl font-black mb-1">₹1 LAKH</h4>
                <p className="font-heading text-white/30 text-xs uppercase tracking-[0.2em] font-bold">Total Prize Pool</p>
              </div>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 gap-8">
            {features.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="group relative p-10 poster-box card-hover overflow-hidden"
              >
                {/* Magnetic Border Effect Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-cyan/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="relative flex gap-8 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-cyber-cyan/5 flex items-center justify-center shrink-0 border border-cyber-cyan/10 group-hover:bg-cyber-cyan/10 group-hover:scale-110 transition-all">
                    <item.icon className="w-8 h-8 text-cyber-cyan" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">{item.title}</h3>
                    <p className="font-body text-white/40 text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
