import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await authService.login(formData);

      // Store token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast({
        title: "Success",
        description: "Logged in successfully!",
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

        {/* Login Card */}
        <div className="bg-background hand-drawn-border p-8 sticky-note">
          {/* Pushpin doodle */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-destructive rounded-full border-2 border-graphite" />

          <div className="text-center mb-8">
            <div className="inline-block hand-drawn-border bg-yellowHighlight px-4 py-2 mb-4">
              <h1 className="font-handwritten text-2xl font-bold text-graphite">
                Welcome Back!
              </h1>
            </div>
            <p className="text-muted-foreground">
              Log in to your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-graphite" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-sm text-graphite hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full hand-drawn-border bg-yellowHighlight text-graphite hover:bg-yellowHighlight/90 font-medium font-handwritten text-lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-handwritten text-graphite font-bold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Doodle decoration */}
          <div className="mt-6 pt-6 border-t-2 border-dashed border-border">
            <p className="text-center font-handwritten text-sm text-muted-foreground">
              → Quick access to your study essentials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;