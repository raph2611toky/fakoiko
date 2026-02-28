import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import '../styles/pages/dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: language === 'fr' ? 'Déchets signalés' : 'Ônja sahy', value: '24', icon: '📢', color: '#3b82f6' },
    { label: language === 'fr' ? 'Missions complétées' : 'Mission nahavita', value: '8', icon: '✅', color: '#10b981' },
    { label: language === 'fr' ? 'Points gagnés' : 'Isa nakatanggap', value: '320', icon: '⭐', color: '#f59e0b' },
  ]

  const recentActivity = [
    { time: language === 'fr' ? 'Il y a 2 heures' : '2 oras na ang nakaraang', action: language === 'fr' ? 'Déchet signalé' : 'Ônja sahy', location: 'Centre-ville' },
    { time: language === 'fr' ? 'Il y a 1 jour' : '1 araw na ang nakaraang', action: language === 'fr' ? 'Mission acceptée' : 'Mission natanggap', location: 'Parc Municipal' },
    { time: language === 'fr' ? 'Il y a 2 jours' : '2 araw na ang nakaraang', action: language === 'fr' ? 'Point gagné' : 'Isa nakatanggap', location: 'Centre Recyclage' },
  ]

  const menuItems = [
    { id: 'overview', label: language === 'fr' ? 'Tableau de bord' : 'Dashboard', icon: '📊' },
    { id: 'missions', label: language === 'fr' ? 'Mes missions' : 'My missions', icon: '🎯' },
    { id: 'reports', label: language === 'fr' ? 'Mes signalements' : 'My reports', icon: '📢' },
    { id: 'notifications', label: language === 'fr' ? 'Notifications' : 'Notifications', icon: '🔔' },
  ]

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <div className="user-profile">
              <div className="profile-avatar">👤</div>
              <div className="profile-info">
                <p className="profile-name">{user?.name}</p>
                <p className="profile-role">{user?.role}</p>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <Link to="/profile" className="footer-link">
              {language === 'fr' ? '⚙️ Mon profil' : '⚙️ My profile'}
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          {activeTab === 'overview' && (
            <>
              {/* Welcome Section */}
              <section className="welcome-section">
                <h1>{language === 'fr' ? 'Bienvenue' : 'Maligayang pagdating'} 👋</h1>
                <p>{language === 'fr' ? 'Continuez votre engagement pour un environnement plus propre' : 'Patuloy ang iyong dedikasyon'}</p>
              </section>

              {/* Stats Cards */}
              <section className="stats-section">
                <h2>{language === 'fr' ? 'Vos statistiques' : 'Inyong estadistika'}</h2>
                <div className="stats-grid">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
                      <div className="stat-icon">{stat.icon}</div>
                      <div className="stat-content">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Actions */}
              <section className="quick-actions-section">
                <h2>{language === 'fr' ? 'Actions rapides' : 'Mabilis na aksyon'}</h2>
                <div className="quick-actions-grid">
                  <Link to="/report-waste" className="quick-action-card">
                    <span className="action-icon">📢</span>
                    <span className="action-label">{language === 'fr' ? 'Signaler un déchet' : 'Sahy ônja'}</span>
                    <span className="action-arrow">→</span>
                  </Link>
                  {(user?.role === 'collector' || user?.role === 'validator') && (
                    <Link to="/accept-mission" className="quick-action-card">
                      <span className="action-icon">🎯</span>
                      <span className="action-label">{language === 'fr' ? 'Mes missions' : 'Aking mission'}</span>
                      <span className="action-arrow">→</span>
                    </Link>
                  )}
                  <Link to="/recycling-center" className="quick-action-card">
                    <span className="action-icon">♻️</span>
                    <span className="action-label">{language === 'fr' ? 'Centres recyclage' : 'Recycling centers'}</span>
                    <span className="action-arrow">→</span>
                  </Link>
                </div>
              </section>

              {/* Recent Activity */}
              <section className="activity-section">
                <h2>{language === 'fr' ? 'Activité récente' : 'Recent activity'}</h2>
                <div className="activity-list">
                  {recentActivity.map((item, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-dot"></div>
                      <div className="activity-content">
                        <p className="activity-action">{item.action}</p>
                        <p className="activity-location">{item.location}</p>
                      </div>
                      <span className="activity-time">{item.time}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === 'missions' && (
            <section className="section-content">
              <h1>{language === 'fr' ? 'Mes missions' : 'My missions'}</h1>
              <p>{language === 'fr' ? 'Vos missions en attente et complétées' : 'Your pending and completed missions'}</p>
            </section>
          )}

          {activeTab === 'reports' && (
            <section className="section-content">
              <h1>{language === 'fr' ? 'Mes signalements' : 'My reports'}</h1>
              <p>{language === 'fr' ? 'Historique de vos signalements de déchets' : 'History of your waste reports'}</p>
            </section>
          )}

          {activeTab === 'notifications' && (
            <section className="section-content">
              <h1>{language === 'fr' ? 'Notifications' : 'Notifications'}</h1>
              <p>{language === 'fr' ? 'Restez informé des mises à jour importantes' : 'Stay updated with important news'}</p>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
