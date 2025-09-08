import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mountain, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
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
    console.log("Sign up attempt with:", formData);
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
            Begin Your Sacred Journey
          </h2>
          <p className="mt-2 text-muted-foreground">
            Create your free account to explore Sikkim's monasteries
          </p>
        </div>

        {/* Sign up form */}
        <Card className="shadow-monastery">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-playfair text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Join thousands of spiritual explorers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-monastery-gold" />
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Your unique username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="border-monastery-gold/20 focus:border-monastery-gold"
                />
              </div>

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
                    placeholder="Create a strong password"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-monastery-gold" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border-monastery-gold/20 focus:border-monastery-gold"
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-monastery hover:shadow-monastery">
                Create My Account
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link 
                  to="/auth/sign-in" 
                  className="text-sm font-medium text-monastery-gold hover:text-monastery-gold/80"
                >
                  Sign in to your account
                </Link>
              </div>
            </div>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-monastery-gold hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-monastery-gold hover:underline">Privacy Policy</a>
            </p>
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

export default SignUp;