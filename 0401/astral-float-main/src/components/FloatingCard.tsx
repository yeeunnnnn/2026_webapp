interface FloatingCardProps {
  title: string;
  delay: number;
}

const FloatingCard = ({ title, delay }: FloatingCardProps) => {
  return (
    <div
      className="rounded-xl border border-border bg-card/60 backdrop-blur-md p-6 animate-float hover:border-primary/50 hover:border-glow-cyan transition-all duration-500 group"
      style={{ animationDelay: `${delay}s`, animationDuration: `${3 + delay}s` }}
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
      </div>
      <h3 className="text-lg font-semibold font-display text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        무중력 상태에서 자유롭게 떠다니는 모듈. 각각의 카드가 고유한 리듬으로 부유합니다.
      </p>
    </div>
  );
};

export default FloatingCard;
