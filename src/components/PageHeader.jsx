import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle, gradientText }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-void-black">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(0,242,255,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
            {title} <span className="text-gradient">{gradientText}</span>
          </h1>
          <p className="font-body text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
