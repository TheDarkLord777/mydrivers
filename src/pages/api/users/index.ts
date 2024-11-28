import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from '../../../services/db';

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Foydalanuvchilar ro'yxatini olish
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro'yxati muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   post:
 *     summary: Yangi foydalanuvchi qo'shish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli qo'shildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Foydalanuvchi ID raqami
 *         username:
 *           type: string
 *           description: Foydalanuvchi nomi
 *         email:
 *           type: string
 *           format: email
 *           description: Foydalanuvchi emaili
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           example: JohnDoe
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: StrongPassword123
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *   responses:
 *     BadRequest:
 *       description: Noto'g'ri so'rov
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Barcha maydonlar to'ldirilishi shart"
 *     Conflict:
 *       description: Email mavjud
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Ushbu email bilan foydalanuvchi allaqachon mavjud"
 *     ServerError:
 *       description: Server xatosi
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Server xatosi yuz berdi"
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDb();

  if (req.method === 'GET') {
    // ... (your existing GET logic)
  } else if (req.method === 'POST') {
    const { username, email, password } = req.body;

    if (!username || !email) {
      return res.status(400).json({ 
        error: "Barcha maydonlar to'ldirilishi shart: username, email" 
      });
    }

    try {
      // First check if user exists
      const checkUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      
      if (checkUser.rows.length > 0) {
        // If user exists, return the existing user data
        return res.status(200).json({
          message: 'Foydalanuvchi mavjud',
          user: checkUser.rows[0]
        });
      }

      // If user doesn't exist, create new user
      const result = await client.query(`
        INSERT INTO users (username, email, password, created_at)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *;
      `, [username, email, password || '']);

      res.status(201).json({
        message: "Foydalanuvchi muvaffaqiyatli qo'shildi",
        user: result.rows[0]
      });
    } catch (error) {
      console.error('DB Xatolik:', error);
      res.status(500).json({ error: "Foydalanuvchi qo'shishda xatolik" });
    } finally {
      await client.end();
    }
  } else {
    res.status(405).json({ error: 'Metod yaroqsiz' });
  }
};

export default handler;