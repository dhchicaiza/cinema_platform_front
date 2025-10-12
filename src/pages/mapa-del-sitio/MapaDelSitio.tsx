import React from 'react'
import './MapaDelSitio.scss'
import TeamCard from '../../components/team-card/TeamCard'

export const MapaDelSitio: React.FC = () => {
    return (
        <section className="mapa-del-sitio">
            <div className="mapa-del-sitio__welcome">
                <div className="mapa-del-sitio__container">
                    <h1 className="mapa-del-sitio__title">Mapa del sitio</h1>
                    <p className="mapa-del-sitio__description">
                        Explora todas las secciones y funcionalidades de nuestra plataforma.
                    </p>
                </div>
            </div>

            <div className="mapa-del-sitio__content">
                <div className="mapa-del-sitio__container">
                    <div className="mapa-del-sitio__grid">
                        
                        <TeamCard 
                            initials="🏠"
                            name="Principal"
                            role="→ Inicio → Bienvenida → Navegación"
                            roleSpanish="Sección principal"
                        />

                        <TeamCard 
                            initials="🎬"
                            name="Catálogo"
                            role="→ Películas → Búsqueda → Filtros"
                            roleSpanish="Contenido multimedia"
                        />

                        <TeamCard 
                            initials="▶️"
                            name="Reproductor"
                            role="→ Play/Pause → Subtítulos → Calidad"
                            roleSpanish="Controles de reproducción"
                        />

                        <TeamCard 
                            initials="👤"
                            name="Mi Cuenta"
                            role="→ Perfil → Favoritos → Listas"
                            roleSpanish="Gestión de usuario"
                        />

                        <TeamCard 
                            initials="👥"
                            name="Equipo de Desarrollo"
                            role="→ Desarrolladores → Tecnologías"
                            roleSpanish="Equipo técnico"
                        />

                    </div>
                </div>
            </div>
        </section>
    )
}
