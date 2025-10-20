import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Header.scss';
import useUserStore from '../../stores/useUserStores';
import ConfirmAlert from '../alert/ConfirmAlert';
import Alert from '../alert/Alert';

/**
 * Header Component
 * 
 * The main navigation header component displayed at the top of every page.
 * Features different views based on authentication state:
 * - Unauthenticated: Shows Login and Register buttons
 * - Authenticated: Shows user avatar with dropdown menu (Profile, Logout)
 * 
 * Includes logout confirmation dialog and success feedback.
 * Navigation links adapt to user authentication status.
 * 
 * @component
 * @returns {React.ReactElement} The application header with logo, navigation, and user actions
 * 
 * @example
 * // Typically used in the Layout component
 * <Header />
 * 
 * @remarks
 * - Uses Zustand store for global user state management
 * - Implements logout confirmation flow with alerts
 * - Features responsive dropdown menu for user actions
 * - Clears authentication token from localStorage on logout
 */
const Header: React.FC = () => {
    // Obtiene el usuario para saber si alguien ha iniciado sesión
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('success');

    const handleLogout = () => {
        setIsMenuOpen(false);
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('authToken');
        setUser(null as any);
        setShowLogoutConfirm(false);
        
        // Mostrar alerta de éxito
        setAlertType('success');
        setAlertMessage('¡Sesión cerrada exitosamente!');
        setShowAlert(true);
        
        // Navegar al login después de mostrar la alerta
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    return (
        <header className="header">
            {showAlert && (
                <Alert 
                    message={alertMessage} 
                    type={alertType}
                    onClose={() => setShowAlert(false)} 
                />
            )}
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
                
                <nav className="header__nav" aria-label="Navegación principal">
                    <Link to="/" className="nav__link">Inicio</Link>
                  
                    <Link to="/#equipo" className="nav__link">Sobre nosotros</Link>
                    <Link to="/mapa-del-sitio" className="nav__link">Mapa del sitio</Link>
                </nav>
                
                {!user ? (
                    <div className="header__actions">
                        <Link to="/login" className="btn btn--login" aria-label="Ir a página de inicio de sesión">Iniciar Sesión</Link>
                        <Link to="/register" className="btn btn--register" aria-label="Crear una nueva cuenta">Crea una Cuenta</Link>
                    </div>
                ) : (
                    <div className="header__user">
                        <span className="user__name">{user.firstName}</span>
                        <div className="user__dropdown">
                            <button 
                                className="user__avatar user__avatar--button"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                title="Menú de usuario"
                                aria-label="Abrir menú de usuario"
                                aria-expanded={isMenuOpen}
                                aria-haspopup="true"
                            >
                                <span>{user.firstName?.charAt(0).toUpperCase()}</span>
                            </button>
                            
                            {isMenuOpen && (
                                <div className="dropdown__menu" role="menu">
                                    <Link to="/profile" className="dropdown__item" onClick={() => setIsMenuOpen(false)} role="menuitem" aria-label="Ir a mi perfil">
                                        Ver Perfil
                                    </Link>
                                    <button className="dropdown__item dropdown__item--logout" onClick={handleLogout} role="menuitem" aria-label="Cerrar sesión de la cuenta">
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