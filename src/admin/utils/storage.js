export function getData(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

export function setData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      alert("Penyimpanan penuh! Hapus beberapa gambar atau reset data.");
    }
    return false;
  }
}

export function removeData(key) {
  localStorage.removeItem(key);
}

export function clearAllData(prefix) {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) keys.push(k);
  }
  keys.forEach((k) => localStorage.removeItem(k));
}
