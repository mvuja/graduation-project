import assert from "node:assert/strict";
import test from "node:test";
import { categoryLabels } from "../src/features/planner/taskModel.js";
import { loadTasks, saveTasks } from "../src/features/planner/taskStorage.js";

const key = "student-planner-react";
const demoKey = key + "-demo-initialized";

function memoryStorage(entries = {}) {
  const data = new Map(Object.entries(entries));
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => { data.set(key, value); },
  };
}

test("loads eight demo tasks on the first visit without writing storage", () => {
  const storage = memoryStorage();
  const tasks = loadTasks(storage);
  assert.equal(tasks.length, 8);
  assert.equal(new Set(tasks.map(({ id }) => id)).size, 8);
  assert.equal(tasks.filter(({ done }) => done).length, 2);
  assert.equal(storage.getItem(key), null);
  assert.equal(storage.getItem(demoKey), null);
});

test("preserves older tasks and avoids duplicating the renamed CSS example", () => {
  const legacyTask = {
    id: "legacy",
    title: "Srediti biljeske za poglavlje o CSS frameworkima",
    subject: "Frontend osnove",
    deadline: "2026-11-16",
    priority: "low",
    done: true,
  };
  const storage = memoryStorage({ [key]: JSON.stringify([legacyTask]) });
  const tasks = loadTasks(storage);
  assert.equal(tasks.length, 8);
  assert.equal(tasks.some(({ title }) => title === "Srediti biljeske o CSS-u"), false);
  const { category, ...preserved } = tasks[0];
  assert.ok(Object.hasOwn(categoryLabels, category));
  assert.deepEqual(preserved, legacyTask);

  saveTasks(tasks, storage);
  assert.equal(storage.getItem(demoKey), "true");
  assert.deepEqual(loadTasks(storage), tasks);
});

test("retains deletions, including an empty list after initialization", () => {
  const storage = memoryStorage();
  const remaining = loadTasks(storage).slice(1);
  saveTasks(remaining, storage);
  assert.deepEqual(loadTasks(storage), remaining);

  saveTasks([], storage);
  assert.deepEqual(loadTasks(storage), []);
});
