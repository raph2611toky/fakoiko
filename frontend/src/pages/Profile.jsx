import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import '../styles/pages/profile.css'

const Profile = () => {
  const { t } = useLanguage()
  const [profileData, setProfileData] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '+261 34 12 345 67',
    address: 'Rue de la Paix, Centre-ville'
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEditing(false)
    console.log('Profile updated:', profileData)
  }

  const stats = [
    { label: 'Déchets Signalés', value: 24 },
    { label: 'Missions Complétées', value: 8 },
    { label: 'Points Gagnés', value: 320 },
  ]

  return (
    <div className="profile-page">
      <div className="container">
        <h1>{t('profile.title')}</h1>

        {/* Personal Info */}
        <Card title={t('profile.personalInfo')} className="profile-card">
          {!isEditing ? (
            <div className="profile-display">
              <div className="profile-field">
                <label>{t('profile.firstName')}:</label>
                <p>{profileData.firstName}</p>
              </div>
              <div className="profile-field">
                <label>{t('profile.lastName')}:</label>
                <p>{profileData.lastName}</p>
              </div>
              <div className="profile-field">
                <label>{t('profile.email')}:</label>
                <p>{profileData.email}</p>
              </div>
              <div className="profile-field">
                <label>{t('profile.phone')}:</label>
                <p>{profileData.phone}</p>
              </div>
              <div className="profile-field">
                <label>{t('profile.address')}:</label>
                <p>{profileData.address}</p>
              </div>
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
              >
                {t('profile.editProfile')}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="profile-form">
              <Input
                label={t('profile.firstName')}
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
              />
              <Input
                label={t('profile.lastName')}
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
              />
              <Input
                label={t('profile.email')}
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
              />
              <Input
                label={t('profile.phone')}
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
              />
              <Input
                label={t('profile.address')}
                name="address"
                value={profileData.address}
                onChange={handleChange}
              />
              <div className="form-actions">
                <Button variant="primary" type="submit">
                  Enregistrer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  type="button"
                >
                  Annuler
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Statistics */}
        <Card title={t('profile.statistics')} className="stats-card">
          <div className="stats-display">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Settings */}
        <Card title={t('profile.settings')} className="settings-card">
          <div className="settings-list">
            <div className="setting-item">
              <span>Notifications</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="setting-item">
              <span>Emails Hebdomadaires</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="setting-item">
              <span>Profil Public</span>
              <input type="checkbox" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Profile
