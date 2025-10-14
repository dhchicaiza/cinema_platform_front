import React , { useState }from 'react'
import './Register.scss'
import FormGroup from '../../components/form-group/FormGroup'
import { ROUTES } from '../../constants'
import { useNavigate } from 'react-router'
import Alert from '../../components/alert/Alert'

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('success');
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
  
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
                  throw new Error(data.message || 'Error al crear la cuenta. Por favor, intenta de nuevo.');
              }
              
              // Mostrar alerta de éxito
              setAlertType('success');
              setAlertMessage('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
              setShowAlert(true);
              
              // Navegar después de mostrar la alerta
              setTimeout(() => {
                  navigate(ROUTES.LOGIN);
              }, 1500);
              
              if (data.data.token) {
                  localStorage.setItem('authToken', data.data.token); 
              }

          } catch (err: any) {
              setAlertType('error');
              setAlertMessage(err.message || 'Error al crear la cuenta. Verifica los datos ingresados.');
              setShowAlert(true);
          }
      };
  return (
    <section className="register">
      {showAlert && (
        <Alert 
          message={alertMessage} 
          type={alertType}
          onClose={() => setShowAlert(false)} 
        />
      )}
      <div className="register__container">
        <h1 className="register__title">Crear Cuenta</h1>

        <form className="register__form" onSubmit={handleRegister}>
          <FormGroup 
            label="Nombre" 
            type="text" 
            id="nombre" 
            placeholder="Nombre" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
            ariaLabel="Ingresa tu nombre completo"
          />
          <FormGroup 
            label="Apellidos" 
            type="text" 
            id="apellidos" 
            placeholder="Apellidos" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
            ariaLabel="Ingresa tus apellidos"
          />
          <FormGroup 
            label="Correo Electrónico" 
            type="email" 
            id="correo" 
            placeholder="Correo Electrónico"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            ariaLabel="Ingresa tu correo electrónico"
          />
          <FormGroup 
            label="Edad" 
            type="number" 
            id="edad" 
            placeholder="Edad"
            value={age} 
            onChange={(e) => setAge(e.target.value)}
            ariaLabel="Ingresa tu edad"
          />
          <FormGroup 
            label="Contraseña" 
            type="password" 
            id="contraseña" 
            placeholder="Contraseña"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            ariaLabel="Crea una contraseña segura"
          />
          <FormGroup 
            label="Confirmar Contraseña" 
            type="password" 
            id="confirmar_contraseña" 
            placeholder="Confirmar Contraseña"
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            ariaLabel="Confirma tu contraseña"
          />

          <button 
            type="submit" 
            style={{ width: '60%', margin: '0 auto' }} 
            className="btn btn--primary"
            aria-label="Crear cuenta nueva en CinePlatform"
          >
            Crear Cuenta
          </button>

          <div className="form__divider"></div>

          <p className="form__question">¿Ya tienes una cuenta?</p>

          <a 
            href="/login" 
            style={{ width: '50%', margin: '0 auto' }} 
            className="btn btn--secondary"
            aria-label="Iniciar sesión en CinePlatform"
          >
            Iniciar Sesión
          </a>


        </form>
      </div>

    </section>
  )
}

export default Register