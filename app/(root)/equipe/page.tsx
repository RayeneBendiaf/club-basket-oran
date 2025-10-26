"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Equipe = () => {
  return (
    <div>
      <div className="relative w-full h-[100vh] flex items-center justify-center mb-30">
        <Image
          src="/images/banniere_histoir.jpg"
          alt="Bannière du club COBB"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-9xl font-extrabold mb-4 drop-shadow-lg">
            Histoir du Club
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* --- Section 1 : Les origines --- */}
      <section className="mb-16 p-6 md:p-20">
        <h2 className="text-4xl font-bold mb-4 text-[var(--primary)]">
          Les origines du club (1995)
        </h2>
        <p className="leading-relaxed text-2xl opacity-90">
          Fondé en <strong>1995</strong> par d’anciennes gloires du basket-ball
          oranais, le{" "}
          <strong>Club Omnisports Bouchaoui de Basket-ball (COBB)</strong> s’est
          donné pour mission de faire rayonner Oran sur la scène nationale. Dès
          ses débuts en
          <strong> Division Honneur</strong>, le club s’est illustré par sa
          passion, sa rigueur et la solidarité de ses membres fondateurs.
        </p>
        <div className="mt-6">
          <img
            src="/images/equipe_fondatrice.jpg"
            alt="Équipe fondatrice du COBB"
            className="shadow-lg mx-auto"
          />
        </div>
      </section>

      {/* --- Section 2 : L’ascension --- */}
      <section className="mb-16 p-6 md:p-20">
        <h2 className="text-4xl font-bold mb-4 text-[var(--primary)]">
          L’ascension vers l’élite
        </h2>
        <p className="leading-relaxed text-2xl opacity-90">
          Sous la houlette du coach <strong>Boumediene Mohamed</strong>, le COBB
          gravit rapidement les échelons de la compétition nationale. Entre{" "}
          <strong>1998 et 2004</strong>, le club connaît une période dorée :
        </p>
        <ul className="list-disc pl-8 mt-3 text-2xl space-y-1">
          <li>🏆 Finaliste de la Coupe d’Algérie (1998, 2000-2001)</li>
          <li>🥉 3e place en Coupe d’Algérie (2002-2003)</li>
          <li>🥈 Vice-champion d’Algérie (2003-2004)</li>
          <li>🌍 3e place au tournoi international de Nabeul (Tunisie)</li>
          <li>🇩🇿 Qualification au Championnat arabe et à la Coupe d’Afrique</li>
        </ul>
      </section>

      {/* --- Section 3 : La crise --- */}
      <section className="m-6 md:m-20 bg-[var(--foreground)]/10 shadow-lg p-6 md:p-10 ">
        <h2 className="text-4xl font-bold mb-4 text-[var(--primary)]">
          Les années de crise (2005-2006)
        </h2>
        <p className="leading-relaxed text-2xl opacity-90">
          Le retrait du principal sponsor, l’agence foncière, plonge le COBB
          dans une crise financière sans précédent. Dettes, départs de joueurs,
          manque de motivation… la descente en Nationale Une/B devient
          inévitable.
        </p>
        <blockquote className="text-lg mt-6 italic border-l-4 pl-4 text-[var(--primary)]">
          « Nous avons tout donné, mais sans soutien, un club ne peut pas
          survivre. »
          <br />– <span className="opacity-80">Boumediene Mohamed, 2006</span>
        </blockquote>
      </section>

      {/* --- Section 4 : La renaissance --- */}
      <section className="m-6 md:m-20 bg-[var(--foreground)]/10 shadow-lg p-6 md:p-10 ">
        <h2 className="text-4xl font-bold mb-4 text-[var(--primary)]">
          La renaissance du COBB (2010)
        </h2>
        <p className="leading-relaxed text-2xl opacity-90">
          Après plusieurs saisons difficiles, le COBB retrouve l’élite du basket
          national en 2010. Ce retour est le fruit d’un travail collectif mené
          par le président <strong>Maître Lagha Lotfi</strong>, le coach{" "}
          <strong>Boumediene Mohamed</strong>, et des joueurs emblématiques tels
          que
          <strong> Bouteldja Ahmed</strong>, <strong>Medjaher Toufik</strong> et
          <strong> Bouaka Mohamed Amine</strong>.
        </p>
        <blockquote className="text-lg mt-6 italic border-l-4 pl-4 text-[var(--primary)]">
          « Cette accession relevait d’un défi presque impossible au départ. »
          <br />– <span className="opacity-80">Coach Boumediene Mohamed</span>
        </blockquote>
      </section>

      {/* --- Section 5 : Aujourd’hui --- */}
      <section className="mb-16 p-6 md:p-20">
        <h2 className="text-4xl font-bold mb-4 text-[var(--primary)]">
          Le COBB aujourd’hui
        </h2>
        <p className="leading-relaxed text-2xl opacity-90">
          Aujourd’hui, le COBB reste un symbole fort du basket oranais. Focalisé
          sur la formation locale, il prône des valeurs de
          <strong> discipline</strong>, <strong>respect</strong> et{" "}
          <strong>esprit collectif</strong>. L’objectif du club : préparer la
          nouvelle génération et retrouver durablement les sommets du basket
          algérien.
        </p>
        <div className="mt-6 flex justify-center">
          <img
            src="/images/cobb_actuel.jpg"
            alt="COBB aujourd’hui"
            className=" shadow-lg"
          />
        </div>
      </section>

      {/* --- Section 6 : Figures emblématiques --- */}
      <section className="m-6 md:m-20">
        <h2 className="text-4xl font-bold mb-8 text-[var(--primary)] text-center">
          Figures emblématiques du club
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Boumediene Mohamed", role: "Entraîneur historique" },
            { name: "Bouteldja Ahmed", role: "Ancien international" },
            { name: "Medjaher Toufik", role: "Leader sur le terrain" },
            { name: "Lagha Lotfi", role: "Président du renouveau" },
          ].map((person, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-[var(--foreground)]/5  p-6 text-center shadow-md"
            >
              <h3 className="font-bold text-3xl text-[var(--primary)]">
                {person.name}
              </h3>
              <p className="text-lg opacity-80">{person.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Equipe;
