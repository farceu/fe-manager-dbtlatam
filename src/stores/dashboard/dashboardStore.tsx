import { create } from "zustand";

interface DashboardStore {
  defaultOpen: boolean;
  setDefaultOpen: (defaultOpen: boolean) => void;
}

const useDashboardStore = create<DashboardStore>(set => ({
  defaultOpen: true,
  setDefaultOpen: (defaultOpen: boolean) => set({ defaultOpen }),
}));

export const useDashboard = useDashboardStore;
