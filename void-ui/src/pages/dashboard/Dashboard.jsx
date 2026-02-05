import { LABS } from "../../app/labs.data";
import Card from "../../components/ui/Card";
import Progress from "../../components/ui/Progress";
import { Shield, Terminal, Trophy, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BootScreen from "../../components/ui/BootScreen";
import { useLabStore } from "../../store/labStore";

export default function Dashboard() {
  const completedLabs = useLabStore((s) => s.completedLabs);
  const points = useLabStore((s) => s.points);
  const [booted, setBooted] = useState(false);

  const solved = completedLabs.length;
  const totalLabs = LABS.length;
  const progress = Math.floor((solved / totalLabs) * 100);

  const rank =
    points >= 1000
      ? "Elite"
      : points >= 500
      ? "Gold"
      : points >= 150
      ? "Silver"
      : "Bronze";

  if (!booted) {
    return (
      <AnimatePresence>
        <BootScreen onFinish={() => setBooted(true)} />
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-10"
    >
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-[#00f0ff]">
        VOID Dashboard
      </h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat icon={<Shield size={22} />} label="Rank" value={rank} />
        <Stat icon={<Terminal size={22} />} label="Labs Solved" value={`${solved}/${totalLabs}`} />
        <Stat icon={<Trophy size={22} />} label="Score" value={`${points} pts`} />
        <Stat icon={<Cpu size={22} />} label="Active Labs" value={totalLabs} />
      </div>

      {/* PROGRESS */}
      <Card>
        <h2 className="text-lg font-bold mb-2">Progress</h2>
        <Progress value={progress} />
        <p className="text-sm text-gray-400 mt-2">
          {progress}% of VOID conquered
        </p>
      </Card>

      {/* QUICK ACCESS */}
      <div>
        <h2 className="text-xl font-bold text-[#22d3ee] mb-4">
          Quick Deploy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LABS.map((lab, i) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card hover>
                <h3 className="font-bold text-[#00f0ff]">{lab.title}</h3>
                <p className="text-sm text-gray-400">
                  {lab.category} • {lab.difficulty}
                </p>

                <Link
                  to={`/app/workspace/${lab.id}`}
                  className="inline-block mt-3 text-sm text-[#22d3ee] hover:underline"
                >
                  Enter Lab →
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <motion.div whileHover={{ scale: 1.06, y: -6 }}>
      <Card hover>
        <div className="flex items-center gap-3 text-[#00f0ff]">
          {icon}
          <span className="text-sm">{label}</span>
        </div>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </Card>
    </motion.div>
  );
}
