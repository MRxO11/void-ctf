import { useParams } from "react-router-dom";

import { LABS } from "../../app/labs.data";
import { useLabStore } from "../../store/labStore";

import FlagBox from "../../components/lab/FlagBox";
import Card from "../../components/ui/Card";
import api from "../../services/api";

import { useState, useEffect } from "react";

function getUserIdFromToken() {
  try {
    const t = localStorage.getItem("void_token");
    if (!t) return "guest";

    const payload = JSON.parse(atob(t.split(".")[1]));
    return payload.id || payload.userId || payload.sub || "guest";
  } catch {
    return "guest";
  }
}

export default function Workspace() {
  const { id } = useParams();
  const lab = LABS.find(l => l.id === id);

  const completeLab = useLabStore(s => s.completeLab);
  const points = useLabStore((s) => s.points);

  const [revealedHints, setRevealedHints] = useState([]);

  const userId = getUserIdFromToken();

  if (!lab) {
    return <p className="text-red-500">Lab not found</p>;
  }

  const hintStorageKey = (hintId) =>
    `hint:${userId}:${lab.id}:${hintId}`;

  const totalHintCostUsed = Array.isArray(lab.hints)
    ? lab.hints
        .filter(h => revealedHints.includes(h.id))
        .reduce((sum, h) => sum + (h.cost || 0), 0)
    : 0;

  const maxEarnable = Math.max(lab.points - totalHintCostUsed, 0);

  const handleFlagSubmit = async (flag, setMsg) => {
    try {
      const res = await api.post("/api/submit", {
        challengeId: lab.id,
        flag: flag.trim()
      });

      if (res.data.success) {
        completeLab(lab.id, maxEarnable);
        setMsg(`✅ Correct flag! You earned ${maxEarnable} pts`);
      } else {
        setMsg(res.data.message || "❌ Wrong flag");
      }

    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Wrong flag");
    }
  };

  const revealHint = (hint) => {
    const key = hintStorageKey(hint.id);

    if (localStorage.getItem(key)) {
      setRevealedHints(prev =>
        prev.includes(hint.id) ? prev : [...prev, hint.id]
      );
      return;
    }

    if (hint.cost > 0) {
      const ok = confirm(
        `This hint will reduce this lab's score by ${hint.cost} points. Continue?`
      );
      if (!ok) return;
    }

    localStorage.setItem(key, "revealed");

    setRevealedHints(prev => [...prev, hint.id]);
  };

  useEffect(() => {
    if (!Array.isArray(lab.hints)) return;

    const restored = lab.hints
      .filter(h => localStorage.getItem(`hint:${userId}:${lab.id}:${h.id}`))
      .map(h => h.id);

    setRevealedHints(restored);
  }, [lab.id]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-cyan-400">
        {lab.title}
      </h1>

      <p className="text-sm text-gray-400">
        Total Score:{" "}
        <span className="text-cyan-400">{points}</span>
      </p>

      <p className="text-sm text-gray-400">
        Max Earnable For This Lab:{" "}
        <span className="text-cyan-400">{maxEarnable}</span>{" "}
        / {lab.points}
      </p>

      <Card>
        <h2 className="font-bold">Mission</h2>
        <p>{lab.description}</p>
      </Card>

      <Card>
        <h2 className="font-bold">Endpoints</h2>

        {Array.isArray(lab.endpoints) ? (
          <ul className="text-cyan-300 text-sm">
            {lab.endpoints.map(e => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">
            No endpoints available.
          </p>
        )}
      </Card>

      <Card>
        <h2 className="font-bold mb-2">Hints</h2>

        {Array.isArray(lab.hints) && lab.hints.length > 0 ? (
          lab.hints.map(hint => {
            const revealed = revealedHints.includes(hint.id);

            return (
              <div key={hint.id} className="mb-3">
                {!revealed ? (
                  <button
                    onClick={() => revealHint(hint)}
                    className="text-cyan-400 text-sm font-bold"
                  >
                    Reveal Hint {hint.id}
                    {hint.cost > 0 ? ` (-${hint.cost} lab pts)` : " (free)"}
                  </button>
                ) : (
                  <p className="text-gray-400 mt-2">
                    {hint.text}
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm">
            No hints available.
          </p>
        )}
      </Card>

      <FlagBox onSubmit={handleFlagSubmit} />
    </div>
  );
}
