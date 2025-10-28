"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Equipe {
  _id: string;
  nom: string;
}

interface Match {
  _id: string;
  equipeDomicile: { _id: string; nom: string };
  equipeExterieur: { _id: string; nom: string };
  date: string;
  heure: string;
  lieu: string;
  scoreDomicile: number | null;
  scoreExterieur: number | null;
}

export default function GestionMatchs() {
  const [matchs, setMatchs] = useState<Match[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [equipeDomicile, setEquipeDomicile] = useState("");
  const [equipeExterieur, setEquipeExterieur] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [lieu, setLieu] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [scores, setScores] = useState<{
    [key: string]: { dom: number; ext: number };
  }>({});

  // 🔄 Charger équipes et matchs
  const fetchData = async () => {
    try {
      setLoading(true);
      const [matchRes, eqRes] = await Promise.all([
        fetch(
          "https://club-oranais-basketball-backend.onrender.com/api/matchs"
        ),
        fetch(
          "https://club-oranais-basketball-backend.onrender.com/api/equipes"
        ),
      ]);
      const matchsData = await matchRes.json();
      setMatchs(matchsData);
      setEquipes(await eqRes.json());

      const initScores: any = {};
      matchsData.forEach((m: Match) => {
        initScores[m._id] = {
          dom: m.scoreDomicile ?? 0,
          ext: m.scoreExterieur ?? 0,
        };
      });
      setScores(initScores);
    } catch (error) {
      console.error("Erreur de chargement :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ➕ Ajouter un match
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (equipeDomicile === equipeExterieur)
      return setMessage("❌ Les deux équipes doivent être différentes.");

    const res = await fetch(
      "https://club-oranais-basketball-backend.onrender.com/api/matchs",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipeDomicile,
          equipeExterieur,
          date,
          heure,
          lieu,
        }),
      }
    );

    if (res.ok) {
      setMessage("✅ Match ajouté avec succès !");
      setEquipeDomicile("");
      setEquipeExterieur("");
      setDate("");
      setHeure("");
      setLieu("");
      fetchData();
    } else {
      setMessage("❌ Erreur lors de l’ajout du match.");
    }
  };

  // ✏️ Mettre à jour le score
  const handleUpdateScore = async (id: string) => {
    const { dom, ext } = scores[id];
    const res = await fetch(
      `https://club-oranais-basketball-backend.onrender.com/api/matchs/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scoreDomicile: dom, scoreExterieur: ext }),
      }
    );
    if (res.ok) fetchData();
  };

  // 🗑️ Supprimer un match
  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce match ?")) return;
    await fetch(
      `https://club-oranais-basketball-backend.onrender.com/api/matchs/${id}`,
      { method: "DELETE" }
    );
    fetchData();
  };

  return (
    <div className="mt-20 md:mt-0 md:p-6 w-full">
      <h1 className="text-4xl font-bold text-[var(--primary)] mb-6">
        Gestion des Matchs
      </h1>

      {message && (
        <div className="mb-4 text-center text-green-600 font-semibold">
          {message}
        </div>
      )}

      {/* 🔄 Loader dynamique */}
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-40">
          <Loader2 className="w-20 h-20 text-[var(--primary)] animate-spin" />
        </div>
      ) : (
        <>
          {/* ➕ Formulaire */}
          <form
            onSubmit={handleAdd}
            className="md:p-4 rounded-lg shadow mb-8 space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <select
                value={equipeDomicile}
                onChange={(e) => setEquipeDomicile(e.target.value)}
                required
                className="bg-[var(--foreground)]/20 px-3 py-2 rounded"
              >
                <option value="">Équipe Domicile</option>
                {equipes.map((eq) => (
                  <option className="text-black" key={eq._id} value={eq._id}>
                    {eq.nom}
                  </option>
                ))}
              </select>

              <select
                value={equipeExterieur}
                onChange={(e) => setEquipeExterieur(e.target.value)}
                required
                className="bg-[var(--foreground)]/20 px-3 py-2 rounded"
              >
                <option value="">Équipe Extérieure</option>
                {equipes.map((eq) => (
                  <option className="text-black" key={eq._id} value={eq._id}>
                    {eq.nom}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="bg-[var(--foreground)]/20 w-full px-3 py-2 rounded"
            />

            <input
              type="time"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              required
              className="bg-[var(--foreground)]/20 w-full px-3 py-2 rounded"
            />

            <input
              type="text"
              placeholder="Lieu du match"
              value={lieu}
              onChange={(e) => setLieu(e.target.value)}
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

          {/* 📋 Liste des matchs */}
          <div className="space-y-4">
            {matchs.map((match) => (
              <div
                key={match._id}
                className="md:p-4 py-4 shadow rounded border-b border-[var(--primary)] flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-xl md:text-4xl">
                    {match.equipeDomicile?.nom} 🆚 {match.equipeExterieur?.nom}
                  </h2>
                  <p className="text-gray-500 md:text-xl">
                    {new Date(match.date).toLocaleDateString("fr-FR")} à{" "}
                    {match.heure}
                  </p>
                </div>

                <p className="text-gray-600 md:text-2xl">📍 {match.lieu}</p>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={scores[match._id]?.dom ?? 0}
                    onChange={(e) =>
                      setScores((prev) => ({
                        ...prev,
                        [match._id]: {
                          ...prev[match._id],
                          dom: Number(e.target.value),
                        },
                      }))
                    }
                    className="w-10 md:w-24 text-center border rounded px-2 py-1"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={scores[match._id]?.ext ?? 0}
                    onChange={(e) =>
                      setScores((prev) => ({
                        ...prev,
                        [match._id]: {
                          ...prev[match._id],
                          ext: Number(e.target.value),
                        },
                      }))
                    }
                    className="w-10 md:w-24 text-center border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => handleUpdateScore(match._id)}
                    className="bg-[var(--primary)] px-3 py-1 rounded hover:opacity-70"
                  >
                    Enregistrer
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(match._id)}
                  className="text-red-600 font-semibold hover:underline self-end"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
