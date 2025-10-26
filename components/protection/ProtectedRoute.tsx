"use client";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🚨 Si aucun token, on redirige vers la page de connexion
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  return <>{children}</>;
}
