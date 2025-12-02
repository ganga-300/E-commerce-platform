import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Main content with highlighted background */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-yellowHighlight/40 transform -rotate-1 rounded-lg" />
            <div className="relative px-8 py-6">
              <h2 className="font-handwritten text-4xl md:text-5xl font-bold text-graphite mb-4">
                Ready to Simplify Your
                <br />
                Study Life?
              </h2>
            </div>
          </div>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who trust StudyStuff for their study essentials.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="hand-drawn-border bg-accent text-white hover:bg-accent/90 font-semibold text-lg group"
            >
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <div className="flex items-center gap-2">
              <div className="font-handwritten text-lg text-graphite">
                or
              </div>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="hand-drawn-border font-semibold text-lg"
              >
                View All Products
              </Button>
            </div>
          </div>

          {/* Floating doodles */}
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
            <div className="w-16 h-16 bg-blueHighlight/30 rounded-full hand-drawn-border" />
          </div>
          <div className="absolute -right-8 top-1/3 transform -translate-y-1/2">
            <svg className="w-20 h-20 text-graphite wiggle" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          {/* Pencil pointer */}
          <div className="mt-8">
            <div className="inline-block animate-bounce">
              <svg
                className="w-8 h-8 text-graphite"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
