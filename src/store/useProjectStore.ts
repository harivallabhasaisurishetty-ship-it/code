import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: string;
  businessName: string;
  businessDescription: string;
  style: string;
  htmlContent: string;
  createdAt: number;
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  addProject: (project: Project) => void;
  setCurrentProject: (project: Project | null) => void;
  updateProjectContent: (id: string, newContent: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [],
      currentProject: null,
      addProject: (project) =>
        set((state) => ({ projects: [project, ...state.projects] })),
      setCurrentProject: (project) => set({ currentProject: project }),
      updateProjectContent: (id, newContent) =>
        set((state) => {
          const updatedProjects = state.projects.map((p) =>
            p.id === id ? { ...p, htmlContent: newContent } : p
          );
          const current = state.currentProject?.id === id ? { ...state.currentProject, htmlContent: newContent } : state.currentProject;
          return { projects: updatedProjects, currentProject: current };
        }),
    }),
    {
      name: 'digital-ally-projects',
    }
  )
);