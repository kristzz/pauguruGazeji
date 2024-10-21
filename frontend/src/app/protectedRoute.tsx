"use client"; // Client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    // Define allowed routes for unauthenticated users
    const allowedPaths = ["/login", "/register", "/", "/forgot"];

    const currentPath = window.location.pathname;
    const isAllowedPath = allowedPaths.includes(currentPath);

    // If no token and the user is trying to access a protected route, redirect to login
    if (!token && !isAllowedPath) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}