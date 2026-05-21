import { useMemo, useState } from "react";

const STORAGE_KEY = "student-planner-react";

const initialTasks = [
  {
    id: crypto.randomUUID(),
    title: "Pripremiti prezentaciju za diplomski",
    subject: "Frontend frameworki",
    deadline: "2026-06-05",
    priority: "high",
    done: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Procitati literaturu o React komponentama",
    subject: "Web development",
    deadline: "2026-05-28",
    priority: "medium",
    done: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Srediti biljeske za poglavlje o CSS frameworkima",
    subject: "Frontend osnove",
    deadline: "2026-05-24",
    priority: "low",
    done: true,
  },
];

const filters = [
  { value: "all", label: "Sve" },
  { value: "open", label: "Aktivne" },
  { value: "done", label: "Zavrsene" },
  { value: "high", label: "Visok prioritet" },
];

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, initialTasks);
  const [activeFilter, setActiveFilter] = useState("all");

  const stats = useMemo(
    () => ({
      total: tasks.length,
      open: tasks.filter((task) => !task.done).length,
      done: tasks.filter((task) => task.done).length,
    }),
    [tasks],
  );

  const visibleTasks = useMemo(() => filterTasks(tasks, activeFilter), [tasks, activeFilter]);

  function addTask(task) {
    setTasks([{ id: crypto.randomUUID(), done: false, ...task }, ...tasks]);
  }

  function toggleTask(taskId) {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)));
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <main className="app-shell">
      <IntroPanel stats={stats} />

      <section className="workspace">
        <TaskForm onAddTask={addTask} />
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <TaskList tasks={visibleTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
      </section>
    </main>
  );
}

function IntroPanel({ stats }) {
  return (
    <section className="intro-panel">
      <p className="eyebrow">React komponentni pristup</p>
      <h1>Studentski planer obaveza</h1>
      <p className="intro-copy">
        Ista aplikacija je podijeljena na manje komponente koje upravljaju svojim dijelom
        interfejsa, dok React osvjezava prikaz nakon svake promjene stanja.
      </p>

      <div className="stats-grid" aria-label="Statistika obaveza">
        <StatCard value={stats.total} label="Ukupno" />
        <StatCard value={stats.open} label="Aktivno" />
        <StatCard value={stats.done} label="Zavrseno" />
      </div>
    </section>
  );
}

function StatCard({ value, label }) {
  return (
    <article className="stat-card">
      <span>{value}</span>
      <small>{label}</small>
    </article>
  );
}

function TaskForm({ onAddTask }) {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    deadline: "",
    priority: "high",
  });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddTask({
      title: form.title.trim(),
      subject: form.subject.trim(),
      deadline: form.deadline,
      priority: form.priority,
    });

    setForm({ title: "", subject: "", deadline: "", priority: "high" });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="title">Naziv obaveze</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Npr. Zavrsiti seminarski rad"
          value={form.title}
          onChange={updateField}
          required
        />
      </div>

      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="subject">Predmet</label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Npr. Web programiranje"
            value={form.subject}
            onChange={updateField}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="deadline">Rok</label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={updateField}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="priority">Prioritet</label>
          <select id="priority" name="priority" value={form.priority} onChange={updateField}>
            <option value="high">Visok</option>
            <option value="medium">Srednji</option>
            <option value="low">Nizak</option>
          </select>
        </div>
      </div>

      <button className="primary-button" type="submit">
        Dodaj obavezu
      </button>
    </form>
  );
}

function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="toolbar" aria-label="Filteri">
      {filters.map((filter) => (
        <button
          className={`filter-button ${activeFilter === filter.value ? "active" : ""}`}
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          type="button"
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
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

function TaskCard({ task, onToggleTask, onDeleteTask }) {
  return (
    <article className={`task-card ${task.priority} ${task.done ? "done" : ""}`}>
      <div>
        <h2 className="task-title">{task.title}</h2>
        <div className="task-meta">
          <span className="badge">{task.subject}</span>
          <span className="badge">{formatPriority(task.priority)}</span>
          <span className="badge">Rok: {formatDate(task.deadline)}</span>
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

function useLocalStorage(key, fallbackValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  });

  function updateValue(nextValue) {
    setValue(nextValue);
    localStorage.setItem(key, JSON.stringify(nextValue));
  }

  return [value, updateValue];
}

function filterTasks(tasks, activeFilter) {
  if (activeFilter === "open") {
    return tasks.filter((task) => !task.done);
  }

  if (activeFilter === "done") {
    return tasks.filter((task) => task.done);
  }

  if (activeFilter === "high") {
    return tasks.filter((task) => task.priority === "high");
  }

  return tasks;
}

function formatPriority(priority) {
  const labels = {
    high: "Visok prioritet",
    medium: "Srednji prioritet",
    low: "Nizak prioritet",
  };

  return labels[priority];
}

function formatDate(value) {
  return new Intl.DateTimeFormat("bs-BA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

