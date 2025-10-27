"use client";

import ProtectedRoute from "@/components/protection/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="">
        <main className="mt-20 flex-1 p-4 md:p-8 bg-[var(--background)] ">
          <h1 className="text-6xl md:text-9xl font-bold mb-6 text-[var(--primary)]">
            Tableau de bord
          </h1>
          <p className="text-4xl md:text-5xl">
            Bienvenue dans l’espace administrateur de COBB
          </p>
        </main>
      </div>
    </ProtectedRoute>
  );
}
