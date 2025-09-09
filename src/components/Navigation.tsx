import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Mountain, Menu, X, User, LogOut, Settings, MapPin, MessageSquareText } from 'lucide-react'; // Add MessageSquareText
import { LanguageDropdown } from './LanguageDropdown';
import { useAuth } from '@/contexts/AuthContext';

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.tours'), href: '/virtual-tours' },
    { name: t('nav.plan'), href: '/journey-planner' },
    { name: t('nav.archive'), href: '/digital-archive' },
    { name: t('nav.about'), href: '/about-sikkim' },
    { name: t('nav.community'), href: '/community' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Mountain className="h-8 w-8 text-primary" />
            <span className="font-playfair text-xl font-bold bg-gradient-monastery bg-clip-text text-transparent">
              Monastery360
            </span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
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

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium leading-6 transition-colors hover:text-primary ${
                location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
          {/* New Travel Companion link */}
          <Link
            to="/travel-companion"
            className={`text-sm font-medium leading-6 transition-colors hover:text-primary ${
              location.pathname === '/travel-companion' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Travel Companion
          </Link>
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
          <LanguageDropdown />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>{user.email?.split('@')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border-border z-50">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    {t('nav.profile')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile/itineraries" className="cursor-pointer">
                    <MapPin className="mr-2 h-4 w-4" />
                    {t('nav.myItinerary')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth/sign-in">
                <Button variant="ghost" size="sm">
                  {t('nav.signIn')}
                </Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button size="sm" className="bg-gradient-monastery hover:shadow-monastery">
                  {t('nav.signUp')}
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="space-y-2 px-6 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent ${
                  location.pathname === item.href ? 'text-primary bg-accent' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* New Travel Companion link */}
            <Link
              to="/travel-companion"
              onClick={() => setIsMenuOpen(false)}
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent ${
                location.pathname === '/travel-companion' ? 'text-primary bg-accent' : 'text-muted-foreground'
              }`}
            >
              Travel Companion
            </Link>
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Language</span>
                <LanguageDropdown />
              </div>
              
              {user ? (
                <div className="space-y-2">
                  <Link 
                    to="/profile" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
                  >
                    <User className="h-4 w-4" />
                    {t('nav.profile')}
                  </Link>
                  <Link 
                    to="/profile/itineraries" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
                  >
                    <MapPin className="h-4 w-4" />
                    {t('nav.myItinerary')}
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    {t('nav.signOut')}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/auth/sign-in" onClick={() => setIsMenuOpen(false)} className="flex-1">
                    <Button variant="ghost" size="sm" className="w-full">
                      {t('nav.signIn')}
                    </Button>
                  </Link>
                  <Link to="/auth/sign-up" onClick={() => setIsMenuOpen(false)} className="flex-1">
                    <Button size="sm" className="w-full bg-gradient-monastery hover:shadow-monastery">
                      {t('nav.signUp')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};