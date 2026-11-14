import { useMemo, useState } from "react";

const STORAGE_KEY = "student-planner-react";
const categoryLabels = {
  none: "Bez kategorije",
  exam: "Ispit",
  assignment: "Zadaća",
  project: "Projekat",
};

const initialForm = { title: "", subject: "", deadline: "", priority: "high", category: "none" };

const initialTasks = [
  {
    id: crypto.randomUUID(),
    title: "Pripremiti prezentaciju za diplomski",
    subject: "Frontend razvoj",
    deadline: "2026-11-25",
    priority: "high",
    category: "project",
    done: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Procitati literaturu o React komponentama",
    subject: "Web development",
    deadline: "2026-11-18",
    priority: "medium",
    category: "exam",
    done: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Srediti biljeske o CSS-u",
    subject: "Frontend osnove",
    deadline: "2026-11-16",
    priority: "low",
    category: "none",
    done: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Pripremiti kolokvij iz baza podataka",
    subject: "Baze podataka",
    deadline: "2026-11-20",
    priority: "high",
    category: "exam",
    done: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Predati zadacu iz algoritama",
    subject: "Algoritmi i strukture podataka",
    deadline: "2026-11-19",
    priority: "medium",
    category: "assignment",
    done: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Zavrsiti prototip studentskog portala",
    subject: "Softversko inzenjerstvo",
    deadline: "2026-11-27",
    priority: "high",
    category: "project",
    done: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Poslati prijavu za praksu",
    subject: "Strucna praksa",
    deadline: "2026-11-21",
    priority: "low",
    category: "none",
    done: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Predati izvjestaj s laboratorijske vjezbe",
    subject: "Racunarske mreze",
    deadline: "2026-11-15",
    priority: "medium",
    category: "assignment",
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
  const [activeCategory, setActiveCategory] = useState("all");

  const stats = useMemo(
    () => ({
      total: tasks.length,
      open: tasks.filter((task) => !task.done).length,
      done: tasks.filter((task) => task.done).length,
    }),
    [tasks],
  );

  const visibleTasks = useMemo(
    () => filterTasks(tasks, activeFilter, activeCategory),
    [tasks, activeFilter, activeCategory],
  );

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

function IntroPanel({ stats }) {
  return (
    <section className="intro-panel">
      <p className="eyebrow">React</p>
      <h1>Studentski planer obaveza</h1>
      <p className="intro-copy">
        Organizuj studentske obaveze, prati rokove i odredi prioritete na jednom mjestu.
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
  const [form, setForm] = useState(initialForm);

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
      category: getCategory(form.category),
    });

    setForm(initialForm);
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

        <div className="form-row">
          <label htmlFor="category">Kategorija</label>
          <select id="category" name="category" value={form.category} onChange={updateField}>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="primary-button" type="submit">
        Dodaj obavezu
      </button>
    </form>
  );
}

function FilterBar({ activeFilter, onFilterChange, activeCategory, onCategoryChange }) {
  return (
    <>
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
      <div className="form-row category-filter">
        <label htmlFor="categoryFilter">Filtriraj po kategoriji</label>
        <select id="categoryFilter" value={activeCategory} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="all">Sve kategorije</option>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
    </>
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
          <span className="badge">{categoryLabels[getCategory(task.category)]}</span>
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
  const [value, setValue] = useState(() => loadTasks(key, fallbackValue));

  function updateValue(nextValue) {
    setValue(nextValue);
    localStorage.setItem(key, JSON.stringify(nextValue));
  }

  return [value, updateValue];
}

function loadTasks(key, initialTasks) {
  const storedTasks = localStorage.getItem(key);
  const savedTasks = storedTasks ? JSON.parse(storedTasks) : initialTasks;
  const demoKey = `${key}-demo-initialized`;
  if (localStorage.getItem(demoKey)) return savedTasks;

  const categories = Object.keys(categoryLabels);
  const categorizedTasks = savedTasks.map((task) => (
    Object.hasOwn(categoryLabels, task.category)
      ? task
      : { ...task, category: categories[Math.floor(Math.random() * categories.length)] }
  ));
  const savedTitles = new Set(categorizedTasks.map((task) => (
    task.title === "Srediti biljeske za poglavlje o CSS frameworkima"
      ? "Srediti biljeske o CSS-u"
      : task.title
  )));
  const examples = initialTasks.filter((task) => !savedTitles.has(task.title));
  const result = [...categorizedTasks, ...examples];

  localStorage.setItem(key, JSON.stringify(result));
  localStorage.setItem(demoKey, "true");
  return result;
}

function filterTasks(tasks, activeFilter, activeCategory) {
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

function getCategory(value) {
  return Object.hasOwn(categoryLabels, value) ? value : "none";
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

