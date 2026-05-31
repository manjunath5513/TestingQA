function formatTime(value) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function renderTask(task, selectedTaskId) {
  return `
    <article class="task-row ${task.id === selectedTaskId ? "active" : ""}">
      <div class="task-topline">
        <strong>${task.title}</strong>
        <span class="badge ${task.status}">${task.status.replace("_", " ")}</span>
        <span class="badge ${task.priority}">${task.priority} priority</span>
      </div>
      <p class="helper">${task.description}</p>
      <div class="task-meta">
        <span class="meta">Area: ${task.area}</span>
        <span class="meta">Owner: ${task.assignee}</span>
        <span class="meta">Created by ${task.createdBy}</span>
      </div>
      <div class="action-row">
        <button class="btn btn-secondary" data-select-task="${task.id}">Inspect task</button>
        ${task.status === "completed"
          ? `<button class="btn btn-ghost" data-reopen-task="${task.id}">Re-open task</button>`
          : `<button class="btn btn-primary" data-complete-task="${task.id}">Mark complete</button>`}
      </div>
    </article>
  `;
}

function renderTimelineItem(item) {
  return `
    <div class="timeline-item">
      <strong>${item.label}</strong>
      <p class="helper">${item.description}</p>
      <small>${item.time}</small>
    </div>
  `;
}

export function renderDashboard(model) {
  const container = document.getElementById("app");
  if (!container) return;

  const {
    currentRoute,
    currentUser,
    notice,
    filters,
    selectedFilter,
    stats,
    tasks,
    selectedTask,
    recentActivity,
    reportCards,
    dispatchItems,
  } = model;

  const routeHeading = currentRoute === "/reports"
    ? { title: "Release reports", subtitle: "Compare activity, surfaced regressions, and automated checks before the next deploy window." }
    : currentRoute === "/dispatch"
      ? { title: "Dispatch lab", subtitle: "Queue a smoke sync, notify the triage room, and validate the release checklist state." }
      : { title: "Release Command Center", subtitle: "Manage verification tasks, triage blockers, and keep the QA handoff moving." };

  container.innerHTML = `
    <section class="workspace-shell">
      <header class="workspace-header">
        <div class="workspace-title">
          <span class="eyebrow">TestingQA operations console</span>
          <h2>${routeHeading.title}</h2>
          <p>${routeHeading.subtitle}</p>
        </div>
        <div class="user-chip">Signed in as ${currentUser?.name || "Unknown"}</div>
      </header>

      ${notice ? `
        <div class="notice ${notice.tone}">
          <div>
            <strong>${notice.title}</strong>
            <p>${notice.message}</p>
          </div>
          <small>${notice.timestamp}</small>
        </div>
      ` : ""}

      <nav class="nav-row">
        <button class="nav-pill ${currentRoute === "/tasks" ? "active" : ""}" data-route="/tasks">Task board</button>
        <button class="nav-pill ${currentRoute === "/reports" ? "active" : ""}" data-route="/reports">Release reports</button>
        <button class="nav-pill ${currentRoute === "/dispatch" ? "active" : ""}" data-route="/dispatch">Dispatch lab</button>
        <button class="nav-pill" data-route="/logout">Logout</button>
      </nav>

      <section class="card-row">
        <div class="stat-card">
          <small>Total active checks</small>
          <strong>${stats.total}</strong>
        </div>
        <div class="stat-card">
          <small>In progress</small>
          <strong>${stats.inProgress}</strong>
        </div>
        <div class="stat-card">
          <small>Completed</small>
          <strong>${stats.completed}</strong>
        </div>
        <div class="stat-card">
          <small>High priority</small>
          <strong>${stats.highPriority}</strong>
        </div>
      </section>

      <div class="workspace-grid">
        <div class="surface">
          ${currentRoute === "/reports" ? `
            <h3>Regression outlook</h3>
            <div class="split">
              ${reportCards.map((card) => `
                <div class="feature-card">
                  <h4>${card.title}</h4>
                  <strong>${card.value}</strong>
                  <small>${card.caption}</small>
                </div>
              `).join("")}
            </div>
            <div class="surface" style="margin-top:16px;">
              <h4>Recent verification activity</h4>
              <div class="timeline">
                ${recentActivity.length ? recentActivity.map(renderTimelineItem).join("") : `<div class="empty-state">No activity yet. Create or complete a task to populate this feed.</div>`}
              </div>
            </div>
            <div class="action-row" style="margin-top:16px;">
              <button class="btn btn-primary" data-route="/tasks">Return to task board</button>
              <button class="btn btn-secondary" data-route="/dispatch">Open dispatch lab</button>
            </div>
          ` : currentRoute === "/dispatch" ? `
            <h3>Release dispatch actions</h3>
            <p class="helper">These actions simulate cross-team coordination work so browser runs have route changes and meaningful UI updates.</p>
            <div class="split">
              ${dispatchItems.map((item) => `
                <div class="feature-card">
                  <h4>${item.title}</h4>
                  <p class="helper">${item.description}</p>
                  <button class="btn btn-primary" data-dispatch-action="${item.action}">${item.cta}</button>
                </div>
              `).join("")}
            </div>
            <div class="surface" style="margin-top:16px;">
              <h4>Escalation checklist</h4>
              <div class="timeline">
                <div class="timeline-item"><strong>Browser smoke sync</strong><p class="helper">Queue a quick pass against the checkout and dashboard surfaces.</p></div>
                <div class="timeline-item"><strong>Triage room update</strong><p class="helper">Notify Slack when a new blocker is surfaced during release verification.</p></div>
                <div class="timeline-item"><strong>Replay review</strong><p class="helper">Return to the task board and confirm a task moved to completed.</p></div>
              </div>
            </div>
            <div class="action-row" style="margin-top:16px;">
              <button class="btn btn-secondary" data-route="/reports">View release reports</button>
              <button class="btn btn-primary" data-route="/tasks">Back to task board</button>
            </div>
          ` : `
            <div class="split">
              <div class="surface">
                <h3>Create task</h3>
                <form id="createTaskForm">
                  <label for="taskTitle">Task title
                    <input id="taskTitle" name="title" type="text" placeholder="Investigate flaky checkout confirmation" required>
                  </label>
                  <label for="taskDescription">Task description
                    <textarea id="taskDescription" name="description" placeholder="Describe the bug, expected result, and affected route." required></textarea>
                  </label>
                  <label for="taskPriority">Priority
                    <select id="taskPriority" name="priority">
                      <option value="high">High</option>
                      <option value="medium" selected>Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </label>
                  <label for="taskArea">Surface area
                    <select id="taskArea" name="area">
                      <option value="checkout">Checkout</option>
                      <option value="marketing">Marketing</option>
                      <option value="notifications">Notifications</option>
                      <option value="triage">Triage</option>
                    </select>
                  </label>
                  <button type="submit" class="btn btn-primary">Create task</button>
                </form>
              </div>
              <div class="surface">
                <h3>Filter task board</h3>
                <p class="helper">Use these filters during browser runs to create clearer state changes for replay.</p>
                <div class="filter-row">
                  ${filters.map((filter) => `
                    <button class="filter-pill ${selectedFilter === filter.value ? "active" : ""}" data-filter="${filter.value}">${filter.label}</button>
                  `).join("")}
                </div>
                <div class="action-row" style="margin-top:16px;">
                  <button class="btn btn-secondary" data-route="/reports">Open release reports</button>
                  <button class="btn btn-ghost" data-route="/dispatch">Open dispatch lab</button>
                </div>
              </div>
            </div>
            <div class="surface" style="margin-top:16px;">
              <h3>Task board</h3>
              <div class="task-stack">
                ${tasks.length ? tasks.map((task) => renderTask(task, selectedTask?.id)).join("") : `<div class="empty-state">No tasks match this filter right now.</div>`}
              </div>
            </div>
          `}
        </div>

        <aside class="surface">
          <h3>${selectedTask ? "Task detail" : "Control notes"}</h3>
          ${selectedTask ? `
            <div class="detail-grid">
              <span class="badge ${selectedTask.status}">${selectedTask.status.replace("_", " ")}</span>
              <span class="badge ${selectedTask.priority}">${selectedTask.priority} priority</span>
            </div>
            <p style="margin-top:12px;">${selectedTask.description}</p>
            <div class="timeline" style="margin-top:16px;">
              <div class="timeline-item"><strong>Assignee</strong><small>${selectedTask.assignee}</small></div>
              <div class="timeline-item"><strong>Surface area</strong><small>${selectedTask.area}</small></div>
              <div class="timeline-item"><strong>Created</strong><small>${formatTime(selectedTask.createdAt)}</small></div>
              ${selectedTask.completedAt ? `<div class="timeline-item"><strong>Completed</strong><small>${formatTime(selectedTask.completedAt)}</small></div>` : ""}
            </div>
          ` : `
            <div class="timeline">
              <div class="timeline-item"><strong>Suggested browser path</strong><small>Open operations console, sign in, create a task, visit reports, open dispatch lab, and return to complete a task.</small></div>
              <div class="timeline-item"><strong>Demo credentials</strong><small>admin@test.com / admin123</small></div>
              <div class="timeline-item"><strong>Replay value</strong><small>This layout is intentionally route-heavy so Execution Replay produces longer, more useful videos.</small></div>
            </div>
          `}
          <div class="surface" style="margin-top:16px;">
            <h4>Recent activity</h4>
            <div class="timeline">
              ${recentActivity.length ? recentActivity.slice(0, 4).map(renderTimelineItem).join("") : `<div class="empty-state">Activity updates will appear here after login, task creation, and dispatch actions.</div>`}
            </div>
          </div>
        </aside>
      </div>
    </section>
  `;
}
