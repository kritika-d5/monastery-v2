import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'english', name: 'English', nativeName: 'English' },
  { code: 'hindi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'nepali', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'bhutia', name: 'Bhutia', nativeName: 'Bhutia' },
  { code: 'lepcha', name: 'Lepcha', nativeName: 'Lepcha' }
];

export const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    // Persist language preference to localStorage
    localStorage.setItem('monastery-language-preference', languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-background border-border z-50 min-w-[180px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`flex items-center justify-between cursor-pointer hover:bg-accent ${
              i18n.language === language.code ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <span>{language.name}</span>
            <span className="text-xs text-muted-foreground ml-2">
              {language.nativeName}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};