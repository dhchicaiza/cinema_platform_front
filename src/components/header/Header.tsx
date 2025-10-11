import React, { useEffect, useState } from 'react'
import './Header.scss'
import useUserStore from '../../stores/useUserStores'


const Header: React.FC = () => {
    const { user } = useUserStore()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    // Inicializar con la página actual
    const [currentPage, setCurrentPage] = useState(window.location.pathname)

    useEffect(() => {
        console.log('Usuario actual:', user)
        console.log('Página actual:', currentPage)
    }, [user, currentPage])

    // Actualizar la página cuando cambie la URL
    useEffect(() => {
        const updateCurrentPage = () => {
            const path = window.location.pathname
            console.log('Cambio de página detectado:', path)
            setCurrentPage(path)
        }

        // Actualizar inmediatamente
        updateCurrentPage()

        // Escuchar cambios en la URL (para navegación SPA)
        window.addEventListener('popstate', updateCurrentPage)
        
        // También escuchar cambios cuando se hace clic en enlaces
        const handleLinkClick = () => {
            // Pequeño delay para asegurar que la URL haya cambiado
            setTimeout(updateCurrentPage, 100)
        }
        
        // Escuchar clics en enlaces
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement
            if (target.tagName === 'A' || target.closest('a')) {
                handleLinkClick()
            }
        })

        // Verificar cambios de URL periódicamente (fallback)
        const intervalId = setInterval(() => {
            const newPath = window.location.pathname
            if (newPath !== currentPage) {
                console.log('URL cambió detectado por interval:', newPath)
                setCurrentPage(newPath)
            }
        }, 500)
        
        return () => {
            window.removeEventListener('popstate', updateCurrentPage)
            document.removeEventListener('click', handleLinkClick)
            clearInterval(intervalId)
        }
    }, [])

    const handleAvatarClick = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleViewProfile = () => {
        window.location.href = '/profile'
    }

    const handleLogout = () => {
        window.location.href = '/login'
    }

    // Páginas que deben mostrar botones de login/register
    const showLoginButtons = ['/', '/login', '/register'].includes(currentPage)
    console.log('¿Mostrar botones de login?', showLoginButtons, 'Página actual:', currentPage)
    


    
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
            {
                (currentPage === '/' || currentPage === '/login' || currentPage === '/register') ? (
                    <div className="header__actions">
                        <a href="/login" className="btn btn--login">Iniciar Sesión</a>
                        <a href="/register" className="btn btn--register">Crea una Cuenta</a>
                    </div>
                ) : (
                    <div className="header__user">
                        <span className="user__name">{user?.name || 'Laura'}</span>
                        <div className="user__dropdown">
                            <button 
                                className="user__avatar user__avatar--button"
                                onClick={handleAvatarClick}
                                title="Menú de usuario"
                            >
                                <span>{(user?.name || 'Laura')?.charAt(0).toUpperCase()}</span>
                            </button>
                            
                            {isMenuOpen && (
                                <div className="dropdown__menu">
                                    <button 
                                        className="dropdown__item"
                                        onClick={handleViewProfile}
                                    >
                                        Ver Perfil
                                    </button>
                                    <button 
                                        className="dropdown__item dropdown__item--logout"
                                        onClick={handleLogout}
                                        title="Cerrar Sesión"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    </header>
    
  )
}

export default Header
