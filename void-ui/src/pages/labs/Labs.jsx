import LabCard from "../../components/lab/LabCard";
import { LABS } from "../../app/labs.data";
import { useLabStore } from "../../store/labStore";

export default function Labs() {
  const startLab = useLabStore((s) => s.startLab);

  const categories = [...new Set(LABS.map((l) => l.category))];

  return (
    <>
      <h1 className="text-3xl font-bold text-[#00f0ff] mb-6">Labs</h1>

      {categories.map((cat) => (
        <div key={cat} className="mb-10">
          <h2 className="text-xl font-bold text-[#22d3ee] mb-4">
            {cat}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LABS
              .filter((l) => l.category === cat)
              .map((lab) => (
                <LabCard
                  key={lab.id}
                  lab={lab}
                  onStart={() => startLab && startLab(lab.id)}
                />
              ))}
          </div>
        </div>
      ))}
    </>
  );
}
