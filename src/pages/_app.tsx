import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ClickEffect from "@/components/ClickEffect";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { useMemo,useCallback } from "react";
import { Car } from "lucide-react";
import { useEffect, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ErrorFallback";




export default function MyApp({ Component, pageProps }: AppProps) {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  


  // Memoize router.pathname to prevent unnecessary re-renders
  const currentPath = useMemo(() => router.pathname, [router.pathname]);

  // Use useCallback for handler functions
  const handleRouteChange = useCallback(() => {
    if (!authLoading) {
      if (
        user === null &&
        !["/", "/login", "/register"].includes(currentPath)
      ) {
        router.push("/");
      } else {
        setPageLoading(false);
      }
    }
    
    
  }, [user, currentPath, authLoading, router]);

  useEffect(() => {
    // Optimize timeout handling
    const timeoutId = setTimeout(handleRouteChange, 5000);
    handleRouteChange();

    return () => clearTimeout(timeoutId);
  }, [handleRouteChange]);
  
  

  // Consider using a more lightweight loading indicator
  if (authLoading || pageLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-blue-900/90">
        <Car className="w-16 h-16 text-white animate-bounce" />
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ClickEffect />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}