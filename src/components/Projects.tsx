import { motion } from "framer-motion";
import { ExternalLink, Github, Users, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "./ui/skeleton";

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
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

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
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card/50 p-6">
                <Skeleton className="h-6 w-2/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                <div className="flex gap-2 mb-6">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ))
          ) : projects && projects.length > 0 ? (
            projects.map((project) => (
              <motion.div
                key={project.id}
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
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-all"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {project.description && (
                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>
                  )}

                  {/* Stats */}
                  {(project.revenue || project.users_count) && (
                    <div className="flex gap-4 mb-6">
                      {project.revenue && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="text-sm font-mono">{project.revenue}</span>
                        </div>
                      )}
                      {project.users_count && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-mono">{project.users_count}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <p>No projects yet. Check back soon!</p>
            </div>
          )}
        </motion.div>

        {/* View all CTA */}
        {projects && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <a href="#projects">View All Projects</a>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;