import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { loadTasks } from "./features/planner/taskStorage.js";
import "./styles.css";

const initialTasks = loadTasks();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App initialTasks={initialTasks} />
  </StrictMode>,
);

