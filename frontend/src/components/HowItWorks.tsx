export const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Browse & Select",
      description: "Choose from our curated collection of study essentials",
      color: "yellowHighlight",
      rotation: "-rotate-2",
    },
    {
      number: "2",
      title: "Quick Checkout",
      description: "Simple checkout with student discounts automatically applied",
      color: "blueHighlight",
      rotation: "rotate-1",
    },
    {
      number: "3",
      title: "Fast Delivery",
      description: "Get your items delivered to your dorm the same day",
      color: "accent",
      rotation: "-rotate-1",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block hand-drawn-border bg-yellowHighlight/20 px-4 py-2 mb-4 sticky-note">
            <span className="font-handwritten text-lg text-graphite">
              Super Simple Process
            </span>
          </div>
          <h2 className="font-handwritten text-4xl md:text-5xl font-bold text-graphite mb-4">
            How It Works
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 -z-10">
            <div 
              className="h-full bg-graphite transition-all duration-1000" 
              style={{ width: '100%' }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Sticky note */}
                <div 
                  className={`bg-${step.color}/90 hand-drawn-border p-6 ${step.rotation} sticky-note hover:rotate-0 transition-transform duration-300`}
                >
                  <div className="relative z-10">
                    <div className="font-handwritten text-4xl font-bold text-graphite mb-2">
                      {step.number}
                    </div>
                    <h3 className="font-handwritten text-2xl font-bold text-graphite mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-graphite/80">
                      {step.description}
                    </p>
                  </div>

                  {/* Push pin doodle */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-destructive rounded-full border-2 border-graphite" />
                </div>

                {/* Arrow connector (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-graphite"
                    >
                      <path
                        d="M5 12h14m-6-6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
