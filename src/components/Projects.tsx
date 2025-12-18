import { motion } from "framer-motion";
import { ExternalLink, Github, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "ShipFast",
    description: "SaaS boilerplate for indie hackers. Launch your product in days, not weeks.",
    stats: { mrr: "$12k", users: "2.4k", growth: "+23%" },
    tags: ["Next.js", "Stripe", "Supabase"],
    featured: true,
  },
  {
    title: "WriterAI",
    description: "AI-powered writing assistant for content creators and marketers.",
    stats: { mrr: "$5k", users: "800", growth: "+45%" },
    tags: ["React", "OpenAI", "TailwindCSS"],
    featured: false,
  },
  {
    title: "DevTools Pro",
    description: "A collection of developer tools to boost productivity.",
    stats: { mrr: "$2k", users: "3.2k", growth: "+12%" },
    tags: ["TypeScript", "Chrome Extension"],
    featured: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Projects = () => {
  return (
    <section className="py-24 relative" id="projects">
      <div className="container px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            Projects & Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Building profitable micro-SaaS products and open-source tools.
            Here's what I've been working on.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={item}
              className={`group relative rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-500 ${
                project.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-mono">
                  Featured
                </div>
              )}

              {/* Card gradient overlay on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Title and links */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold font-mono group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href="#"
                      className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-all"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-sm font-mono">{project.stats.mrr}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-mono">{project.stats.users}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-mono">{project.stats.growth}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
