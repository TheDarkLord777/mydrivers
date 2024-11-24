// pages/api/swagger.ts
import { NextApiRequest, NextApiResponse } from 'next';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from '../../config/swagger';
import cors from 'cors';

// CORS middleware
const corsMiddleware = cors({
  methods: ['GET', 'HEAD'],
});

const options = {
  definition: swaggerDefinition,
  apis: ['./src/pages/api/**/*.ts'], // API route fayllarining yo'li
};

const swaggerSpec = swaggerJsdoc(options);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS ni handle qilish
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(swaggerSpec);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};