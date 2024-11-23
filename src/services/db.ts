// services/db.ts
import { Client } from 'pg';

export const connectDb = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }, // SSL sozlamalari
  });

  await client.connect();
  return client;
};
