import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../utils/validators";
import { registerUser, checkEmail } from "../services/api";
import { useEventStore } from "../store/useEventStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User, Mail, Phone, Building2, BookOpen,
  CalendarDays, Layers, CreditCard,
  Loader2, CheckCircle, XCircle,
  AlertCircle, Send, Lock, ArrowRight,
  ArrowLeft, Sparkles, Zap,
} from "lucide-react";

const yearOptions = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
];

const categoryOptions = [
  { value: "web", label: "Web & Mobile Development", icon: "🌐", color: "var(--color-cyber-cyan)" },
  { value: "cyber", label: "Cyber Security", icon: "🛡️", color: "var(--color-cyber-cyan)" },
  { value: "iot", label: "IoT / Robotics", icon: "🤖", color: "var(--color-cyber-cyan)" },
  { value: "innovation", label: "Innovations in IT", icon: "💡", color: "var(--color-cyber-cyan)" },
];

// Step configuration
const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Academic Details", icon: BookOpen },
  { id: 3, title: "Category & Payment", icon: CreditCard },
];

export default function RegistrationForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const { event, setRegistrationId } = useEventStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [direction, setDirection] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    trigger,
    watch,
    getValues,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const isRegistrationClosed = event && !event.registration_open;
  const isFull = event && event.slots_available <= 0;

  // Email validation
  const handleEmailBlur = async (e) => {
    const email = e.target.value;
    if (!email) return;

    setEmailStatus("checking");
    try {
      const res = await checkEmail(email);
      if (res.data.data.registered) {
        setEmailStatus("taken");
        setError("email", { message: "Email already registered" });
      } else {
        setEmailStatus("available");
      }
    } catch {
      setEmailStatus(null);
    }
  };

  // Step navigation
  const nextStep = async () => {
    const fieldsToValidate = {
      1: ["name", "email", "phone"],
      2: ["college", "department", "year"],
      3: ["category", "transaction_id"],
    };

    const isValid = await trigger(fieldsToValidate[currentStep]);
    if (isValid && emailStatus !== "taken") {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Form submission
  const onSubmit = async (data) => {
    if (emailStatus === "taken") {
      toast.error("Email already registered!");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...data,
        year: Number(data.year),
        event_ids: [data.category],
      };

      delete payload.category;

      const res = await registerUser(payload);
      const regId = res.data.data.registration_id;

      setRegistrationId(regId);
      toast.success("Registration submitted! Pending verification.");
      navigate(`/success/${regId}`);
    } catch (err) {
      toast.error(err?.response?.data?.error?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  // Input field component
  const InputField = ({ icon: Icon, label, name, type = "text", placeholder, ...rest }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-[0.2em] font-heading">
        <Icon className="w-3.5 h-3.5 text-cyber-cyan/60" />
        {label}
      </label>
      <div className="relative group">
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          onBlur={name === "email" ? handleEmailBlur : undefined}
          className="input-field pl-12 group-hover:border-cyber-cyan/20 focus:border-cyber-cyan/50 transition-all duration-300"
          {...rest}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyber-cyan transition-colors">
          <Icon className="w-4 h-4" />
        </div>

        {/* Email status indicator */}
        {name === "email" && emailStatus && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              {emailStatus === "checking" && (
                <motion.div
                  key="checking"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Loader2 className="w-4 h-4 text-cyber-cyan animate-spin" />
                </motion.div>
              )}
              {emailStatus === "available" && (
                <motion.div
                  key="available"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <CheckCircle className="w-4 h-4 text-cyber-cyan" />
                </motion.div>
              )}
              {emailStatus === "taken" && (
                <motion.div
                  key="taken"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <XCircle className="w-4 h-4 text-red-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0, h: 0 }}
            animate={{ opacity: 1, h: "auto" }}
            exit={{ opacity: 0, h: 0 }}
            className="text-red-400 text-xs flex items-center gap-1 mt-1"
          >
            <AlertCircle className="w-3 h-3" />
            {errors[name].message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // Select field component
  const SelectField = ({ icon: Icon, label, name, options }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-[0.2em] font-heading">
        <Icon className="w-3.5 h-3.5 text-cyber-cyan/60" />
        {label}
      </label>
      <div className="relative group">
        <select
          {...register(name)}
          className="input-field pl-12 appearance-none cursor-pointer group-hover:border-cyber-cyan/20 focus:border-cyber-cyan/50 transition-all duration-300"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyber-cyan transition-colors">
          <Icon className="w-4 h-4" />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="register" ref={ref} className="section relative overflow-hidden bg-void-black py-32">
      {/* Radiating Poster Beams */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-15">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="poster-beam"
            style={{ 
              left: '50%',
              top: '40%',
              transform: `rotate(${i * 60}deg)`,
              height: '150vh',
            }}
          />
        ))}
      </div>

      {/* Background Glows */}
      <div className="absolute inset-0 z-0 opacity-20">
         <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyber-blue/10 rounded-full blur-[150px]" />
         <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyber-cyan/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block font-heading text-xs tracking-[0.4em] uppercase text-cyber-cyan/60 mb-4 font-bold poster-glow-text">
            Innovation Portal
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-none text-white">
            REGISTER <span className="text-cyber-cyan drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]">NOW</span>
          </h2>
          <p className="font-body text-white/40 max-w-lg mx-auto text-lg leading-relaxed">
            Secure your spot in the most anticipated tech expo of 2026. Join the evolution.
          </p>
        </motion.div>

        {/* Status Alerts */}
        <AnimatePresence mode="wait">
          {isRegistrationClosed && (
            <motion.div
              initial={{ opacity: 0, h: 0 }}
              animate={{ opacity: 1, h: "auto" }}
              exit={{ opacity: 0, h: 0 }}
              className="mb-8 p-6 poster-box border-red-500/20 flex items-center gap-4 overflow-hidden"
            >
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-red-500" />
              </div>
              <p className="font-heading text-red-400 font-bold tracking-wide">Registrations are currently closed</p>
            </motion.div>
          )}

          {isFull && !isRegistrationClosed && (
            <motion.div
              initial={{ opacity: 0, h: 0 }}
              animate={{ opacity: 1, h: "auto" }}
              exit={{ opacity: 0, h: 0 }}
              className="mb-8 p-6 poster-box border-yellow-500/20 flex items-center gap-4 overflow-hidden"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="font-heading text-yellow-400 font-bold tracking-wide">All event slots are currently filled</p>
            </motion.div>
          )}
        </AnimatePresence>
 
        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="poster-box p-8 sm:p-12 relative group overflow-hidden"
        >
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-16 relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-[2px] bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-blue"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </div>

            {steps.map((step, i) => (
              <div key={step.id} className="relative flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 border ${
                    currentStep >= step.id
                      ? "bg-cyber-cyan border-cyber-cyan text-void-black shadow-[0_0_20px_rgba(0,242,255,0.4)]"
                      : "bg-void-black/80 text-white/20 border-white/5"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </motion.div>
                <span
                  className={`absolute -bottom-8 text-[10px] font-heading font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-500 ${
                    currentStep >= step.id ? "text-cyber-cyan" : "text-white/20"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <AnimatePresence mode="wait" custom={direction}>
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="space-y-8"
                >
                  <InputField
                    icon={User}
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                  />
                  <InputField
                    icon={Mail}
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your personal email"
                  />
                  <InputField
                    icon={Phone}
                    label="Phone Number"
                    name="phone"
                    placeholder="10-digit mobile number"
                  />
                </motion.div>
              )}

              {/* Step 2: Academic Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="space-y-8"
                >
                  <InputField
                    icon={Building2}
                    label="College Name"
                    name="college"
                    placeholder="Enter your college/university"
                  />
                  <InputField
                    icon={BookOpen}
                    label="Department"
                    name="department"
                    placeholder="E.g., Computer Science"
                  />
                  <SelectField
                    icon={CalendarDays}
                    label="Year of Study"
                    name="year"
                    options={yearOptions}
                  />
                </motion.div>
              )}

              {/* Step 3: Category & Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="space-y-8"
                >
                  {/* Category Selection */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-[0.2em] font-heading font-bold">
                      <Layers className="w-3.5 h-3.5 text-cyber-cyan/60" />
                      Select Domain
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categoryOptions.map((cat) => (
                        <motion.label
                          key={cat.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${
                            watch("category") === cat.value
                              ? "bg-cyber-cyan/5 border-cyber-cyan/40 shadow-[0_0_20px_rgba(0,242,255,0.1)]"
                              : "bg-void-black/40 border-white/5 hover:border-cyber-cyan/20"
                          }`}
                        >
                          <input
                            {...register("category")}
                            type="radio"
                            value={cat.value}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-4">
                            <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{cat.icon}</span>
                            <span className={`font-heading text-sm font-bold transition-colors ${
                              watch("category") === cat.value ? "text-white" : "text-white/40"
                            }`}>
                              {cat.label}
                            </span>
                          </div>
                          {watch("category") === cat.value && (
                            <motion.div
                              layoutId="categoryCheck"
                              className="absolute top-3 right-3"
                            >
                              <CheckCircle className="w-5 h-5 text-cyber-cyan" />
                            </motion.div>
                          )}
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <InputField
                    icon={CreditCard}
                    label="Transaction ID"
                    name="transaction_id"
                    placeholder="Enter UPI transaction ID"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-6 mt-12">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary !flex-1 !py-5 flex items-center justify-center gap-3 group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Previous
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary !flex-1 !py-5 flex items-center justify-center gap-3 group"
                >
                  Next Step
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting || isRegistrationClosed || isFull}
                  className="btn-primary !flex-1 !py-5 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Complete Registration
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
