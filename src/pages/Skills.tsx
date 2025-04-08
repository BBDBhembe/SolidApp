import { createSignal, onMount } from "solid-js";
import { Skills, skillsApi } from "../service/api";

export default function SkillsPage() {
  const [skills, setSkills] = createSignal<Skills[]>([]);

  onMount(async () => {
    try {
      const response = await skillsApi.getAll();
      console.log(response);
      setSkills(response);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  });

  return (
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-4">Skills</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills().map((skill) => (
          <div id={`skill-${skill.id}`} class="border rounded-lg p-4 shadow-md">
            <h2 class="text-xl font-semibold mt-2">{skill.title}</h2>
            <p class="text-gray-600">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
