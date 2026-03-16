import React from "react";
import EventDetails from "../components/EventDetails";
import PageHeader from "../components/PageHeader";
import { useEventStore } from "../store/useEventStore";
import { motion } from "framer-motion";
import { ArrowLeft, Info, Map, Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";

const DetailsPage = () => {
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
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
            <Info className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">Connection Error</h2>
          <p className="font-body text-white/40 mb-6 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Try Again
          </button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <main className="bg-void-black min-h-screen">
      <PageHeader 
        title="Event" 
        gradientText="Details" 
        subtitle="Complete guide to Techfusion '26—from schedules to venues and everything in between."
      />

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Navigation / Breadcrumb */}
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="group flex items-center gap-2 text-white/40 hover:text-cyber-blue transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-heading text-sm uppercase tracking-widest">Back to Home</span>
          </Link>

          <div className="hidden sm:flex gap-6">
             <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyber-blue" />
                <span className="text-white/20 text-xs font-mono uppercase">Info ID: TF26-DET</span>
             </div>
          </div>
        </div>

        {/* Essential Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-2 glass-strong rounded-3xl p-8 sm:p-12 border border-white/5"
           >
              <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Map className="w-6 h-6 text-cyber-blue" />
                Theme & Vision
              </h3>
              <p className="font-body text-white/40 text-lg leading-relaxed mb-6">
                Techfusion '26 is designed to be more than just a competition. It's a confluence of ideas 
                where technology meets creativity. Our vision is to foster an environment where students 
                can present their projects directly to industry leaders and gain valuable feedback.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <p className="font-heading text-cyber-blue text-xs uppercase tracking-widest mb-2">Venue Address</p>
                    <p className="text-white/80">IT Building, Crescent Institute, Vandalur, Chennai - 48</p>
                 </div>
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <p className="font-heading text-cyber-purple text-xs uppercase tracking-widest mb-2">Event Timing</p>
                    <p className="text-white/80">9:00 AM onwards, 8th April 2026</p>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="glass-strong rounded-3xl p-8 border border-white/5 flex flex-col justify-between"
           >
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-4">Quick Links</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/registration" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-cyber-blue/10 transition-colors group">
                       <span className="text-white/60 group-hover:text-white transition-colors">Registration</span>
                       <ArrowLeft className="w-4 h-4 rotate-180 text-cyber-blue" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-cyber-purple/10 transition-colors group">
                       <span className="text-white/60 group-hover:text-white transition-colors">Domains</span>
                       <ArrowLeft className="w-4 h-4 rotate-180 text-cyber-purple" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                 <p className="text-white/20 text-xs italic">For support, contact techfusion@crescent.education</p>
              </div>
           </motion.div>
        </div>

        {/* Component Display */}
        <div className="border border-white/5 rounded-[40px] overflow-hidden">
          {event && <EventDetails event={event} />}
        </div>
      </div>
    </main>
  );
};

export default DetailsPage;
