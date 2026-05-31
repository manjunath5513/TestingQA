import { generateId } from "../utils/helpers.js";
import { logger } from "../utils/logger.js";
import { storage } from "../utils/storage.js";

const DEFAULT_TASKS = [
  {
    id: "seed_release_gate",
    title: "Audit checkout release gate",
    description: "Review the checkout smoke pack, confirm payment widget telemetry, and prepare the rollback note before the afternoon deploy.",
    status: "in_progress",
    priority: "high",
    area: "checkout",
    createdBy: "admin@test.com",
    assignee: "qa-bot",
    createdAt: "2026-04-16T08:30:00.000Z",
    completedAt: null
  },
  {
    id: "seed_mobile_banner",
    title: "Verify mobile promo banner journey",
    description: "Reproduce the hero banner flow on mobile viewport and compare the CTA handoff across the pricing and checkout routes.",
    status: "pending",
    priority: "medium",
    area: "marketing",
    createdBy: "user@test.com",
    assignee: "frontend-qa",
    createdAt: "2026-04-16T09:10:00.000Z",
    completedAt: null
  },
  {
    id: "seed_notif",
    title: "Confirm notification digest copy",
    description: "Review the notification digest summary for stale labels, unread counts, and fallback wording before sending the next batch.",
    status: "completed",
    priority: "low",
    area: "notifications",
    createdBy: "admin@test.com",
    assignee: "content-ops",
    createdAt: "2026-04-15T17:00:00.000Z",
    completedAt: "2026-04-15T18:45:00.000Z"
  }
];

export class TaskService {
  constructor() {
    this.tasks = storage.get("tasks") || [];
    if (!this.tasks.length) {
      this.tasks = DEFAULT_TASKS.map((task) => ({ ...task }));
      this.save();
    }
  }

  create(title, description, user, options = {}) {
    const task = {
      id: generateId(),
      title,
      description,
      status: options.status || "pending",
      priority: options.priority || "medium",
      area: options.area || "triage",
      createdBy: user?.email || "anonymous",
      assignee: options.assignee || "qa-bot",
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    this.tasks.unshift(task);
    this.save();
    logger.info("Task created", { id: task.id, title, priority: task.priority, area: task.area });
    return task;
  }

  complete(taskId) {
    const task = this.getById(taskId);
    if (!task) throw new Error(`Task ${taskId} not found`);
    task.status = "completed";
    task.completedAt = new Date().toISOString();
    this.save();
    return task;
  }

  reopen(taskId) {
    const task = this.getById(taskId);
    if (!task) throw new Error(`Task ${taskId} not found`);
    task.status = "in_progress";
    task.completedAt = null;
    this.save();
    return task;
  }

  getAll() {
    return [...this.tasks];
  }

  getById(taskId) {
    return this.tasks.find((task) => task.id === taskId) || null;
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((task) => task.status === "completed").length;
    const inProgress = this.tasks.filter((task) => task.status === "in_progress").length;
    const pending = this.tasks.filter((task) => task.status === "pending").length;
    const highPriority = this.tasks.filter((task) => task.priority === "high").length;
    return { total, completed, inProgress, pending, highPriority };
  }

  save() {
    storage.set("tasks", this.tasks);
  }
}
