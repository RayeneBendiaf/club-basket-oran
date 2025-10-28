"use client";
import { Loader2 } from "lucide-react"; // ✅ Import de l’icône animée
import { useEffect, useState } from "react";

interface Equipe {
  _id: string;
  nom: string;
  points: number;
}

export default function GestionEquipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [nom, setNom] = useState("");
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // ✅ nouvel état de chargement

  // 📦 Charger les équipes existantes
  const fetchEquipes = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://club-oranais-basketball-backend.onrender.com/api/equipes"
      );
      const data = await res.json();
      setEquipes(data);
    } catch (err) {
      console.error("Erreur de chargement :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipes();
  }, []);

  // ➕ Ajouter une équipe
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      "https://club-oranais-basketball-backend.onrender.com/api/equipes",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, points }),
      }
    );

    if (res.ok) {
      setMessage("✅ Équipe ajoutée avec succès !");
      setNom("");
      setPoints(0);
      fetchEquipes();
    } else {
      setMessage("❌ Erreur lors de l’ajout.");
    }
  };

  // 🗑️ Supprimer une équipe
  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette équipe ?")) return;

    const res = await fetch(
      `https://club-oranais-basketball-backend.onrender.com/api/equipes/${id}`,
      { method: "DELETE" }
    );

    if (res.ok) fetchEquipes();
  };

  return (
    <div className="md:p-6 md:mt-0 mt-20 w-full">
      <h1 className="text-4xl font-bold text-[var(--primary)] mb-6">
        Gestion des Équipes
      </h1>

      {/* ✅ Message d’alerte */}
      {message && (
        <div className="mb-4 text-center text-green-600 font-semibold">
          {message}
        </div>
      )}

      {/* ➕ Formulaire d’ajout */}
      <form
        onSubmit={handleAdd}
        className="md:p-4 rounded-lg shadow mb-8 space-y-3"
      >
        <input
          type="text"
          placeholder="Nom de l’équipe"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          className="bg-[var(--foreground)]/20 w-full px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-[var(--primary)] px-4 py-2 rounded hover:opacity-60"
        >
          Ajouter
        </button>
      </form>

      {/* 📋 Liste ou chargement */}
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
          <Loader2 className="w-20 h-20 text-[var(--primary)] animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {equipes.map((equipe) => (
            <div
              key={equipe._id}
              className="md:p-4 py-4 shadow rounded flex items-center justify-between border-b border-[var(--primary)]"
            >
              <div>
                <h2 className="font-bold text-3xl">{equipe.nom}</h2>
              </div>
              <button
                onClick={() => handleDelete(equipe._id)}
                className="text-red-600 font-semibold hover:underline"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
