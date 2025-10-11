import React from 'react'
import './FormGroup.scss'

const FormGroup: React.FC = (props: any) => {
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
            />
          </div>
  )
}

export default FormGroup