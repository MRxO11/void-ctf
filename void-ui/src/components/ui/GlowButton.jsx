import React from "react";

export default function GlowButton({ children, onClick, type = "primary" }) {
  const styles = {
    primary:
      "bg-cyan-600/20 text-cyan-300 border-cyan-400 shadow-cyan-500/40 hover:bg-cyan-500/30 hover:text-cyan-200",
    danger:
      "bg-red-600/20 text-red-300 border-red-400 shadow-red-500/40 hover:bg-red-500/30 hover:text-red-200",
    success:
      "bg-green-600/20 text-green-300 border-green-400 shadow-green-500/40 hover:bg-green-500/30 hover:text-green-200",
    purple:
      "bg-purple-600/20 text-purple-300 border-purple-400 shadow-purple-500/40 hover:bg-purple-500/30 hover:text-purple-200",
  };

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-xl border font-semibold tracking-wide transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl ${styles[type] || styles.primary}`}
    >
      {children}
    </button>
  );
}
