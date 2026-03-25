import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <main className="bg-background text-foreground min-h-screen">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <Footer />
  </main>
);

export default Index;
