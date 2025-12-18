import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing!", {
        description: "You'll receive my next article in your inbox.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-8"
          >
            <Mail className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            Join the Newsletter
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Get weekly insights on building profitable products, growing as a developer, 
            and the indie hacker journey. No spam, unsubscribe anytime.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-primary">2,400+</div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-primary">Weekly</div>
              <div className="text-sm text-muted-foreground">Updates</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-primary">Free</div>
              <div className="text-sm text-muted-foreground">Forever</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-card/50 border-border focus:border-primary font-mono"
              required
            />
            <Button type="submit" variant="hero" size="lg" className="shrink-0">
              <Sparkles className="w-4 h-4" />
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to receive emails from me. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
