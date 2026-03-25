const skills = [
  { name: "C", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "Java", category: "Language" },
  { name: "HTML", category: "Web" },
  { name: "CSS", category: "Web" },
  { name: "JavaScript", category: "Web" },
  { name: "SQL", category: "Database" },
  { name: "Oracle", category: "Database" },
  { name: "Git & GitHub", category: "Tool" },
  { name: "VS Code", category: "Tool" },
  { name: "Eclipse", category: "Tool" },
];

const categoryColors: Record<string, string> = {
  Language: "border-primary/60 bg-primary/5",
  Web: "border-sky-500/40 bg-sky-500/5",
  Database: "border-amber-500/40 bg-amber-500/5",
  Tool: "border-violet-500/40 bg-violet-500/5",
};

const categoryDots: Record<string, string> = {
  Language: "bg-primary",
  Web: "bg-sky-400",
  Database: "bg-amber-400",
  Tool: "bg-violet-400",
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
          Tech <span className="text-primary">Stack</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-6" />
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-10 text-sm text-muted-foreground">
          {Object.entries(categoryDots).map(([cat, dotClass]) => (
            <span key={cat} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dotClass}`} />
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`p-5 rounded-xl border ${categoryColors[skill.category]} backdrop-blur-sm hover:scale-105 transition-transform cursor-default`}
            >
              <p className="font-medium text-foreground text-sm">{skill.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{skill.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
