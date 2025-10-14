import React, { useState } from 'react'
import './RecuperarContraseña.scss'
import FormGroup from '../../components/form-group/FormGroup'
import Alert from '../../components/alert/Alert'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../../constants'

const RecuperarContraseña: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') // Token que viene en el enlace del correo
  
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('success')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setAlertType('error')
      setAlertMessage('Las contraseñas no coinciden.')
      setShowAlert(true)
      return
    }

    // Validar que haya un token
    if (!token) {
      setAlertType('error')
      setAlertMessage('Token inválido o expirado. Solicita un nuevo enlace de recuperación.')
      setShowAlert(true)
      return
    }

    const API_URL = import.meta.env.VITE_API_BASE_URL
    const resetUrl = `${API_URL}/api/auth/reset-password`

    try {
      const response = await fetch(resetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword, confirmPassword }),
        
      })
      console.log("esto es el body ",JSON.stringify({ token, newPassword, confirmPassword }))
      const data = await response.json()
      console.log("datos que vienen del back ",data)
      if (!response.ok) {
        throw new Error(data.message || 'Error al restablecer la contraseña.')
      }

      // Mostrar alerta de éxito
      setAlertType('success')
      setAlertMessage('¡Contraseña actualizada exitosamente! Redirigiendo al login...')
      setShowAlert(true)

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate(ROUTES.LOGIN)
      }, 2000)
    } catch (err: any) {
      setAlertType('error')
      setAlertMessage(err.message || 'Error al restablecer la contraseña. Intenta de nuevo.')
      setShowAlert(true)
    }
  }

  return (
    <section className="recuperar-contraseña">
      {showAlert && (
        <Alert 
          message={alertMessage} 
          type={alertType}
          onClose={() => setShowAlert(false)} 
        />
      )}
      <div className="recuperar-contraseña__container">
        <div className="recuperar-contraseña__logo">
          <img src="/logo.png" alt="Logo" className="logo__image" />
        </div>

        <h1 className="recuperar-contraseña__title">Nueva Contraseña</h1>
        <p className="recuperar-contraseña__description">
          Ingresa tu nueva contraseña para restablecer el acceso a tu cuenta.
        </p>

        <form className="recuperar-contraseña__form" onSubmit={handleSubmit}>
          <FormGroup 
            label="Nueva Contraseña" 
            type="password" 
            id="newPassword" 
            placeholder="Mínimo 8 caracteres" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <FormGroup 
            label="Confirmar Contraseña" 
            type="password" 
            id="confirmPassword" 
            placeholder="Confirma tu contraseña" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" style={{ width: '60%', margin: '0 auto' }} className="btn btn--primary">
            Restablecer Contraseña
          </button>

          <div className="form__divider"></div>

          <p className="form__question">¿Ya tienes acceso?</p>

          <a href="/login" style={{ width: '50%', margin: '0 auto' }} className="btn btn--secondary">
            Iniciar Sesión
          </a>
        </form>
      </div>
    </section>
  )
}

export default RecuperarContraseña
