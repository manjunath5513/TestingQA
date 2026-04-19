import { sanitizeInput } from "../utils/validators.js";

export function renderLogin(errorMessage = "") {
  const container = document.getElementById("app");
  if (!container) return;

  container.innerHTML = `
    <section class="landing">
      <div class="landing-copy panel">
        <span class="eyebrow">TestingQA demo target</span>
        <h1>Simulate a real QA control room.</h1>
        <p>
          This version of TestingQA is intentionally richer: SentinelQA can sign in, navigate between routes,
          create work items, inspect analytics, and return to the task board for follow-up actions.
        </p>
        <div class="grid-two">
          <div class="feature-card">
            <h3>Multi-step browser flow</h3>
            <small>Login, task creation, route changes, completion, and activity review all happen in one session.</small>
          </div>
          <div class="feature-card">
            <h3>Replay-friendly visuals</h3>
            <small>Distinct panels, badges, alerts, and state changes make screenshots and videos much more informative.</small>
          </div>
        </div>
      </div>
      <aside class="landing-side panel">
        <div class="side-card">
          <h3>Open operations console</h3>
          <p class="helper">Use the seeded admin account for the full demo path.</p>
          <div class="credentials">
            <div class="credential"><span>Email</span><strong>admin@test.com</strong></div>
            <div class="credential"><span>Password</span><strong>admin123</strong></div>
          </div>
          <div class="cta-row">
            <button class="btn btn-primary" data-route="/login">Open operations console</button>
            <button class="btn btn-secondary" data-demo-login="admin">Use demo credentials</button>
          </div>
        </div>
        <div class="side-card">
          <h3>Sign In</h3>
          ${errorMessage ? `<p class="helper" style="color:#fecaca;">${sanitizeInput(errorMessage)}</p>` : `<p class="helper">The form below is what SentinelQA should complete during the run.</p>`}
          <form id="loginForm">
            <label for="email">Email
              <input type="email" id="email" name="email" placeholder="admin@test.com" required>
            </label>
            <label for="password">Password
              <input type="password" id="password" name="password" placeholder="admin123" required>
            </label>
            <div class="action-row">
              <button type="submit" class="btn btn-primary">Sign In</button>
              <button type="button" class="btn btn-ghost" data-demo-login="admin">Fill demo credentials</button>
            </div>
          </form>
        </div>
      </aside>
    </section>
  `;
}
