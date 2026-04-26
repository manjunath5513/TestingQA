export class Router {
  constructor() {
    this.routes = new Map();
    this.handleHashChange = this.resolve.bind(this);
  }

  on(path, handler) {
    this.routes.set(path, handler);
  }

  getCurrentPath() {
    const hash = window.location.hash.replace(/^#/, "");
    return hash || "/";
  }

  navigate(path) {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    if (this.getCurrentPath() === normalized) {
      this.resolve();
      return;
    }
    window.location.hash = normalized;
  }

  start() {
    window.addEventListener("hashchange", this.handleHashChange);
    this.resolve();
  }

  resolve() {
    const path = this.getCurrentPath();
    const handler = this.routes.get(path);
    if (handler) {
      handler();
    } else {
      this.handleNotFound(path);
    }
  }

  handleNotFound(path) {
    const container = document.getElementById("app");
    if (!container) return;
    container.innerHTML = `
      <section class="workspace-shell">
        <div class="notice warning">
          <div>
            <strong>Route not found</strong>
            <p>${path} is not a valid TestingQA control route.</p>
          </div>
          <button class="btn btn-secondary" data-route="/">Return home</button>
        </div>
      </section>
    `;
  }
}
