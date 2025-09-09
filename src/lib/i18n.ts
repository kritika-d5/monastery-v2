import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  english: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        explore: 'Explore',
        plan: 'Plan Journey',
        tours: 'Virtual Tours',
        archive: 'Digital Archive',
        about: 'About Sikkim',
        community: 'Community',
        signIn: 'Sign In',
        signUp: 'Create Account',
        profile: 'Profile',
        myItinerary: 'My Itinerary',
        signOut: 'Sign Out'
      },
      // Common
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        submit: 'Submit',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        view: 'View',
        download: 'Download',
        share: 'Share'
      },
      // Home page
      home: {
        heroTitle: 'Explore Ancient Monasteries from Anywhere',
        heroSubtitle: 'Discover Sikkim\'s sacred Buddhist monasteries through immersive virtual tours, smart journey planning, and authentic cultural experiences.',
        createAccount: 'Create Free Account',
        exploreVirtual: 'Explore Virtual Tours',
        planJourney: 'Plan Your Journey',
        whyMonastery360: 'Why Monastery360',
        popularMonasteries: 'Popular Monasteries',
        learnMore: 'Learn More'
      },
      // Authentication
      auth: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
        forgotPassword: 'Forgot Password',
        resetPassword: 'Reset Password',
        changePassword: 'Change Password',
        fullName: 'Full Name',
        age: 'Age',
        city: 'City',
        country: 'Country',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        consent: 'I agree to the terms and conditions',
        alreadyHaveAccount: 'Already have an account?',
        dontHaveAccount: 'Don\'t have an account?'
      }
    }
  },
  hindi: {
    translation: {
      nav: {
        home: 'होम',
        explore: 'अन्वेषण',
        plan: 'यात्रा योजना',
        tours: 'वर्चुअल टूर्स',
        archive: 'डिजिटल संग्रह',
        about: 'सिक्किम के बारे में',
        community: 'समुदाय',
        signIn: 'साइन इन',
        signUp: 'खाता बनाएं',
        profile: 'प्रोफाइल',
        myItinerary: 'मेरी यात्रा योजना',
        signOut: 'साइन आउट'
      },
      common: {
        loading: 'लोड हो रहा है...',
        error: 'त्रुटि',
        success: 'सफलता',
        submit: 'जमा करें',
        cancel: 'रद्द करें',
        save: 'सहेजें',
        edit: 'संपादित करें',
        delete: 'हटाएं',
        view: 'देखें',
        download: 'डाउनलोड',
        share: 'साझा करें'
      },
      home: {
        heroTitle: 'कहीं से भी प्राचीन मठों का अन्वेषण करें',
        heroSubtitle: 'इमर्सिव वर्चुअल टूर्स, स्मार्ट यात्रा योजना और प्रामाणिक सांस्कृतिक अनुभवों के माध्यम से सिक्किम के पवित्र बौद्ध मठों की खोज करें।',
        createAccount: 'मुफ्त खाता बनाएं',
        exploreVirtual: 'वर्चुअल टूर्स देखें',
        planJourney: 'अपनी यात्रा की योजना बनाएं',
        whyMonastery360: 'मठ360 क्यों',
        popularMonasteries: 'लोकप्रिय मठ',
        learnMore: 'और जानें'
      },
      auth: {
        signIn: 'साइन इन',
        signUp: 'साइन अप',
        forgotPassword: 'पासवर्ड भूल गए',
        resetPassword: 'पासवर्ड रीसेट करें',
        changePassword: 'पासवर्ड बदलें',
        fullName: 'पूरा नाम',
        age: 'उम्र',
        city: 'शहर',
        country: 'देश',
        email: 'ईमेल',
        password: 'पासवर्ड',
        confirmPassword: 'पासवर्ड की पुष्टि करें',
        consent: 'मैं नियमों और शर्तों से सहमत हूं',
        alreadyHaveAccount: 'पहले से खाता है?',
        dontHaveAccount: 'खाता नहीं है?'
      }
    }
  },
  nepali: {
    translation: {
      nav: {
        home: 'घर',
        explore: 'अन्वेषण',
        plan: 'यात्रा योजना',
        tours: 'भर्चुअल टुर्स',
        archive: 'डिजिटल संग्रह',
        about: 'सिक्किमको बारेमा',
        community: 'समुदाय',
        signIn: 'साइन इन',
        signUp: 'खाता खोल्नुहोस्',
        profile: 'प्रोफाइल',
        myItinerary: 'मेरो यात्रा योजना',
        signOut: 'साइन आउट'
      },
      common: {
        loading: 'लोड हुँदै...',
        error: 'त्रुटि',
        success: 'सफलता',
        submit: 'पेश गर्नुहोस्',
        cancel: 'रद्द गर्नुहोस्',
        save: 'सुरक्षित गर्नुहोस्',
        edit: 'सम्पादन गर्नुहोस्',
        delete: 'मेटाउनुहोस्',
        view: 'हेर्नुहोस्',
        download: 'डाउनलोड',
        share: 'साझा गर्नुहोस्'
      }
    }
  },
  bhutia: {
    translation: {
      nav: {
        home: 'Home',
        explore: 'Explore',
        plan: 'Plan Journey',
        tours: 'Virtual Tours',
        archive: 'Digital Archive',
        about: 'About Sikkim',
        community: 'Community',
        signIn: 'Sign In',
        signUp: 'Create Account'
      }
    }
  },
  lepcha: {
    translation: {
      nav: {
        home: 'Home',
        explore: 'Explore',
        plan: 'Plan Journey',
        tours: 'Virtual Tours',
        archive: 'Digital Archive',
        about: 'About Sikkim',
        community: 'Community',
        signIn: 'Sign In',
        signUp: 'Create Account'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'english',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;