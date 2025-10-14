import React from 'react'
import './ConfirmAlert.scss'

interface ConfirmAlertProps {
  message: string
  type?: 'warning' | 'danger' | 'info'
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmAlert: React.FC<ConfirmAlertProps> = ({ message, type = 'warning', onConfirm, onCancel }) => {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-container" onClick={(e) => e.stopPropagation()}>
        <div className={`confirm-icon confirm-icon--${type}`}>
          {type === 'warning' && (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M12 9V13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {type === 'danger' && (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {type === 'info' && (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <h3 className="confirm-title">
          {type === 'warning' && 'Confirmar Acción'}
          {type === 'danger' && 'Acción Peligrosa'}
          {type === 'info' && 'Confirmar'}
        </h3>
        <p className="confirm-message">{message}</p>
        
        <div className="confirm-buttons">
          <button className="confirm-button confirm-button--cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="confirm-button confirm-button--confirm" onClick={onConfirm}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmAlert
