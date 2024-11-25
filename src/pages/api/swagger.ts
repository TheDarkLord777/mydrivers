// pages/api/swagger.ts
import { NextApiRequest, NextApiResponse } from 'next';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from '../../config/swagger';

const options = {
  definition: swaggerDefinition,
  apis: [
    './pages/api/**/*.ts',  // barcha API fayllar
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');
    
    // Swagger spec'ni log qilish debug uchun
    console.log('Swagger Spec:', JSON.stringify(swaggerSpec, null, 2));

    res.status(200).json(swaggerSpec);
  } catch (error) {
    console.error('Swagger error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}