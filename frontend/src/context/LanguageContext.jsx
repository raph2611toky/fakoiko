import React, { createContext, useState, useContext, useEffect } from 'react'
import fr from '../locales/fr.json'
import mg from '../locales/mg.json'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('ecolink-language') || 'fr'
  })

  useEffect(() => {
    localStorage.setItem('ecolink-language', language)
    document.documentElement.lang = language
  }, [language])

  const translations = {
    fr,
    mg,
  }

  const t = (key) => {
    const keys = key.split('.')
    let current = translations[language]
    
    for (const k of keys) {
      if (current && typeof current === 'object') {
        current = current[k]
      } else {
        return key
      }
    }
    
    return current || key
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'fr' ? 'mg' : 'fr'))
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage doit être utilisé à l\'intérieur de LanguageProvider')
  }
  return context
}
