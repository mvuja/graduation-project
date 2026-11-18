const demoTasks = [
  {
    title: "Pripremiti prezentaciju za diplomski",
    subject: "Frontend razvoj",
    deadline: "2026-11-25",
    priority: "high",
    category: "project",
    done: false,
  },
  {
    title: "Procitati literaturu o React komponentama",
    subject: "Web development",
    deadline: "2026-11-18",
    priority: "medium",
    category: "exam",
    done: false,
  },
  {
    title: "Srediti biljeske o CSS-u",
    subject: "Frontend osnove",
    deadline: "2026-11-16",
    priority: "low",
    category: "none",
    done: true,
  },
  {
    title: "Pripremiti kolokvij iz baza podataka",
    subject: "Baze podataka",
    deadline: "2026-11-20",
    priority: "high",
    category: "exam",
    done: false,
  },
  {
    title: "Predati zadacu iz algoritama",
    subject: "Algoritmi i strukture podataka",
    deadline: "2026-11-19",
    priority: "medium",
    category: "assignment",
    done: false,
  },
  {
    title: "Zavrsiti prototip studentskog portala",
    subject: "Softversko inzenjerstvo",
    deadline: "2026-11-27",
    priority: "high",
    category: "project",
    done: false,
  },
  {
    title: "Poslati prijavu za praksu",
    subject: "Strucna praksa",
    deadline: "2026-11-21",
    priority: "low",
    category: "none",
    done: false,
  },
  {
    title: "Predati izvjestaj s laboratorijske vjezbe",
    subject: "Racunarske mreze",
    deadline: "2026-11-15",
    priority: "medium",
    category: "assignment",
    done: true,
  },
];

export function createDemoTasks() {
  return demoTasks.map((task) => ({ id: crypto.randomUUID(), ...task }));
}
