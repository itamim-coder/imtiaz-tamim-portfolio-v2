import { AboutSection } from "@/components/AboutSection";
import { BlogSection } from "@/components/BlogSection";
import { CommitHistorySection } from "@/components/CommitHistorySection";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { SelectedWorkSection } from "@/components/SelectedWorkSection";
import { PortfolioGridSection } from "@/components/PortfolioGridSection";
import { SkillsSection } from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <SelectedWorkSection />
      <PortfolioGridSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <CommitHistorySection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}

