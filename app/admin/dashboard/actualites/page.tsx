"use client";
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

  // 📦 Charger les actus existantes
  const fetchActus = async () => {
    const res = await fetch(
      "https://club-oranais-basketball-backend.onrender.com/api/actus"
    );
    const data = await res.json();
    setActus(data);
  };

  useEffect(() => {
    fetchActus();
  }, []);

  // ➕ Ajouter une actu
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

  // 🗑️ Supprimer une actu
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
    <div className="md:p-6 md:mt-0 mt-20 w-full">
      <h1 className="text-4xl font-bold text-[var(--primary)] mb-6">
        Gestion des Actualités
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
        className=" md:p-4 rounded-lg shadow mb-8 space-y-3"
      >
        <input
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
          className="bg-[var(--foreground)]/20 w-full  px-3 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="bg-[var(--foreground)]/20 w-full  px-3 py-2 rounded"
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

      {/* 📋 Liste des actus */}
      <div className="space-y-4 ">
        {actus.map((actu) => (
          <div
            key={actu._id}
            className=" md:p-4 py-4 shadow rounded  flex items-center justify-between border-b border-[var(--primary)]"
          >
            <div className="flex items-center gap-4 ">
              {actu.image && (
                <img
                  src={`http://localhost:5000${actu.image}`}
                  className="w-20 h-20 md:w-40 md:h-40 object-cover "
                />
              )}
              <div>
                <h2 className="font-bold text-xl md:text-4xl">{actu.titre}</h2>
                <p className="text-l md:text-3xl text-gray-600">
                  {actu.description}
                </p>
                <p className="md:text-xl text-sm text-gray-400">
                  {new Date(actu.datePublication).toLocaleDateString("fr-FR")}
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
    </div>
  );
}
