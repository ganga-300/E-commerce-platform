import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    setLoading(true);
    try {
      const registerData = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Auto-login after successful registration
      const loginData = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      // Store token and user data
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData.user));

      toast({
        title: "Success",
        description: "Account created successfully! Welcome to StudyStuff!",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 font-handwritten text-graphite hover:text-primary transition-colors"
        >
          ← Back to StudyStuff
        </Link>

        {/* Signup Card */}
        <div className="bg-background hand-drawn-border p-8 sticky-note">
          {/* Pushpin doodle */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blueHighlight rounded-full border-2 border-graphite" />

          <div className="text-center mb-8">
            <div className="inline-block hand-drawn-border bg-blueHighlight/80 px-4 py-2 mb-4">
              <h1 className="font-handwritten text-2xl font-bold text-graphite">
                Join StudyStuff!
              </h1>
            </div>
            <p className="text-muted-foreground">
              Create your account to get started
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name" className="font-handwritten text-graphite">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="hand-drawn-border"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-handwritten text-graphite">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="student@university.edu"
                className="hand-drawn-border"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-handwritten text-graphite">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="hand-drawn-border"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-handwritten text-graphite">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="hand-drawn-border"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 rounded border-graphite" required />
              <span className="text-sm text-muted-foreground">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </div>

            <Button
              type="submit"
              className="w-full hand-drawn-border bg-blueHighlight text-white hover:bg-blueHighlight/90 font-medium font-handwritten text-lg"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-handwritten text-graphite font-bold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>

          {/* Doodle decoration */}
          <div className="mt-6 pt-6 border-t-2 border-dashed border-border">
            <p className="text-center font-handwritten text-sm text-muted-foreground">
              → Start shopping in minutes!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;