import { createDemoTasks } from "./demoTasks.js";
import { categoryLabels } from "./taskModel.js";

const STORAGE_KEY = "student-planner-react";
const DEMO_KEY = `${STORAGE_KEY}-demo-initialized`;
const LEGACY_CSS_TITLE = "Srediti biljeske za poglavlje o CSS frameworkima";
const CSS_TITLE = "Srediti biljeske o CSS-u";

export function loadTasks(storage = localStorage) {
  const storedTasks = storage.getItem(STORAGE_KEY);
  const savedTasks = storedTasks ? JSON.parse(storedTasks) : createDemoTasks();
  if (!storedTasks || storage.getItem(DEMO_KEY)) return savedTasks;

  // Older demo data gets categories and any missing examples on the first load.
  const categories = Object.keys(categoryLabels);
  const categorizedTasks = savedTasks.map((task) => (
    Object.hasOwn(categoryLabels, task.category)
      ? task
      : { ...task, category: categories[Math.floor(Math.random() * categories.length)] }
  ));
  const savedTitles = new Set(categorizedTasks.map(({ title }) => (
    title === LEGACY_CSS_TITLE ? CSS_TITLE : title
  )));
  const examples = createDemoTasks().filter((task) => !savedTitles.has(task.title));
  return [...categorizedTasks, ...examples];
}

export function saveTasks(tasks, storage = localStorage) {
  storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  storage.setItem(DEMO_KEY, "true");
}
