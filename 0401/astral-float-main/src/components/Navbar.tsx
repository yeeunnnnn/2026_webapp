import { Rocket } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-float-subtle">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 animate-float-slow">
          <Rocket className="w-6 h-6 text-primary text-glow-cyan" />
          <span className="text-xl font-bold font-display text-foreground tracking-tight">
            Anti<span className="text-primary text-glow-cyan">Gravity</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Explore", "Zero-G Lab", "Mission", "Contact"].map((item, i) => (
            <a
              key={item}
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium animate-float"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {item}
            </a>
          ))}
        </div>
        <button className="px-4 py-2 rounded-lg border border-primary/30 text-primary text-sm font-medium hover:border-primary/60 hover:border-glow-cyan transition-all duration-300">
          Launch
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
