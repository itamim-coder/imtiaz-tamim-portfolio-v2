import { AboutSection } from "@/components/AboutSection";
import { CommitHistorySection } from "@/components/CommitHistorySection";
import { Hero } from "@/components/Hero";
import { SelectedWorkSection } from "@/components/SelectedWorkSection";
import { SkillsSection } from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <SelectedWorkSection />
      <AboutSection />
      <SkillsSection />
      <CommitHistorySection />
    </main>
  );
}
