import api from "../services/api";
import { useLabStore } from "./labStore";

export async function initUserLabs() {
  const res = await api.get("/api/progress");
  useLabStore.getState().setProgress(res.data);
}
