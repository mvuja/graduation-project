import TaskCard from "./TaskCard.jsx";

export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <section className="empty-state">Nema obaveza za izabrani filter.</section>;
  }

  return (
    <section className="task-list" aria-live="polite">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} />
      ))}
    </section>
  );
}
