import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mountain, Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase password reset
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-muted/30 via-background to-muted/50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Mountain className="h-10 w-10 text-monastery-gold" />
              <span className="font-playfair text-3xl font-bold bg-gradient-monastery bg-clip-text text-transparent">
                MonasteryExplorer
              </span>
            </Link>
          </div>

          <Card className="shadow-monastery">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-monastery rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-bold font-playfair text-foreground">
                  Check Your Email
                </h2>
                <p className="text-muted-foreground">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or click below to try again.
                </p>
                
                <Button 
                  onClick={() => setIsSubmitted(false)} 
                  variant="outline" 
                  className="w-full"
                >
                  Try Different Email
                </Button>
                
                <Link to="/auth/sign-in">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            Reset Your Password
          </h2>
          <p className="mt-2 text-muted-foreground">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {/* Password reset form */}
        <Card className="shadow-monastery">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-playfair text-center">Forgot Password</CardTitle>
            <CardDescription className="text-center">
              We'll help you get back to exploring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-monastery-gold" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-monastery-gold/20 focus:border-monastery-gold"
                />
                <p className="text-xs text-muted-foreground">
                  Enter the email associated with your MonasteryExplorer account
                </p>
              </div>

              <Button type="submit" className="w-full bg-gradient-monastery hover:shadow-monastery">
                Send Reset Link
              </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Remember your password?
                  </span>
                </div>
              </div>

              <Link 
                to="/auth/sign-in" 
                className="inline-flex items-center text-sm font-medium text-monastery-gold hover:text-monastery-gold/80"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Sign In
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/auth/sign-up" className="text-monastery-gold hover:underline">
                  Create one here
                </Link>
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

export default ForgotPassword;