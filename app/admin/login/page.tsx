"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true); // ⏳ Démarre le chargement

    try {
      const res = await fetch(
        "https://club-oranais-basketball-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: motDePasse }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/admin/dashboard");
      } else {
        setMessage(
          data.message || "❌ Échec de connexion, vérifie tes identifiants"
        );
      }
    } catch (error) {
      setMessage("⚠️ Erreur de connexion au serveur");
    } finally {
      setLoading(false); // 🛑 Arrête le chargement
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* 🌀 Loader plein écran pendant la connexion */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
          <Loader2 className="w-20 h-20 text-[var(--primary)] animate-spin" />
        </div>
      )}

      <div className="bg-[var(--foreground)]/10 p-8 md:rounded-2xl h-screen md:h-auto shadow-lg w-full max-w-md">
        <Image
          src="/logos/logo.png"
          alt="Logo du club"
          width={150}
          height={150}
          priority
          className="mx-auto my-5"
        />
        <h2 className="text-4xl text-center my-6 text-[var(--primary)]">
          Connexion Admin
        </h2>

        {message && (
          <div className="text-center text-2xl rounded-lg p-5 mb-3 bg-red-400 text-black">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[var(--primary)] text-xl font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[var(--foreground)]/20 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
              placeholder="E-Mail"
              required
            />
          </div>

          <div>
            <label className="block text-[var(--primary)] text-xl font-medium mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="bg-[var(--foreground)]/20 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
              placeholder="Mot de passe"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
