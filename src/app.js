import { Router } from "./router.js";
import { AuthService } from "./services/auth.js";
import { TaskService } from "./services/tasks.js";
import { analytics } from "./services/analytics.js";
import { notifications } from "./services/notifications.js";
import { renderDashboard } from "./views/dashboard.js";
import { renderLogin } from "./views/login.js";
import { logger } from "./utils/logger.js";
import { validateTaskTitle } from "./utils/validators.js";

const router = new Router();
const auth = new AuthService();
const tasks = new TaskService();

const state = {
  selectedFilter: "all",
  selectedTaskId: null,
  notice: null,
  loginError: "",
};

const filters = [
  { value: "all", label: "All tasks" },
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "high", label: "High priority" },
];

function setNotice(title, message, tone = "success") {
  state.notice = {
    title,
    message,
    tone,
    timestamp: new Date().toLocaleTimeString(),
  };
}

function renderLanding() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="landing">
      <div class="landing-copy panel">
        <div class="eyebrow">
          <span>TestingQA</span>
          <span>Control Surface</span>
        </div>
        <h1>Simulate a real QA control room.</h1>
        <p>This console mimics a release management dashboard with task tracking, analytics, and dispatch actions. Use it to validate end‑to‑end testing flows.</p>
        <div class="cta-row">
          <button class="btn btn-primary" id="openConsoleBtn">Open operations console</button>
          <button class="btn btn-secondary">View documentation</button>
        </div>
        <div class="grid-two">
          <div class="feature-card">
            <h4>Task board</h4>
            <p>Create, filter, and track verification tasks.</p>
            <small class="meta">Supports status, priority, deadlines</small>
          </div>
          <div class="feature-card">
            <h4>Release reports</h4>
            <p>Generate outlooks and audit release gates.</p>
            <small class="meta">Regression outlook, dispatch lab</small>
          </div>
        </div>
      </div>
      <div class="landing-side panel">
        <h3>Test credentials</h3>
        <p>Use these to sign in and explore the workspace.</p>
        <div class="credentials">
          <div class="credential">
            <span>Email</span>
            <code>admin@test.com</code>
          </div>
          <div class="credential">
            <span>Password</span>
            <code>admin123</code>
          </div>
        </div>
        <div class="side-card">
          <h4>Quick start</h4>
          <p>Click “Open operations console” to begin. You’ll be taken to a sign‑in screen.</p>
          <small class="helper">The console uses a mock auth layer—no real credentials are stored.</small>
        </div>
      </div>
    </div>
  `;
  document.getElementById('openConsoleBtn').addEventListener('click', () => {
    router.navigate('/login');
  });
}

function getVisibleTasks() {
  const allTasks = tasks.getAll();
  if (state.selectedFilter === "all") return allTasks;
  if (["pending", "in_progress", "completed"].includes(state.selectedFilter)) {
    return allTasks.filter((task) => task.status === state.selectedFilter);
  }
  if (state.selectedFilter === "high") {
    return allTasks.filter((task) => task.priority === "high");
  }
  return allTasks;
}

function buildRecentActivity() {
  return analytics.getStats().total
    ? analytics.events.slice(-6).reverse().map((entry) => ({
        label: entry.event.replace(/_/g, " "),
        description: Object.keys(entry.metadata || {}).length
          ? Object.entries(entry.metadata).map(([key, value]) => `${key}: ${value}`).join(" • ")
          : "No extra metadata recorded.",
        time: new Date(entry.timestamp).toLocaleString(),
      }))
    : [];
}

function buildReportCards(stats) {
  const eventStats = analytics.getStats();
  return [
    {
      title: "Telemetry events",
      value: eventStats.total,
      caption: "Recorded during login, task creation, dispatch actions, and completion.",
    },
    {
      title: "Completion rate",
      value: `${stats.total ? Math.round((stats.completed / stats.total) * 100) : 0}%`,
      caption: "Useful for demoing changing UI metrics after tasks are completed.",
    },
    {
      title: "Active blockers",
      value: stats.pending + stats.inProgress,
      caption: "Pending plus in-progress tasks that still need follow-up.",
    },
    {
      title: "High-priority focus",
      value: stats.highPriority,
      caption: "A quick indicator that the dashboard is triaging urgent flows.",
    },
  ];
}

function buildDispatchItems() {
  return [
    {
      action: "smoke_sync",
      title: "Run smoke sync",
      description: "Simulate a quick browser verification sync for checkout and dashboard entry points.",
      cta: "Run smoke sync",
    },
    {
      action: "notify_triage",
      title: "Notify triage room",
      description: "Broadcast a release-room update so the team knows a blocker or replay is ready for review.",
      cta: "Ping triage room",
    },
  ];
}

function renderWorkspace(currentRoute) {
  if (!auth.isAuthenticated()) {
    router.navigate("/login");
    return;
  }

  const visibleTasks = getVisibleTasks();
  const selectedTask = state.selectedTaskId
    ? tasks.getById(state.selectedTaskId)
    : visibleTasks[0] || tasks.getAll()[0] || null;

  renderDashboard({
    currentRoute,
    currentUser: auth.currentUser(),
    notice: state.notice,
    filters,
    selectedFilter: state.selectedFilter,
    stats: tasks.getStats(),
    tasks: visibleTasks,
    selectedTask,
    recentActivity: buildRecentActivity(),
    reportCards: buildReportCards(tasks.getStats()),
    dispatchItems: buildDispatchItems(),
  });
}

function handleLoginForm(form) {
  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  auth.login(email, password).then((result) => {
    if (!result.success) {
      state.loginError = result.error;
      logger.warn("Login failed", { email, reason: result.error });
      renderLanding();
      return;
    }

    state.loginError = "";
    state.selectedTaskId = tasks.getAll()[0]?.id || null;
    analytics.track("login_success", { email, role: result.user.role });
    notifications.emit("auth:login", result.user);
    setNotice("Signed in", `Welcome back, ${result.user.name}. Release monitoring is ready.`, "success");
    router.navigate("/tasks");
  });
}

function handleCreateTask(form) {
  const formData = new FormData(form);
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const priority = String(formData.get("priority") || "medium");
  const area = String(formData.get("area") || "triage");

  if (!validateTaskTitle(title) || !description) {
    setNotice("Task not created", "Add a clear title and description before submitting the task.", "warning");
    renderWorkspace("/tasks");
    return;
  }

  const task = tasks.create(title, description, auth.currentUser(), { priority, area });
  state.selectedTaskId = task.id;
  analytics.track("task_created", { title, priority, area });
  notifications.emit("task:created", task);
  setNotice("Task created", `${task.title} is now tracked in the release command center.`, "success");
  form.reset();
  renderWorkspace("/tasks");
}

function completeTask(taskId) {
  const task = tasks.complete(taskId);
  state.selectedTaskId = task.id;
  analytics.track("task_completed", { id: task.id, title: task.title });
  notifications.emit("task:completed", task);
  setNotice("Task completed", `${task.title} moved into the completed column.`, "success");
  renderWorkspace(router.getCurrentPath());
}

function reopenTask(taskId) {
  const task = tasks.reopen(taskId);
  state.selectedTaskId = task.id;
  analytics.track("task_reopened", { id: task.id, title: task.title });
  setNotice("Task reopened", `${task.title} is back in progress for another verification pass.`, "warning");
  renderWorkspace(router.getCurrentPath());
}

function runDispatchAction(action) {
  if (action === "smoke_sync") {
    analytics.track("dispatch_smoke_sync", { route: router.getCurrentPath() });
    setNotice("Smoke sync queued", "Checkout and dashboard checks were queued for the next verification window.", "success");
  }

  if (action === "notify_triage") {
    analytics.track("dispatch_triage_ping", { route: router.getCurrentPath() });
    setNotice("Triage room updated", "A release-room alert was drafted with the latest blocker context.", "warning");
  }

  renderWorkspace("/dispatch");
}

function applyDemoCredentials(preset) {
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  if (!emailField || !passwordField) return;

  if (preset === "admin") {
    emailField.value = "admin@test.com";
    passwordField.value = "admin123";
  }
}

document.addEventListener("click", (event) => {
  const target = event.target instanceof HTMLElement ? event.target : null;
  if (!target) return;

  const route = target.dataset.route;
  if (route) {
    if (route === "/logout") {
      auth.logout();
      analytics.track("logout", {});
      state.notice = null;
      state.selectedTaskId = null;
      router.navigate("/");
      return;
    }

    router.navigate(route);
    return;
  }

  const preset = target.dataset.demoLogin;
  if (preset) {
    if (router.getCurrentPath() !== "/login" && router.getCurrentPath() !== "/") {
      router.navigate("/login");
      setTimeout(() => applyDemoCredentials(preset), 0);
      return;
    }
    applyDemoCredentials(preset);
    return;
  }

  const selectedTaskId = target.dataset.selectTask;
  if (selectedTaskId) {
    state.selectedTaskId = selectedTaskId;
    renderWorkspace(router.getCurrentPath());
    return;
  }

  const completeTaskId = target.dataset.completeTask;
  if (completeTaskId) {
    completeTask(completeTaskId);
    return;
  }

  const reopenTaskId = target.dataset.reopenTask;
  if (reopenTaskId) {
    reopenTask(reopenTaskId);
    return;
  }

  const filter = target.dataset.filter;
  if (filter) {
    state.selectedFilter = filter;
    renderWorkspace("/tasks");
    return;
  }

  const dispatchAction = target.dataset.dispatchAction;
  if (dispatchAction) {
    runDispatchAction(dispatchAction);
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target instanceof HTMLFormElement ? event.target : null;
  if (!form) return;

  if (form.id === "loginForm") {
    event.preventDefault();
    handleLoginForm(form);
    return;
  }

  if (form.id === "createTaskForm") {
    event.preventDefault();
    handleCreateTask(form);
  }
});

notifications.onTaskCreated((task) => logger.info("Notification task created", { id: task.id }));
notifications.onTaskCompleted((task) => logger.info("Notification task completed", { id: task.id }));
notifications.onLoginSuccess((user) => logger.info("Notification login success", { email: user.email }));

analytics.track("app_loaded", { surface: "testingqa" });

router.on("/", renderLanding);
router.on("/login", renderLanding);
router.on("/tasks", () => renderWorkspace("/tasks"));
router.on("/reports", () => renderWorkspace("/reports"));
router.on("/dispatch", () => renderWorkspace("/dispatch"));

router.start();

if (auth.isAuthenticated() && ["/", "/login"].includes(router.getCurrentPath())) {
  setNotice("Session restored", "You are back inside the release workspace.", "success");
  router.navigate("/tasks");
}

export { router, auth, tasks };
