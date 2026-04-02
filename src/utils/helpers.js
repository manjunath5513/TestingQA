export function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function formatTimestamp(date) {
  return date.toISOString().replace("T", " ").slice(0, 19);
}

export function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key] ?? "unknown";
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}
