import { categoryLabels, getCategory } from "../taskModel.js";

const priorityLabels = {
  high: "Visok prioritet",
  medium: "Srednji prioritet",
  low: "Nizak prioritet",
};

const dateFormatter = new Intl.DateTimeFormat("bs-BA", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default function TaskCard({ task, onToggleTask, onDeleteTask }) {
  return (
    <article className={`task-card ${task.priority} ${task.done ? "done" : ""}`}>
      <div>
        <h2 className="task-title">{task.title}</h2>
        <div className="task-meta">
          <span className="badge">{task.subject}</span>
          <span className="badge">{categoryLabels[getCategory(task.category)]}</span>
          <span className="badge">{priorityLabels[task.priority]}</span>
          <span className="badge">Rok: {dateFormatter.format(new Date(task.deadline))}</span>
          <span className="badge">{task.done ? "Zavrseno" : "Aktivno"}</span>
        </div>
      </div>

      <div className="task-actions">
        <button className="task-action complete-button" onClick={() => onToggleTask(task.id)} type="button">
          {task.done ? "Vrati" : "Zavrsi"}
        </button>
        <button className="task-action delete-button" onClick={() => onDeleteTask(task.id)} type="button">
          Obrisi
        </button>
      </div>
    </article>
  );
}
