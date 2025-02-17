import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { KanbanProvider } from "./context/KanbanContext.tsx";
import { Toaster } from "sonner";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KanbanProvider>
      <Toaster />
      <App />
    </KanbanProvider>
  </StrictMode>
);
