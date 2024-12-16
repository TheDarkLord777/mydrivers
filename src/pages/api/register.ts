import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '@/lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metod yaroqsiz' });
  }

  const { name, email, password, phone, userRole } = req.body;

  if (!name || !email || !password || !phone || !userRole) {
    return res.status(400).json({ error: "Barcha maydonlar to'ldirilishi shart" });
  }

  const db = openDB();

  try {
    // Email mavjudligini tekshirish
    const checkUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (checkUser) {
      return res.status(409).json({ error: "Ushbu email bilan foydalanuvchi allaqachon mavjud" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yangi foydalanuvchi yaratish
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password, phone, userRole)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(name, email, hashedPassword, phone, userRole);

    res.status(201).json({
      message: "Foydalanuvchi muvaffaqiyatli qo'shildi",
      user: result
    });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ error: "Foydalanuvchi qo'shishda xatolik" });
  } finally {
    db.close();
  }
}