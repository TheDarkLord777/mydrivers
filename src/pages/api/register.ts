// /api/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from '@/services/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDb();

  if (req.method === 'POST') {
    const { name, email, password, phone, userRole } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        error: "Barcha maydonlar to'ldirilishi shart: email, password, name"
      });
    }

    try {
      // Email mavjudligini tekshirish
      const checkUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);

      if (checkUser.rows.length > 0) {
        return res.status(409).json({
          error: "Ushbu email bilan foydalanuvchi allaqachon mavjud"
        });
      }
      const userRoleToUse = userRole || 'user'; 
      // Yangi foydalanuvchi yaratish
      const result = await client.query(
        `INSERT INTO users (username, email, password, phone_number, role, created_at)
         VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *;`,
        [name, email, password, phone, userRoleToUse]
      );

      res.status(201).json({
        message: "Foydalanuvchi muvaffaqiyatli yaratildi",
        user: result.rows[0],
      });
    } catch (error) {
      console.error('DB Error:', error);
      res.status(500).json({ error: "Serverda xato yuz berdi" });
    } finally {
      await client.end();
    }
  } else {
    res.status(405).json({ error: 'Metod yaroqsiz' });
  }
};

export default handler;
