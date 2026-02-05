import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { initUserLabs } from "../../store/initUserLabs";
import { useLabStore } from "../../store/labStore";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      const token = res.data?.token || res.data?.data?.token;
      if (!token) {
        throw new Error("Token not returned");
      }

      localStorage.setItem("void_token", token);

      useLabStore.getState().initFromToken();

      await initUserLabs();

      navigate("/app");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError("Login failed");
    }
  };


  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at top, #020617, #000)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 340,
          background: "rgba(2,6,23,0.85)",
          border: "1px solid #0ff3",
          borderRadius: 14,
          padding: 28,
          boxShadow: "0 0 40px #00f2ff22",
        }}
      >
        <h2 style={{ color: "#00f0ff", marginBottom: 16, fontSize: 22 }}>
          VOID ACCESS
        </h2>

        {error && (
          <p style={{ color: "#ff4d6d", marginBottom: 10 }}>{error}</p>
        )}

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button style={btnStyle}>LOGIN</button>

        <p
          style={{
            marginTop: 14,
            color: "#94a3b8",
            fontSize: 13,
            cursor: "pointer",
          }}
          onClick={() => navigate("/auth/register")}
        >
          create new account →
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #0ff3",
  background: "#020617",
  color: "#e5e7eb",
  outline: "none",
};

const btnStyle = {
  width: "100%",
  marginTop: 8,
  padding: "10px",
  borderRadius: 8,
  border: "1px solid #00f0ff",
  background: "linear-gradient(135deg,#00f0ff22,#00f0ff44)",
  color: "#67e8f9",
  fontWeight: 600,
  letterSpacing: 1,
  cursor: "pointer",
};


