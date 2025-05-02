import { create } from "zustand";
import { getAll } from "../services";
import { toast } from "sonner";
import { Role } from "../../admin-users/services/types";

interface RoleStore {
  roles: Role[];
  isLoading: boolean;
  setRoles: (roles: Role[]) => void;
  updateRole: (roleId: string, updatedRole: Partial<Role>) => void;
  getRoleById: (roleId: string) => Role | undefined;
  addRole: (role: Role) => void;
  refreshRoles: (accessToken: string) => Promise<void>;
}

export const useRoleStore = create<RoleStore>((set, get) => ({
  roles: [],
  isLoading: true,
  setRoles: (roles: Role[]) => set({ roles }),
  updateRole: (roleId: string, updatedRole: Partial<Role>) =>
    set(state => ({
      roles: state.roles.map(role => (role.id === roleId ? { ...role, ...updatedRole } : role)),
    })),
  getRoleById: (roleId: string) => get().roles.find(role => role.id === roleId),
  addRole: (role: Role) => set(state => ({ roles: [...state.roles, role] })),
  refreshRoles: async (accessToken: string) => {
    try {
      set({ isLoading: true });
      const roles = await getAll(accessToken);
      set({ roles, isLoading: false });
    } catch (error) {
      console.error("Error al actualizar la lista de roles:", error);
      set({ isLoading: false });
      toast.error("Error", {
        description: "No se pudo cargar la lista de roles. Por favor, intente nuevamente.",
      });
    }
  },
}));
