import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import '../styles/components/header.css'

const Header = () => {
  const { language, toggleLanguage } = useLanguage()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const navLinks = [
    { path: '/', label: language === 'fr' ? 'Accueil' : 'Tahanan' },
  ]

  if (user) {
    navLinks.push(
      { path: '/dashboard', label: language === 'fr' ? 'Tableau de bord' : 'Dashboard' },
      { path: '/report-waste', label: language === 'fr' ? 'Signaler déchets' : 'Sahy ônja' },
    )

    if (user.role === 'collector' || user.role === 'validator') {
      navLinks.push({ path: '/accept-mission', label: language === 'fr' ? 'Missions' : 'Mission' })
    }

    if (user.role === 'municipality') {
      navLinks.push({ path: '/municipality', label: language === 'fr' ? 'Municipalité' : 'Kaominina' })
    }

    navLinks.push({ path: '/recycling-center', label: language === 'fr' ? 'Centres' : 'Sentro' })
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <div className="logo-icon">🌍</div>
          <div>
            <div className="logo-title">EcoLink</div>
            <div className="logo-tagline">{language === 'fr' ? 'Gestion des déchets' : 'Pamamahala ônja'}</div>
          </div>
        </Link>

        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="nav-link" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button 
              className="language-toggle"
              onClick={toggleLanguage}
              title={`Language: ${language === 'fr' ? 'FR' : 'MG'}`}
            >
              {language === 'fr' ? 'FR' : 'MG'}
            </button>

            {user ? (
              <div className="user-menu">
                <div className="user-info">
                  <span className="user-avatar">{user.avatar ? '👤' : '👥'}</span>
                  <span className="user-name">{user.name}</span>
                </div>
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-link">
                    {language === 'fr' ? 'Mon profil' : 'My profile'}
                  </Link>
                  <button onClick={handleLogout} className="dropdown-link logout-btn">
                    {language === 'fr' ? 'Déconnexion' : 'Logout'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline">
                  {language === 'fr' ? 'Connexion' : 'Login'}
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  {language === 'fr' ? 'Inscription' : 'Sign up'}
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
