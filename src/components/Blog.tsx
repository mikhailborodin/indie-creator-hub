import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const posts = [
  {
    title: "How I Built a $12k/mo SaaS in 3 Months",
    excerpt: "The exact playbook I used to go from idea to profitable product, including the mistakes I made along the way.",
    date: "Dec 10, 2024",
    readTime: "8 min read",
    category: "Building in Public",
  },
  {
    title: "The Tech Stack Every Indie Hacker Should Know",
    excerpt: "Stop overthinking your stack. Here's the minimal setup that lets you ship fast and scale when needed.",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    category: "Development",
  },
  {
    title: "Why I Quit My $200k Job to Build Products",
    excerpt: "The story of leaving big tech to become an indie hacker, and what I learned in the first year.",
    date: "Nov 28, 2024",
    readTime: "10 min read",
    category: "Personal",
  },
  {
    title: "Pricing Psychology for Micro-SaaS",
    excerpt: "How to price your product to maximize revenue without losing customers. Real examples included.",
    date: "Nov 20, 2024",
    readTime: "7 min read",
    category: "Business",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

const Blog = () => {
  return (
    <section className="py-24 relative bg-card/30" id="blog">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05),transparent_50%)]" />

      <div className="container px-4 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            Latest Articles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Thoughts on building products, growing businesses, and the indie hacker lifestyle.
          </p>
        </motion.div>

        {/* Blog posts */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-4"
        >
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              variants={item}
              className="group relative rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
                {/* Content */}
                <div className="flex-1">
                  {/* Category */}
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-secondary text-primary mb-3">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-mono mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="md:pl-4">
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.article>
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
            View All Posts
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
