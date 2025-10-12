import React, { useState } from 'react'
import './Profile.scss'
import FormGroup from '../../components/form-group/FormGroup'
import useUserStore from '../../stores/useUserStores'
import Alert from '../../components/alert/Alert'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants'

const Profile: React.FC = () => {
  const { user } = useUserStore()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const setUser = useUserStore((state) => state.setUser); 
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('success');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Laura',
    lastName: user?.lastName ||'Salazar',
    email: user?.email || 'laura@gmail.com',
    age: user?.age || 25
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleBack = () => {
    // Si el usuario está logueado, ir al catalog
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate(ROUTES.CATALOG);
    } else {
      window.history.back();
    }
  }

  const handleSave = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setAlertType('error');
            setAlertMessage("No estás autenticado. Por favor, inicia sesión de nuevo.");
            setShowAlert(true);
            return;
        }

        const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/profile`;

        try {
            const response = await fetch(API_URL, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    ...formData,
                    age: parseInt(String(formData.age), 10) 
                }),
            });
            console.log("datos que se envian desde el front: ", formData)
            const data = await response.json();
            console.log('Respuesta del backend al actualizar perfil:', data);

            if (!response.ok) {
                throw new Error(data.message || 'No se pudo actualizar el perfil.');
            }
            
            
            setUser(data.data.user);
            
            setIsEditing(false); 
            
            setAlertType('success');
            setAlertMessage('¡Tus cambios se han guardado exitosamente!');
            setShowAlert(true);
            
        } catch (err: any) {
            setAlertType('error');
            setAlertMessage(err.message || 'Ocurrió un error al guardar los cambios.');
            setShowAlert(true);
        }
    };

  const handleDelete = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAlertType('error');
      setAlertMessage("No estás autenticado. Por favor, inicia sesión de nuevo.");
      setShowAlert(true);
      return;
    }
  }
  
  

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || 'Laura',
      lastName: 'Salazar',
      email: user?.email || 'laura@gmail.com',
      age: user?.age || 25
    })
    setIsEditing(false)
  }

 
  return (
    <section className="profile">
      {showAlert && (
        <Alert 
          message={alertMessage} 
          type={alertType}
          onClose={() => setShowAlert(false)} 
        />
      )}
      <div className="profile__container">
        <div className="profile__card">
          {/* Header del perfil */}
          <div className="profile__header">
            <button className="profile__back" onClick={handleBack}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="profile__avatar">
              <span className="avatar__initials">LS</span>
            </div>
            
            <div className="profile__title-section">
              <h1 className="profile__title">Mi Perfil</h1>
              <p className="profile__subtitle">Mantén tu información actualizada</p>
            </div>
            
            <button 
              className="btn btn--edit"
              onClick={handleEdit}
            >
              Editar
            </button>
          </div>

          {/* Formulario */}
          <div className="profile__form">
            <div className="form__row">
              <div className="form__column">
                <FormGroup
                  label="Nombre"
                  type="text"
                  id="name"
                  name="firstName"
                  placeholder="Nombre"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="form__column">
                <FormGroup
                  label="Apellidos"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Apellidos"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            
            <div className="form__row">
              <div className="form__column">
                <FormGroup
                  label="Correo Electrónico"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="form__column">
                <FormGroup
                  label="Edad"
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Edad"
                  value={formData.age}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="form__column">
                <FormGroup
                  label="Contraseña"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                />
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="profile__actions">
            <button 
              className="btn btn--save"
              onClick={handleSave}
            >
              Guardar Cambios
            </button>

            <button
              className="btn btn--delete"
              onClick={handleDelete}
            >
              Eliminar Cuenta
            </button>

            <button 
              className="btn btn--cancel"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile