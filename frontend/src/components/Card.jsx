import React from 'react'
import '../styles/components/card.css'

const Card = ({ 
  children, 
  className = '',
  title,
  subtitle,
  footer,
  ...props 
}) => {
  return (
    <div className={`card ${className}`} {...props}>
      {title && <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>}
      <div className="card-content">
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

export default Card
