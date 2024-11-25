// src/lib/swagger.ts
import { createSwaggerSpec } from 'next-swagger-doc';

const apiDocumentation = {
  openapi: '3.0.0',
  info: {
    title: 'My Drivers API',
    version: '1.0.0',
    description: 'My Drivers API Documentation',
  },
  servers: [
    {
      url: process.env.BASE_URL || 'http://localhost:3000',
      description: 'Local server',
    },
  ],
  tags: [
    {
      name: 'Users',
      description: 'Foydalanuvchilar bilan ishlash',
    },
  ],
};

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    definition: apiDocumentation,
    apiFolder: 'src/pages/api', // API fayllar joylashgan papka
  });
  return spec;
};