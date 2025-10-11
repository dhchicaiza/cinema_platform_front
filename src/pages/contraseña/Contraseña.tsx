import React from 'react'
import './Contraseña.scss'
import FormGroup from '../../components/form-group/FormGroup'

const Contraseña: React.FC = () => {
  return (
    <section className="contraseña">
      <div className="contraseña__container">
        <h1 className="contraseña__title">Actualiza tu contraseña</h1>
        <form className="contraseña__form">
          <FormGroup label="Correo Electrónico" type="email" id="email" placeholder="tu@gmail.com" />
          <FormGroup label="Contraseña" type="password" id="password" placeholder="Mínimo 8 caracteres" />
        </form>
      </div>
    </section>
  )
}

export default Contraseña