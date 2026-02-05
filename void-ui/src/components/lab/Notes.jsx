import React, { useState } from "react";

export default function Notes() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    if (note.trim()) {
      setNotes([...notes, note]);
      setNote("");
    }
  };

  return (
    <div style={{ background: "#111827", padding: 12, borderRadius: 12, marginTop: 12 }}>
      <h4 style={{ color: "#00f0ff" }}>Notes</h4>
      <input
        type="text"
        placeholder="Write a note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #222", background: "#0b0f14", color: "#e5e7eb" }}
      />
      <button
        onClick={addNote}
        style={{ marginTop: 6, width: "100%", padding: 8, borderRadius: 6, background: "#00f0ff", color: "#0b0f14", fontWeight: "bold" }}
      >
        Add Note
      </button>
      <ul style={{ marginTop: 6, color: "#e5e7eb" }}>
        {notes.map((n, i) => <li key={i}>• {n}</li>)}
      </ul>
    </div>
  );
}
