import { create } from "zustand";
import { Plan } from "../services/types";
import { getAll } from "../services";
import { toast } from "sonner";

interface PlanStore {
  plans: Plan[];
  isLoading: boolean;
  setPlans: (plans: Plan[]) => void;
  updatePlan: (planId: string, updatedPlan: Partial<Plan>) => void;
  getPlanById: (planId: string) => Plan | undefined;
  addPlan: (plan: Plan) => void;
  refreshPlans: (accessToken: string) => Promise<void>;
}

export const usePlanStore = create<PlanStore>((set, get) => ({
  plans: [],
  isLoading: true,
  setPlans: (plans: Plan[]) => set({ plans }),
  updatePlan: (planId: string, updatedPlan: Partial<Plan>) =>
    set(state => ({
      plans: state.plans.map(plan => (plan.id === planId ? { ...plan, ...updatedPlan } : plan)),
    })),
  getPlanById: (planId: string) => get().plans.find(plan => plan.id === planId),
  addPlan: (plan: Plan) => set(state => ({ plans: [...state.plans, plan] })),
  refreshPlans: async (accessToken: string) => {
    try {
      set({ isLoading: true });
      const plans = await getAll(accessToken);
      set({ plans, isLoading: false });
    } catch (error) {
      console.error("Error al actualizar la lista de planes:", error);
      set({ isLoading: false });
      toast.error("Error", {
        description: "No se pudo cargar la lista de planes. Por favor, intente nuevamente.",
      });
    }
  },
}));
