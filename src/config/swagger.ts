import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Next.js API Documentation',
    version: '1.0.0',
    description: 'API uchun Swagger UI hujjatlari',
  },
  servers: [
    {
      url: 'http://localhost:3000', // Asosiy API bazaviy URL
    },
  ],
};

export default swaggerDefinition;