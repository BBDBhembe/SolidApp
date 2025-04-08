import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000',
});

export interface Project {
    id: number;
    title: string;
    image: string;
    description: string;
}

export interface Skills {
    id: number;
    title: string;
    image: string;
    description: string;
}

export const projectApi = {
    getAll: () => api.get<Project[]>('/projects'),
    getById: (id: number) => api.get<Project>(`/projects/${id}`),
    create: (project: Project) => api.post<Project>('/projects', project),
    update: (project: Project) => api.put<Project>(`/projects/${project.id}`, project),
    delete: (id: number) => api.delete(`/projects/${id}`),
};

export const skillsApi = {
    getAll: () => api.get<Skills[]>('/skills'),
    getById: (id: number) => api.get<Skills>(`/skills/${id}`),
    create: (skill: Skills) => api.post<Skills>('/skills', skill),
    update: (skill: Skills) => api.put<Skills>(`/skills/${skill.id}`, skill),
    delete: (id: number) => api.delete(`/skills/${id}`),
};