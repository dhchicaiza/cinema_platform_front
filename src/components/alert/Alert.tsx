import React, { useEffect } from 'react'
import './Alert.scss'

/**
 * Props interface for the Alert component
 * @interface AlertProps
 * @property {string} message - The message to display in the alert
 * @property {'success' | 'error' | 'info'} [type='success'] - The type of alert (determines styling and icon)
 * @property {function} onClose - Callback function triggered when the alert is closed
 */
interface AlertProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
}

/**
 * Alert Component
 * 
 * A notification component that displays feedback messages to the user.
 * Auto-dismisses after 2 seconds and can be manually closed by clicking.
 * Supports three types: success, error, and info with corresponding icons and styling.
 * 
 * @component
 * @param {AlertProps} props - The component props
 * @returns {React.ReactElement} A styled alert overlay with icon, title, and message
 * 
 * @example
 * // Success alert
 * <Alert 
 *   message="Account created successfully!" 
 *   type="success" 
 *   onClose={() => setShowAlert(false)} 
 * />
 * 
 * @example
 * // Error alert
 * <Alert 
 *   message="Failed to save changes" 
 *   type="error" 
 *   onClose={() => setShowAlert(false)} 
 * />
 */
const Alert: React.FC<AlertProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-container" onClick={(e) => e.stopPropagation()}>
        <div className={`alert-icon alert-icon--${type}`}>
          {type === 'success' && (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {type === 'error' && (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {type === 'info' && (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <h3 className="alert-title">
          {type === 'success' && '¡Éxito!'}
          {type === 'error' && 'Error'}
          {type === 'info' && 'Información'}
        </h3>
        <div className="alert-message">
          {message.includes('\n') ? (
            <ul>
              {message.split('\n').map((line: string, index: number) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          ) : (
            <p>{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Alert

