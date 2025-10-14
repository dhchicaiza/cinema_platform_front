import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
        <div className="footer__container">
            <div className="footer__content">
                <p className="footer__text">© 2025 CinePlatform. Todos los derechos reservados.</p>
                <Link to="/mapa-del-sitio" className="footer__link">Mapa del sitio</Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer