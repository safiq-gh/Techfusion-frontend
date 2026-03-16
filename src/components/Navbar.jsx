import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Details", path: "/details" },
  { name: "Registration", path: "/registration" },
  { name: "Organizers", path: "/organizers" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? "py-4 bg-void-black/90 backdrop-blur-xl border-b border-white/5" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <span className="font-display font-black text-cyber-cyan text-2xl tracking-tighter group-hover:drop-shadow-[0_0_8px_rgba(0,242,255,0.8)] transition-all">2K26</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-xl tracking-tighter">
                <span className="text-cyber-cyan group-hover:text-white transition-colors">TECH</span>
                <span className="text-white group-hover:text-cyber-cyan transition-colors">FUSION</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 font-heading text-sm uppercase tracking-widest nav-link-hover ${
                  location.pathname === link.path ? "text-cyber-cyan" : ""
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-cyber-cyan"
                    layoutId="navbar-underline"
                    initial={false}
                    animate={{ width: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/registration" className="btn-primary !py-2 !px-6 !text-xs">
              <span className="flex items-center gap-2">
                Register
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-void-black border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 font-heading text-lg uppercase tracking-widest ${
                    location.pathname === link.path ? "text-cyber-blue" : "text-white/40"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link to="/registration" className="btn-primary w-full flex justify-center">
                  Register Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}