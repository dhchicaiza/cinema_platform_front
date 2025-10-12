import React, { useState } from 'react'
import './Login.scss'
import { ROUTES } from '../../constants';
import { useNavigate } from 'react-router';
import useUserStore from '../../stores/useUserStores'; 

import FormGroup from '../../components/form-group/FormGroup';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        console.log('Datos que se enviarán al backend:', { email, password });

        const API_URL = import.meta.env.VITE_API_BASE_URL;
        const loginUrl = `${API_URL}/api/auth/login`; 
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Credenciales incorrectas. Por favor, intenta de nuevo.');
            }
            
          console.log('Datos que llegan al backend:', data);  
            if (data.data.token) {
                localStorage.setItem('authToken', data.data.token);
                setUser(data.data.user);
                navigate(ROUTES.CATALOG); 
            }

        } catch (err: any) {
            setError(err.message);
        }
    };
  return (
    <section className="login">
      <div className="login__container">
        <div className="login__logo">
          <img src="/logo.png" alt="Logo" className="logo__image" />
        </div>

        <a href="/" className="login__back-link">Volver al Inicio</a>

        <h1 className="login__title">Bienvenido</h1>

        <form className="login__form" onSubmit={handleLogin}>

          <FormGroup label="Correo Electrónico" type="email" id="email" placeholder="tu@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <FormGroup label="Contraseña" type="password" id="password" placeholder="Mínimo 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)}/>

 
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