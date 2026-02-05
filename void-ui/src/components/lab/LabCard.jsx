import { Link } from "react-router-dom";
import { useLabStore } from "../../store/labStore";

export default function LabCard({ lab, onStart }) {
  const solvedLabs = useLabStore((s) => s.completedLabs);
  const isSolved = solvedLabs.includes(lab.id);

  return (
    <div className="bg-[#0b1220] p-5 rounded-xl border border-[#1e293b]">
      <h3 className="font-bold text-[#00f0ff]">{lab.title}</h3>

      <p className="text-sm text-gray-400">
        {lab.category} • {lab.difficulty} • {lab.points} pts
      </p>

      {isSolved ? (
        <p className="mt-3 text-green-400 text-sm font-bold">✔ Solved</p>
      ) : (
        <Link
          to={`/app/workspace/${lab.id}`}
          onClick={() => {
            if (typeof onStart === "function") onStart(lab.id);
          }}
          className="inline-block mt-3 text-sm text-[#22d3ee] hover:underline"
        >
          Start Lab →
        </Link>
      )}
    </div>
  );
}
