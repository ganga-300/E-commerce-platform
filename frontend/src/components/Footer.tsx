import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    Shop: ["All Products", "Notebooks", "Writing Tools", "Snacks", "Organization"],
    Support: ["Help Center", "Track Order", "Returns", "Shipping Info", "Contact Us"],
    Company: ["About Us", "Careers", "Campus Partners", "Student Discount", "Blog"],
  };

  return (
    <footer className="relative bg-card border-t-2 border-graphite pt-16 pb-8">
      {/* Torn paper edge effect */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-background">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 12"
          fill="none"
        >
          <path
            d="M0 0L50 8L100 4L150 10L200 2L250 12L300 5L350 9L400 3L450 11L500 6L550 8L600 4L650 10L700 2L750 12L800 5L850 9L900 3L950 11L1000 6L1050 8L1100 4L1150 10L1200 2V12H0V0Z"
            fill="hsl(var(--card))"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="hand-drawn-border bg-yellowHighlight px-4 py-2 inline-block mb-4">
              <h3 className="font-handwritten text-2xl font-bold text-graphite">
                StudyStuff
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Your trusted source for study essentials. Handpicked for students, delivered to your dorm.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-full bg-graphite/10 flex items-center justify-center hand-drawn-border hover:bg-yellowHighlight/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-graphite" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-handwritten text-xl font-bold text-graphite mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors relative group"
                    >
                      {link}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-graphite transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t-2 border-dashed border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 StudyStuff. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Small doodle */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <span className="font-handwritten text-sm">Made with</span>
              <span className="text-destructive">♥</span>
              <span className="font-handwritten text-sm">for students</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
