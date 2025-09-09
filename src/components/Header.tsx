import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mountain, Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Virtual Tours", href: "/virtual-tours" },
    { name: "Journey Planner", href: "/journey-planner" },
    { name: "Digital Archive", href: "/digital-archive" },
    { name: "About Sikkim", href: "/about-sikkim" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Mountain className="h-8 w-8 text-monastery-gold" />
            <span className="font-playfair text-2xl font-bold bg-gradient-monastery bg-clip-text text-transparent">
              MonasteryExplorer
            </span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium leading-6 transition-colors hover:text-monastery-gold ${
                location.pathname === item.href ? 'text-monastery-gold' : 'text-muted-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link to="/auth/sign-in">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link to="/auth/sign-up">
            <Button size="sm" className="bg-gradient-monastery hover:shadow-monastery">
              Create Account
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-2 px-6 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent ${
                  location.pathname === item.href ? 'text-monastery-gold bg-accent' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-2 pt-4">
              <Link to="/auth/sign-in" onClick={() => setIsMenuOpen(false)} className="flex-1">
                <Button variant="ghost" size="sm" className="w-full">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth/sign-up" onClick={() => setIsMenuOpen(false)} className="flex-1">
                <Button size="sm" className="w-full bg-gradient-monastery hover:shadow-monastery">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};