export default function Experience() {
  const quests = [
    {
      id: 1,
      title: "Open Source Contributor",
      company: "Google Summer of Code (Haskell Foundation)",
      duration: "May 2026 - August 2026",
      description: "Contributing to the top open-source organization known as Haskell Foundation.",
      status: "ACTIVE"
    },
    {
      id: 2,
      title: "Software Developer Intern",
      company: "BlueStock",
      duration: "May 2025 - July 2025",
      description: "Developed and deployed a full-stack IPO listing and admin platform using the MERN stack, achieving 99% uptime on Render and Vercel. Engineered 7+ scalable RESTful APIs with JWT-based authorization and optimized MongoDB performance to reduce response times by 40%. Built modular, mobile-first React components and conducted rigorous unit testing to ensure a highly reliable system.",
      status: "COMPLETED"
    }
  ];

  return (
    <section id="experience" className="py-20 px-8 max-w-4xl mx-auto">
      <div className="pixel-border-cyan p-2 inline-block bg-neo-bg mb-12">
        <h2 className="text-4xl text-neo-cyan uppercase px-4 py-2">Quest Log</h2>
      </div>

      <div className="relative border-l-4 border-neo-white ml-6 pl-10 space-y-12">
        {quests.map((quest) => (
          <div key={quest.id} className="relative">
            {/* Timeline Node */}
            <div className={`absolute -left-[3.5rem] w-8 h-8 pixel-border ${quest.status === 'ACTIVE' ? 'bg-neo-magenta' : 'bg-neo-bg'} flex items-center justify-center`}>
               {quest.status === 'ACTIVE' && <div className="w-2 h-2 bg-neo-white animate-pulse"></div>}
            </div>

            <div className="pixel-border bg-neo-bg p-6 hover:translate-x-2 transition-transform duration-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b-4 border-neo-white/20 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-neo-white">{quest.title}</h3>
                  <p className="text-xl text-neo-cyan">{quest.company}</p>
                </div>
                <div className="mt-2 md:mt-0 pixel-border px-3 py-1 bg-zinc-800 text-neo-white">
                  {quest.duration}
                </div>
              </div>
              <p className="text-lg text-zinc-300">
                {quest.description}
              </p>
              <div className="mt-4 text-sm text-neo-magenta flex items-center gap-2">
                <span className="uppercase">[Status: {quest.status}]</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
