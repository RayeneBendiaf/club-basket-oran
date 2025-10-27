"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  // ✅ Masquer / afficher la navbar selon le scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* NAVBAR principale */}
      <nav
        className={`bg-[var(--background)] shadow-md fixed w-full top-0 left-0 transition-transform duration-1000 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } z-40`}
      >
        <div className="md:mr-40 px-4 py-1 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logos/logo.png"
              alt="Logo du club"
              width={150}
              height={150}
              priority
              className="hidden md:block"
            />
            <Image
              src="/logos/logo.png"
              alt="Logo du club"
              width={70}
              height={70}
              priority
              className="block md:hidden"
            />
          </Link>

          {/* Menu desktop */}
          <div className="hidden md:flex space-x-10 p-7">
            <Link
              href="/actualites"
              className="text-4xl hover:text-[var(--primary)] transition"
            >
              Actualités
            </Link>
            <Link
              href="/matches"
              className="text-4xl hover:text-[var(--primary)] transition"
            >
              Matchs
            </Link>
            <Link
              href="/classement"
              className="text-4xl hover:text-[var(--primary)] transition"
            >
              Classement
            </Link>
            <Link
              href="/equipe"
              className="text-4xl hover:text-[var(--primary)] transition"
            >
              Histoire
            </Link>
          </div>

          {/* Bouton burger mobile */}
          <button className="md:hidden" onClick={toggleMenu} aria-label="Menu">
            {isOpen ? <X size={40} /> : <Menu size={40} />}
          </button>
        </div>
      </nav>

      {/* ✅ MENU MOBILE FULLSCREEN */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-[var(--background)] flex flex-col items-center justify-center space-y-10 animate-fadeIn">
          <Link href="/" onClick={toggleMenu}>
            <Image
              src="/logos/logo.png"
              alt="Logo du club"
              width={150}
              height={150}
              className="mb-10"
            />
          </Link>

          <Link
            href="/actualites"
            onClick={toggleMenu}
            className="text-3xl font-semibold hover:text-[var(--primary)] transition"
          >
            Actualités
          </Link>
          <Link
            href="/matches"
            onClick={toggleMenu}
            className="text-3xl font-semibold hover:text-[var(--primary)] transition"
          >
            Matchs
          </Link>
          <Link
            href="/classement"
            onClick={toggleMenu}
            className="text-3xl font-semibold hover:text-[var(--primary)] transition"
          >
            Classement
          </Link>
          <Link
            href="/equipe"
            onClick={toggleMenu}
            className="text-3xl font-semibold hover:text-[var(--primary)] transition"
          >
            Histoire
          </Link>

          {/* Bouton fermer */}
          <button
            onClick={toggleMenu}
            className="absolute top-8 right-5"
            aria-label="Fermer le menu"
          >
            <X size={40} />
          </button>
        </div>
      )}
    </>
  );
}
