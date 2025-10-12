import React, { useEffect } from 'react'
import './Alert.scss'

interface AlertProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
}

const Alert: React.FC<AlertProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); 

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
        <p className="alert-message">{message}</p>
      </div>
    </div>
  )
}

export default Alert

