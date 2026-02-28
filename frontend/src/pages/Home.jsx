import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import '../styles/pages/home.css';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(language === 'fr' ? 'Merci pour votre message!' : 'Salamat sa inyong mensahe!');
    setContactForm({ name: '', email: '', message: '' });
  };

  const content = {
    fr: {
      hero: { title: 'Révolutionnez la gestion des déchets', subtitle: 'Plateforme intégrée pour un avenir durable' },
      cta: 'Commencer maintenant',
      services: 'Nos services',
      features: 'Nos fonctionnalités',
      testimonials: 'Témoignages',
      team: 'Notre équipe',
      contact: 'Nous contacter',
    },
    mg: {
      hero: { title: 'Ovay ny fitantanana ônja', subtitle: 'Platform fintina ho ny faritanin\'ny sambatra' },
      cta: 'Hanombohana ankehitriny',
      services: 'Ny fanompoan\'',
      features: 'Ny endriny',
      testimonials: 'Tsikaritra',
      team: 'Ny fanompoan\'',
      contact: 'Antsointsoin\'',
    }
  };

  const texts = content[language] || content.fr;

  const services = [
    {
      icon: '🗑️',
      title: language === 'fr' ? 'Signalement de déchets' : 'Sahy ônja',
      desc: language === 'fr' ? 'Signalez les déchets via notre plateforme' : 'Sahy ônja diben\'olona'
    },
    {
      icon: '🚚',
      title: language === 'fr' ? 'Collecte organisée' : 'Fanangonana',
      desc: language === 'fr' ? 'Système de collecte efficace et rapide' : 'Fanangonana mahafaty'
    },
    {
      icon: '✓',
      title: language === 'fr' ? 'Validation efficace' : 'Fanamahan\'',
      desc: language === 'fr' ? 'Vérification et validation transparente' : 'Fanamahan\' mazamazà'
    },
    {
      icon: '⭐',
      title: language === 'fr' ? 'Récompenses points' : 'Karazam-pahamarinana',
      desc: language === 'fr' ? 'Gagnez des points à chaque action' : 'Manana isa'
    },
  ];

  const features = [
    { title: language === 'fr' ? 'Interface intuitive' : 'Interface mazamazà', icon: '⚡' },
    { title: language === 'fr' ? 'Collecte 24/7' : 'Fanangonana 24/7', icon: '🕐' },
    { title: language === 'fr' ? 'Validation en temps réel' : 'Real-time', icon: '⚙️' },
    { title: language === 'fr' ? 'Récompenses immédiates' : 'Karazam-pahamarinana', icon: '🎁' },
    { title: language === 'fr' ? 'Communauté active' : 'Fiaraha-miasa', icon: '👥' },
    { title: language === 'fr' ? 'Support 24/7' : 'Suporta', icon: '💬' },
  ];

  const testimonials = [
    {
      name: 'Jean Dupont',
      role: language === 'fr' ? 'Citoyen' : 'Mponina',
      text: language === 'fr' ? 'EcoLink a changé ma façon de gérer les déchets. Très intuitif et motivant!' : 'EcoLink dia nagbago ng aking paraan',
      avatar: '👨‍💼'
    },
    {
      name: 'Marie Martin',
      role: language === 'fr' ? 'Collectrice' : 'Mpangongan\'',
      text: language === 'fr' ? 'Super application! J\'ai augmenté ma productivité de 40% grâce au système.' : 'Super!',
      avatar: '👩‍💼'
    },
    {
      name: 'Pierre Leblanc',
      role: language === 'fr' ? 'Validateur' : 'Mpanamarika',
      text: language === 'fr' ? 'Validation simplifiée et transparente. Recommandé pour tous!' : 'Recommended!',
      avatar: '👨‍💼'
    },
  ];

  const team = [
    { name: 'Sophie Bernard', role: language === 'fr' ? 'PDG & Fondatrice' : 'CEO', avatar: '👩‍💼' },
    { name: 'Thomas Martin', role: language === 'fr' ? 'CTO' : 'CTO', avatar: '👨‍💻' },
    { name: 'Claire Dumont', role: language === 'fr' ? 'Head of Operations' : 'Operations', avatar: '👩‍💼' },
    { name: 'Alex Rousseau', role: language === 'fr' ? 'Community Manager' : 'Community', avatar: '👨‍💼' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">{texts.hero.title}</h1>
          <p className="hero-subtitle">{texts.hero.subtitle}</p>
          <div className="hero-buttons">
            {user ? (
              <Button onClick={() => navigate('/dashboard')} size="large">
                {language === 'fr' ? 'Aller au tableau de bord' : 'Pumunta sa dashboard'}
              </Button>
            ) : (
              <>
                <Button onClick={() => navigate('/signup')} size="large">
                  {texts.cta}
                </Button>
                <Button onClick={() => navigate('/login')} variant="outline" size="large">
                  {language === 'fr' ? 'Se connecter' : 'Magconnect'}
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>{texts.services}</h2>
        <p>{language === 'fr' ? 'Découvrez nos solutions innovantes pour la gestion optimale des déchets' : 'Tuklasin ang aming makabagong solusyon para sa wastong pamamahala ng ônja'}</p>
        <div className="services-grid">
          {services.map((service, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>{texts.features}</h2>
        <p>{language === 'fr' ? 'Bénéficiez d\'une plateforme puissante et facile à utiliser au quotidien' : 'Tamasahin ang isang malakas at madaling gamitin na platform araw-araw'}</p>
        <div className="features-grid">
          {features.map((feature, i) => (
            <div key={i} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <p>{feature.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>{texts.testimonials}</h2>
        <p>{language === 'fr' ? 'Nos utilisateurs vous racontent leur expérience avec EcoLink' : 'Ang aming mga user ay nagsasalaysay ng kanilang karanasan sa EcoLink'}</p>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-avatar">{testimonial.avatar}</div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <h4>{testimonial.name}</h4>
              <span className="testimonial-role">{testimonial.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>{texts.team}</h2>
        <p>{language === 'fr' ? 'Rencontrez les experts passionnés derrière EcoLink' : 'Kilalanin ang mga eksperto na nasa likod ng EcoLink'}</p>
        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="team-member">
              <div className="member-avatar">{member.avatar}</div>
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>{texts.contact}</h2>
        <p>{language === 'fr' ? 'Nous serions heureux de vous aider. Contactez-nous dès maintenant.' : 'Kami ay handang tumulong. Makipag-ugnayan sa amin ngayon.'}</p>
        
        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div className="info-content">
                <h4>{language === 'fr' ? 'Adresse' : 'Address'}</h4>
                <p>123 Rue de l'Écologie<br/>75001 Paris, France</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div className="info-content">
                <h4>{language === 'fr' ? 'Téléphone' : 'Phone'}</h4>
                <p>+33 (0) 1 23 45 67 89</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div className="info-content">
                <h4>{language === 'fr' ? 'Email' : 'Email'}</h4>
                <p>contact@ecolink.fr<br/>support@ecolink.fr</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🕐</span>
              <div className="info-content">
                <h4>{language === 'fr' ? 'Horaires' : 'Hours'}</h4>
                <p>{language === 'fr' ? 'Lun-Ven: 9h-18h' : 'Mon-Fri: 9am-6pm'}<br/>{language === 'fr' ? 'Sam: 10h-14h' : 'Sat: 10am-2pm'}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder={language === 'fr' ? 'Votre nom complet' : 'Your full name'}
              value={contactForm.name}
              onChange={handleContactChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={language === 'fr' ? 'votre@email.com' : 'your@email.com'}
              value={contactForm.email}
              onChange={handleContactChange}
              required
            />
            <textarea
              name="message"
              placeholder={language === 'fr' ? 'Votre message...' : 'Your message...'}
              value={contactForm.message}
              onChange={handleContactChange}
              required
              rows="5"
            ></textarea>
            <Button type="submit" style={{ marginTop: '0.5rem' }}>
              {language === 'fr' ? 'Envoyer mon message' : 'Send message'}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
