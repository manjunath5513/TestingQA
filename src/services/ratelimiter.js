import { logger } from "../utils/logger.js";

export class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  isAllowed(clientId) {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    if (!this.requests.has(clientId)) {
      this.requests.set(clientId, []);
    }

    const timestamps = this.requests.get(clientId).filter((t) => t > windowStart);
    this.requests.set(clientId, timestamps);

    if (timestamps.length >= this.maxRequests) {
      logger.warn("Rate limit exceeded", { clientId, count: timestamps.length });
      return false;
    }

    timestamps.push(now);
    return true;
  }

  reset(clientId) {
    this.requests.delete(clientId);
  }

  getRemaining(clientId) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const timestamps = (this.requests.get(clientId) || []).filter((t) => t > windowStart);
    return Math.max(0, this.maxRequests - timestamps.length);
  }
}

export const rateLimiter = new RateLimiter();
