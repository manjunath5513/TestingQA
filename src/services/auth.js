import { validateEmail } from "../utils/validators.js";
import { logger } from "../utils/logger.js";
import { storage } from "../utils/storage.js";

const USERS = [
  { email: "admin@test.com", password: "admin123", name: "Admin", role: "admin" },
  { email: "user@test.com", password: "user123", name: "Test User", role: "user" },
];

export class AuthService {
  constructor() {
    this.session = storage.get("session") || null;
  }

  async login(email, password) {
    if (!validateEmail(email)) {
      return { success: false, error: "Invalid email format" };
    }

    const user = USERS.find((u) => u.email === email && u.password === password);
    if (!user) {
      logger.warn("Authentication failed", { email });
      return { success: false, error: "Invalid credentials" };
    }

    this.session = { email: user.email, name: user.name, role: user.role, loginAt: Date.now() };
    storage.set("session", this.session);
    return { success: true, user: this.session };
  }

  logout() {
    this.session = null;
    storage.remove("session");
  }

  isAuthenticated() {
    return this.session !== null;
  }

  currentUser() {
    return this.session;
  }

  hasRole(role) {
    return this.session?.role === role;
  }
}
