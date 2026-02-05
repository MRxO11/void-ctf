import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { getWriteups } from "../../app/writeups.api";

export default function Writeups() {
  const items = getWriteups();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Writeups</h1>
        <p className="text-gray-400 mt-2">
          Public walkthroughs: Auth setup + Easy/Medium starter labs.
        </p>
      </div>

      <div className="grid gap-5">
        {items.map((w) => (
          <Card key={w.id} hover>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{w.title}</h2>

                {w.id === "auth-burp" ? (
                  <p className="text-gray-400 mt-1">Auth / Burp Guide</p>
                ) : (
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

            <div className="mt-4">
              <Link
                to={`/app/writeups/${w.id}`}
                className="text-cyan-400 hover:underline"
              >
                View →
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-sm text-gray-500">
        Note: Hard labs are not listed here. Their intended commands/payloads are
        already included in the in lab hint system.
      </p>
    </div>
  );
}
