import React from 'react'
import './FormGroup.scss'

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