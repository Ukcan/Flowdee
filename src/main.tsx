import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "@fontsource-variable/geist";
import "./styles/index.css";

// Thème appliqué avant le rendu React. `index.html` porte déjà `class="dark"`
// (thème par défaut) ; on ne corrige ici que le cas d'une préférence claire
// enregistrée. Ce code vit dans le bundle et non dans un script inline, que la
// CSP du site bloquerait (`script-src 'self'`, sans 'unsafe-inline').
try {
  if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.remove("dark");
  }
} catch {
  /* stockage indisponible : on garde le thème par défaut */
}

createRoot(document.getElementById("root")!).render(<App />);
