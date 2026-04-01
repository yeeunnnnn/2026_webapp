const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border/50 py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm font-mono animate-float-subtle">
            © 2026 AntiGravity — 중력을 거스르다
          </p>
          <div className="flex gap-6">
            {["GitHub", "Twitter", "Discord"].map((link, i) => (
              <a
                key={link}
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm animate-float"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
