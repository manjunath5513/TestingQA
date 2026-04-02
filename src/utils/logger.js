import { formatTimestamp } from "./helpers.js";

class Logger {
  constructor(level = "info") {
    this.level = level;
    this.levels = { debug: 0, info: 1, warn: 2, error: 3 };
    this.logs = [];
  }

  log(level, message, meta = {}) {
    if (this.levels[level] < this.levels[this.level]) return;
    const entry = {
      timestamp: formatTimestamp(new Date()),
      level,
      message,
      ...meta,
    };
    this.logs.push(entry);
    console[level]?.(`[${entry.timestamp}] [${level.toUpperCase()}] ${message}`, meta);
  }

  debug(message, meta) { this.log("debug", message, meta); }
  info(message, meta) { this.log("info", message, meta); }
  warn(message, meta) { this.log("warn", message, meta); }
  error(message, meta) { this.log("error", message, meta); }

  getRecent(count = 20) {
    return this.logs.slice(-count);
  }

  clear() {
    this.logs = [];
  }
}

export const logger = new Logger();
