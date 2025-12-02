import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-graphite bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="hand-drawn-border bg-yellowHighlight px-3 py-1 sticky-note">
              <h1 className="font-handwritten text-xl font-bold text-graphite">
                StudyStuff
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#products"
              className="relative font-medium text-foreground transition-all hover:text-primary group"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-graphite transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#features"
              className="relative font-medium text-foreground transition-all hover:text-primary group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-graphite transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#contact"
              className="relative font-medium text-foreground transition-all hover:text-primary group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-graphite transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-yellowHighlight/20"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs text-white flex items-center justify-center font-bold">
                  0
                </span>
              </Button>
            </Link>

            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="hand-drawn-border font-medium"
                >
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="hand-drawn-border bg-yellowHighlight text-graphite hover:bg-yellowHighlight/90 font-medium"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
