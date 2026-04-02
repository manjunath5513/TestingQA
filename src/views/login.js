import { sanitizeInput } from "../utils/validators.js";

export function renderLogin(errorMessage) {
  const container = document.getElementById("output");
  if (!container) return;

  container.innerHTML = `
    <div class="login-form">
      <h2>Sign In</h2>
      ${errorMessage ? `<p class="error">${sanitizeInput(errorMessage)}</p>` : ""}
      <form id="loginForm">
        <input type="email" id="email" placeholder="Email" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  `;
}
