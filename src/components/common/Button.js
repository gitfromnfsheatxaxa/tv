import React from 'react';
import Focusable from './Focusable';
import './Button.css';

/**
 * Button Component
 * 
 * A focusable button component designed for TV navigation.
 * Supports primary and secondary variants.
 * 
 * @param {string} id - Unique identifier for the button
 * @param {string} variant - Button variant: 'primary' or 'secondary'
 * @param {string} size - Button size: 'small', 'medium', or 'large'
 * @param {ReactNode} children - Button content
 * @param {Function} onSelect - Callback when button is selected
 * @param {boolean} disabled - Whether the button is disabled
 * @param {string} className - Additional CSS classes
 */
function Button({
  id,
  variant = 'primary',
  size = 'medium',
  children,
  onSelect,
  disabled = false,
  className = '',
  ...rest
}) {
  return (
    <Focusable
      id={id}
      role="button"
      onSelect={onSelect}
      disabled={disabled}
      className={`button button-${variant} button-${size} ${className}`}
      {...rest}
    >
      <span className="button-content">{children}</span>
    </Focusable>
  );
}

export default Button;