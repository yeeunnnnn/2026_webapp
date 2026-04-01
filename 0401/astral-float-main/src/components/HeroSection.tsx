const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-4xl mx-auto">
        <p
          className="text-neon-magenta font-mono text-sm tracking-widest uppercase mb-6 animate-float"
          style={{ animationDelay: "0.2s" }}
        >
          ✦ Defying Gravity Since 2026
        </p>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-8 animate-float-slow"
        >
          <span className="text-foreground">Welcome to </span>
          <br />
          <span className="text-primary text-glow-cyan">Zero Gravity</span>
        </h1>
        <p
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-float-subtle"
          style={{ animationDelay: "0.4s" }}
        >
          모든 것이 떠오르는 공간. 중력에서 벗어나 자유롭게 부유하는 디지털 경험을 만나보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-lg border-glow-cyan hover:scale-105 transition-transform duration-300">
            Enter the Void
          </button>
          <button className="px-8 py-3 rounded-lg border border-neon-magenta/40 text-neon-magenta font-semibold text-lg hover:border-neon-magenta/80 hover:border-glow-magenta transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
