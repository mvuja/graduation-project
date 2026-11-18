import IntroPanel from "./features/planner/components/IntroPanel.jsx";
import TaskForm from "./features/planner/components/TaskForm.jsx";
import FilterBar from "./features/planner/components/FilterBar.jsx";
import TaskList from "./features/planner/components/TaskList.jsx";
import { usePlanner } from "./features/planner/usePlanner.js";

export default function App({ initialTasks }) {
  const {
    stats,
    visibleTasks,
    activeFilter,
    setActiveFilter,
    activeCategory,
    setActiveCategory,
    addTask,
    toggleTask,
    deleteTask,
  } = usePlanner(initialTasks);

  return (
    <main className="app-shell">
      <IntroPanel stats={stats} />

      <section className="workspace">
        <TaskForm onAddTask={addTask} />
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <TaskList tasks={visibleTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
      </section>
    </main>
  );
}

