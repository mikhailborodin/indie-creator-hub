import { motion } from "framer-motion";
import { Code, Rocket, Coffee, Heart } from "lucide-react";

const stats = [
  { label: "Years Building", value: "7+" },
  { label: "Products Launched", value: "12" },
  { label: "GitHub Stars", value: "8k+" },
  { label: "Newsletter Subs", value: "2.4k" },
];

const About = () => {
  return (
    <section className="py-24 relative" id="about">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
              About
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">
              Building the Future,
              <br />
              <span className="text-gradient">One Product at a Time</span>
            </h2>

            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm a software engineer turned indie hacker. After spending 10+ years
                at big tech companies, I decided to take the leap and build my own products.
              </p>
              <p>
                Now I run a portfolio of micro-SaaS products generating over $19k/mo in revenue.
                I share everything I learn along the way — the wins, the failures, and the 
                lessons in between.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new coffee shops, reading about 
                business strategy, or mentoring aspiring indie hackers.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Code, label: "Ship Fast" },
                { icon: Rocket, label: "Build in Public" },
                { icon: Coffee, label: "Stay Caffeinated" },
                { icon: Heart, label: "Help Others" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card/30"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="font-mono text-sm">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats and visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorative card */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl" />
              
              {/* Main card */}
              <div className="relative rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-8">
                {/* Terminal-style header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-4 text-sm text-muted-foreground font-mono">stats.json</span>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-4 rounded-xl bg-secondary/30"
                    >
                      <div className="text-3xl md:text-4xl font-bold font-mono text-primary mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Code snippet decoration */}
                <div className="mt-6 p-4 rounded-lg bg-background/50 font-mono text-sm">
                  <span className="text-muted-foreground">{"// "}</span>
                  <span className="text-primary">status</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-green-500 dark:text-green-400">"building"</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
