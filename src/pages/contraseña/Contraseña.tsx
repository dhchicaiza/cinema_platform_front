import React, { useState } from 'react'
import './Contraseña.scss'
import FormGroup from '../../components/form-group/FormGroup'
import Alert from '../../components/alert/Alert'

const Contraseña: React.FC = () => {
  const [email, setEmail] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('success')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const API_URL = import.meta.env.VITE_API_BASE_URL
    const resetUrl = `${API_URL}/api/auth/forgot-password`

    try {
      const response = await fetch(resetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar el correo de recuperación.')
      }

      // Mostrar alerta de éxito
      setAlertType('success')
      setAlertMessage('¡Correo enviado! Revisa tu bandeja de entrada para restablecer tu contraseña.')
      setShowAlert(true)
      setEmail('')
    } catch (err: any) {
      setAlertType('error')
      setAlertMessage(err.message || 'Error al enviar el correo. Verifica que el correo esté registrado.')
      setShowAlert(true)
    }
  }

  return (
    <section className="contraseña">
      {showAlert && (
        <Alert 
          message={alertMessage} 
          type={alertType}
          onClose={() => setShowAlert(false)} 
        />
      )}
      <div className="contraseña__container">
        <div className="contraseña__logo">
          <img src="/logo.png" alt="Logo" className="logo__image" />
        </div>

        <a href="/login" className="contraseña__back-link">Volver al Login</a>

        <h1 className="contraseña__title">Recuperar Contraseña</h1>
        <p className="contraseña__description">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <form className="contraseña__form" onSubmit={handleSubmit}>
          <FormGroup 
            label="Correo Electrónico" 
            type="email" 
            id="email" 
            placeholder="tu@gmail.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" style={{ width: '60%', margin: '0 auto' }} className="btn btn--primary">
            Enviar Enlace
          </button>

          <div className="form__divider"></div>

          <p className="form__question">¿Recordaste tu contraseña?</p>

          <a href="/login" style={{ width: '50%', margin: '0 auto' }} className="btn btn--secondary">
            Iniciar Sesión
          </a>
        </form>
      </div>
    </section>
  )
}

export default Contraseña
