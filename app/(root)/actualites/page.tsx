"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Actu {
  _id: string;
  titre: string;
  description: string;
  image: string;
  datePublication: string;
}

export default function Actualites() {
  const [actus, setActus] = useState<Actu[]>([]);
  const [loading, setLoading] = useState(true);

  // 📦 Charger les actualités depuis ton backend
  const fetchActus = async () => {
    try {
      const res = await fetch(
        "https://club-oranais-basketball-backend.onrender.com/api/actus"
      );
      const data = await res.json();
      setActus(data);
    } catch (err) {
      console.error("Erreur de chargement :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActus();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center">
      {/* --- Bannière --- */}
      <div className="relative w-full h-[100vh] flex items-center justify-center">
        <Image
          src="/images/Actu.jpg"
          alt="Bannière du club COBB"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-9xl font-extrabold mb-4 drop-shadow-lg">
            Actualités
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* --- Grille d’articles --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
            <Loader2 className="w-20 h-20 text-[var(--primary)] animate-spin" />
          </div>
        ) : actus.length === 0 ? (
          <p className="text-center text-2xl col-span-3">
            Aucune actualité disponible.
          </p>
        ) : (
          actus.map((actu) => (
            <div
              key={actu._id}
              className=" bg-neutral-900 shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              {/* Image */}
              <div className=" ">
                {actu.image && (
                  <img
                    src={`https://club-oranais-basketball-backend.onrender.com${actu.image}`}
                    alt={actu.titre}
                    className="object-cover "
                  />
                )}
              </div>

              {/* Contenu */}
              <div className="px-6 pt-6 flex flex-col h-full">
                <p className="text-s text-[var(--primary)]">
                  {new Date(actu.datePublication).toLocaleDateString("fr-FR")}
                </p>
                <h2 className="text-4xl font-bold mb-3 text-[var(--primary)]">
                  {actu.titre}
                </h2>
                <p className="text-gray-300 text-xl mb-6 flex-grow line-clamp-3">
                  {actu.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
