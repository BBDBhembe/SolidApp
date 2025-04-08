const api = {
    get: async <T>(url: string): Promise<T> => {
        const response = await fetch(`http://localhost:3000${url}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },
    post: async <T>(url: string, body: unknown): Promise<T> => {
        const response = await fetch(`http://localhost:3000${url}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },
    put: async <T>(url: string, body: unknown): Promise<T> => {
        const response = await fetch(`http://localhost:3000${url}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },
    delete: async (url: string): Promise<void> => {
        const response = await fetch(`http://localhost:3000${url}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    },
};

export interface Project {
    id: number;
    title: string;
    description: string;
}

export interface Skills {
    id: number;
    title: string;
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