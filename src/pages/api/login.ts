// /api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from '@/services/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDb();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Barcha maydonlar to'ldirilishi shart: email, password"
      });
    }
    

    try {
      // Foydalanuvchini tekshirish
      const checkUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);

      if (checkUser.rows.length === 0) {
        return res.status(404).json({
          error: "Foydalanuvchi topilmadi"
        });
      }

      const user = checkUser.rows[0];

      // Parolni tekshirish
      if (user.password !== password) {
        return res.status(401).json({
          error: "Noto'g'ri parol"
        });
      }

      // Kirish muvaffaqiyatli
      res.status(200).json({
        message: "Kirish muvaffaqiyatli",
        user,
      });
    } catch (error) {
      console.error('DB Error:', error);
      res.status(500).json({ error: "Kirishda xatolik yuz berdi" });
    } finally {
      await client.end();
    }
  } else {
    res.status(405).json({ error: 'Metod yaroqsiz' });
  }
};

export default handler;

