import { Package, Zap, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Curated Collections",
    description: "Handpicked study essentials from trusted brands, tested by students.",
    color: "yellowHighlight",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Same-day delivery to your dorm room. Order before 3 PM for evening delivery.",
    color: "blueHighlight",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "100% satisfaction guarantee. Not happy? We'll make it right.",
    color: "accent",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Student support team available around the clock for your questions.",
    color: "yellowHighlight",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-card/30" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-handwritten text-4xl md:text-5xl font-bold text-graphite mb-4">
            Why Students Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to ace your studies, delivered with care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-background hand-drawn-border p-6 page-curl group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-lg bg-${feature.color}/20 mb-4`}>
                <feature.icon className="w-6 h-6 text-graphite" />
              </div>
              
              <h3 className="font-handwritten text-xl font-bold text-graphite mb-2">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground">
                {feature.description}
              </p>

              {/* Doodle element */}
              <div className="mt-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-handwritten text-sm text-graphite">
                  → Learn more
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
