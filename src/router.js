export class Router {
  constructor() {
    this.routes = new Map();
    this.currentPath = "/";
  }

  on(path, handler) {
    this.routes.set(path, handler);
  }

  navigate(path, ...args) {
    this.currentPath = path;
    const handler = this.routes.get(path);
    if (handler) {
      handler(...args);
    } else {
      this.handleNotFound(path);
    }
  }

  handleNotFound(path) {
    console.error(`Route not found: ${path}`);
    document.getElementById("output").textContent = `404 — ${path} not found`;
  }

  getCurrentPath() {
    return this.currentPath;
  }
}
