import { generateId } from "../utils/helpers.js";
import { logger } from "../utils/logger.js";
import { storage } from "../utils/storage.js";

export class TaskService {
  constructor() {
    this.tasks = storage.get("tasks") || [];
  }

  create(title, description, user) {
    const task = {
      id: generateId(),
      title,
      description,
      status: "pending",
      createdBy: user?.email || "anonymous",
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    this.tasks.push(task);
    this.save();
    logger.info("Task created", { id: task.id });
    return task;
  }

  complete(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) throw new Error(`Task ${taskId} not found`);
    task.status = "completed";
    task.completedAt = new Date().toISOString();
    this.save();
    return task;
  }

  delete(taskId) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    this.save();
  }

  getAll() {
    return [...this.tasks];
  }

  getByStatus(status) {
    return this.tasks.filter((t) => t.status === status);
  }

  getById(taskId) {
    return this.tasks.find((t) => t.id === taskId) || null;
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.status === "completed").length;
    const pending = total - completed;
    return { total, completed, pending, completionRate: total ? completed / total : 0 };
  }

  save() {
    storage.set("tasks", this.tasks);
  }
}
