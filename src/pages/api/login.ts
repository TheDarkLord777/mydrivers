import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '@/lib/db';
import bcrypt from 'bcrypt';

type User = {
  email: string;
  password: string;
  // Add any other fields relevant to the User type
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = openDB();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Barcha maydonlar to'ldirilishi shart: email, password"
      });
    }
    
    try {
      // Foydalanuvchini tekshirish
      const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
      const user = stmt.get(email) as User | undefined;

      if (!user) {
        return res.status(404).json({
          error: "Foydalanuvchi topilmadi"
        });
      }

      // Parolni tekshirish
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
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
      db.close();
    }
  } else {
    res.status(405).json({ error: 'Metod yaroqsiz' });
  }
};

export default handler;