// pages/api/swagger.ts
import { NextApiRequest, NextApiResponse } from 'next';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from '../../config/swagger';

const options = {
  definition: swaggerDefinition,
  apis: ['./src/pages/api/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // CORS headerlarini qo'shish
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(swaggerSpec);
  } catch (error) {
    console.error('Swagger error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}