import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // 브라우저 저장소에서 언어 설정 복원
    const savedLanguage = localStorage.getItem('language') as Language | null;
    
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    } else {
      // 브라우저 언어 감지
      const browserLang = navigator.language.split('-')[0];
      const detectedLang = (browserLang === 'ko' ? 'ko' : 'en') as Language;
      setLanguageState(detectedLang);
    }
    
    setIsHydrated(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
