import { create } from "zustand";
import { persist } from "zustand/middleware";

function safeJwtPayload(token) {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function getUserIdFromToken() {
  const token = localStorage.getItem("void_token");
  if (!token) return null;

  const payload = safeJwtPayload(token);
  return payload?.id || payload?.userId || payload?.sub || null;
}

export const useLabStore = create(
  persist(
    (set, get) => ({
      activeUserId: null,

      users: {},

      completedLabs: [],
      points: 0,

      initFromToken: () => {
        const userId = getUserIdFromToken();
        if (!userId) return;

        const users = get().users;
        const current = users[userId] || {
          completedLabs: [],
          points: 0,
          revealedHintsByLab: {},
        };

        set({
          activeUserId: userId,
          users: {
            ...users,
            [userId]: current,
          },
          completedLabs: current.completedLabs,
          points: current.points,
        });
      },

      logout: () => {
        set({
          activeUserId: null,
          completedLabs: [],
          points: 0,
        });
      },

      setProgress: (labs) => {
        const { activeUserId, users, points } = get();
        if (!activeUserId) return;

        const current = users[activeUserId] || {
          completedLabs: [],
          points: 0,
          revealedHintsByLab: {},
        };

        const nextCompleted = Array.isArray(labs) ? labs : [];

        set({
          users: {
            ...users,
            [activeUserId]: {
              ...current,
              completedLabs: nextCompleted,
            },
          },
          completedLabs: nextCompleted,
          points: current.points ?? points,
        });
      },

      setPoints: (points) => {
        const { activeUserId, users } = get();
        if (!activeUserId) return;

        const current = users[activeUserId] || {
          completedLabs: [],
          points: 0,
          revealedHintsByLab: {},
        };

        const nextPoints = Number.isFinite(points) ? points : 0;

        set({
          users: {
            ...users,
            [activeUserId]: {
              ...current,
              points: nextPoints,
            },
          },
          points: nextPoints,
        });
      },

      completeLab: (labId, reward) => {
        const { activeUserId, users, completedLabs, points } = get();
        if (!activeUserId) return;

        if (completedLabs.includes(labId)) return;

        const current = users[activeUserId] || {
          completedLabs: [],
          points: 0,
          revealedHintsByLab: {},
        };

        const nextCompleted = [...completedLabs, labId];
        const nextPoints = points + (reward || 0);

        set({
          users: {
            ...users,
            [activeUserId]: {
              ...current,
              completedLabs: nextCompleted,
              points: nextPoints,
            },
          },
          completedLabs: nextCompleted,
          points: nextPoints,
        });
      },

      deductPoints: (amount) => {
        const { activeUserId, users, points } = get();
        if (!activeUserId) return;

        const current = users[activeUserId] || {
          completedLabs: [],
          points: 0,
          revealedHintsByLab: {},
        };

        const nextPoints = Math.max(points - (amount || 0), 0);

        set({
          users: {
            ...users,
            [activeUserId]: {
              ...current,
              points: nextPoints,
            },
          },
          points: nextPoints,
        });
      },

      isHintRevealed: (labId, hintId) => {
        const { activeUserId, users } = get();
        if (!activeUserId) return false;

        const current = users[activeUserId];
        const list = current?.revealedHintsByLab?.[labId] || [];
        return list.includes(hintId);
      },

      revealHint: (labId, hintId) => {
        const { activeUserId, users } = get();
        if (!activeUserId) return;

        const current = users[activeUserId] || {
          completedLabs: [],
          points: 0,
          revealedHintsByLab: {},
        };

        const list = current.revealedHintsByLab[labId] || [];
        if (list.includes(hintId)) return;

        set({
          users: {
            ...users,
            [activeUserId]: {
              ...current,
              revealedHintsByLab: {
                ...current.revealedHintsByLab,
                [labId]: [...list, hintId],
              },
            },
          },
        });
      },
    }),
    { name: "void-labs-store" }
  )
);
