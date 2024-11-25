import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from '../../services/db';  // DB ulanishi

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDb();

  if (req.method === 'GET') {
    // Foydalanuvchilarni olish
    try {
      const result = await client.query('SELECT * FROM users');  // users jadvalidan ma'lumot olish
      res.status(200).json(result.rows);  // Natijalarni JSON formatida qaytarish
    } catch (error) {
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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Foydalanuvchilar bilan ishlash
 */

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Foydalanuvchilar ro‘yxatini olish
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro‘yxati muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Server xatosi
 *   post:
 *     summary: Yangi foydalanuvchi qo‘shish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: JohnDoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli qo‘shildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Noto‘g‘ri so‘rov
 *       409:
 *         description: Email mavjud
 *       500:
 *         description: Server xatosi
 */
