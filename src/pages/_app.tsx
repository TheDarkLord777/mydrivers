import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ClickEffect from "@/components/ClickEffect";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { Car } from 'lucide-react'
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (authLoading) {
        setPageLoading(false);
      }
    }, 5000); // 5 second timeout

    if (!authLoading) {
      if (user === null && !["/", "/login", "/register"].includes(router.pathname)) {
        router.push("/");
      } else {
        setPageLoading(false);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [user, router.pathname, authLoading]);

  if (authLoading || pageLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-900">
        <Car className="w-20 h-20 text-white animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <ClickEffect />
      <Component {...pageProps} />
    </>
  );
}