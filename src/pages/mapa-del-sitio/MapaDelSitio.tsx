import React from 'react'
import './MapaDelSitio.scss'

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
        </section>
    )
}
