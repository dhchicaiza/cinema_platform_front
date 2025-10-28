import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'

/**
 * Footer Component
 * 
 * A footer component displayed at the bottom of every page in the application.
 * Contains copyright information and a link to the site map.
 * Features responsive design that adapts layout for different screen sizes.
 * 
 * @component
 * @returns {React.ReactElement} The application footer with copyright and site map link
 * 
 * @example
 * // Typically used in the Layout component
 * <Footer />
 */
const Footer: React.FC = () => {
  const handleOpenManual = () => {
    window.open('/manual-usuario.html', '_blank');
  };

  return (
    <footer className="footer">
        <div className="footer__container">
            <div className="footer__content">
                <p className="footer__text">© 2025 CinePlatform. Todos los derechos reservados.</p>
                <div className="footer__links">
                    <button onClick={handleOpenManual} className="footer__link footer__button" aria-label="Abrir manual de usuario">
                        Manual de usuario
                    </button>
                    <Link to="/mapa-del-sitio" className="footer__link">Mapa del sitio</Link>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer