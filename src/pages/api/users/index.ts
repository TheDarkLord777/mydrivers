import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from '@/services/db';

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

  if (req.method === 'POST') {
    const { name, email, password, phone, userRole } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Barcha maydonlar to'ldirilishi shart: name, email, password"
      });
    }

    try {
      // Check if user already exists by email
      const checkUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);

      if (checkUser.rows.length > 0) {
        return res.status(409).json({
          error: "Ushbu email bilan foydalanuvchi allaqachon mavjud"
        });
      }

      const userRoleToUse = userRole || 'user';  // Default to 'user' if no role is provided

      // Insert new user
      const result = await client.query(
        `INSERT INTO users (username, email, password, phone_number, role, created_at)
         VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *;`,
        [name, email, password, phone, userRoleToUse]
      );

      res.status(201).json({
        message: "Foydalanuvchi muvaffaqiyatli qo'shildi",
        user: result.rows[0]
      });
    } catch (error) {
      console.error('DB Error:', error);
      res.status(500).json({ error: "Foydalanuvchi qo'shishda xatolik" });
    } finally {
      await client.end();
    }

  } else if (req.method === 'GET') {
    try {
      // Retrieve all users
      const result = await client.query('SELECT * FROM users');
      const users = result.rows;

      res.status(200).json(users);
    } catch (error) {
      console.error('DB Error:', error);
      res.status(500).json({ error: "Foydalanuvchilarni olishda xatolik" });
    } finally {
      await client.end();
    }

  } else {
    res.status(405).json({ error: 'Metod yaroqsiz' });
  }
};

export default handler;
