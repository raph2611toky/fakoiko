import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Button from '../components/Button'
import Card from '../components/Card'
import Badge from '../components/Badge'
import '../styles/pages/recycling-center.css'

const RecyclingCenter = () => {
  const { t } = useLanguage()
  const [centers, setCenters] = useState([
    {
      id: 1,
      name: 'Centre Recyclage Principal',
      address: 'Rue de la Paix, Centre-ville',
      capacity: 1000,
      currentLoad: 650,
      status: 'loading',
      phone: '+261 34 12 345 67',
      hours: 'Lun-Ven: 8h-17h, Sam: 9h-14h'
    },
    {
      id: 2,
      name: 'Centre Recyclage Nord',
      address: 'Avenue du Nord, Quartier Nord',
      capacity: 500,
      currentLoad: 480,
      status: 'full',
      phone: '+261 34 23 456 78',
      hours: 'Lun-Ven: 7h-18h, Sam: 10h-15h'
    },
    {
      id: 3,
      name: 'Centre Recyclage Est',
      address: 'Rue de l\'Est, Quartier Est',
      capacity: 750,
      currentLoad: 150,
      status: 'empty',
      phone: '+261 34 34 567 89',
      hours: 'Lun-Ven: 8h-17h, Sam: 9h-13h'
    },
    {
      id: 4,
      name: 'Centre Recyclage Ouest',
      address: 'Bd Occidental, Quartier Ouest',
      capacity: 600,
      currentLoad: 380,
      status: 'loading',
      phone: '+261 34 45 678 90',
      hours: 'Lun-Ven: 8h-18h, Sam: 10h-16h'
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'empty': return 'success'
      case 'loading': return 'warning'
      case 'full': return 'error'
      default: return 'default'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'empty': return t('recyclingCenter.empty')
      case 'loading': return t('recyclingCenter.loading')
      case 'full': return t('recyclingCenter.full')
      default: return status
    }
  }

  const getCapacityPercentage = (current, capacity) => {
    return Math.round((current / capacity) * 100)
  }

  return (
    <div className="recycling-center-page">
      <div className="container">
        <div className="page-header">
          <h1>{t('recyclingCenter.title')}</h1>
          <p>Localisez et consultez l'état des centres de recyclage</p>
        </div>

        <div className="centers-grid">
          {centers.map((center) => {
            const capacityPercentage = getCapacityPercentage(center.currentLoad, center.capacity)
            return (
              <Card key={center.id} className="center-card card-elevated">
                <div className="center-header">
                  <h3 className="center-name">{center.name}</h3>
                  <Badge variant={`${getStatusColor(center.status)}-solid`}>
                    {getStatusLabel(center.status)}
                  </Badge>
                </div>

                <div className="center-info">
                  <p><strong>📍 Adresse:</strong> {center.address}</p>
                  <p><strong>📞 Téléphone:</strong> {center.phone}</p>
                  <p><strong>🕐 Horaires:</strong> {center.hours}</p>
                </div>

                <div className="capacity-section">
                  <div className="capacity-label">
                    <span>Capacité:</span>
                    <span>{capacityPercentage}%</span>
                  </div>
                  <div className="capacity-bar">
                    <div 
                      className="capacity-fill"
                      style={{ width: `${capacityPercentage}%` }}
                    ></div>
                  </div>
                  <div className="capacity-details">
                    <span>{center.currentLoad} kg</span>
                    <span>/</span>
                    <span>{center.capacity} kg</span>
                  </div>
                </div>

                <div className="center-actions">
                  <Button variant="primary" size="medium" className="btn-block">
                    📍 Localiser
                  </Button>
                  <Button variant="outline" size="medium" className="btn-block">
                    📞 Appeler
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RecyclingCenter
