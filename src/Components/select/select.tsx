import React, { useId } from 'react';
import './select.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  fullWidth?: boolean;
}

export function Select({
  options,
  label,
  placeholder,
  error,
  fullWidth = false,
  id,
  className = '',
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;

  return (
    <div className={`select-field ${fullWidth ? 'select-full-width' : ''}`}>
      {label && (
        <label htmlFor={selectId} className="select-label">
          {label}
        </label>
      )}

      <select
        id={selectId}
        className={`select-element ${error ? 'select-error' : ''} ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="select-error-text">{error}</span>}
    </div>
  );
}
