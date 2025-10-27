import React from 'react'
import './PasswordInputWithValidation.scss'

/**
 * Props interface for PasswordInputWithValidation component
 * @interface PasswordInputWithValidationProps
 * @property {string} label - The label text displayed above the password input field
 * @property {string} id - Unique identifier for the password input element
 * @property {string} [placeholder] - Optional placeholder text for the password input
 * @property {string} value - Current value of the password input field
 * @property {function} onChange - Callback function triggered on input change
 * @property {string} [ariaLabel] - Optional ARIA label for accessibility, defaults to label if not provided
 * @property {boolean} [showValidation=true] - Controls whether validation feedback is displayed
 */
interface PasswordInputWithValidationProps {
  label: string
  id: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ariaLabel?: string
  showValidation?: boolean
}

/**
 * PasswordInputWithValidation Component
 * 
 * A password input field with real-time validation feedback.
 * Displays visual indicators for password strength requirements as the user types.
 * 
 * Validation criteria:
 * - Minimum 8 characters
 * - At least one uppercase letter (A-Z)
 * - At least one lowercase letter (a-z)
 * - At least one number (0-9)
 * - At least one special character (!@#$%^&*)
 * 
 * Features:
 * - Real-time validation with visual feedback
 * - Green checkmarks (✓) for met requirements
 * - Gray circles (○) for unmet requirements
 * - Only displays validation when user starts typing
 * - Consistent styling with application theme
 * - Fully responsive design
 * - ARIA labels for accessibility
 * 
 * @component
 * @param {PasswordInputWithValidationProps} props - The component props
 * @returns {React.ReactElement} A password input field with real-time validation feedback
 * 
 * @example
 * // Basic usage
 * <PasswordInputWithValidation
 *   label="Password" 
 *   id="user-password" 
 *   placeholder="Enter your password"
 *   value={password} 
 *   onChange={(e) => setPassword(e.target.value)}
 * />
 * 
 * @example
 * // Without validation display
 * <PasswordInputWithValidation
 *   label="Confirm Password" 
 *   id="confirm-password" 
 *   placeholder="Re-enter your password"
 *   value={confirmPassword} 
 *   onChange={(e) => setConfirmPassword(e.target.value)}
 *   showValidation={false}
 * />
 * 
 * @remarks
 * - Validation feedback only appears when value.length > 0
 * - Uses regex patterns for uppercase, lowercase, and number validation
 * - Styled with SCSS using BEM methodology
 * - Matches FormGroup component styling for consistency
 * - Supports all standard input attributes through props
 */
const PasswordInputWithValidation: React.FC<PasswordInputWithValidationProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  ariaLabel,
  showValidation = true
}) => {
  // Password validation checks
  const hasMinLength = value.length >= 8
  const hasUpperCase = /[A-Z]/.test(value)
  const hasLowerCase = /[a-z]/.test(value)
  const hasNumber = /[0-9]/.test(value)
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)

  return (
    <div className="password-input">
      <div className="form__group">
        <label htmlFor={id} className="form__label">{label}</label>
        <input
          type="password"
          id={id}
          className="form__input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-label={ariaLabel || label}
        />
      </div>

      {showValidation && value.length > 0 && (
        <div className="password-validation">
          <ul className="password-validation__list">
            <li className={`password-validation__item ${hasMinLength ? 'valid' : ''}`}>
              <span className="password-validation__icon">
                {hasMinLength ? '✓' : '○'}
              </span>
              <span className="password-validation__text">
                Mínimo 8 caracteres
              </span>
            </li>
            <li className={`password-validation__item ${hasUpperCase ? 'valid' : ''}`}>
              <span className="password-validation__icon">
                {hasUpperCase ? '✓' : '○'}
              </span>
              <span className="password-validation__text">
                Al menos una mayúscula
              </span>
            </li>
            <li className={`password-validation__item ${hasLowerCase ? 'valid' : ''}`}>
              <span className="password-validation__icon">
                {hasLowerCase ? '✓' : '○'}
              </span>
              <span className="password-validation__text">
                Al menos una minúscula
              </span>
            </li>
            <li className={`password-validation__item ${hasNumber ? 'valid' : ''}`}>
              <span className="password-validation__icon">
                {hasNumber ? '✓' : '○'}
              </span>
              <span className="password-validation__text">
                Al menos un número
              </span>
            </li>
            <li className={`password-validation__item ${hasSpecialChar ? 'valid' : ''}`}>
              <span className="password-validation__icon">
                {hasSpecialChar ? '✓' : '○'}
              </span>
              <span className="password-validation__text">
                Al menos un carácter especial (!@#$%^&*)
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default PasswordInputWithValidation

