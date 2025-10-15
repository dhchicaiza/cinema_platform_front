import React from 'react'
import './Modal.scss'

/**
 * Props interface for the Modal component
 * @interface ModalProps
 * @property {boolean} isOpen - Controls the visibility of the modal
 * @property {function} onClose - Callback function triggered when the modal is closed
 * @property {string} title - The title displayed in the modal header
 * @property {React.ReactNode} children - The content to be rendered inside the modal body
 */
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

/**
 * Modal Component
 * 
 * A reusable modal dialog component that displays content in an overlay.
 * Features a close button in the header and can be dismissed by clicking the overlay.
 * Returns null when not open, preventing unnecessary rendering.
 * 
 * @component
 * @param {ModalProps} props - The component props
 * @returns {React.ReactElement | null} A modal dialog with header, title, close button, and body content, or null if not open
 * 
 * @example
 * // Basic usage
 * <Modal 
 *   isOpen={showModal} 
 *   onClose={() => setShowModal(false)} 
 *   title="Edit Profile"
 * >
 *   <form>
 *     {/* Form content *\/}
 *   </form>
 * </Modal>
 * 
 * @example
 * // With state management
 * const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
 * 
 * <Modal 
 *   isOpen={isPasswordModalOpen} 
 *   onClose={() => setIsPasswordModalOpen(false)} 
 *   title="Change Password"
 * >
 *   <div>
 *     {/* Password change form *\/}
 *   </div>
 * </Modal>
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal

