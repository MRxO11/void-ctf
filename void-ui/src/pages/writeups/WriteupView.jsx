import { useParams, Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { getWriteupById } from "../../app/writeups.api";

export default function WriteupView() {
  const { id } = useParams();
  const w = getWriteupById(id);

  if (!w) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <p className="text-gray-400">Writeup not found.</p>
        <Link to="/app/writeups" className="text-cyan-400 hover:underline">
          ← Back to Writeups
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{w.title}</h1>
          {w.id !== "auth-burp" && (
            <p className="text-gray-400 mt-1">
              {w.category} • {w.points} pts
            </p>
          )}
        </div>

        {w.id === "auth-burp" ? (
          <Badge text="guide" type="success" />
        ) : (
          <div className="flex gap-2">
            <Badge text={w.difficulty} type="info" />
            <Badge
              text={w.status}
              type={w.status === "active" ? "success" : "warning"}
            />
          </div>
        )}
      </div>

      {w.sections.map((s, idx) => (
        <Card key={idx}>
          <h2 className="text-xl font-semibold text-white">{s.title}</h2>
          <p className="text-gray-300 mt-3 whitespace-pre-line leading-relaxed">
            {s.body}
          </p>
        </Card>
      ))}

      <Link to="/app/writeups" className="text-cyan-400 hover:underline">
        ← Back to Writeups
      </Link>
    </div>
  );
}
