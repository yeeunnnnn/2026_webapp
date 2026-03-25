import { User, Calendar, GraduationCap } from "lucide-react";

const infoItems = [
  { icon: User, label: "이름", value: "강예은" },
  { icon: Calendar, label: "생년월일", value: "2003.12.03" },
  { icon: GraduationCap, label: "소속", value: "경성대학교 소프트웨어학과" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
          About <span className="text-primary">Me</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-12" />
        
        <div className="grid md:grid-cols-3 gap-6">
          {infoItems.map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors group"
            >
              <item.icon className="w-5 h-5 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
              <p className="text-foreground font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
