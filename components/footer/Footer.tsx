"use client";

import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" bg-[var(--background)] text-[var(--text)] pt-30">
      <div className="relative w-full h-16 overflow-hidden bg-[var(--primary)] flex items-center mb-10 md:mb-50">
        <div className="flex whitespace-nowrap animate-scroll text-4xl font-bold">
          {Array(20)
            .fill("C.O.B.B")
            .map((text, i) => (
              <span key={i} className="mx-8">
                {text}
              </span>
            ))}
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        `}</style>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 md:pb-30 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/">
            <Image
              src="/logos/logo.png"
              alt="Logo du club"
              width={200}
              height={200}
              className="mb-3"
            />
          </Link>
        </div>

        {/* Menu rapide */}
        <div className="flex flex-col items-center space-y-7 text-center">
          <Link
            href="/actualites"
            className="text-3xl hover:text-[var(--primary)] transition"
          >
            Actualités
          </Link>
          <Link
            href="/matches"
            className="text-3xl hover:text-[var(--primary)] transition"
          >
            Matchs
          </Link>
          <Link
            href="/classement"
            className="text-3xl hover:text-[var(--primary)] transition"
          >
            Classement
          </Link>
          <Link
            href="/equipe"
            className="text-3xl hover:text-[var(--primary)] transition"
          >
            Histoire
          </Link>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex flex-col items-center  md:items-end space-y-5">
          <h3 className="font-semibold text-3xl mx-auto text-[var(--primary)]">
            Suivez-nous
          </h3>
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com/share/1CYosS81dM/"
              target="_blank"
              aria-label="Facebook"
            >
              <Facebook
                className="hover:text-[var(--primary)] transition"
                size={80}
              />
            </Link>
            <Link
              href="https://www.instagram.com/cobb_basketball/"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram
                className="hover:text-[var(--primary)] transition"
                size={80}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Ligne de bas de page */}
      <div className="mx-30 text-center py-4 text-sm text-gray-500 border-t border-gray-200 dark:border-neutral-700">
        © {new Date().getFullYear()} C.O.B.B | Tous droits réservés.
      </div>
    </footer>
  );
}
