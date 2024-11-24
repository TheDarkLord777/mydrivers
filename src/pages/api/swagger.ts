import { NextApiRequest, NextApiResponse } from 'next';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerDefinition from '../../config/swagger';

const options: Options = {
  definition: swaggerDefinition,
  apis: ['./src/pages/api/**/*.ts'], // Ichki papkalarni ham qidiradi

};

const swaggerSpec = swaggerJsdoc(options);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(swaggerSpec);
}
