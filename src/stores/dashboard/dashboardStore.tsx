// import { AgentModel } from '@/models/agent';
// import { ChatWidget } from '@/models/chatWidgets';
// import { ToolModel } from '@/models/tools';
import { create } from "zustand";

export interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  company_id: string;
}

interface DashboardStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  allProjects: Project[];
  setAllProjects: (projects: Project[]) => void;
  project: Project | null;
  setProject: (project: Project | null) => void;
  agents: any[];
  setAgents: (agents: any[]) => void;
  tools: any[];
  setTools: (tools: any[]) => void;
  chatWidgets: any[];
  setChatWidgets: (chatWidgets: any[]) => void;
  projectId: string | null;
  setProjectId: (projectId: string) => void;
}

const useDashboardStore = create<DashboardStore>(set => ({
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  allProjects: [],
  setAllProjects: (projects: Project[]) => set({ allProjects: projects }),
  project: null,
  setProject: (project: Project | null) => set({ project }),
  agents: [],
  setAgents: (agents: any[]) => set({ agents }),
  tools: [],
  setTools: (tools: any[]) => set({ tools }),
  chatWidgets: [],
  setChatWidgets: (chatWidgets: any[]) => set({ chatWidgets }),
  projectId: null,
  setProjectId: (projectId: string | null) => set({ projectId }),
}));

export const useDashboard = useDashboardStore;
