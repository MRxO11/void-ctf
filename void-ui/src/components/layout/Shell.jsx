
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import LiveBackground from "../ui/LiveBackground";

export default function Shell({ children }) {
  return (
    <div className="flex h-screen text-[#e5e7eb] relative overflow-hidden">
      {/* Full-screen live background */}
      <LiveBackground />

      {/* Sidebar (keep above bg, but let bg show through) */}
      <div className="relative z-10">
        <div className="h-full bg-[#02061788]">
          <Sidebar />
        </div>
      </div>

      {/* Main */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1 p-8 overflow-y-auto relative z-10
                   bg-gradient-to-br from-[#0b1220cc] to-[#02061788]"
      >
        {/* subtle glow overlay (also transparent) */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.02),transparent_45%)]" />

        {children}
      </motion.main>
    </div>
  );
}

