import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/Navbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <Navbar />
      {children}
    </AppShell>
  );
}
