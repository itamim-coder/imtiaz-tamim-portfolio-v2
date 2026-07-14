import { CommitHistorySection } from "@/components/CommitHistorySection";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <CommitHistorySection />
    </main>
  );
}
