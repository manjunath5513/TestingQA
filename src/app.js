import { Router } from "./router.js";
import { AuthService } from "./services/auth.js";
import { TaskService } from "./services/tasks.js";
import { renderDashboard } from "./views/dashboard.js";
import { renderLogin } from "./views/login.js";
import { logger } from "./utils/logger.js";

const router = new Router();
const auth = new AuthService();
const tasks = new TaskService();

router.on("/", () => {
  if (auth.isAuthenticated()) {
    renderDashboard(tasks.getAll());
  } else {
    renderLogin();
  }
});

router.on("/login", async (email, password) => {
  logger.info("Login attempt", { email });
  const result = await auth.login(email, password);
  if (result.success) {
    logger.info("Login successful", { email });
    router.navigate("/");
  } else {
    logger.warn("Login failed", { email, reason: result.error });
    renderLogin(result.error);
  }
});

router.on("/logout", () => {
  auth.logout();
  logger.info("User logged out");
  router.navigate("/login");
});

router.on("/tasks", () => {
  if (!auth.isAuthenticated()) return router.navigate("/login");
  renderDashboard(tasks.getAll());
});

router.on("/tasks/create", (title, description) => {
  if (!auth.isAuthenticated()) return router.navigate("/login");
  const task = tasks.create(title, description, auth.currentUser());
  logger.info("Task created", { id: task.id, title });
  renderDashboard(tasks.getAll());
});

router.on("/tasks/complete", (taskId) => {
  if (!auth.isAuthenticated()) return router.navigate("/login");
  tasks.complete(taskId);
  logger.info("Task completed", { id: taskId });
  renderDashboard(tasks.getAll());
});

export { router, auth, tasks };
