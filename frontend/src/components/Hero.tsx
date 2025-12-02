import { Button } from "@/components/ui/button";
import { ArrowRight, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-block hand-drawn-border bg-blueHighlight/10 px-4 py-2 sticky-note">
              <span className="font-handwritten text-lg text-graphite">
                ✏️ Student-Approved Essentials
              </span>
            </div>

            <h1 className="font-handwritten text-5xl md:text-6xl lg:text-7xl font-bold text-graphite leading-tight">
              Study Essentials
              <br />
              <span className="pencil-underline">
                Without Leaving Campus
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Get all your notebooks, pens, snacks, and study gear delivered right to your dorm.
              Handpicked for students, by students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="hand-drawn-border bg-yellowHighlight text-graphite hover:bg-yellowHighlight/90 font-semibold text-lg group"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="hand-drawn-border font-semibold text-lg"
              >
                Browse Categories
              </Button>
            </div>

            {/* Doodle elements */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center hand-drawn-border">
                  <span className="font-handwritten text-2xl">✓</span>
                </div>
                <span className="text-sm font-medium">Free Campus<br />Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-yellowHighlight/20 flex items-center justify-center hand-drawn-border">
                  <span className="font-handwritten text-2xl">★</span>
                </div>
                <span className="text-sm font-medium">Student<br />Discounts</span>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative aspect-square bg-card hand-drawn-border p-8 page-curl flex items-center justify-center">
              <img
                src="/school-bag-3d.png"
                alt="Student Essentials School Bag"
                className="w-[120%] h-[120%] object-contain -mt-8 hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
              />
            </div>

            {/* Floating doodles */}
            <Pencil className="absolute -top-4 -right-4 w-8 h-8 text-graphite wiggle" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blueHighlight/30 rounded-full hand-drawn-border" />
          </div>
        </div>
      </div>
    </section>
  );
};
