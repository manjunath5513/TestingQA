import { logger } from "../utils/logger.js";

export class NotificationService {
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event).push(callback);
  }

  emit(event, data) {
    const callbacks = this.subscribers.get(event) || [];
    logger.info("Event emitted", { event, subscriberCount: callbacks.length });
    callbacks.forEach((cb) => cb(data));
  }

  onTaskCreated(callback) {
    this.subscribe("task:created", callback);
  }

  onTaskCompleted(callback) {
    this.subscribe("task:completed", callback);
  }

  onLoginSuccess(callback) {
    this.subscribe("auth:login", callback);
  }
}

export const notifications = new NotificationService();
