import React, { forwardRef, useId, useRef, useState } from 'react';
import './Input.css';

export type InputVariant = 'outlined' | 'filled' | 'underlined';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>{
variant?: InputVariant;
size?: InputSize;
label?: string;
helperText?: string;
error?: boolean | string;
leftIcon?: React.ReactNode;
rightIcon?: React.ReactNode;
clearable?: boolean;
onClear?: ()=> void;
fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
(
{
variant = 'outlined',
size = 'md',
label,
helperText,
error = false,
leftIcon,
rightIcon,
clearable = false,
onClear,
fullWidth = false,
disabled = false,
readOnly = false,
type = 'text',
id,
className = '',
value,
defaultValue,
onChange,
...props
},
ref
)=>{
const generatedId = useId();
const inputId = id || generatedId;
const localRef = useRef<HTMLInputElement | null>(null);
const [internalValue, setInternalValue] = useState(defaultValue ?? '');
const [showPassword, setShowPassword] = useState(false);
const isControlled = value !== undefined;
const currentValue = isControlled ? value : internalValue;
const isCheckbox = type === 'checkbox';
const isPassword = type === 'password';
const hasError = Boolean(error);
const errorMessage = typeof error === 'string' ? error : '';
const bottomText = errorMessage || helperText;
const setRefs = (el: HTMLInputElement | null) =>{
      localRef.current = el;
      if (typeof ref ==='function'){
        ref(el);
      }else if (ref){
        ref.current = el;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      if (!isControlled){
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () =>{
      if (!isControlled) {
        setInternalValue('');
      }
      if (onClear){
        onClear();
      } else if (onChange && localRef.current){
        const fakeEvent ={
          target: {...localRef.current, value:''},
          currentTarget: {...localRef.current, value:''},
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(fakeEvent);
      }
      localRef.current?.focus();
    };

    if (isCheckbox) {
      return (
        <div className="input-field input-field--checkbox">
          <input
            ref={setRefs}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            readOnly={readOnly}
            className={`input-checkbox ${className}`}
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            {...props}
          />
          {label && (
            <label htmlFor={inputId} className="input-label">
              {label}
            </label>
          )}
        </div>
      );
    }
    const fieldClasses = [
      'input-field',
      fullWidth ? 'input-field--full-width' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      'input-wrapper',
      `input-${variant}`,
      `input-${size}`,
      hasError ? 'input-error':'',
      disabled ? 'input-disabled':'',
      readOnly ? 'input-readonly':'',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const showClearBtn =
      clearable &&
      !disabled &&
      !readOnly &&
      String(currentValue).length > 0;

    return(
      <div className={fieldClasses}>
        {label &&(
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}
        <div className={wrapperClasses}>
          {leftIcon && <span className="input-icon">{leftIcon}</span>}
          <input
            ref={setRefs}
            id={inputId}
            type={isPassword && showPassword ? 'text' : type}
            className="input-element"
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={hasError || undefined}
            value={isControlled ? value : internalValue}
            onChange={handleChange}
            {...props}
          />
          {showClearBtn &&(
            <button
              type="button"
              className="input-action-btn"
              onClick={handleClear}
              aria-label="Очистить поле"
            >
              ✕
            </button>
          )}
          {isPassword &&(
            <button
              type="button"
              className="input-action-btn"
              disabled={disabled}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword?'Скрыть пароль':'Показать пароль'}
            >
              {showPassword ?'🙈':'👁️'}
            </button>
          )}

          {rightIcon && <span className="input-icon">{rightIcon}</span>}
        </div>

        {bottomText && (
          <span
            className={`input-helper ${hasError ?'input-helper--error':''}`}
          >
            {bottomText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';