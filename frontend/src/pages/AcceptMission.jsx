import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Button from '../components/Button'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import '../styles/pages/accept-mission.css'

const AcceptMission = () => {
  const { t } = useLanguage()
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: 'Nettoyage du Parc Municipal',
      location: 'Parc Central',
      difficulty: 'Facile',
      reward: 50,
      timeLeft: '2 jours',
      description: 'Nettoyage général du parc municipal'
    },
    {
      id: 2,
      title: 'Collecte des Déchets Plastiques',
      location: 'Plage',
      difficulty: 'Moyen',
      reward: 75,
      timeLeft: '1 jour',
      description: 'Collecte des déchets plastiques sur la plage'
    },
    {
      id: 3,
      title: 'Organisation Tri des Déchets',
      location: 'Centre Recyclage',
      difficulty: 'Difficile',
      reward: 100,
      timeLeft: '3 jours',
      description: 'Aide à l\'organisation et au tri des déchets'
    },
    {
      id: 4,
      title: 'Nettoyage de la Rue Principal',
      location: 'Centre-ville',
      difficulty: 'Facile',
      reward: 40,
      timeLeft: '5 jours',
      description: 'Nettoyage de la rue principale'
    },
  ])
  const [showModal, setShowModal] = useState(false)
  const [selectedMission, setSelectedMission] = useState(null)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Facile': return 'success'
      case 'Moyen': return 'warning'
      case 'Difficile': return 'error'
      default: return 'default'
    }
  }

  const handleAcceptMission = (mission) => {
    setSelectedMission(mission)
    setShowModal(true)
    setTimeout(() => setShowModal(false), 2500)
  }

  return (
    <div className="accept-mission-page">
      <div className="container">
        <div className="page-header">
          <h1>{t('acceptMission.title')}</h1>
          <p>Trouvez et acceptez des missions pour gagner des points</p>
        </div>

        {missions.length > 0 ? (
          <div className="missions-grid">
            {missions.map((mission) => (
              <Card key={mission.id} className="mission-card card-accent">
                <div className="mission-header">
                  <h3 className="mission-title">{mission.title}</h3>
                  <Badge variant={`${getDifficultyColor(mission.difficulty)}-solid`}>
                    {mission.difficulty}
                  </Badge>
                </div>

                <div className="mission-details">
                  <div className="mission-detail">
                    <span className="detail-label">📍 {t('acceptMission.location')}:</span>
                    <span className="detail-value">{mission.location}</span>
                  </div>
                  <div className="mission-detail">
                    <span className="detail-label">⭐ {t('acceptMission.reward')}:</span>
                    <span className="detail-value">{mission.reward} pts</span>
                  </div>
                  <div className="mission-detail">
                    <span className="detail-label">⏱️ {t('acceptMission.timeLeft')}:</span>
                    <span className="detail-value">{mission.timeLeft}</span>
                  </div>
                </div>

                <p className="mission-description">{mission.description}</p>

                <div className="mission-actions">
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={() => handleAcceptMission(mission)}
                    className="btn-block"
                  >
                    {t('acceptMission.accept')}
                  </Button>
                  <Button variant="outline" size="medium" className="btn-block">
                    {t('acceptMission.decline')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="no-missions">
            <p className="text-center">{t('acceptMission.noMissions')}</p>
          </Card>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={t('acceptMission.acceptSuccess')}
        size="small"
      >
        {selectedMission && (
          <>
            <p>Vous avez accepté: <strong>{selectedMission.title}</strong></p>
            <p>Vous gannerez {selectedMission.reward} points!</p>
          </>
        )}
      </Modal>
    </div>
  )
}

export default AcceptMission
