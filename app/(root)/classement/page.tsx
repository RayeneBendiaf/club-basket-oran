"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Classement() {
  const [classement, setClassement] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const championnat = {
    titre: "Championnat N2 Ouest",
    saison: " 2025/2026",
  };

  useEffect(() => {
    const fetchClassement = async () => {
      try {
        const res = await fetch(
          "https://club-oranais-basketball-backend.onrender.com/api/classement"
        );
        const data = await res.json();
        setClassement(
          data.sort(
            (a: any, b: any) =>
              b.points - a.points || b.difference - a.difference
          )
        );
      } catch (err) {
        console.error("Erreur lors du chargement du classement:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClassement();
  }, []);

  return (
    <section>
      <div className="relative w-full h-[100vh] flex items-center justify-center">
        <Image
          src="/images/Classement.jpg"
          alt="Bannière du club COBB"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-9xl font-extrabold mb-4 drop-shadow-lg">
            Classement
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="w-full p-3 md:p-20">
        <h2 className="text-4xl md:text-6xl font-bold text-center md:mb-16 mb-10 text-[var(--primary)]">
          {championnat.titre}
          {championnat.saison}
        </h2>

        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
            <Loader2 className="w-20 h-20 text-[var(--primary)] animate-spin" />
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--primary)] text-xl md:text-3xl">
                <th className="p-3 text-left rounded-tl-lg">#</th>
                <th className="p-3 text-left">Équipe</th>
                <th className="p-3 text-center">Pts</th>
                <th className="p-3 text-center">V</th>
                <th className="p-3 text-center">D</th>
                <th className="p-3 text-center rounded-tr-lg">+/-</th>
              </tr>
            </thead>
            <tbody>
              {classement.map((row, index) => (
                <tr
                  key={row._id || index}
                  className={`border-b border-[var(--primary)] ${
                    index === 0 ? "" : ""
                  }`}
                >
                  <td className="p-3 font-bold text-xl md:text-3xl text-[var(--primary)]">
                    {index + 1}
                  </td>
                  <td className="p-3 text-xl md:text-3xl">{row.equipe.nom}</td>
                  <td className="p-3 text-center text-xl md:text-3xl">
                    {row.points}
                  </td>
                  <td className="p-3 text-center text-xl md:text-3xl">
                    {row.victoires}
                  </td>
                  <td className="p-3 text-center text-xl md:text-3xl">
                    {row.defaites}
                  </td>
                  <td className="p-3 text-center text-xl md:text-3xl">
                    {row.difference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
