import { createSignal, createEffect } from "solid-js";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "@solidjs/router";
import { setUser, setIsAuthenticated } from "../auth";

export default function Login() {
  let googleSignInButtonRef: HTMLDivElement | undefined;
  const [isScriptLoaded, setIsScriptLoaded] = createSignal(false);
  const navigate = useNavigate();

  const loadGoogleScript = () => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setIsScriptLoaded(true);
    document.head.appendChild(script);
  };


  const handleCredentialResponse = (response: any) => {
    console.log("Google login response:", response);
    const decoded = jwtDecode(response.credential);
    console.log("Decoded JWT:", decoded);

    // Set user and authentication state
    setUser(decoded);
    setIsAuthenticated(true);

    // Redirect to dashboard using router navigation
    navigate("/dashboard", { replace: true });
  };

  // Load the script once on mount
  createEffect(() => {
    loadGoogleScript();
  });

  // Initialize Google button when script loads and ref is available
  createEffect(() => {
    if (isScriptLoaded() && googleSignInButtonRef) {
      window.google.accounts.id.initialize({
        client_id:
          "898309237832-ee14ose0qtgu8btq6g4egq5mhegqh3ii.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(googleSignInButtonRef, {
        theme: "outline",
        size: "large",
      });
    }
  });

  return (
    <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <article class="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
        <h1 class="text-2xl font-bold text-gray-800">Login to Your Application</h1>
        <p class="text-gray-600">Please sign in with your Google account to continue</p>
        <div ref={(el) => (googleSignInButtonRef = el)} class="flex justify-center"></div>
      </article>
    </section>

  );
}