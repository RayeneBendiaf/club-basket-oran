import Image from "next/image";
import Link from "next/link";

// Exemple : fonction simulant une récupération depuis la base
// (à remplacer plus tard par une vraie requête API ou DB)
async function getProchainMatch() {
  const res = await fetch(
    "https://club-oranais-basketball-backend.onrender.com/api/matchs/prochain",
    {
      cache: "no-store", // pour ne pas garder un vieux cache
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

const Accueil = async () => {
  // Récupération du match depuis la "base"
  const match = await getProchainMatch();

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center">
      {/* --- Bannière --- */}
      <div className="relative w-full h-[100vh] flex items-center justify-center">
        <Image
          src="/images/Banniere.jpg"
          alt="Bannière du club COBB"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl md:text-9xl font-extrabold mb-4 drop-shadow-lg">
            Club Oranais De Basketball
          </h1>
          <p className="text-xl md:text-3xl max-w-xl mx-auto drop-shadow">
            Passion, esprit d’équipe et performance sur le terrain.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* --- Carte du prochain match (dynamique) --- */}
      <div className="relative z-20 -mt-20 w-11/12 md:w-3/4 lg:w-1/2">
        <div className="p-6 bg-[var(--primary)] shadow-2xl flex flex-col items-center text-center">
          <h2 className="text-5xl font-bold mb-4">Prochain Match</h2>

          {match ? (
            <>
              <div className="grid grid-cols-3 items-center text-4xl font-bold">
                <p className="text-left">
                  {typeof match.equipeDomicile === "object"
                    ? match.equipeDomicile.nom
                    : match.equipeDomicile}
                </p>
                <p className="text-center">VS</p>
                <p className="text-right">
                  {typeof match.equipeExterieur === "object"
                    ? match.equipeExterieur.nom
                    : match.equipeExterieur}
                </p>
              </div>
              <p className="text-xl mt-2">
                {new Date(match.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                • {match.heure || "Heure non définie"}
              </p>
              <p className="text-xl">{match.lieu}</p>
            </>
          ) : (
            <p className="text-2xl mt-2">Aucun match à venir</p>
          )}
        </div>
      </div>

      {/* --- Grille d’images cliquables --- */}
      <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-20  px-4 md:px-10">
        <Link
          href="/actualites"
          className="group relative overflow-hidden shadow-lg "
        >
          <Image
            src="/images/Actu.jpg"
            alt="Actualités"
            width={600}
            height={500}
            className="object-cover  h-80 sm:h-80 md:h-130 transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-white text-4xl md:text-8xl font-bold">
              Actualités
            </p>
          </div>
        </Link>

        <Link
          href="/matches"
          className="group relative overflow-hidden shadow-lg w-full"
        >
          <Image
            src="/images/Matches.jpg"
            alt="Matchs"
            width={600}
            height={500}
            className="object-cover  h-80 sm:h-80 md:h-130 transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-white text-4xl md:text-8xl font-bold">Matches</p>
          </div>
        </Link>

        <Link
          href="/classement"
          className="group relative overflow-hidden shadow-lg w-full"
        >
          <Image
            src="/images/Classement.jpg"
            alt="Classement"
            width={600}
            height={500}
            className="object-cover  h-80 sm:h-80 md:h-130 transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-white text-4xl md:text-8xl font-bold">
              Classement
            </p>
          </div>
        </Link>

        <Link
          href="/equipe"
          className="group relative overflow-hidden shadow-lg w-full"
        >
          <Image
            src="/images/equipe.jpg"
            alt="Équipes"
            width={600}
            height={500}
            className="object-cover  h-80 sm:h-80 md:h-130 transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-white text-4xl md:text-8xl font-bold">
              Histoire
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Accueil;
