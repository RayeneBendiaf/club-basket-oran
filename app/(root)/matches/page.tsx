"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

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

export default function Matches() {
  const [matchs, setMatchs] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchs = async () => {
      try {
        const res = await fetch(
          "https://club-oranais-basketball-backend.onrender.com/api/matchs"
        );
        const data = await res.json();
        setMatchs(data);
      } catch (error) {
        console.error("Erreur lors du chargement des matchs :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchs();
  }, []);

  return (
    <section>
      {/* --- Bannière --- */}
      <div className="relative w-full h-[100vh] flex items-center justify-center">
        <Image
          src="/images/Matches.jpg"
          alt="Bannière du club COBB"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 drop-shadow-lg">
            Matches
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* --- Liste des matchs --- */}
      <div className="w-full p-6 md:p-20">
        <h2 className="text-6xl font-bold pl-10 mb-16 text-[var(--primary)]">
          Calendrier des matchs
        </h2>

        {loading ? (
          <p className="text-center text-2xl">Chargement...</p>
        ) : matchs.length === 0 ? (
          <p className="text-center text-2xl">Aucun match trouvé.</p>
        ) : (
          <div className="flex flex-col space-y-8">
            {matchs.map((match) => (
              <div
                key={match._id}
                className=" bg-neutral-900 shadow-lg p-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left"
              >
                {/* Infos principales */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="grid grid-cols-3 md:flex items-center text-3xl md:text-5xl font-bold md:gap-x-6">
                    <p className="text-left">
                      {match.equipeDomicile?.nom || "Équipe A"}
                    </p>
                    <p className="text-[var(--primary)] text-center">VS</p>
                    <p className="text-right">
                      {match.equipeExterieur?.nom || "Équipe B"}
                    </p>
                  </div>

                  <p className="text-gray-500 mt-3 md:text-xl">
                    {match.date
                      ? new Date(match.date).toLocaleDateString("fr-FR")
                      : "Date à définir"}{" "}
                    • {match.heure || "Heure inconnue"}
                  </p>
                  <p className="text-gray-400 md:text-xl">
                    {match.lieu || "Lieu non défini"}
                  </p>
                </div>

                {/* Résultat ou badge "À venir" */}
                <div className="mt-6 md:mt-0">
                  {match.scoreDomicile != null &&
                  match.scoreExterieur != null ? (
                    <span className="text-4xl font-extrabold text-[var(--primary)]">
                      {match.scoreDomicile} - {match.scoreExterieur}
                    </span>
                  ) : (
                    <span className="bg-[var(--primary)]  text-xl px-5 py-2 rounded">
                      À venir
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
