import { createSignal, createEffect } from "solid-js";
import { Project, projectApi } from "../service/api";

export default function Projects() {
    const [projects, setProjects] = createSignal<Project[]>([]);

    createEffect(async () => {
        const response = await projectApi.getAll();
        setProjects(response);
    });

    return (
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-2xl font-bold mb-4">Projects</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects().map((project) => (
                    <div id={`project-${project.id}`} class="border rounded-lg p-4 shadow-md">
                        <h2 class="text-xl font-semibold mt-2">{project.title}</h2>
                        <p class="text-gray-600">{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}