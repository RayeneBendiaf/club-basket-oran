import { Metadata } from "next";

import Sidebar from "@/components/navigation/Sidebar";

export const metadata: Metadata = {
  title: "C.O.B.B - Administrateur",
  description: "Site officiel du Club Oranais de Basketball.",
  icons: {
    icon: "/logos/logo.png",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-3 md:p-8 overflow-y-auto">{children}</div>
    </div>
  );
}
