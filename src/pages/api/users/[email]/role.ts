// pages/api/users/[email]/role.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from '../../../../services/db';

/**
 * @swagger
 * /api/users/{email}/role:
 *   get:
 *     summary: Foydalanuvchi rolini olish
 *     tags: [Users]
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi roli muvaffaqiyatli qaytarildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 *   put:
 *     summary: Foydalanuvchi rolini yangilash
 *     tags: [Users]
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, taxi]
 *     responses:
 *       200:
 *         description: Rol muvaffaqiyatli yangilandi
 *       400:
 *         description: Noto'g'ri so'rov
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;
  const client = await connectDb();

  try {
    // GET - Foydalanuvchi rolini olish
    if (req.method === 'GET') {
      const result = await client.query(
        'SELECT role FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ 
          error: 'Foydalanuvchi topilmadi' 
        });
      }

      return res.status(200).json({ 
        role: result.rows[0].role || 'user'
      });
    }

    // PUT - Foydalanuvchi rolini yangilash
    if (req.method === 'PUT') {
      const { role } = req.body;

      // Role validatsiyasi
      if (!role || !['user', 'taxi'].includes(role)) {
        return res.status(400).json({ 
          error: 'Yaroqsiz rol. Faqat "user" yoki "taxi" bo\'lishi mumkin'
        });
      }

      // Avval foydalanuvchi mavjudligini tekshirish
      const checkUser = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (checkUser.rows.length === 0) {
        return res.status(404).json({ 
          error: 'Foydalanuvchi topilmadi' 
        });
      }

      // Rolni yangilash
      const result = await client.query(
        `UPDATE users 
         SET role = $1, 
             updated_at = CURRENT_TIMESTAMP 
         WHERE email = $2 
         RETURNING *`,
        [role, email]
      );

      return res.status(200).json({
        message: 'Foydalanuvchi roli muvaffaqiyatli yangilandi',
        user: result.rows[0]
      });
    }

    // Boshqa metodlarga ruxsat yo'q
    return res.status(405).json({ 
      error: 'Metod yaroqsiz' 
    });

  } catch (error) {
    console.error('DB Xatolik:', error);
    return res.status(500).json({ 
      error: 'Server xatosi yuz berdi' 
    });
  } finally {
    await client.end();
  }
}