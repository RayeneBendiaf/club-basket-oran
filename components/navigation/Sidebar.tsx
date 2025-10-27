"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState, useEffect } from "react";

interface LinkItem {
  name: string;
  href: string;
}

const Sidebar: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  // ✅ Gérer la disparition du menu mobile selon le scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // On descend → cacher la barre
        setShowMenu(false);
      } else {
        // On monte → afficher la barre
        setShowMenu(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const links: LinkItem[] = [
    { name: "Matchs", href: "/admin/dashboard/matches" },
    { name: "Équipes", href: "/admin/dashboard/equipes" },
    { name: "Actualités", href: "/admin/dashboard/actualites" },
    { name: "Classement", href: "/admin/dashboard/classement" },
  ];

  return (
    <>
      {/* === Bouton mobile avec animation de disparition au scroll === */}
      <div
        className={`lg:hidden flex items-center justify-between px-4 bg-[var(--primary)] text-white fixed top-0 left-0 w-full z-50 transition-transform duration-700 ${
          showMenu ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Image
          src="/logos/logo.png"
          alt="Logo du club"
          width={70}
          height={70}
          priority
        />
        <button onClick={() => setIsOpen(true)} aria-label="Ouvrir le menu">
          <Menu size={40} />
        </button>
      </div>

      {/* === Sidebar desktop === */}
      <aside className="hidden lg:flex sticky left-0 top-0 h-screen pt-5 bg-[var(--primary)] text-white text-4xl flex-col justify-between w-[266px]">
        <div>
          <nav className="flex flex-col">
            <Image
              src="/logos/logo.png"
              alt="Logo du club"
              width={150}
              height={150}
              priority
              className="mx-auto"
            />
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-6 py-3 hover:bg-white/50 transition ${
                  pathname === link.href ? "bg-white/50" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="m-5 bg-white text-[var(--primary)] font-semibold py-3 rounded hover:opacity-80 transition"
        >
          Déconnexion
        </button>
      </aside>

      {/* === Menu mobile plein écran === */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-[var(--primary)] flex flex-col items-center justify-center text-white space-y-8 animate-fadeIn">
          {/* Bouton fermer */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fermer le menu"
            className="absolute top-8 right-5"
          >
            <X size={40} />
          </button>

          {/* Logo */}
          <Image
            src="/logos/logo.png"
            alt="Logo du club"
            width={150}
            height={150}
            className="mb-8"
          />

          {/* Liens */}
          <nav className="flex flex-col items-center space-y-6 text-3xl font-semibold">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`transition ${pathname === link.href ? "" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Bouton déconnexion */}
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="mt-10 bg-white text-[var(--primary)] text-3xl font-semibold py-3 px-6 rounded hover:opacity-80 transition"
          >
            Déconnexion
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
