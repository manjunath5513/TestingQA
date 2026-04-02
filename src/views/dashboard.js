import { sanitizeInput } from "../utils/validators.js";

export function renderDashboard(tasks) {
  const container = document.getElementById("output");
  if (!container) return;

  const stats = getTaskStats(tasks);

  container.innerHTML = `
    <div class="dashboard">
      <h2>Dashboard</h2>
      <div class="stats">
        <span>Total: ${stats.total}</span>
        <span>Completed: ${stats.completed}</span>
        <span>Pending: ${stats.pending}</span>
      </div>
      <ul class="task-list">
        ${tasks.map((t) => renderTaskItem(t)).join("")}
      </ul>
    </div>
  `;
}

function renderTaskItem(task) {
  const statusIcon = task.status === "completed" ? "done" : "pending";
  return `
    <li class="task-item ${task.status}">
      <span class="status-icon">${statusIcon}</span>
      <span class="title">${sanitizeInput(task.title)}</span>
      <span class="meta">${task.createdBy} — ${task.createdAt}</span>
    </li>
  `;
}

function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  return { total, completed, pending: total - completed };
}
