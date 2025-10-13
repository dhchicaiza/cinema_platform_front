import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Header.scss';
import useUserStore from '../../stores/useUserStores';
import ConfirmAlert from '../alert/ConfirmAlert';

const Header: React.FC = () => {
    // Obtiene el usuario para saber si alguien ha iniciado sesión
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        setIsMenuOpen(false);
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('authToken');
        setUser(null as any);
        setShowLogoutConfirm(false);
        navigate('/login');
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    return (
        <header className="header">
            {showLogoutConfirm && (
                <ConfirmAlert 
                    message="¿Estás seguro de que quieres cerrar sesión?"
                    type="warning"
                    onConfirm={confirmLogout}
                    onCancel={cancelLogout}
                />
            )}
            <div className="header__container">
                
                <div className="header__logo">
                    <Link to={user ? "/catalog" : "/"}> 
                        <span className="logo__cine">Cine</span>
                        <span className="logo__platform">Platform</span>
                    </Link>
                </div>
                
                <nav className="header__nav">
                    <Link to="/" className="nav__link">Inicio</Link>
                  
                    <Link to="/#equipo" className="nav__link">Sobre nosotros</Link>
                    <Link to="/mapa-del-sitio" className="nav__link">Mapa del sitio</Link>
                </nav>
                
                {!user ? (
                    <div className="header__actions">
                        <Link to="/login" className="btn btn--login">Iniciar Sesión</Link>
                        <Link to="/register" className="btn btn--register">Crea una Cuenta</Link>
                    </div>
                ) : (
                    <div className="header__user">
                        <span className="user__name">{user.firstName}</span>
                        <div className="user__dropdown">
                            <button 
                                className="user__avatar user__avatar--button"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                title="Menú de usuario"
                            >
                                <span>{user.firstName?.charAt(0).toUpperCase()}</span>
                            </button>
                            
                            {isMenuOpen && (
                                <div className="dropdown__menu">
                                    <Link to="/profile" className="dropdown__item" onClick={() => setIsMenuOpen(false)}>
                                        Ver Perfil
                                    </Link>
                                    <button className="dropdown__item dropdown__item--logout" onClick={handleLogout}>
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;