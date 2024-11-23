// src/pages/_app.tsx
import '@/styles/globals.css';  // Global CSS ni import qilish

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
