import { createSignal, createEffect, For } from "solid-js";
import { Project, projectApi } from "../service/api";

export default function ProjectsPage() {
    const [projects, setProjects] = createSignal<Project[]>([]);
    const [title, setTitle] = createSignal("");
    const [description, setDescription] = createSignal("");
    const [editProject, setEditProject] = createSignal<Project | null>(null);
    const [nextId, setNextId] = createSignal(1);

    const fetchProjects = async () => {
        const response = await projectApi.getAll();
        setProjects(response.data);

        const maxId = response.data.reduce((max, project) => Math.max(max, project.id), 0);
        setNextId(maxId + 1);
    };

    createEffect(fetchProjects);

    const handleCreateOrUpdate = async () => {
        if (editProject()) {
            await projectApi.update({ id: editProject()!.id.toString(), title: title(), description: description() });
        } else {
            const newProject = { id: nextId().toString(), title: title(), description: description() };
            await projectApi.create(newProject);
            setNextId(nextId() + 1);
        }
        setTitle("");
        setDescription("");
        setEditProject(null);
        fetchProjects();
    };

    const handleDelete = async (id: number) => {
        await projectApi.delete(id.toString());
        fetchProjects();
    };

    const handleEdit = (project: Project) => {
        setTitle(project.title);
        setDescription(project.description);
        setEditProject(project);
    };

    return (
        <section class="container mx-auto px-4 py-8">
            <h1 class="text-2xl font-bold mb-4">Projects</h1>

            <section class="mb-6">
                <input
                    type="text"
                    placeholder="Title"
                    class="border p-2 mr-2"
                    value={title()}
                    onInput={(e) => setTitle(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    class="border p-2 mr-2"
                    value={description()}
                    onInput={(e) => setDescription(e.currentTarget.value)}
                />
                <button
                    onClick={handleCreateOrUpdate}
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    {editProject() ? "Update Project" : "Create Project"}
                </button>
            </section>

            <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <For each={projects()}>{(project) => (
                    <article class="border rounded-lg p-4 shadow-md">
                        <h2 class="text-xl font-semibold mt-2">{project.title}</h2>
                        <p class="text-gray-600">{project.description}</p>
                        <section class="flex gap-2 mt-4">
                            <button
                                onClick={() => handleEdit(project)}
                                class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </section>
                    </article>
                )}</For>
            </section>
        </section>
    );
}
