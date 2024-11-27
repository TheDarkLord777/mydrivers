import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ClickEffect from '@/components/ClickEffect';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <ClickEffect />
  <Component {...pageProps} />
</>;
}

export default MyApp;
