
import React, { useState } from "react";

export default function FlagBox({ onSubmit }) {
  const [flag, setFlag] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = () => {
    if (!flag) return;
    onSubmit(flag, setMsg);
  };

  return (
    <div style={{ background: "#111827", padding: 12, borderRadius: 12, marginTop: 12 }}>
      <input
        type="text"
        placeholder="Enter flag"
        value={flag}
        onChange={(e) => setFlag(e.target.value)}
        style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #222", background: "#0b0f14", color: "#e5e7eb" }}
      />
      <button
        onClick={handleSubmit}
        style={{ marginTop: 8, width: "100%", padding: 8, borderRadius: 6, background: "#00f0ff", color: "#0b0f14", fontWeight: "bold" }}
      >
        Submit
      </button>
      {msg && <p style={{ color: "#22c55e", marginTop: 6 }}>{msg}</p>}
    </div>
  );
}
