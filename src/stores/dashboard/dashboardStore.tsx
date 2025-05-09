import { getCountries } from "@/app/dashboard/clients/services";
import { create } from "zustand";

interface DashboardStore {
  defaultOpen: boolean;
  setDefaultOpen: (defaultOpen: boolean) => void;
  countries: Country[];
  setCountries: (countries: Country[]) => void;
  refreshCountries: (accessToken: string) => void;
}

const useDashboardStore = create<DashboardStore>(set => ({
  defaultOpen: true,
  setDefaultOpen: (defaultOpen: boolean) => set({ defaultOpen }),
  countries: [],
  setCountries: (countries: Country[]) => set({ countries }),
  refreshCountries: (accessToken: string) => {
    getCountries(accessToken).then(countries => set({ countries }));
  },
}));

export const useDashboard = useDashboardStore;
