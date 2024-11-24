module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended', // React uchun tavsiyalar
    'plugin:@typescript-eslint/recommended', // TypeScript uchun tavsiyalar
    'prettier', // Prettier formatlash tavsiyalari
    'plugin:prettier/recommended' // Prettier va ESLint mosligi uchun qo'shimcha sozlama
  ],
  parserOptions: {
    ecmaVersion: 2020, // ES2020-ni qo'llash
    sourceType: 'module', // ES modullarini ishlatish
    ecmaFeatures: {
      jsx: true, // JSX qo'llab-quvvatlash
    },
  },
  rules: {
    // Sizga kerakli xususiy qoidalaringizni bu yerga qo'shishingiz mumkin
  },
  settings: {
    react: {
      version: 'detect', // React versiyasini avtomatik aniqlash
    },
  },
  env: {
    node: true, // Node.js muhitini qo'shish
    browser: true, // Brauzer muhitini qo'shish
    es2020: true, // ES2020 qo'llab-quvvatlash
  },
};
