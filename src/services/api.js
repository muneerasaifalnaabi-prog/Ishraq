const API_BASE_URL = 'http://localhost:5000/api';

/** Wraps fetch with basic error handling so failures don't silently crash. */
const safeFetch = (url, options) =>
  fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return res.json();
    })
    .catch(err => {
      console.error('[API Error]', url, err.message);
      return null; // caller must handle null gracefully
    });

export const taskService = {
  getTasks: () => safeFetch(`${API_BASE_URL}/tasks`),
  addTask: (task) => safeFetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  }),
  updateTask: (id, updates) => safeFetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  }),
  deleteTask: (id) => safeFetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE'
  })
};

export const habitService = {
  getHabits: () => safeFetch(`${API_BASE_URL}/habits`),
  addHabit: (habit) => safeFetch(`${API_BASE_URL}/habits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(habit)
  }),
  deleteHabit: (id) => safeFetch(`${API_BASE_URL}/habits/${id}`, {
    method: 'DELETE'
  })
};

export const journalService = {
  getEntries: () => safeFetch(`${API_BASE_URL}/journal`),
  addEntry: (entry) => safeFetch(`${API_BASE_URL}/journal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  })
};

export const moodService = {
  getMoods: () => safeFetch(`${API_BASE_URL}/mood`),
  addMood: (mood) => safeFetch(`${API_BASE_URL}/mood`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mood)
  })
};

export const settingsService = {
  getSettings: () => safeFetch(`${API_BASE_URL}/settings`),
  updateSettings: (settings) => safeFetch(`${API_BASE_URL}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  })
};
