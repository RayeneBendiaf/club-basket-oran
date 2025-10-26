"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import Image from "next/image";

interface LinkItem {
  name: string;
  href: string;
}

const Sidebar: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  const links: LinkItem[] = [
    { name: "Tableau de bord", href: "/admin/dashboard" },
    { name: "Matches", href: "/admin/dashboard/matches" },
    { name: "Équipes", href: "/admin/dashboard/equipes" },
    { name: "Actualités", href: "/admin/dashboard/actualites" },
    { name: "Classement", href: "/admin/dashboard/classement" },
  ];

  return (
    <aside className=" sticky left-0 top-0 h-screen pt-5 bg-[var(--primary)] text-4xl flex flex-col justify-between lg:w-[266px]">
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
  );
};

export default Sidebar;
