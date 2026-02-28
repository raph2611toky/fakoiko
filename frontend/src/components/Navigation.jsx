import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/navigation.css'

const Navigation = ({ items = [] }) => {
  return (
    <nav className="navigation">
      <ul className="navigation-list">
        {items.map((item) => (
          <li key={item.path} className="navigation-item">
            <Link to={item.path} className="navigation-link">
              {item.icon && <span className="navigation-icon">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
