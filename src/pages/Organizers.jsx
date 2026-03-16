import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, Award } from "lucide-react";
import DataStreamBg from "../components/DataStreamBg";

// Faculty Images
import drGnanasekaran from "../assets/organizers/gnanasekaran.jpg";
import drSonya from "../assets/organizers/sonya.jpg";
import mrsPavitra from "../assets/organizers/pavitra.jpg";

// Student Images
import faheel from "../assets/organizers/faheel.jpg";
import mustafa from "../assets/organizers/mustafa.jpg";
import yashwanth from "../assets/organizers/yashwanth.jpg";

const faculty = [
  { 
    name: "Dr. P. Gnanasekaran", 
    role: "AP(.Sel.Gr) / IT", 
    icon: GraduationCap,
    image: drGnanasekaran 
  },
  { 
    name: "Dr. A. Sonya", 
    role: "AP(.Sel.Gr) / IT", 
    icon: GraduationCap,
    image: drSonya 
  },
  { 
    name: "Mrs. R. Pavitra", 
    role: "AP / IT", 
    icon: GraduationCap,
    image: mrsPavitra 
  },
];

const students = [
  { 
    name: "Mohammed Faheel M", 
    role: "Student Coordinator", 
    year: "3rd Year",
    image: faheel 
  },
  { 
    name: "Ahamath Musthafa M", 
    role: "Student Coordinator", 
    year: "3rd Year",
    image: mustafa 
  },
  { 
    name: "P.B.Yashwanth", 
    role: "Student Coordinator", 
    year: "3rd Year",
    image: yashwanth
  },
];

const Organizers = () => {
  return (
    <main className="relative min-h-screen bg-void-black py-32 px-4 overflow-hidden">
      {/* Radiating Poster Beams */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="poster-beam"
            style={{ 
              left: '50%',
              top: '30%',
              transform: `rotate(${i * 60 + 30}deg)`,
              height: '150vh',
            }}
          />
        ))}
      </div>
      <DataStreamBg />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
           <span className="inline-block font-heading text-xs tracking-[0.4em] uppercase text-cyber-cyan/60 mb-4 font-bold poster-glow-text">
            Meet the Visionaries
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-black mb-6 text-white leading-tight">
            EVENT <span className="text-cyber-cyan drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]">ORGANIZERS</span>
          </h1>
          <p className="font-body text-white/40 max-w-2xl mx-auto text-lg">
            Merging expertise with passion. The dedicated team behind Techfusion '26
          </p>
        </motion.div>

        {/* Faculty Coordinators */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-2xl poster-box flex items-center justify-center border-cyber-blue/30 shadow-[0_0_15px_rgba(0,102,255,0.2)]">
              <GraduationCap className="w-5 h-5 text-cyber-blue" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">Faculty Coordinators</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {faculty.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="poster-box p-8 card-hover text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-cyber-blue/20 rounded-2xl blur-xl group-hover:bg-cyber-blue/40 transition-colors" />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 glass flex items-center justify-center">
                    {f.image ? (
                      <img 
                        src={f.image} 
                        alt={f.name} 
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <f.icon className="w-10 h-10 text-cyber-blue" />
                    )}
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">{f.name}</h3>
                <p className="text-white/40 font-heading tracking-widest text-[10px] uppercase font-bold">{f.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Student Coordinators */}
        <div>
          <div className="flex items-center gap-4 mb-10">
             <div className="w-10 h-10 rounded-2xl poster-box flex items-center justify-center border-cyber-cyan/30 shadow-[0_0_15px_rgba(0,242,255,0.1)]">
              <Users className="w-5 h-5 text-cyber-cyan" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">Student Coordinators</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {students.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="poster-box p-8 card-hover text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-cyber-cyan/10 rounded-2xl blur-xl group-hover:bg-cyber-cyan/20 transition-colors" />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 glass flex items-center justify-center">
                    {s.image ? (
                      <img 
                        src={s.image} 
                        alt={s.name} 
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <Users className="w-10 h-10 text-cyber-cyan" />
                    )}
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">{s.name}</h3>
                <p className="text-white/40 font-heading tracking-widest text-[10px] uppercase font-bold">{s.role} • {s.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Organizers;
