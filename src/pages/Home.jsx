import React from "react";
import { useEventStore } from "../store/useEventStore";
import HeroSection from "../components/HeroSection";
import CountdownSection from "../components/CountdownSection";
import AboutSection from "../components/AboutSection";
import EventDetails from "../components/EventDetails";
import EventCategories from "../components/EventCategories";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, RefreshCw, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "https://techfusion-backend-production.up.railway.app/api";

export default function Home() {
  const { event, loading, error } = useEventStore();

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-void-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 glass-strong rounded-3xl p-8 sm:p-10 text-center max-w-lg w-full"
        >
          <WifiOff className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="font-display text-2xl font-bold text-white mb-3">Connection Error</h2>
          <p className="font-body text-white/40 mb-6 text-sm">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3">
             <button onClick={() => window.location.reload()} className="btn-primary flex-1 flex items-center justify-center gap-2">
               <RefreshCw className="w-4 h-4" /> Retry
             </button>
             <button onClick={() => window.open(`${BACKEND_URL}/event`, "_blank")} className="btn-secondary flex-1 flex items-center justify-center gap-2">
               <ExternalLink className="w-4 h-4" /> Test Backend
             </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-void-black text-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-white mb-4">No Event Found</h2>
          <p className="font-body text-white/40 mb-8 max-w-md">We couldn't find any active event data. Please check back later.</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="home-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative"
      >
        <HeroSection event={event} />
        <CountdownSection />
        
        {/* NEW SECTIONS INTEGRATED INTO HOME */}
        <AboutSection />
        
        <div id="quick-details" className="bg-void-black border-y border-white/5">
           <EventDetails event={event} />
        </div>

        <EventCategories />

        {/* FINAL CTA SECTION */}
        <section className="section py-32 bg-void-black relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyber-blue/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-[40px] p-12 sm:p-20 border border-white/10"
            >
              <h2 className="font-display text-4xl sm:text-6xl font-black mb-6 text-white leading-tight">
                READY TO <br />
                <span className="text-gradient">INNOVATE?</span>
              </h2>
              <p className="font-body text-white/40 text-lg mb-12 max-w-2xl mx-auto">
                Join hundreds of other students and showcase your project to industry experts. 
                Don't miss out on Techfusion '26.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/registration" className="btn-primary w-full sm:w-auto px-12 py-5 text-lg flex items-center justify-center gap-3">
                  Register Now <ArrowRight className="w-6 h-6" />
                </Link>
                <Link to="/organizers" className="btn-secondary w-full sm:w-auto px-12 py-5 text-lg">
                  Meet the Team
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.main>
    </AnimatePresence>
  );
}