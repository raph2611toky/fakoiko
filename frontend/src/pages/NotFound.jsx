import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import '../styles/pages/not-found.css'

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">404</div>
        <h1>Page Non Trouvée</h1>
        <p>Désolé, la page que vous cherchez n'existe pas.</p>
        <Link to="/">
          <Button variant="primary" size="large">
            Retour à l'Accueil
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
