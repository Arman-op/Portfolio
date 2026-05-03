import { Code, Terminal, Database, Smartphone, Globe, Cpu } from "lucide-react";

export default function Skills() {
  const skills = [
    { name: "React / Next.js", level: 90, icon: <Globe strokeWidth={3} strokeLinejoin="miter" /> },
    { name: "TypeScript", level: 85, icon: <Code strokeWidth={3} strokeLinejoin="miter" /> },
    { name: "Node.js", level: 80, icon: <Terminal strokeWidth={3} strokeLinejoin="miter" /> },
    { name: "Tailwind CSS", level: 95, icon: <Smartphone strokeWidth={3} strokeLinejoin="miter" /> },
    { name: "Databases (SQL/NoSQL)", level: 75, icon: <Database strokeWidth={3} strokeLinejoin="miter" /> },
    { name: "System Architecture", level: 80, icon: <Cpu strokeWidth={3} strokeLinejoin="miter" /> },
  ];

  return (
    <section id="skills" className="py-20 px-8 max-w-4xl mx-auto">
      <div className="pixel-border p-2 inline-block bg-neo-bg mb-12">
        <h2 className="text-4xl text-neo-white uppercase px-4 py-2">Player Stats</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <div key={index} className="pixel-border bg-neo-bg p-4 flex items-center gap-4">
            <div className="w-16 h-16 bg-zinc-800 pixel-border flex items-center justify-center text-neo-cyan">
              {skill.icon}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between mb-2">
                <h3 className="text-xl text-neo-white">{skill.name}</h3>
                <span className="text-neo-magenta">LVL {Math.floor(skill.level / 10)}</span>
              </div>
              
              {/* Stat Bar */}
              <div className="h-6 bg-zinc-800 pixel-border relative overflow-hidden w-full">
                <div 
                  className="h-full bg-neo-cyan"
                  style={{ width: `${skill.level}%` }}
                >
                  {/* Pattern inside the bar to make it look 8-bit */}
                  <div className="w-full h-full opacity-30" 
                    style={{
                      backgroundImage: "linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.5) 50%)",
                      backgroundSize: "10px 10px"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
