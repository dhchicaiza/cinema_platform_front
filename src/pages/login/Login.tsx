import React from 'react'
import './Login.scss'
import { ROUTES } from '../../constants';
import { useNavigate } from 'react-router';
import FormGroup from '../../components/form-group/FormGroup';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(ROUTES.CATALOG);
  }
  return (
    <section className="login">
      <div className="login__container">
        <div className="login__logo">
          <img src="/logo.png" alt="Logo" className="logo__image" />
        </div>

        <a href="/" className="login__back-link">Volver al Inicio</a>

        <h1 className="login__title">Bienvenido</h1>

        <form className="login__form" onSubmit={handleLogin}>

          <FormGroup label="Correo Electrónico" type="email" id="email" placeholder="tu@gmail.com" />
          <FormGroup label="Contraseña" type="password" id="password" placeholder="Mínimo 8 caracteres" />


          <button type="submit" style={{ width: '60%', margin: '0 auto' }} className="btn btn--primary">Iniciar Sesión</button>

          <a href="/contraseña" className="form__link">¿Olvidaste tu contraseña?</a>

          <div className="form__divider"></div>

          <p className="form__question">¿No tienes cuenta?</p>

          <a href="/register" style={{ width: '50%', margin: '0 auto' }} className="btn btn--secondary">Crear Cuenta Nueva</a>
        </form>
      </div>
    </section>
  )
}

export default Login