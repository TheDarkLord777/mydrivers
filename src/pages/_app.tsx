import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ClickEffect from "@/components/ClickEffect";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { Car } from 'lucide-react'
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("Authenticated user:", user);
    if (user.user === null && !["/", "/login", "/register"].includes(router.pathname)) {
      setLoading(true)
    } else {
      setLoading(false);
    }
  }, [user, router.pathname]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-blue-900">
    <Car className="w-20 h-20 text-white animate-pulse" />
  </div>;
  }

  return (
    <>
      <ClickEffect />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;