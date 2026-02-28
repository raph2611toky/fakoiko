import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import Card from '../components/Card'
import '../styles/pages/municipality.css'

const Municipality = () => {
  const { t } = useLanguage()

  const sections = [
    { icon: '📊', label: t('municipality.overview'), count: 1250 },
    { icon: '📋', label: t('municipality.reports'), count: 450 },
    { icon: '🎯', label: t('municipality.missions'), count: 125 },
    { icon: '♻️', label: t('municipality.centers'), count: 12 },
  ]

  return (
    <div className="municipality-page">
      <div className="container">
        <div className="page-header">
          <h1>{t('municipality.title')}</h1>
          <p>Outils de gestion pour les responsables municipaux</p>
        </div>

        <div className="overview-grid">
          {sections.map((section, index) => (
            <Card key={index} className="overview-card">
              <div className="overview-icon">{section.icon}</div>
              <h3>{section.label}</h3>
              <div className="overview-count">{section.count}</div>
            </Card>
          ))}
        </div>

        <Card title="Analytics" className="analytics-card">
          <p>Les outils d'analytique détaillés seront disponibles prochainement.</p>
        </Card>
      </div>
    </div>
  )
}

export default Municipality
