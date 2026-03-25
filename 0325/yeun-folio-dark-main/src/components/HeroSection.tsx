const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground tracking-wide">
          경성대학교 소프트웨어학과 · 2023958001
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6">
          안녕하세요,{" "}
          <span className="text-gradient">강예은</span>
          입니다
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
          소프트웨어 개발에 열정을 가진 학생 개발자입니다.<br />
          다양한 기술을 배우고 성장하고 있습니다.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="#about" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
            About Me
          </a>
          <a href="#skills" className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors">
            기술 스택
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
