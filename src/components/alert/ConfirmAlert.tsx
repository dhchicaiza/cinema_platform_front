import React from 'react'
import './ConfirmAlert.scss'

/**
 * Props interface for the ConfirmAlert component
 * @interface ConfirmAlertProps
 * @property {string} message - The confirmation message to display
 * @property {'warning' | 'danger' | 'info'} [type='warning'] - The type of alert (determines styling and icon)
 * @property {function} onConfirm - Callback function triggered when user confirms the action
 * @property {function} onCancel - Callback function triggered when user cancels the action
 */
interface ConfirmAlertProps {
  message: string
  type?: 'warning' | 'danger' | 'info'
  onConfirm: () => void
  onCancel: () => void
}

/**
 * ConfirmAlert Component
 * 
 * A confirmation dialog component that requires user action before proceeding.
 * Displays a message with two action buttons (Cancel and Confirm).
 * Supports three types: warning, danger, and info with corresponding visual styling.
 * 
 * @component
 * @param {ConfirmAlertProps} props - The component props
 * @returns {React.ReactElement} A styled confirmation dialog with icon, message, and action buttons
 * 
 * @example
 * // Warning confirmation
 * <ConfirmAlert 
 *   message="Are you sure you want to proceed?" 
 *   type="warning" 
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 * />
 * 
 * @example
 * // Danger confirmation (e.g., delete action)
 * <ConfirmAlert 
 *   message="This action cannot be undone. Delete account?" 
 *   type="danger" 
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowConfirm(false)}
 * />
 */
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
