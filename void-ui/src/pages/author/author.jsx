import { motion } from "framer-motion";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import GlowButton from "../../components/ui/GlowButton";
import { Github, Linkedin } from "lucide-react";

export default function Author() {
  const profile = {
    name: "MRxO1",
    title: "Security Researcher / Hacker",
    bio: `
    Hello I'm Abhinav,

VOID is a web exploitation lab platform built to learn web application pentesting through realistic, hands on challenges.

It focuses on practical vulnerabilities, modern attack chains, and skill building workflows so you can go from “I know the theory” to “I can break and fix real systems.

Happy Hacking !! 
    `.trim(),
    socials: [
      {
        label: "GitHub",
        icon: <Github className="w-4 h-4" />,
        href: "https://github.com/MRxO11",
      },
      {
        label: "LinkedIn",
        icon: <Linkedin className="w-4 h-4" />,
        href: "https://www.linkedin.com/in/abhinavo1/",
      },
    ],
    interests: [
      "Pentesting",
      "Red Teaming",
      "Web App Security",
      "Malware Analysis",
      "Reverse Engineering",
      "OSINT",
      "Networking",
      "RF / SDR Hacking",
    ],
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Text Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10
                         flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xl tracking-wider">
                MR
              </span>
            </motion.div>

            <div>
              <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
              <p className="text-gray-400 mt-1">{profile.title}</p>
            </div>
          </div>

          <div className="flex gap-3">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                <GlowButton type="primary">
                  <span className="inline-flex items-center gap-2">
                    {s.icon}
                    {s.label}
                  </span>
                </GlowButton>
              </a>
            ))}
          </div>
        </div>
      </Card>

      {/* About VOID */}
      <Card>
        <h2 className="text-xl font-semibold text-white">About VOID</h2>
        <p className="text-gray-300 leading-relaxed mt-3 whitespace-pre-line">
          {profile.bio}
        </p>
      </Card>

      {/* Interests */}
      <Card>
        <h2 className="text-xl font-semibold text-white">Areas of Interest</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.interests.map((i) => (
            <Badge key={i} text={i} type="info" />
          ))}
        </div>
      </Card>

      <div className="text-sm text-gray-500 text-center pt-2">
        © VOID • Built by {profile.name}
      </div>
    </div>
  );
}


