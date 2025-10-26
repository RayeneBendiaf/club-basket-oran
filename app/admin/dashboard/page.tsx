"use client";
import ProtectedRoute from "@/components/protection/ProtectedRoute";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="">
        <main className="flex-1 p-8 bg-[var(--background)] min-h-screen">
          <h1 className="text-9xl font-bold mb-6 text-[var(--primary)]">
            Tableau de bord
          </h1>
          <p className="text-5xl">
            Bienvenue dans l’espace administrateur de COBB
          </p>
        </main>
      </div>
    </ProtectedRoute>
  );
}
