import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from '../../services/db';  // DB ulanishi

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDb();

  if (req.method === 'GET') {
    // Foydalanuvchilarni olish
    try {
      const result = await client.query('SELECT * FROM users');  // users jadvalidan ma'lumot olish
      res.status(200).json(result.rows);  // Natijalarni JSON formatida qaytarish
    } catch (err) {
      res.status(500).json({ error: 'Foydalanuvchilarni olishda xatolik' });  // Xato bo'lsa xabar yuborish
    } finally {
      await client.end();  // DB ulanishini yopish
    }
  } else if (req.method === 'POST') {
    // Yangi foydalanuvchi qo'shish
    const { username, email, password } = req.body;

    // Tasdiqlash
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Barcha maydonlar to\'ldirilishi shart: username, email, password' });
    }

    try {
      // Foydalanuvchi emaili bo'yicha mavjudligini tekshirish
      const checkUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      if (checkUser.rows.length > 0) {
        return res.status(409).json({ error: 'Ushbu email bilan foydalanuvchi allaqachon mavjud' });
      }

      // Foydalanuvchini qo'shish
      const result = await client.query(`
        INSERT INTO users (username, email, password, created_at)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *;
      `, [username, email, password]);

      res.status(201).json({
        message: 'Foydalanuvchi muvaffaqiyatli qo\'shildi',
        user: result.rows[0]
      });
    } catch (err) {
      console.error('DB Xatolik:', err);
      res.status(500).json({ error: 'Foydalanuvchi qo\'shishda xatolik' });
    } finally {
      await client.end();  // DB ulanishini yopish
    }
  } else {
    res.status(405).json({ error: 'Metod yaroqsiz' });  // Yaroqsiz metodda xatolik
  }
};

export default handler;
