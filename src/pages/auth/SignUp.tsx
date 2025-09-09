import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Mountain, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function SignUp() {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    city: '',
    country: '',
    email: '',
    password: '',
    confirmPassword: '',
    consent: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.consent) {
      toast({
        title: "Consent required",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    const metadata = {
      full_name: formData.fullName,
      age: parseInt(formData.age),
      city: formData.city,
      country: formData.country,
      language_pref: 'english'
    };

    const { error } = await signUp(formData.email, formData.password, metadata);
    
    if (!error) {
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mountain className="h-8 w-8 text-primary" />
            <span className="font-playfair text-xl font-bold bg-gradient-monastery bg-clip-text text-transparent">
              Monastery360
            </span>
          </div>
          <CardTitle className="text-2xl font-bold">{t('auth.signUp')}</CardTitle>
          <CardDescription>
            Create your account to start exploring Sikkim's monasteries
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('auth.fullName')} *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">{t('auth.age')} *</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  required
                  min="13"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">{t('auth.city')} *</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">{t('auth.country')} *</Label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Your country"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')} *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')} *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('auth.confirmPassword')} *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consent"
                name="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, consent: checked as boolean }))
                }
              />
              <Label htmlFor="consent" className="text-sm">
                {t('auth.consent')}
              </Label>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-monastery hover:shadow-monastery" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                t('auth.signUp')
              )}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              {t('auth.alreadyHaveAccount')}{' '}
              <Link to="/auth/sign-in" className="font-medium text-primary hover:underline">
                {t('auth.signIn')}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}