import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mountain, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase authentication
    console.log("Sign in attempt with:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-muted/30 via-background to-muted/50">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and heading */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Mountain className="h-10 w-10 text-monastery-gold" />
            <span className="font-playfair text-3xl font-bold bg-gradient-monastery bg-clip-text text-transparent">
              MonasteryExplorer
            </span>
          </Link>
          <h2 className="text-2xl font-bold font-playfair text-foreground">
            Welcome Back, Explorer
          </h2>
          <p className="mt-2 text-muted-foreground">
            Continue your spiritual journey through Sikkim
          </p>
        </div>

        {/* Sign in form */}
        <Card className="shadow-monastery">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-playfair text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Access your monastery exploration account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-monastery-gold" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="border-monastery-gold/20 focus:border-monastery-gold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-monastery-gold" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="border-monastery-gold/20 focus:border-monastery-gold pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-monastery-gold/20 text-monastery-gold focus:ring-monastery-gold"
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link 
                  to="/auth/forgot-password" 
                  className="text-sm text-monastery-gold hover:text-monastery-gold/80"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-gradient-monastery hover:shadow-monastery">
                Sign In to Explore
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    New to MonasteryExplorer?
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link 
                  to="/auth/sign-up" 
                  className="text-sm font-medium text-monastery-gold hover:text-monastery-gold/80"
                >
                  Create your free account
                </Link>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                By signing in, you agree to explore responsibly and respect the sacred nature of these sites.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to home */}
        <div className="text-center">
          <Link 
            to="/" 
            className="text-sm text-muted-foreground hover:text-monastery-gold transition-colors"
          >
            ← Back to MonasteryExplorer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;