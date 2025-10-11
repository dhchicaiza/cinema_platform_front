import React, { useState } from 'react'
import './Profile.scss'
import FormGroup from '../../components/form-group/FormGroup'
import useUserStore from '../../stores/useUserStores'

const Profile: React.FC = () => {
  const { user } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || 'Laura',
    lastName: 'Salazar',
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
    window.history.back()
  }

  const handleSave = () => {
    // Aquí podrías guardar los datos
    console.log('Guardando datos:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Restaurar datos originales
    setFormData({
      name: user?.name || 'Laura',
      lastName: 'Salazar',
      email: user?.email || 'laura@gmail.com',
      age: user?.age || 25
    })
    setIsEditing(false)
  }

 
  return (
    <section className="profile">
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
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
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