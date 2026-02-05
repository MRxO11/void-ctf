import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/register", { username, email, password });
      setSuccess("Account created! You can now login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", background: "#0b0f14" }}>
      <form onSubmit={handleSubmit} style={{ background: "#111827", padding: 24, borderRadius: 12, width: 320 }}>
        <h2 style={{ color: "#00f0ff", marginBottom: 16 }}>VOID Register</h2>
        {error && <p style={{ color: "#ff3c6a" }}>{error}</p>}
        {success && <p style={{ color: "#22c55e" }}>{success}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12, borderRadius: 6, border: "1px solid #222", background: "#0b0f14", color: "#e5e7eb" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12, borderRadius: 6, border: "1px solid #222", background: "#0b0f14", color: "#e5e7eb" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12, borderRadius: 6, border: "1px solid #222", background: "#0b0f14", color: "#e5e7eb" }}
        />
        <button type="submit" style={{ width: "100%", padding: 10, borderRadius: 6, background: "#00f0ff", color: "#0b0f14", fontWeight: "bold" }}>Register</button>
      </form>
    </div>
  );
}
