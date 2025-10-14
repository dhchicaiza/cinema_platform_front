import React from 'react'
import './Home.scss'
import TeamCard from '../../components/team-card/TeamCard'

const Home: React.FC = () => {
  return (
    <section className="home">
      <div className="home__welcome">
        <div className="home__container">
          <h1 className="home__title">Bienvenido a CinePlatform</h1>
          <p className="home__description">
            Descubre miles de películas, crea tus listas favoritas, comparte opiniones y disfruta de la mejor experiencia cinematográfica en línea.
          </p>
        </div>
      </div>

      <div id="equipo" className="home__team">
        <div className="home__container">
          <h2 className="team__title">Nuestro Equipo de Desarrollo</h2>
          
          <div className="team__grid">
           <TeamCard initials="LS" name="Laura Salazar" role="Frontend Developer" roleSpanish="Desarrolladora frontend" />
           <TeamCard initials="CL" name="Cristian Llanos" role="Frontend Developer" roleSpanish="Desarrollador frontend" />
           <TeamCard initials="DC" name="David Chicaiza" role="Backend Developer" roleSpanish="Desarrollador backend" />
           <TeamCard initials="JC" name="Johan Ceballos" role="Backend Developer" roleSpanish="Encargado del despliegue" />
           <TeamCard initials="JE" name="Jorge Enrique" role="Backend Developer" roleSpanish="Desarrollador backend" />

          </div>
        </div>
      </div>
    </section>
  )
}

export default Home