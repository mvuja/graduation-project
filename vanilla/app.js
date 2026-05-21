const STORAGE_KEY = "student-planner-vanilla";

const defaultTasks = [
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

let tasks = loadTasks();
let activeFilter = "all";

const taskForm = document.querySelector("#taskForm");
const taskList = document.querySelector("#taskList");
const filterButtons = document.querySelectorAll(".filter-button");
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

function loadTasks() {
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : defaultTasks;
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

