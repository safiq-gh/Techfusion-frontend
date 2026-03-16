import React from "react";
import EventCategories from "../components/EventCategories";
import PageHeader from "../components/PageHeader";
import { motion } from "framer-motion";
import { Box, ArrowRight, Lightbulb, Target } from "lucide-react";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  return (
    <main className="bg-void-black min-h-screen">
      <PageHeader 
        title="Event" 
        gradientText="Domains" 
        subtitle="Explore the different technology arenas where you can showcase your project and compete for the top prize."
      />

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Intro Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 bg-white/2 rounded-[40px] p-8 sm:p-16 border border-white/5">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
              <h2 className="font-display text-3xl font-bold text-white mb-6">Find Your Arena</h2>
              <p className="font-body text-white/40 text-lg mb-8">
                Whether you're building next-gen web apps, hardware prototypes, or training AI models, 
                we have a domain for you. Each category is judged by experts in that specific field.
              </p>
              <div className="space-y-4">
                 <div className="flex gap-4 items-start">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-cyber-blue/10 flex items-center justify-center shrink-0 border border-cyber-blue/20">
                       <Lightbulb className="w-4 h-4 text-cyber-blue" />
                    </div>
                    <div>
                       <h4 className="font-display text-white text-sm uppercase tracking-wider mb-1">Judging Criteria</h4>
                       <p className="text-white/30 text-sm">Innovation, Technical Complexity, and Impact.</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-cyber-purple/10 flex items-center justify-center shrink-0 border border-cyber-purple/20">
                       <Target className="w-4 h-4 text-cyber-purple" />
                    </div>
                    <div>
                       <h4 className="font-display text-white text-sm uppercase tracking-wider mb-1">Prizes per Domain</h4>
                       <p className="text-white/30 text-sm">Top 3 teams in each domain receive cash prizes.</p>
                    </div>
                 </div>
              </div>
           </motion.div>
           
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative hidden md:block"
           >
              <div className="aspect-square rounded-[30px] bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 flex items-center justify-center border border-white/10 group">
                 <Box className="w-32 h-32 text-white/10 group-hover:scale-110 group-hover:text-cyber-blue/40 transition-all duration-700" />
                 {/* Floating Glows */}
                 <div className="absolute top-10 left-10 w-4 h-4 bg-cyber-blue rounded-full blur-xl animate-pulse" />
                 <div className="absolute bottom-10 right-10 w-6 h-6 bg-cyber-purple rounded-full blur-xl animate-pulse" />
              </div>
           </motion.div>
        </div>

        {/* Categories Display */}
        <EventCategories />

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
           <h3 className="font-display text-2xl text-white mb-6">Ready to pick your domain?</h3>
           <Link to="/registration" className="btn-primary px-10 py-4 flex items-center gap-2 mx-auto w-fit">
              Go to Registration <ArrowRight className="w-5 h-5" />
           </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default CategoriesPage;
