import { motion } from "framer-motion";

export default function Card({ children, hover = false }) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300 }}
      className="
        bg-[#020617]
        border border-cyan-500/10
        rounded-2xl p-5
        shadow-xl
        hover:border-cyan-400/40
        hover:shadow-cyan-500/10
      "
    >
      {children}
    </motion.div>
  );
}
