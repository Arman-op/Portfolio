export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Cyberpunk CRM",
      category: "Full-Stack App",
      description: "A customer relationship manager with a neon futuristic aesthetic. Built with Next.js and Supabase.",
      link: "#"
    },
    {
      id: 2,
      title: "8-Bit Taskmaster",
      category: "Productivity",
      description: "A gamified to-do list where completing tasks earns you XP. React Native and Firebase.",
      link: "#"
    },
    {
      id: 3,
      title: "Pixel Portfolio",
      category: "Web Frontend",
      description: "This very website. Built with Tailwind CSS v4, Next.js, and Framer Motion.",
      link: "#"
    },
    {
      id: 4,
      title: "Neon E-Commerce",
      category: "Full-Stack Shop",
      description: "An online store template featuring Stripe integration and a custom shopping cart.",
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 px-8 max-w-6xl mx-auto">
      <div className="pixel-border-magenta p-2 inline-block bg-neo-bg mb-12">
        <h2 className="text-4xl text-neo-magenta uppercase px-4 py-2">Game Cartridges</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project) => (
          <div key={project.id} className="pixel-border bg-neo-bg flex flex-col h-full hover:-translate-y-2 transition-transform duration-200">
            {/* Cartridge "Header" */}
            <div className="h-48 bg-zinc-800 border-b-4 border-neo-white relative overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                {/* Abstract pixel pattern placeholder */}
                <div className="w-16 h-16 bg-neo-cyan pixel-border-magenta"></div>
              </div>
              <div className="absolute top-4 right-4 bg-neo-bg pixel-border px-2 text-sm">
                {project.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-neo-white mb-2">{project.title}</h3>
              <p className="text-lg text-zinc-400 mb-6 flex-grow">{project.description}</p>
              
              <a 
                href={project.link}
                className="pixel-btn bg-neo-cyan text-neo-bg text-xl px-4 py-3 text-center font-bold uppercase mt-auto"
              >
                Start Mission
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
