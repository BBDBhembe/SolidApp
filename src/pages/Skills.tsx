import { createSignal, createEffect, For } from "solid-js";
import { Skills, skillsApi } from "../service/api";

export default function SkillsPage() {
    const [skills, setSkills] = createSignal<Skills[]>([]);
    const [title, setTitle] = createSignal("");
    const [description, setDescription] = createSignal("");
    const [editSkill, setEditSkill] = createSignal<Skills | null>(null);
    const [nextId, setNextId] = createSignal(1);

    const fetchSkills = async () => {
        const response = await skillsApi.getAll();
        setSkills(response.data);

        const maxId = response.data.reduce((max, skill) => Math.max(max, skill.id), 0);
        setNextId(maxId + 1);
    };

    createEffect(fetchSkills);

    const handleCreateOrUpdate = async () => {
        if (editSkill()) {
            await skillsApi.update({ id: editSkill()!.id.toString(), title: title(), description: description() });
        } else {
            const newSkill = { id: nextId().toString(), title: title(), description: description() };
            await skillsApi.create(newSkill);
            setNextId(nextId() + 1);
        }
        setTitle("");
        setDescription("");
        setEditSkill(null);
        fetchSkills();
    };

    const handleDelete = async (id: number) => {
        await skillsApi.delete(id.toString());
        fetchSkills();
    };

    const handleEdit = (skill: Skills) => {
        setTitle(skill.title);
        setDescription(skill.description);
        setEditSkill(skill);
    };

    return (
        <section class="container mx-auto px-4 py-8">
            <h1 class="text-2xl font-bold mb-4">Skills</h1>

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
                    {editSkill() ? "Update Skill" : "Add Skill"}
                </button>
            </section>

            <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <For each={skills()}>{(skill) => (
                    <article class="border rounded-lg p-4 shadow-md">
                        <h2 class="text-xl font-semibold mt-2">{skill.title}</h2>
                        <p class="text-gray-600">{skill.description}</p>
                        <section class="mt-4 flex gap-2">
                            <button
                                onClick={() => handleEdit(skill)}
                                class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(skill.id)}
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
