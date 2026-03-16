import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const TITLE = "TECHFUSION".split("");

export default function LoadingSkeleton({ onLoadingComplete }) {
  const wrapRef = useRef(null);
  const controls = useAnimation();
  const [isExiting, setIsExiting] = useState(false);
  
  // Parallax Tilt for 3D depth
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const tiltX = useSpring(useTransform(my, [0, 1], [15, -15]), { stiffness: 100, damping: 30 });
  const tiltY = useSpring(useTransform(mx, [0, 1], [-15, 15]), { stiffness: 100, damping: 30 });

  const handleMouse = (e) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  useEffect(() => {
    const sequence = async () => {
      // 1. HIDDEN STATE: Recessed and blurred
      await controls.start((i) => ({
        opacity: 0,
        y: 40,
        rotateX: -90,
        filter: "blur(10px) brightness(0)",
        transition: { duration: 0 }
      }));

      // 2. THE REVEAL: Staggered, slow flip for maximum impact
      await controls.start((i) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px) brightness(1.2)",
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 15,
          delay: i * 0.15, // Slowed down for "Jaw-dropping" effect
        },
      }));

      // 3. ATMOSPHERIC HOLD: Breathe for a few seconds
      controls.start((i) => ({
        filter: ["brightness(1)", "brightness(1.6)", "brightness(1)"],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.1,
        },
      }));

      // IMPACT TIMER: Ensure it stays for at least 3.5 seconds
      await new Promise(resolve => setTimeout(resolve, 3500));

      // 4. POWER-UP PULSE: Final flash before exiting
      await controls.start({
        scale: 1.15,
        letterSpacing: "0.15em",
        filter: "brightness(3) blur(4px)",
        transition: { duration: 0.6, ease: "circIn" }
      });

      setIsExiting(true);
      setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete();
      }, 800);
    };

    sequence();
  }, [controls, onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          exit={{ opacity: 0, filter: "blur(40px) brightness(0)", scale: 1.2 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 bg-void-black overflow-hidden flex items-center justify-center"
        >
          {/* THEMATIC AURORA: Exact matches for image_ba441d.jpg */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-pink-600/10 blur-[180px] rounded-full" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] bg-[#00d4ff]/15 blur-[180px] rounded-full" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_80%)]" />
          </div>

          <motion.div
            ref={wrapRef}
            onMouseMove={handleMouse}
            style={{ perspective: 1200 }}
            className="relative flex flex-col items-center justify-center w-full"
          >
            {/* GHOST '26' WATERMARK */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.05, scale: 1 }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="absolute font-black text-[38vw] text-white select-none pointer-events-none"
              style={{ top: "50%", left: "50%", x: "-50%", y: "-55%" }}
            >
              26
            </motion.div>

            {/* MAIN LOGO WITH 3D PARALLAX */}
            <motion.div style={{ rotateX: tiltX, rotateY: tiltY }} className="relative z-10">
              <div className="flex items-center justify-center gap-[0.03em] select-none">
                {/* GLOW LAYER */}
                <div className="absolute inset-0 flex items-center justify-center blur-2xl opacity-50">
                  <LetterRow title={TITLE} controls={controls} isGlow={true} />
                </div>
                {/* BRAND GRADIENT LAYER */}
                <LetterRow title={TITLE} controls={controls} isGlow={false} />
              </div>
            </motion.div>

            {/* STATUS & PROGRESS */}
            <motion.div 
              animate={isExiting ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              className="mt-32 flex flex-col items-center gap-6"
            >
              <div className="text-white/30 tracking-[1.2em] uppercase text-[10px] font-bold flex items-center gap-2">
                Initializing System <LoadingDots />
              </div>
              
              <div className="w-80 h-0.5 bg-white/5 relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute h-full bg-linear-to-r from-[#00d4ff] via-purple-600 to-pink-500 shadow-[0_0_20px_#00d4ff]"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 4.5, ease: "easeInOut" }}
                  style={{ width: '100%' }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LetterRow({ title, controls, isGlow }) {
  const themeGradient = "bg-linear-to-r from-[#00d4ff] via-purple-500 to-pink-500 bg-clip-text text-transparent";
  
  return (
    <div className="flex items-center justify-center font-black text-[clamp(2.5rem,11vw,10rem)] tracking-tighter">
      {title.map((ch, i) => (
        <motion.span
          key={i}
          custom={i}
          animate={controls}
          className={`inline-block ${isGlow ? "text-[#00d4ff]" : themeGradient}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {ch}
        </motion.span>
      ))}
    </div>
  );
}

function LoadingDots() {
  return (
    <span className="flex gap-1.5">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full shadow-[0_0_8px_#00d4ff]"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </span>
  );
}