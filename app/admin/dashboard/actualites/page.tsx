"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Actu {
  _id: string;
  titre: string;
  description: string;
  image: string;
  datePublication: string;
}

export default function GestionActualites() {
  const [actus, setActus] = useState<Actu[]>([]);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔄 Charger les actualités
  const fetchActus = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://club-oranais-basketball-backend.onrender.com/api/actus"
      );
      const data = await res.json();
      setActus(data);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActus();
  }, []);

  // ➕ Ajouter une actualité
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    if (image) formData.append("image", image);

    const res = await fetch(
      "https://club-oranais-basketball-backend.onrender.com/api/actus",
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.ok) {
      setMessage("✅ Actualité ajoutée avec succès !");
      setTitre("");
      setDescription("");
      setImage(null);
      fetchActus();
    } else {
      setMessage("❌ Erreur lors de l’ajout.");
    }
  };

  // 🗑️ Supprimer une actualité
  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette actualité ?")) return;

    const res = await fetch(
      `https://club-oranais-basketball-backend.onrender.com/api/actus/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) fetchActus();
  };

  return (
    <div className="mt-20 md:mt-0 md:p-6 w-full">
      <h1 className="text-4xl font-bold text-[var(--primary)] mb-6">
        Gestion des Actualités
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
            <input
              type="text"
              placeholder="Titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              required
              className="bg-[var(--foreground)]/20 w-full px-3 py-2 rounded"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="bg-[var(--foreground)]/20 w-full px-3 py-2 rounded"
            ></textarea>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="bg-[var(--primary)] mr-5 px-4 py-2 rounded hover:opacity-60"
            />

            <button
              type="submit"
              className="bg-[var(--primary)] px-4 py-2 rounded hover:opacity-60"
            >
              Ajouter
            </button>
          </form>

          {/* 📋 Liste des actualités */}
          <div className="space-y-4">
            {actus.map((actu) => (
              <div
                key={actu._id}
                className="md:p-4 py-4 shadow rounded border-b border-[var(--primary)] flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {actu.image && (
                    <img
                      src={`https://club-oranais-basketball-backend.onrender.com${actu.image}`}
                      className="w-20 h-20 md:w-40 md:h-40 object-cover rounded"
                      alt={actu.titre}
                    />
                  )}
                  <div>
                    <h2 className="font-bold text-xl md:text-4xl">
                      {actu.titre}
                    </h2>
                    <p className="text-l md:text-3xl text-gray-600">
                      {actu.description}
                    </p>
                    <p className="md:text-xl text-sm text-gray-400">
                      {new Date(actu.datePublication).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(actu._id)}
                  className="text-red-600 font-semibold hover:underline"
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
