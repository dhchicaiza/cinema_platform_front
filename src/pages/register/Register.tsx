import React from 'react'
import './Register.scss'
import FormGroup from '../../components/form-group/FormGroup'
import { ROUTES } from '../../constants'
import { useNavigate } from 'react-router'

const Register: React.FC = () => {
  const navigate = useNavigate();
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(ROUTES.LOGIN);
  }
  return (
    <section className="register">
      <div className="register__container">
        <h1 className="register__title">Crear Cuenta</h1>

        <form className="register__form" onSubmit={handleRegister}>
          <FormGroup label="Nombre" type="text" id="nombre" placeholder="Nombre" />
          <FormGroup label="Apellidos" type="text" id="apellidos" placeholder="Apellidos" />
          <FormGroup label="Correo Electrónico" type="email" id="correo" placeholder="Correo Electrónico" />
          <FormGroup label="Edad" type="number" id="edad" placeholder="Edad" />
          <FormGroup label="Contraseña" type="password" id="contraseña" placeholder="Contraseña" />
          <FormGroup label="Confirmar Contraseña" type="password" id="confirmar_contraseña" placeholder="Confirmar Contraseña" />

          <button type="submit" style={{ width: '60%', margin: '0 auto' }} className="btn btn--primary">Crear Cuenta</button>

          <div className="form__divider"></div>

          <p className="form__question">¿Ya tienes una cuenta?</p>

          <a href="/login" style={{ width: '50%', margin: '0 auto' }} className="btn btn--secondary">Iniciar Sesión</a>


        </form>
      </div>

    </section>
  )
}

export default Register