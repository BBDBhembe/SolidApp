import { createSignal, Show } from "solid-js";
import Skills from "../pages/Skills";
import Projects from "../pages/Projects";
import { user, setUser, setIsAuthenticated } from "../auth";
import logoutIcon from "../assets/logout.png";

export default function Dashboard() {
  const [activeTab, setActiveTab] = createSignal<"skills" | "projects">("skills");

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <section class="flex h-screen">
      <aside class="w-64 bg-gray-800 text-white flex flex-col justify-between">
        <section>
          <header class="p-4 text-2xl font-bold border-b border-gray-700">
            Dashboard
          </header>

          <nav class="flex flex-col mt-4 gap-2">
            <button
              class={`p-4 text-left hover:bg-gray-700 ${activeTab() === "skills" ? "bg-gray-700" : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              Skills
            </button>

            <button
              class={`p-4 text-left hover:bg-gray-700 ${activeTab() === "projects" ? "bg-gray-700" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </button>
          </nav>
        </section>

        <button
          onClick={handleLogout}
          class="p-4 bg-red-600 hover:bg-red-700 text-center flex items-center gap-2 justify-center"
        >
          <img
            src={logoutIcon}
            alt="Logout Icon"
            class="w-5 h-5"
          />
          Logout
        </button>
      </aside>

      <section class="flex flex-col flex-1 overflow-hidden">
        <header class="bg-gray-800 shadow-md p-4 pt-2 flex items-center justify-between sticky top-0 z-10">
          <div class="flex items-center gap-4">
            <img
              src={user()?.picture || "https://via.placeholder.com/40"}
              alt="User Avatar"
              class="w-10 h-10 rounded-full"
            />
            <h1 class="font-bold" style="font-size: 1.8em;">
              Welcome, <span class="text-purple-500">{user()?.name || "User"}!</span>
            </h1>
          </div>
          <span class="text-sm text-gray-300">{new Date().toLocaleDateString()}</span>
        </header>

        <main class="flex-1 gap-1 overflow-y-auto p-8 bg-gray-900 text-white">
          <Show when={activeTab() === "skills"}>
            <Skills />
          </Show>

          <Show when={activeTab() === "projects"}>
            <Projects />
          </Show>
        </main>
      </section>
    </section>
  );
}
