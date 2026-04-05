import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- TASKS API ---
app.get('/api/tasks', (req, res) => {
  const rows = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC').all();
  res.json(rows);
});

app.post('/api/tasks', (req, res) => {
  const { text, enText, priority } = req.body;
  const info = db.prepare('INSERT INTO tasks (text, enText, priority) VALUES (?, ?, ?)').run(text, enText, priority);
  res.json({ id: info.lastInsertRowid, text, enText, done: 0, priority });
});

app.put('/api/tasks/:id', (req, res) => {
  const { done } = req.body;
  db.prepare('UPDATE tasks SET done = ? WHERE id = ?').run(done ? 1 : 0, req.params.id);
  res.json({ success: true });
});

app.delete('/api/tasks/:id', (req, res) => {
  db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// --- HABITS API ---
app.get('/api/habits', (req, res) => {
  const rows = db.prepare('SELECT * FROM habits ORDER BY created_at DESC').all();
  res.json(rows);
});

app.post('/api/habits', (req, res) => {
  const { name, enName, streak, maxStreak, progress, color } = req.body;
  const insert = db.prepare('INSERT INTO habits (name, enName, streak, maxStreak, progress, color) VALUES (?, ?, ?, ?, ?, ?)');
  const info = insert.run(name, enName, streak || 0, maxStreak || 30, progress || 0, color);
  res.json({ id: info.lastInsertRowid, name, enName, streak: streak || 0, maxStreak: maxStreak || 30, progress: progress || 0, color });
});

app.delete('/api/habits/:id', (req, res) => {
  db.prepare('DELETE FROM habits WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// --- JOURNAL API ---
app.get('/api/journal', (req, res) => {
  const rows = db.prepare('SELECT * FROM journal_entries ORDER BY created_at DESC').all();
  res.json(rows);
});

app.post('/api/journal', (req, res) => {
  const { title, text, mood, date } = req.body;
  const info = db.prepare('INSERT INTO journal_entries (title, text, mood, date) VALUES (?, ?, ?, ?)').run(title, text, mood, date);
  res.json({ id: info.lastInsertRowid, title, text, mood, date });
});

// --- MOOD API ---
app.get('/api/mood', (req, res) => {
  const rows = db.prepare('SELECT * FROM mood_logs ORDER BY date DESC LIMIT 7').all();
  res.json(rows);
});

app.post('/api/mood', (req, res) => {
  const { mood_index, date } = req.body;
  db.prepare('INSERT INTO mood_logs (mood_index, date) VALUES (?, ?)').run(mood_index, date);
  res.json({ success: true });
});

// --- SETTINGS API ---
app.get('/api/settings', (req, res) => {
  const settings = db.prepare('SELECT * FROM settings WHERE id = 1').get();
  res.json(settings);
});

app.put('/api/settings', (req, res) => {
  const { user_name, avatar_index, theme, language, notifications_enabled } = req.body;
  db.prepare(`
    UPDATE settings 
    SET user_name = ?, 
        avatar_index = ?, 
        theme = ?, 
        language = ?, 
        notifications_enabled = ?
    WHERE id = 1
  `).run(user_name, avatar_index, theme, language, notifications_enabled ? 1 : 0);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
