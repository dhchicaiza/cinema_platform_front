import React from 'react'
import './MapaDelSitio.scss'
import TeamCard from '../../components/team-card/TeamCard'

/**
 * MapaDelSitio (Site Map) Page Component
 * 
 * Displays a visual site map showing all major sections and features of the platform.
 * Uses the TeamCard component creatively to display navigation sections with:
 * - Emoji icons representing each section
 * - Section names and descriptions
 * - Navigation paths and sub-features
 * 
 * Sections included:
 * - Principal (Home/Welcome)
 * - Catálogo (Movie Catalog)
 * - Reproductor (Video Player)
 * - Mi Cuenta (User Account)
 * - Equipo de Desarrollo (Development Team)
 * 
 * @component
 * @returns {React.ReactElement} The site map page with visual navigation guide
 * 
 * @example
 * // Rendered through React Router
 * <Route path="/mapa-del-sitio" element={<MapaDelSitio />} />
 * 
 * @remarks
 * - Accessible from header and footer navigation
 * - Reuses TeamCard component for consistent styling
 * - Features responsive grid layout
 * - Provides overview of platform structure and features
 */
const MapaDelSitio: React.FC = () => {
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

export default MapaDelSitio
