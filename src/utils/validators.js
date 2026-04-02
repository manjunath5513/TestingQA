const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  return typeof email === "string" && EMAIL_REGEX.test(email.trim());
}

export function validatePassword(password) {
  return typeof password === "string" && password.length >= 6;
}

export function validateTaskTitle(title) {
  return typeof title === "string" && title.trim().length >= 1 && title.trim().length <= 200;
}

export function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return input.replace(/[<>]/g, "").trim();
}
