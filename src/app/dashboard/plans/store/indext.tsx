import { create } from "zustand";
import { Plan } from "../services/types";
import { getAll } from "../services";

interface PlanStore {
  plans: Plan[];
  setPlans: (plans: Plan[]) => void;
  updatePlan: (planId: string, updatedPlan: Partial<Plan>) => void;
  getPlanById: (planId: string) => Plan | undefined;
  addPlan: (plan: Plan) => void;
  refreshPlans: (accessToken: string) => Promise<void>;
}

export const usePlanStore = create<PlanStore>((set, get) => ({
  plans: [],
  setPlans: (plans: Plan[]) => set({ plans }),
  updatePlan: (planId: string, updatedPlan: Partial<Plan>) =>
    set(state => ({
      plans: state.plans.map(plan => (plan.id === planId ? { ...plan, ...updatedPlan } : plan)),
    })),
  getPlanById: (planId: string) => get().plans.find(plan => plan.id === planId),
  addPlan: (plan: Plan) => set(state => ({ plans: [...state.plans, plan] })),
  refreshPlans: async (accessToken: string) => {
    try {
      const plans = await getAll(accessToken);
      debugger;
      set({ plans });
    } catch (error) {
      console.error("Error al actualizar la lista de planes:", error);
    }
  },
}));
