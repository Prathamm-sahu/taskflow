import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { KanbanProvider } from "./context/KanbanContext.tsx";

createRoot(document.getElementById("root")!).render(

    <KanbanProvider>
      <App />
    </KanbanProvider>

);
