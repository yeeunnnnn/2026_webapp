import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FloatingCard from "@/components/FloatingCard";
import TechBadge from "@/components/TechBadge";
import Footer from "@/components/Footer";

const CARDS = [
  { title: "Quantum Drift", delay: 0 },
  { title: "Neural Float", delay: 0.5 },
  { title: "Void Walker", delay: 1.0 },
  { title: "Dark Matter", delay: 1.5 },
  { title: "Photon Surf", delay: 2.0 },
  { title: "Star Pulse", delay: 0.8 },
];

const BADGES: { label: string; color: "cyan" | "magenta" | "green"; delay: number }[] = [
  { label: "React 18", color: "cyan", delay: 0 },
  { label: "TypeScript", color: "magenta", delay: 0.2 },
  { label: "Tailwind CSS", color: "green", delay: 0.4 },
  { label: "Framer Motion", color: "cyan", delay: 0.6 },
  { label: "Vite", color: "magenta", delay: 0.8 },
  { label: "Zero Gravity", color: "green", delay: 1.0 },
];

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />

        {/* Tech Badges */}
        <section className="container mx-auto px-6 py-12">
          <div className="flex flex-wrap justify-center gap-3">
            {BADGES.map((badge) => (
              <TechBadge
                key={badge.label}
                label={badge.label}
                color={badge.color}
                delay={badge.delay}
              />
            ))}
          </div>
        </section>

        {/* Floating Cards */}
        <section className="container mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-4 animate-float-slow text-foreground">
            Floating <span className="text-neon-magenta text-glow-magenta">Modules</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 animate-float-subtle" style={{ animationDelay: "0.3s" }}>
            각각의 모듈이 고유한 궤도를 따라 움직입니다
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARDS.map((card) => (
              <FloatingCard key={card.title} title={card.title} delay={card.delay} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
