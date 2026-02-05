import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  "Initializing core modules",
  "Loading exploit engine",
  "Syncing lab environment",
  "Establishing secure channel",
  "VOID ready",
];

export default function BootScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 500);
          return 100;
        }
        return p + 5;
      });

      setStep((s) => (s < steps.length - 1 ? s + 1 : s));
    }, 120);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617]"
    >
      <h1 className="text-3xl font-bold text-[#00f0ff] tracking-widest mb-6 animate-pulse">
        INITIALIZING VOID
      </h1>

      <div className="w-80 h-2 bg-[#020617] border border-cyan-500/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      <p className="mt-4 text-sm text-gray-400 font-mono">
        {steps[step]}
      </p>
    </motion.div>
  );
}
