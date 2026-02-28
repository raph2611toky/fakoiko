import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import '../styles/components/footer.css'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>{t('footer.about')}</h4>
          <p>EcoLink - {t('header.tagline')}</p>
        </div>
        <div className="footer-section">
          <h4>{t('footer.contact')}</h4>
          <p>Email: contact@ecolink.mg</p>
        </div>
        <div className="footer-section">
          <h4>{t('common.language')}</h4>
          <p>Français | Malagasy</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}

export default Footer
