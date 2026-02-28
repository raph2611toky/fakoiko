import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import Modal from '../components/Modal'
import '../styles/pages/report-waste.css'

const ReportWaste = () => {
  const { t } = useLanguage()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    category: '',
    photo: null
  })
  const [errors, setErrors] = useState({})

  const categories = [
    { value: 'plastic', label: 'Plastique' },
    { value: 'metal', label: 'Métal' },
    { value: 'glass', label: 'Verre' },
    { value: 'organic', label: 'Organique' },
    { value: 'mixed', label: 'Mélangé' },
  ]

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'photo' && files) {
      setFormData(prev => ({
        ...prev,
        photo: files[0]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.location) newErrors.location = 'Localisation requise'
    if (!formData.description) newErrors.description = 'Description requise'
    if (!formData.category) newErrors.category = 'Catégorie requise'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Waste report submitted:', formData)
      setShowModal(true)
      setTimeout(() => setShowModal(false), 2000)
      setFormData({ location: '', description: '', category: '', photo: null })
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="report-waste-page">
      <div className="container">
        <div className="page-header">
          <h1>{t('reportWaste.title')}</h1>
          <p>Aidez-nous à maintenir votre environnement propre</p>
        </div>

        <div className="report-content">
          <Card title={t('reportWaste.title')} className="report-card">
            <form onSubmit={handleSubmit} className="report-form">
              <Input
                label={t('reportWaste.location')}
                type="text"
                name="location"
                placeholder="Ex: Rue Principale, Park..."
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
                required
              />

              <Input
                label={t('reportWaste.description')}
                name="description"
                as="textarea"
                placeholder="Décrivez le déchet..."
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                required
              />

              <div className="input-wrapper">
                <label className="input-label">{t('reportWaste.category')}</label>
                <select
                  name="category"
                  className="input"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                {errors.category && <span className="input-error-message">{errors.category}</span>}
              </div>

              <div className="input-wrapper">
                <label className="input-label">{t('reportWaste.photo')}</label>
                <label className="file-input">
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="file-input-hidden"
                  />
                  <span className="file-input-label">
                    {formData.photo ? formData.photo.name : t('reportWaste.uploadPhoto')}
                  </span>
                </label>
              </div>

              <div className="form-actions">
                <Button variant="primary" size="large" type="submit" className="btn-block">
                  {t('reportWaste.submit')}
                </Button>
              </div>
            </form>

            <div className="report-info">
              <h3>💡 Conseils</h3>
              <ul>
                <li>Soyez aussi précis que possible dans la localisation</li>
                <li>Prenez une photo claire du déchet</li>
                <li>Décrivez le type et la quantité de déchets</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={t('common.success')}
        size="small"
      >
        <p>{t('reportWaste.successMessage')}</p>
        <p>Merci d'avoir contribué à notre communauté!</p>
      </Modal>
    </div>
  )
}

export default ReportWaste
