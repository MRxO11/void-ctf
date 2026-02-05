import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLabStore } from "../store/labStore";
import api from "../services/api";

export default function AppLayout() {
  const setProgress = useLabStore(s => s.setProgress);
  const setPoints = useLabStore(s => s.setPoints);
  const initFromToken = useLabStore(s => s.initFromToken);

  useEffect(() => {
    async function loadUserData() {
      initFromToken();

      const progressRes = await api.get("/api/progress");
      setProgress(progressRes.data);

      const meRes = await api.get("/auth/me");
      setPoints(meRes.data?.points ?? 0);
    }

    loadUserData();
  }, []);

  return <Outlet />;
}
