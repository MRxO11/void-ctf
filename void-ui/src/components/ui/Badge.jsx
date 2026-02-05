import React from "react";

export default function Badge({ text = "Badge", type = "default" }) {
  const styles = {
    default: "bg-zinc-800 text-zinc-200 border-zinc-700",
    success: "bg-green-900/40 text-green-400 border-green-500/40",
    danger: "bg-red-900/40 text-red-400 border-red-500/40",
    warning: "bg-yellow-900/40 text-yellow-400 border-yellow-500/40",
    info: "bg-cyan-900/40 text-cyan-400 border-cyan-500/40",
    purple: "bg-purple-900/40 text-purple-400 border-purple-500/40",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md shadow-sm ${styles[type] || styles.default}`}
    >
      {text}
    </span>
  );
}
