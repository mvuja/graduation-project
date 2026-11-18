import { useEffect, useState } from "react";
import { filterTasks, getTaskStats } from "./taskModel.js";
import { saveTasks } from "./taskStorage.js";

export function usePlanner(initialTasks) {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask(task) {
    const newTask = { ...task, id: crypto.randomUUID(), done: false };
    setTasks((current) => [newTask, ...current]);
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return {
    stats: getTaskStats(tasks),
    visibleTasks: filterTasks(tasks, activeFilter, activeCategory),
    activeFilter,
    setActiveFilter,
    activeCategory,
    setActiveCategory,
    addTask,
    toggleTask,
    deleteTask,
  };
}
