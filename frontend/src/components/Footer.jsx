import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import '../styles/components/footer.css'

const Footer = () => {
  const { language } = useLanguage()

  const content = {
    fr: {
      about: 'À propos',
      description: 'Plateforme intégrée pour la gestion optimale des déchets et le développement durable.',
      quickLinks: 'Liens rapides',
      contact: 'Contact',
      legal: 'Mentions légales',
      privacy: 'Confidentialité',
      legal_text: 'Conditions d\'utilisation',
      support: 'Support',
      help: 'Centre d\'aide',
      faq: 'FAQ',
      contact_text: 'Nous contacter',
      follow: 'Nous suivre',
      copyright: '© 2025 EcoLink. Tous droits réservés.',
    },
    mg: {
      about: 'Tungkol sa amin',
      description: 'Platform para sa pinakamahusay na pamamahala ng ônja at sustainable development.',
      quickLinks: 'Mabilis na links',
      contact: 'Makipag-ugnayan',
      legal: 'Legal',
      privacy: 'Privacy',
      legal_text: 'Mga Kondisyon ng Paggamit',
      support: 'Suporta',
      help: 'Tulong',
      faq: 'FAQ',
      contact_text: 'Kontakin kami',
      follow: 'Sundan kami',
      copyright: '© 2025 EcoLink. Lahat ng karapatan ay nakalaan.',
    }
  };

  const texts = content[language] || content.fr;

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>EcoLink</h4>
          <p>{texts.description}</p>
        </div>

        <div className="footer-section">
          <h4>{texts.quickLinks}</h4>
          <ul>
            <li><a href="#home">{language === 'fr' ? 'Accueil' : 'Tahanan'}</a></li>
            <li><a href="#about">{texts.about}</a></li>
            <li><a href="#services">{language === 'fr' ? 'Services' : 'Serbisyo'}</a></li>
            <li><a href="#features">{language === 'fr' ? 'Fonctionnalités' : 'Mga Feature'}</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{texts.support}</h4>
          <ul>
            <li><a href="#help">{texts.help}</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">{texts.contact_text}</a></li>
            <li><a href="#status">{language === 'fr' ? 'Statut' : 'Status'}</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{texts.follow}</h4>
          <div className="social-links">
            <a href="https://facebook.com" title="Facebook" target="_blank" rel="noopener noreferrer">f</a>
            <a href="https://twitter.com" title="Twitter/X" target="_blank" rel="noopener noreferrer">𝕏</a>
            <a href="https://linkedin.com" title="LinkedIn" target="_blank" rel="noopener noreferrer">in</a>
            <a href="https://wa.me" title="WhatsApp" target="_blank" rel="noopener noreferrer">W</a>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p>{texts.copyright}</p>
        </div>
        <div className="footer-bottom-right">
          <a href="#privacy">{texts.privacy}</a>
          <span>•</span>
          <a href="#legal">{texts.legal_text}</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
