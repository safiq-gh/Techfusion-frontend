import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail, Phone, MapPin, Instagram, Twitter,
  Linkedin, Github, Send,
} from "lucide-react";
import env from "../config/env";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Details", path: "/details" },
  { name: "Registration", path: "/registration" },
  { name: "Organizers", path: "/organizers" },
];

const developers = [
  { name: "P.B.Yashwanth", year: "3rd Year", dept: "IT" },
  { name: "Mohamed Safiq S", year: "3rd Year", dept: "IT" },
  { name: "Kishore Kumar S", year: "3rd Year", dept: "IT" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cyber-deep pt-16 pb-12 border-t border-cyber-cyan/5">
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyber-cyan/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-cyan rounded-[2.5rem] p-8 md:p-12 mb-20 relative overflow-hidden group border border-cyber-cyan/20"
        >
          <div className="absolute inset-0 bg-grid opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-4xl font-black mb-4 tracking-tight">
                JOIN THE <span className="text-cyber-cyan">EVOLUTION</span>
              </h3>
              <p className="text-white/40 font-body max-w-md text-lg leading-relaxed">
                Stay updated with the latest from Techfusion '26. Get event alerts and exclusive updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyber-cyan/40 focus:bg-cyber-cyan/5 transition-all font-body"
              />
              <button className="btn-primary !py-4 px-8 group shrink-0">
                <span className="flex items-center gap-2">
                  SUBSCRIBE <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20 px-4">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-4 mb-8 group">
              <span className="font-display font-black text-cyber-cyan text-4xl tracking-tighter group-hover:drop-shadow-[0_0_8px_rgba(0,242,255,0.6)] transition-all">2K26</span>
              <div className="h-8 w-px bg-white/10" />
              <span className="font-display font-bold text-xl tracking-widest uppercase">
                <span className="text-white group-hover:text-cyber-cyan transition-colors">Tech</span>
                <span className="text-cyber-cyan group-hover:text-white transition-colors">Fusion</span>
              </span>
            </Link>
            <p className="font-body text-white/40 text-sm leading-relaxed mb-10 max-w-sm">
              Merging innovation with intelligence. The ultimate technology symposium pushing the boundaries of what's possible in the digital age.
            </p>
            <div className="flex gap-5">
              {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl glass border border-white/5 flex items-center justify-center hover:bg-cyber-cyan/10 hover:border-cyber-cyan/40 transition-all text-white/40 hover:text-cyber-cyan group"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 lg:ml-auto">
            <h4 className="font-heading font-bold text-white mb-8 uppercase tracking-[0.3em] text-[10px] opacity-50">Explore</h4>
            <ul className="space-y-5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-white/30 hover:text-white transition-all text-sm font-medium flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-cyber-cyan mr-0 group-hover:mr-3 transition-all opacity-0 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 lg:ml-auto">
            <h4 className="font-heading font-bold text-white mb-8 uppercase tracking-[0.3em] text-[10px] opacity-50">Get In Touch</h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl glass border border-cyber-cyan/10 flex items-center justify-center shrink-0 group-hover:bg-cyber-cyan/5 transition-colors">
                  <Mail className="w-5 h-5 text-cyber-cyan" />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mb-2">Email Us</p>
                  <a href="mailto:techfusion@crescent.education" className="text-white/60 hover:text-white transition-colors text-sm font-medium">
                    techfusion@crescent.education
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl glass border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/5 transition-colors">
                  <Phone className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mb-2">Call Us</p>
                  <a href="tel:+919790860275" className="text-white/60 hover:text-white transition-colors text-sm font-medium">
                    +91 97908 60275
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8 text-white/20 text-[10px] tracking-[0.2em] uppercase font-medium">
            <p>© {new Date().getFullYear()} TechFusion 2K26</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start gap-4">
            <h5 className="text-cyber-cyan text-[11px] tracking-[0.3em] font-black uppercase">Developed By</h5>
            <div className="flex flex-col gap-2">
              {developers.map((dev, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-white/80 text-sm font-heading font-bold tracking-wide">
                    {dev.name}
                  </span>
                  <span className="text-white/20 text-[10px] uppercase tracking-widest">
                    — {dev.year} / {dev.dept}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
