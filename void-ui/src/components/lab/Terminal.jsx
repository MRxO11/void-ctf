import React, { useState } from "react";

export default function Terminal({ onSend }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);

  const handleSend = () => {
    if (!input) return;
    const result = onSend(input);
    setOutput([...output, `$ ${input}`, result]);
    setInput("");
  };

  return (
    <div style={{ background: "#111827", padding: 12, borderRadius: 12, marginTop: 12, color: "#e5e7eb", fontFamily: "JetBrains Mono" }}>
      <div style={{ maxHeight: 150, overflowY: "auto" }}>
        {output.map((line, i) => <div key={i}>{line}</div>)}
      </div>
      <input
        type="text"
        placeholder="Enter command"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #222", background: "#0b0f14", color: "#e5e7eb", marginTop: 6 }}
      />
      <button
        onClick={handleSend}
        style={{ marginTop: 6, width: "100%", padding: 8, borderRadius: 6, background: "#00f0ff", color: "#0b0f14", fontWeight: "bold" }}
      >
        Send
      </button>
    </div>
  );
}
