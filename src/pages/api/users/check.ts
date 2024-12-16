import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '@/lib/db'; // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Metod yaroqsiz' });
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email kiritilishi shart' });
  }

  const db = openDB();

  try {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email);

    return res.status(200).json({ 
      exists: !!user,
      user: user || null
    });
  } catch (error) {
    console.error('DB Xatolik:', error);
    return res.status(500).json({ error: 'Foydalanuvchini tekshirishda xatolik' });
  } finally {
    db.close();
  }
}