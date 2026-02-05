import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";
import { useLabStore } from "../store/labStore";

export default function Protected({ children }) {
  const token = localStorage.getItem("void_token");
  const initFromToken = useLabStore(s => s.initFromToken);
  const setProgress = useLabStore(s => s.setProgress);
  const setPoints = useLabStore(s => s.setPoints);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  useEffect(() => {
    let mounted = true;

    async function loadUserData() {
      try {
        initFromToken();

        const progressRes = await api.get("/api/progress");
        if (mounted) setProgress(progressRes.data);

        const meRes = await api.get("/auth/me");
        if (mounted) setPoints(meRes.data?.points ?? 0);
      } catch {
        
      }
    }

    loadUserData();

    return () => {
      mounted = false;
    };
  }, [initFromToken, setProgress, setPoints]);

  return children;
}
