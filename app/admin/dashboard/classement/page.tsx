"use client";
import { useEffect, useState } from "react";

interface Classement {
  _id: string;
  equipe: { _id: string; nom: string };
  points: number;
  matchsJoues: number;
  victoires: number;
  defaites: number;
  panierMarques: number;
  panierEncaisses: number;
  difference: number;
}

export default function GestionClassement() {
  const [classements, setClassements] = useState<Classement[]>([]);
  const [message, setMessage] = useState("");

  const fetchClassements = async () => {
    const res = await fetch(
      "https://club-oranais-basketball-backend.onrender.com/api/classement"
    );
    const data = await res.json();
    setClassements(data);
  };

  useEffect(() => {
    fetchClassements();
  }, []);

  // ✏️ Modifier un classement
  const handleUpdate = async (id: string, field: string, value: number) => {
    const updatedClassements = classements.map((c) =>
      c._id === id ? { ...c, [field]: value } : c
    );
    setClassements(updatedClassements);
  };

  const saveClassement = async (id: string) => {
    const classement = classements.find((c) => c._id === id);
    if (!classement) return;

    const res = await fetch(
      `https://club-oranais-basketball-backend.onrender.com/api/classement/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classement),
      }
    );

    if (res.ok) {
      setMessage("✅ Classement mis à jour !");
      fetchClassements();
      setTimeout(() => setMessage(""), 2000);
    } else {
      setMessage("❌ Erreur lors de la mise à jour.");
    }
  };

  // 🔄 Réinitialiser un classement
  const resetClassement = async (id: string) => {
    if (!confirm("Réinitialiser le classement de cette équipe ?")) return;

    const res = await fetch(
      `https://club-oranais-basketball-backend.onrender.com/api/classement/${id}/reset`,
      {
        method: "PUT",
      }
    );

    if (res.ok) {
      setMessage("✅ Classement réinitialisé !");
      fetchClassements();
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="mt-20 md:mt-0 md:p-6 w-full">
      <h1 className="text-4xl font-bold text-[var(--primary)] mb-6">
        Gestion du Classement
      </h1>

      {message && (
        <div className="mb-4 text-center text-green-600 font-semibold">
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-[var(--primary)] rounded-lg shadow">
          <thead className="text-xl md:text-2xl bg-[var(--primary)]">
            <tr>
              <th className="px-4 py-2 text-left">Équipe</th>
              <th className="px-4 py-2">Pts</th>
              <th className="px-4 py-2">MJ</th>
              <th className="px-4 py-2">V</th>
              <th className="px-4 py-2">D</th>
              <th className="px-4 py-2">PM</th>
              <th className="px-4 py-2">PE</th>
              <th className="px-4 py-2">Diff</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {classements.map((c) => (
              <tr
                key={c._id}
                className="md:text-2xl border-t border-[var(--primary)]"
              >
                <td className="px-4 py-2 font-semibold">
                  {c.equipe ? (
                    c.equipe.nom
                  ) : (
                    <span className="text-gray-400 italic">
                      Équipe supprimée
                    </span>
                  )}
                </td>

                <td className="px-2 py-2 text-center">
                  <input
                    type="number"
                    value={c.points ?? 0}
                    onChange={(e) =>
                      handleUpdate(c._id, "points", Number(e.target.value))
                    }
                    className="w-16 text-center border rounded"
                  />
                </td>

                <td className="px-2 py-2 text-center">
                  <input
                    type="number"
                    value={c.matchsJoues ?? 0}
                    onChange={(e) =>
                      handleUpdate(c._id, "matchsJoues", Number(e.target.value))
                    }
                    className="w-16 text-center border rounded"
                  />
                </td>

                <td className="px-2 py-2 text-center">
                  <input
                    type="number"
                    value={c.victoires ?? 0}
                    onChange={(e) =>
                      handleUpdate(c._id, "victoires", Number(e.target.value))
                    }
                    className="w-16 text-center border rounded"
                  />
                </td>

                <td className="px-2 py-2 text-center">
                  <input
                    type="number"
                    value={c.defaites ?? 0}
                    onChange={(e) =>
                      handleUpdate(c._id, "defaites", Number(e.target.value))
                    }
                    className="w-16 text-center border rounded"
                  />
                </td>

                <td className="px-2 py-2 text-center">
                  <input
                    type="number"
                    value={c.panierMarques ?? 0}
                    onChange={(e) =>
                      handleUpdate(
                        c._id,
                        "panierMarques",
                        Number(e.target.value)
                      )
                    }
                    className="w-20 text-center border rounded"
                  />
                </td>

                <td className="px-2 py-2 text-center">
                  <input
                    type="number"
                    value={c.panierEncaisses ?? 0}
                    onChange={(e) =>
                      handleUpdate(
                        c._id,
                        "panierEncaisses",
                        Number(e.target.value)
                      )
                    }
                    className="w-20 text-center border rounded"
                  />
                </td>

                <td className="px-2 py-2 text-center">{c.difference ?? 0}</td>

                <td className="px-4 py-2 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => saveClassement(c._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:opacity-80"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => resetClassement(c._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:opacity-80"
                  >
                    Réinitialiser
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
