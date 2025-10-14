import React from 'react'
import './FormGroup.scss'

/**
 * Props interface for the FormGroup component
 * @interface FormGroupProps
 * @property {string} label - The label text displayed above the input field
 * @property {string} type - The input type (text, email, password, number, etc.)
 * @property {string} id - Unique identifier for the input element
 * @property {string} [placeholder] - Optional placeholder text for the input
 * @property {string | number} [value] - Current value of the input field
 * @property {function} [onChange] - Optional callback function triggered on input change
 * @property {boolean} [readOnly] - If true, the input field is read-only
 * @property {string} [name] - Optional name attribute for the input
 * @property {string} [ariaLabel] - Optional ARIA label for accessibility, defaults to label if not provided
 */
interface FormGroupProps {
  label: string
  type: string
  id: string
  placeholder?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
  name?: string
  ariaLabel?: string
}

/**
 * FormGroup Component
 * 
 * A reusable form input component that combines a label and input field with consistent styling.
 * Provides accessibility features through ARIA labels and supports various input types.
 * 
 * @component
 * @param {FormGroupProps} props - The component props
 * @returns {React.ReactElement} A styled form group containing a label and input field
 * 
 * @example
 * // Basic usage
 * <FormGroup 
 *   label="Email" 
 *   type="email" 
 *   id="user-email" 
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * 
 * @example
 * // Read-only field
 * <FormGroup 
 *   label="Username" 
 *   type="text" 
 *   id="username" 
 *   value={username}
 *   readOnly={true}
 * />
 */
const FormGroup: React.FC<FormGroupProps> = (props) => {
  return (
    <div className="form__group">
            <label htmlFor={props.id} className="form__label">{props.label}</label>
            <input
              type={props.type}
              id={props.id}
              className="form__input"
              placeholder={props.placeholder}
              value={props.value || ''}
              onChange={props.onChange}
              readOnly={props.readOnly}
              name={props.name}
              aria-label={props.ariaLabel || props.label}
            />
          </div>
  )
}

export default FormGroup