import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mountain, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SignIn() {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(formData.email, formData.password);
    
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
          <CardTitle className="text-2xl font-bold">{t('auth.signIn')}</CardTitle>
          <CardDescription>
            Welcome back! Sign in to continue your spiritual journey
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
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
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            
            <div className="flex items-center justify-end">
              <Link 
                to="/auth/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                {t('auth.forgotPassword')}?
              </Link>
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
                  Signing In...
                </>
              ) : (
                t('auth.signIn')
              )}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              {t('auth.dontHaveAccount')}{' '}
              <Link to="/auth/sign-up" className="font-medium text-primary hover:underline">
                {t('auth.signUp')}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}