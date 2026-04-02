class Storage {
  constructor(prefix = "testingqa") {
    this.prefix = prefix;
    this.data = new Map();
  }

  key(name) {
    return `${this.prefix}:${name}`;
  }

  get(name) {
    try {
      if (typeof localStorage !== "undefined") {
        const raw = localStorage.getItem(this.key(name));
        return raw ? JSON.parse(raw) : null;
      }
      return this.data.get(name) || null;
    } catch {
      return null;
    }
  }

  set(name, value) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(this.key(name), JSON.stringify(value));
      }
      this.data.set(name, value);
    } catch {
      this.data.set(name, value);
    }
  }

  remove(name) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(this.key(name));
      }
      this.data.delete(name);
    } catch {
      this.data.delete(name);
    }
  }

  clear() {
    this.data.clear();
  }
}

export const storage = new Storage();
