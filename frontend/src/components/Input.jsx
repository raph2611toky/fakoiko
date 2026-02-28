import React from 'react'
import '../styles/components/input.css'

const Input = ({ 
  label, 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input 
        className={`input ${error ? 'input-error' : ''} ${className}`}
        {...props}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  )
}

export default Input
