
import { motion } from "framer-motion";

export default function Progress({ value = 0 }) {
  return (
    <div className="w-full h-3 bg-[#020617] rounded-full overflow-hidden border border-[#0f172a]">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1 }}
        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
      />
    </div>
  );
}
