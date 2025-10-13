import React, { useState } from 'react'
import './Profile.scss'
import FormGroup from '../../components/form-group/FormGroup'
import useUserStore from '../../stores/useUserStores'
import Alert from '../../components/alert/Alert'
import Modal from '../../components/modal/Modal'
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
  
  // Estados para modales
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Estados para el modal de cambiar contraseña
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  // Estado para el modal de eliminar cuenta
  const [deletePassword, setDeletePassword] = useState('');
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
    setShowDeleteModal(true);
  }
  
  const handlePasswordChange = () => {
    setShowPasswordModal(true);
  }
  

const handleConfirmPasswordChange = async () => {
    
    if (newPassword !== confirmNewPassword) {
        setAlertType('error');
        setAlertMessage('La nueva contraseña y su confirmación no coinciden.');
        setShowAlert(true);
        return; 
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
        setAlertType('error');
        setAlertMessage("No estás autenticado. Por favor, inicia sesión de nuevo.");
        setShowAlert(true);
        return;
    }

    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/change-password`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword,
                confirmPassword: confirmNewPassword
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            
            throw new Error(data.message || 'No se pudo cambiar la contraseña.');
        }
        
        
        setAlertType('success');
        setAlertMessage('¡Contraseña actualizada exitosamente!');
        setShowAlert(true);
        setShowPasswordModal(false); 
        
        
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');

    } catch (err: any) {
        
        setAlertType('error');
        
        setAlertMessage(err.message || 'Ocurrió un error al guardar los cambios.');
        setShowAlert(true);
    }
};
  const handleCancelPasswordChange = () => {
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  }

const handleConfirmDelete = async () => {
    // 1. Validar que el campo de contraseña no esté vacío
    if (!deletePassword) {
        setAlertType('error');
        setAlertMessage('Por favor, ingresa tu contraseña para confirmar.');
        setShowAlert(true);
        return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
        setAlertType('error');
        setAlertMessage("No se encontró tu sesión. Por favor, inicia sesión de nuevo.");
        setShowAlert(true);
        return;
    }

    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/account`;

    try {
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ password: deletePassword })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'No se pudo eliminar la cuenta.');
        }

        setShowDeleteModal(false); 
        setAlertType('success');
        setAlertMessage('¡Cuenta eliminada exitosamente! Serás redirigido.');
        setShowAlert(true);
        
        localStorage.removeItem('authToken');
        setUser(null);
        navigate(ROUTES.LOGIN);

    } catch (err: any) {
        setAlertType('error');
        setAlertMessage(err.message);
        setShowAlert(true);
        setDeletePassword('');
    }
};
  
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeletePassword('');
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
          <div className="profile__header">
            <button className="profile__back" onClick={handleBack}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="profile__avatar">
              <span>{user.firstName?.charAt(0).toUpperCase()}</span>
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
            </div>

            <div className="password__section">
              <button 
                className="btn btn--password"
                onClick={handlePasswordChange}
                type="button"
              >
                Editar Contraseña
              </button>
            </div>
          </div>

          <div className="profile__actions">
            <div className="actions__left">
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

            <div className="actions__right">
              <button
                className="btn btn--delete"
                onClick={handleDelete}
              >
                Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={showPasswordModal} 
        onClose={handleCancelPasswordChange}
        title="Editar Contraseña"
      >
        <div className="modal__form">
          <FormGroup
            label="Contraseña Actual"
            type="password"
            id="currentPassword"
            placeholder="Ingresa tu contraseña actual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          
          <FormGroup
            label="Nueva Contraseña"
            type="password"
            id="newPassword"
            placeholder="Ingresa tu nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          
          <FormGroup
            label="Confirmar Nueva Contraseña"
            type="password"
            id="confirmNewPassword"
            placeholder="Confirma tu nueva contraseña"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          
          <div className="modal__actions">
            <button 
              className="btn btn--save"
              onClick={handleConfirmPasswordChange}
            >
              Confirmar
            </button>
            
            <button 
              className="btn btn--cancel"
              onClick={handleCancelPasswordChange}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal para eliminar cuenta */}
      <Modal 
        isOpen={showDeleteModal} 
        onClose={handleCancelDelete}
        title="Eliminar Cuenta"
      >
        <div className="modal__form">
          <p className="modal__warning">
            Esta acción no se puede deshacer. Por favor, ingresa tu contraseña para confirmar.
          </p>
          
          <FormGroup
            label="Contraseña"
            type="password"
            id="deletePassword"
            placeholder="Ingresa tu contraseña"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
          
          <div className="modal__actions">
            <button 
              className="btn btn--delete"
              onClick={handleConfirmDelete}
            >
              Eliminar Cuenta
            </button>
            
            <button 
              className="btn btn--cancel"
              onClick={handleCancelDelete}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </section>
  )
}

export default Profile