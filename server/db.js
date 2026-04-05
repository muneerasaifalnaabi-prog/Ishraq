import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'data.db');
const db = new Database(dbPath);

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    enText TEXT,
    done BOOLEAN DEFAULT 0,
    priority TEXT DEFAULT 'عادي',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    enName TEXT,
    streak INTEGER DEFAULT 0,
    maxStreak INTEGER DEFAULT 30,
    progress INTEGER DEFAULT 0,
    color TEXT DEFAULT 'from-primary to-accent',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS journal_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    text TEXT NOT NULL,
    mood TEXT,
    date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS mood_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood_index INTEGER NOT NULL,
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT DEFAULT 'إشراق',
    avatar_index INTEGER DEFAULT 0,
    notifications_enabled BOOLEAN DEFAULT 1,
    theme TEXT DEFAULT 'vibrant',
    language TEXT DEFAULT 'ar'
  );

  INSERT OR IGNORE INTO settings (id, user_name, avatar_index) VALUES (1, 'إشراق', 0);
`);

export default db;
