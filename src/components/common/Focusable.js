import React from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import './Focusable.css';

/**
 * Focusable Component
 * 
 * A wrapper component that makes any element focusable with Norigin Spatial Navigation.
 * This component handles focus management, visual focus states, and event handling.
 */
function Focusable({
  id,
  children,
  onSelect,
  onFocus,
  onBlur,
  className = '',
  style,
  disabled = false,
  role = 'button',
  ariaLabel,
  ...rest
}) {
  // Use Norigin's useFocusable hook for focus management
  // Returns { ref, onEnterPress, onFocus, onBlur } object
  const { ref, onEnterPress, onFocus: handleFocus, onBlur: handleBlur } = useFocusable({
    id,
    disabled,
    onFocus: () => {
      if (onFocus && !disabled) {
        onFocus();
      }
    },
    onBlur: () => {
      if (onBlur && !disabled) {
        onBlur();
      }
    },
    onEnterPress: () => {
      if (onSelect && !disabled) {
        onSelect();
      }
    },
  });

  return (
    <div
      ref={ref}
      data-focusable
      data-focusable-id={id}
      role={role}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      tabIndex={0}
      className={`focusable ${disabled ? 'focusable-disabled' : ''} ${className}`}
      style={style}
      onEnterPress={onEnterPress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Focusable;