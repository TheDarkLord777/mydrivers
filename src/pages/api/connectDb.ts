// /pages/api/connectDb.ts
import fs from 'fs';
import path from 'path';
import  Database  from 'better-sqlite3';

const dbPath = path.join(process.cwd(), 'database/my_database.db');

const connectDb = () => {
  const dirPath = path.dirname(dbPath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  return new Database(dbPath, {
    verbose: console.log,
  });
};

export default connectDb;