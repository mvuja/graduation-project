const STORAGE_KEY = "student-planner-vanilla";
const categoryLabels = {
  none: "Bez kategorije",
  exam: "Ispit",
  assignment: "Zadaća",
  project: "Projekat",
};

const defaultTasks = [
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

let tasks = loadTasks(STORAGE_KEY, defaultTasks);
let activeFilter = "all";
let activeCategory = "all";

const taskForm = document.querySelector("#taskForm");
const taskList = document.querySelector("#taskList");
const filterButtons = document.querySelectorAll(".filter-button");
const categoryFilter = document.querySelector("#categoryFilter");
const totalTasks = document.querySelector("#totalTasks");
const openTasks = document.querySelector("#openTasks");
const doneTasks = document.querySelector("#doneTasks");

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(taskForm);
  const newTask = {
    id: crypto.randomUUID(),
    title: formData.get("title").trim(),
    subject: formData.get("subject").trim(),
    deadline: formData.get("deadline"),
    priority: formData.get("priority"),
    category: getCategory(formData.get("category")),
    done: false,
  };

  tasks = [newTask, ...tasks];
  taskForm.reset();
  saveAndRender();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    renderTasks();
  });
});

categoryFilter.addEventListener("change", () => {
  activeCategory = categoryFilter.value;
  renderTasks();
});

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

function saveAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  renderStats();
  renderTasks();
}

function renderStats() {
  totalTasks.textContent = tasks.length;
  openTasks.textContent = tasks.filter((task) => !task.done).length;
  doneTasks.textContent = tasks.filter((task) => task.done).length;
}

function renderTasks() {
  const visibleTasks = getVisibleTasks();
  taskList.innerHTML = "";

  if (visibleTasks.length === 0) {
    taskList.innerHTML = '<div class="empty-state">Nema obaveza za izabrani filter.</div>';
    return;
  }

  visibleTasks.forEach((task) => {
    const card = document.createElement("article");
    card.className = `task-card ${task.priority} ${task.done ? "done" : ""}`;

    card.innerHTML = `
      <div>
        <h2 class="task-title">${escapeHtml(task.title)}</h2>
        <div class="task-meta">
          <span class="badge">${escapeHtml(task.subject)}</span>
          <span class="badge">${categoryLabels[getCategory(task.category)]}</span>
          <span class="badge">${formatPriority(task.priority)}</span>
          <span class="badge">Rok: ${formatDate(task.deadline)}</span>
          <span class="badge">${task.done ? "Zavrseno" : "Aktivno"}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="task-action complete-button" data-action="toggle" data-id="${task.id}" type="button">
          ${task.done ? "Vrati" : "Zavrsi"}
        </button>
        <button class="task-action delete-button" data-action="delete" data-id="${task.id}" type="button">
          Obrisi
        </button>
      </div>
    `;

    taskList.appendChild(card);
  });
}

taskList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const taskId = button.dataset.id;

  if (action === "toggle") {
    tasks = tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task));
  }

  if (action === "delete") {
    tasks = tasks.filter((task) => task.id !== taskId);
  }

  saveAndRender();
});

function getVisibleTasks() {
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

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}

renderStats();
renderTasks();

