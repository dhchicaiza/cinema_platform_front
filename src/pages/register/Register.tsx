import React , { useState }from 'react'
import './Register.scss'
import FormGroup from '../../components/form-group/FormGroup'
import { ROUTES } from '../../constants'
import { useNavigate } from 'react-router'

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setError(null);
  
          console.log('Datos que se enviarán al backend:', { email, password, firstName,lastName,confirmPassword,age });
  
          const API_URL = import.meta.env.VITE_API_BASE_URL;
          const loginUrl = `${API_URL}/api/auth/register`; 
          try {
              const response = await fetch(loginUrl, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({firstName,lastName, email, password,confirmPassword,age: parseInt(age, 10) }),
              });
  
              const data = await response.json();
  
              if (!response.ok) {
                  throw new Error(data.message || 'Credenciales incorrectas. Por favor, intenta de nuevo.');
              }
              
              // Si el login es exitoso, el backend debería devolver un token
              if (data.token) {
                  localStorage.setItem('authToken', data.token); // Guardar el token
                  navigate(ROUTES.CATALOG); // Redirigir al usuario
              }
  
          } catch (err: any) {
              setError(err.message);
          }
      };
  return (
    <section className="register">
      <div className="register__container">
        <h1 className="register__title">Crear Cuenta</h1>

        <form className="register__form" onSubmit={handleRegister}>
          <FormGroup label="Nombre" type="text" id="nombre" placeholder="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          <FormGroup label="Apellidos" type="text" id="apellidos" placeholder="Apellidos" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          <FormGroup label="Correo Electrónico" type="email" id="correo" placeholder="Correo Electrónico"value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormGroup label="Edad" type="number" id="edad" placeholder="Edad"value={age} onChange={(e) => setAge(e.target.value)} />
          <FormGroup label="Contraseña" type="password" id="contraseña" placeholder="Contraseña"value={password} onChange={(e) => setPassword(e.target.value)} />
          <FormGroup label="Confirmar Contraseña" type="password" id="confirmar_contraseña" placeholder="Confirmar Contraseña"value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

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