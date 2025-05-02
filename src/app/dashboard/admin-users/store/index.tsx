import { create } from "zustand";
import { getAll, create as createUser, update, deleteUser, reinviteUser } from "../services";
import { User } from "../services/types";
interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetchUsers: (accessToken: string) => Promise<void>;
  addUser: (
    user: Omit<User, "id" | "created_at" | "updated_at">,
    accessToken: string
  ) => Promise<void>;
  updateUser: (id: string, user: Partial<User>, accessToken: string) => Promise<void>;
  deleteUser: (id: string, accessToken: string) => Promise<void>;
  reinviteUser: (email: string, accessToken: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  loading: true,
  error: null,
  searchTerm: "",

  setSearchTerm: term => set({ searchTerm: term }),

  fetchUsers: async (accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const users = await getAll(accessToken);
      set({ users, loading: false });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      set({ error: "Error al obtener usuarios", loading: false });
    }
  },

  addUser: async (user: User, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const newUser = await createUser(user, accessToken);
      set(state => ({ users: [...state.users, newUser], loading: false }));
    } catch (error) {
      console.error("Error al crear usuario:", error);
      set({ error: "Error al crear usuario", loading: false });
    }
  },

  updateUser: async (id: string, user: Partial<User>, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await update(id, user, accessToken);
      set(state => ({ users: state.users.map(u => (u.id === id ? updatedUser : u)) }));
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      set({ error: "Error al actualizar usuario", loading: false });
    }
  },

  deleteUser: async (id: string, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      await deleteUser(id, accessToken);
      set(state => ({ users: state.users.filter(u => u.id !== id) }));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      set({ error: "Error al eliminar usuario", loading: false });
    }
  },

  reinviteUser: async (email: string, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      await reinviteUser(email, accessToken);
    } catch (error) {
      console.error("Error al reinvitar usuario:", error);
      set({ error: "Error al reinvitar usuario", loading: false });
    }
  },
}));
