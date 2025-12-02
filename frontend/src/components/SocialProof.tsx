import { Check } from "lucide-react";

export const SocialProof = () => {
  const stats = [
    { number: "5,000+", label: "Happy Students" },
    { number: "10+", label: "Campus Partners" },
    { number: "15,000+", label: "Orders Delivered" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main stamp */}
          <div className="text-center mb-16">
            <div className="inline-block relative stamp-slam">
              <div className="hand-drawn-border rounded-full p-8 bg-accent/10 transform -rotate-6">
                <div className="text-center">
                  <Check className="w-12 h-12 text-accent mx-auto mb-2" />
                  <div className="font-handwritten text-3xl font-bold text-graphite">
                    Trusted by
                  </div>
                  <div className="font-handwritten text-5xl font-bold text-accent">
                    5,000+
                  </div>
                  <div className="font-handwritten text-xl text-graphite">
                    Students
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="hand-drawn-border bg-card p-6 hover:bg-yellowHighlight/10 transition-colors duration-300">
                  <div className="font-handwritten text-4xl font-bold text-graphite mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-16 bg-background hand-drawn-border p-8 max-w-2xl mx-auto page-curl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellowHighlight/30 flex items-center justify-center hand-drawn-border">
                <span className="font-handwritten text-2xl">✓</span>
              </div>
              <div>
                <p className="text-lg text-foreground italic mb-4">
                  "StudyStuff saved me so much time during finals week. Same-day delivery meant I could keep studying without leaving my dorm!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blueHighlight/30 hand-drawn-border" />
                  <div>
                    <div className="font-handwritten text-lg font-bold text-graphite">
                      Sarah M.
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Junior, Computer Science
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
