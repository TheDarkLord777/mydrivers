import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

// `import.meta.url` yordamida joriy faylning to'liq yo'lini olish
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fayl yo'lini aniqlash
const dbPath = path.join(__dirname, '../database/my_database.db'); // Bitta daraja yuqoriga chiqish
const dirPath = path.dirname(dbPath);

// Katalogni tekshirish va yaratish
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Ma'lumotlar bazasiga ulanish
export function openDB() {
  return new Database(dbPath, {
    verbose: console.log,
  });
}

// Create the users table
function createUsersTable() {
  const db = openDB();
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      password TEXT NOT NULL,
      phone TEXT,
      userRole TEXT NOT NULL
    )
  `);

  console.log('Users table created successfully at:', dbPath);
}

createUsersTable();