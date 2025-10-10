import React from 'react'
import './Header.scss'


const Header: React.FC = () => {
  return (
    <header className="header">
        <div className="header__container">
            <div className="header__logo">
                <a href="/">
                <span className="logo__cine">Cine</span>
                <span className="logo__platform">Platform</span>
                </a>
            </div>
            <nav className="header__nav">
                <a href="/" className="nav__link">Inicio</a>
                <a href="/#equipo" className="nav__link">Sobre nosotros</a>
                <a href="/mapa-del-sitio" className="nav__link">Mapa del sitio</a>
            </nav>
            <div className="header__actions">
                <a href="/login" className="btn btn--login">Iniciar Sesión</a>
                <a href="/register" className="btn btn--register">Crea una Cuenta</a>
            </div>
        </div>
    </header>
    
  )
}

export default Header
