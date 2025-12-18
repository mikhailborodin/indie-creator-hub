import { Github, Twitter, Mail, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <div className="font-mono font-bold text-xl mb-2">
              <span className="text-gradient">mikhail.dev</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Building products, sharing the journey.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {["Projects", "Blog", "About", "Newsletter"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "#", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-all duration-300"
                aria-label={label}
              >
                <Icon className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Mikhail Borodin. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> and lots of coffee
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
