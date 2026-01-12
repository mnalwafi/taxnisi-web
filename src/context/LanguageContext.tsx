'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { dictionary } from '@/lib/dictionaries'

type Lang = 'en' | 'id'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  content: typeof dictionary.en // Helper to get current text immediately
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  return (
    <LanguageContext.Provider value={{ lang, setLang, content: dictionary[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom Hook to use it easily in any component
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
