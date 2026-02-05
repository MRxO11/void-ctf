import { NavLink } from "react-router-dom";
import { FaUser, FaHome, FaFlask, FaBook, FaBookOpen } from "react-icons/fa";

const links = [
  { path: "/app", label: "Dashboard", icon: <FaHome /> },
  { path: "/app/labs", label: "Labs", icon: <FaFlask /> },
  { path: "/app/author", label: "Author", icon: <FaBook /> },
  { path: "/app/writeups", label: "Writeups", icon: <FaBookOpen />},
  { path: "/auth/login", label: "Login", icon: <FaUser /> },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-gradient-to-b from-[#020617] to-[#020617]/70 flex flex-col p-4 border-r border-cyan-500/20">
      <h1 className="text-2xl font-bold text-[#00f0ff] mb-8 tracking-widest">
        VOID
      </h1>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200
               ${
                 isActive
                   ? "bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                   : "text-gray-300 hover:bg-cyan-500/5 hover:text-cyan-300"
               }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span className="text-sm font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
