import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = new Date(targetDate).getTime() - now;

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 sm:gap-8 justify-center mt-12">
      {units.map((unit, i) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 + i * 0.1 }}
          className="text-center"
        >
          <div className="relative group">
             <div className="absolute inset-0 bg-cyber-blue/10 blur-xl rounded-2xl group-hover:bg-cyber-blue/20 transition-all" />
             <div className="relative glass-strong p-4 sm:p-6 rounded-2xl border border-white/10 min-w-[70px] sm:min-w-[100px]">
                <span className="block font-display text-2xl sm:text-4xl font-bold text-gradient">
                   {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest font-heading mt-2 block">
                  {unit.label}
                </span>
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Countdown;
