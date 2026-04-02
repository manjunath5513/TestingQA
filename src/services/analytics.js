import { logger } from "../utils/logger.js";
import { storage } from "../utils/storage.js";

export class AnalyticsService {
  constructor() {
    this.events = storage.get("analytics") || [];
  }

  track(event, metadata = {}) {
    const entry = {
      event,
      metadata,
      timestamp: new Date().toISOString(),
    };
    this.events.push(entry);
    this.save();
    logger.info("Analytics event tracked", { event });
  }

  getEvents(eventName) {
    return this.events.filter((e) => e.event === eventName);
  }

  getStats() {
    const byEvent = {};
    for (const e of this.events) {
      byEvent[e.event] = (byEvent[e.event] || 0) + 1;
    }
    return { total: this.events.length, byEvent };
  }

  save() {
    storage.set("analytics", this.events);
  }

  clear() {
    this.events = [];
    storage.remove("analytics");
  }
}

export const analytics = new AnalyticsService();
