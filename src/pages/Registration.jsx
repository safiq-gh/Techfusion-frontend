import React from "react";
import PaymentSection from "../components/PaymentSection";
import RegistrationForm from "../components/RegistrationForm";
import StatusChecker from "../components/StatusChecker";
import PageHeader from "../components/PageHeader";
import { useEventStore } from "../store/useEventStore";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { motion } from "framer-motion";
import { ClipboardCheck, CreditCard, UserPlus, Search } from "lucide-react";

const RegistrationPage = () => {
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
            <Search className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">Connection Error</h2>
          <p className="font-body text-white/40 mb-6 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" /> Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!event) return null;

  const steps = [
    { icon: CreditCard, label: "Pay Fee", color: "cyber-blue" },
    { icon: UserPlus, label: "Fill Form", color: "cyber-purple" },
    { icon: ClipboardCheck, label: "Verification", color: "cyber-pink" },
  ];

  return (
    <main className="bg-void-black min-h-screen">
      <PageHeader 
        title="Event" 
        gradientText="Registration" 
        subtitle="Secure your spot at Techfusion '26. Follow the steps below to complete your registration."
      />

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Progress Guide */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-20">
           {steps.map((step, i) => (
             <motion.div 
               key={step.label}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="flex-1 flex items-center gap-4 p-6 glass-strong rounded-2xl border border-white/5"
             >
                <div className={`w-12 h-12 rounded-xl bg-${step.color}/10 flex items-center justify-center shrink-0 border border-${step.color}/20`}>
                   <step.icon className={`w-6 h-6 text-${step.color}`} />
                </div>
                <div>
                   <p className="text-white/20 text-[10px] uppercase tracking-widest font-heading mb-1">Step 0{i+1}</p>
                   <p className="text-white font-display text-sm font-bold">{step.label}</p>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 gap-20">
          <section id="payment" className="scroll-mt-32">
             <div className="flex items-center gap-3 mb-8">
                <CreditCard className="w-6 h-6 text-cyber-blue" />
                <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">Step 1: Payment</h2>
             </div>
             <PaymentSection event={event} />
          </section>

          <section id="form" className="scroll-mt-32">
             <div className="flex items-center gap-3 mb-8">
                <UserPlus className="w-6 h-6 text-cyber-purple" />
                <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">Step 2: Team Details</h2>
             </div>
             <RegistrationForm event={event} />
          </section>

          <section id="status" className="scroll-mt-32 pt-20 border-t border-white/5">
             <div className="flex items-center gap-3 mb-8">
                <Search className="w-6 h-6 text-cyber-pink" />
                <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">Check Status</h2>
             </div>
             <StatusChecker />
          </section>
        </div>
      </div>
    </main>
  );
};

export default RegistrationPage;
