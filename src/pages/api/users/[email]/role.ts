import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '@/lib/db';

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;
  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Email parameter is required and must be a string' });
  }

  const db = openDB();

  try {
    // GET - Foydalanuvchi rolini olish
    if (req.method === 'GET') {
      const stmt = db.prepare('SELECT role FROM users WHERE email = ?');
      const result = stmt.get(email) as { role: string } | undefined;

      if (!result) {
        return res.status(404).json({ 
          error: 'Foydalanuvchi topilmadi' 
        });
      }

      return res.status(200).json({ 
        role: result.role || 'user'
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
      const checkUserStmt = db.prepare('SELECT * FROM users WHERE email = ?');
      const checkUser = checkUserStmt.get(email);

      if (!checkUser) {
        return res.status(404).json({ 
          error: 'Foydalanuvchi topilmadi' 
        });
      }

      // Rolni yangilash
      const updateUserStmt = db.prepare(
        `UPDATE users 
         SET role = ?, 
             updated_at = CURRENT_TIMESTAMP 
         WHERE email = ?`
      );
      const info = updateUserStmt.run(role, email);

      if (info.changes === 0) {
        return res.status(500).json({
          error: 'Foydalanuvchi roli yangilanmadi'
        });
      }

      return res.status(200).json({
        message: 'Foydalanuvchi roli muvaffaqiyatli yangilandi'
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
    db.close();
  }
}