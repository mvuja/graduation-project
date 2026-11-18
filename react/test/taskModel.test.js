import assert from "node:assert/strict";
import test from "node:test";
import { filterTasks, getTaskStats } from "../src/features/planner/taskModel.js";

const tasks = [
  { id: "1", category: "exam", priority: "high", done: false },
  { id: "2", category: "exam", priority: "medium", done: true },
  { id: "3", category: "project", priority: "high", done: false },
  { id: "4", priority: "low", done: false },
];

test("combines a category with status or high priority", () => {
  assert.deepEqual(filterTasks(tasks, "open", "exam"), [tasks[0]]);
  assert.deepEqual(filterTasks(tasks, "done", "exam"), [tasks[1]]);
  assert.deepEqual(filterTasks(tasks, "high", "exam"), [tasks[0]]);
  assert.deepEqual(filterTasks(tasks, "high", "all"), [tasks[0], tasks[2]]);
  assert.deepEqual(filterTasks(tasks, "done", "project"), []);
});

test("treats legacy tasks with no category as uncategorized", () => {
  assert.deepEqual(filterTasks(tasks, "all", "none"), [tasks[3]]);
});

test("derives statistics from the whole list, independently of filters", () => {
  assert.deepEqual(getTaskStats(tasks), { total: 4, open: 3, done: 1 });
  assert.deepEqual(getTaskStats([]), { total: 0, open: 0, done: 0 });
});
