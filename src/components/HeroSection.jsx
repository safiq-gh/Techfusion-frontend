import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import env from "../config/env";
import heroPoster from "../assets/hero_poster.png";

export default function HeroSection({ event }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] flex flex-col items-center justify-start pt-32 pb-20 overflow-hidden bg-cyber-deep"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-cyan/10 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-cyber-blue/20 rounded-full blur-[120px]" />
        
        {/* Radiating Poster Beams */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="poster-beam"
            style={{ 
              left: '50%',
              top: '20%',
              transform: `rotate(${i * 45 - 157.5}deg)`,
              height: '150vh',
              opacity: 0.15 + (i % 2) * 0.05
            }}
          />
        ))}

        {/* Animated Flares */}
        <div className="flare-overlay opacity-30" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
        {/* Poster Headers */}
        <div className="hero-element mb-1">
          <p className="font-heading text-cyber-cyan text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase opacity-90 poster-glow-text">
            School of Computer, Information and Mathematical Sciences
          </p>
        </div>
        <div className="hero-element mb-8">
          <p className="font-heading text-white text-sm sm:text-lg md:text-xl tracking-[0.4em] uppercase font-bold">
            Department of Information Technology
          </p>
        </div>

        {/* Proudly Presents */}
        <div className="hero-element mb-4">
          <p className="font-heading text-white/50 text-[10px] sm:text-xs tracking-[0.6em] uppercase">
            Proudly Presents
          </p>
        </div>

        {/* Hero Image / Poster Graphic */}
        <div className="hero-element relative w-full max-w-lg mx-auto mb-8 perspective-1000">
          <motion.div 
            whileHover={{ rotateY: 10, rotateX: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative z-10 rounded-[2rem] overflow-hidden poster-box border-cyber-cyan/30 shadow-[0_0_50px_rgba(0,242,255,0.15)]"
          >
            <img 
              src={heroPoster} 
              alt="Techfusion '26 Illustration" 
              className="w-full h-auto object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-deep via-transparent to-transparent opacity-60" />
          </motion.div>
          {/* Decorative Back Glow */}
          <div className="absolute -inset-4 bg-cyber-cyan/10 blur-3xl -z-10 rounded-full animate-pulse-glow" />
        </div>

        {/* TECHFUSION '26 Title */}
        <div className="hero-element relative mb-2">
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter text-white drop-shadow-[0_0_20px_rgba(0,242,255,0.4)]">
            TECHFUSION<span className="text-cyber-cyan">'26</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="hero-element mb-10">
          <h2 className="font-heading text-lg sm:text-2xl md:text-3xl text-white tracking-[0.25em] uppercase font-medium">
            National Level Project Expo
          </h2>
          <div className="h-[2px] w-16 bg-cyber-cyan mx-auto mt-3 shadow-[0_0_10px_#00f2ff]" />
        </div>

        {/* Info Cards - Poster Box Style */}
        <div className="hero-element flex flex-wrap justify-center gap-4 mb-12">
          <div className="px-6 py-3 poster-box card-hover bg-void-black/60 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-cyber-cyan" />
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-widest text-cyber-cyan/60 font-bold">Date & Time</p>
                <p className="font-heading text-base text-white font-bold">{env.event.date}</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 poster-box card-hover bg-void-black/60 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cyber-cyan" />
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-widest text-cyber-cyan/60 font-bold">Location</p>
                <p className="font-heading text-base text-white font-bold">{env.event.venue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="hero-element flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/registration" className="btn-primary !py-4 !px-10 !text-sm group">
             Register Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/categories" className="btn-secondary !py-4 !px-10 !text-sm group">
             Explore Domains <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform text-cyber-cyan" />
          </Link>
        </div>
      </motion.div>

      {/* Entry Fee Indicator (Floating) - Poster Style */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hero-element flex items-center gap-4 opacity-80 hover:opacity-100 transition-opacity">
        <div className="h-px w-12 bg-poster-gold/50 shadow-[0_0_8px_#ffd700]" />
        <p className="font-heading text-xs tracking-[0.2em] uppercase text-poster-gold font-bold">Entry Fee: Rs. 200 per Team</p>
        <div className="h-px w-12 bg-poster-gold/50 shadow-[0_0_8px_#ffd700]" />
      </div>
    </section>
  );
}