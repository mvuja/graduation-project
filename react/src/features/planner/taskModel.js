export const categoryLabels = {
  none: "Bez kategorije",
  exam: "Ispit",
  assignment: "Zadaća",
  project: "Projekat",
};

export function filterTasks(tasks, activeFilter, activeCategory) {
  return tasks.filter((task) => {
    if (activeCategory !== "all" && getCategory(task.category) !== activeCategory) {
      return false;
    }

    if (activeFilter === "open") return !task.done;
    if (activeFilter === "done") return task.done;
    if (activeFilter === "high") return task.priority === "high";
    return true;
  });
}

export function getCategory(value) {
  return Object.hasOwn(categoryLabels, value) ? value : "none";
}

export function getTaskStats(tasks) {
  const done = tasks.filter((task) => task.done).length;
  return { total: tasks.length, open: tasks.length - done, done };
}
