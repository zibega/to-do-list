import React, { forwardRef } from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className = '',
      type = 'button',
      children,
      ...props
    },
    ref,
  ) => {
    let classes = `bttn ${variant} ${size}`;
    if (fullWidth) classes += ' full-width';
    if (className) classes += ` ${className}`;
    return (
      <button ref={ref} type={type} className={classes} disabled={disabled || loading} {...props}>
        {loading ? (
          'Loading...'
        ) : (
          <>
            {leftIcon && <span>{leftIcon}</span>}
            {children}
            {rightIcon && <span>{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);
