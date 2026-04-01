interface TechBadgeProps {
  label: string;
  color?: "cyan" | "magenta" | "green";
  delay?: number;
}

const colorMap = {
  cyan: "border-neon-cyan/30 text-neon-cyan text-glow-cyan",
  magenta: "border-neon-magenta/30 text-neon-magenta text-glow-magenta",
  green: "border-neon-green/30 text-neon-green text-glow-green",
};

const TechBadge = ({ label, color = "cyan", delay = 0 }: TechBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full border text-xs font-mono font-medium animate-float-subtle ${colorMap[color]}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {label}
    </span>
  );
};

export default TechBadge;
