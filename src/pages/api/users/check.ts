// pages/api/users/check.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from '../../../services/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Metod yaroqsiz' });
  }

  const { email } = req.query;
  const client = await connectDb();

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.status(200).json({ 
      exists: result.rows.length > 0,
      user: result.rows[0] || null
    });
  } catch (error) {
    console.error('DB Xatolik:', error);
    return res.status(500).json({ error: 'Foydalanuvchini tekshirishda xatolik' });
  } finally {
    await client.end();
  }
}