import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'solid' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  disabled = false,
  type = 'button',
  variant = 'solid',
}) => {
  const baseStyles = 'px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 transition-colors duration-200';
  const solidStyles = 'bg-lime-500 hover:bg-lime-600 text-white';
  const outlineStyles = 'bg-transparent border-2 border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-white';
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const variantStyles = variant === 'solid' ? solidStyles : outlineStyles;
  const buttonStyles = `${baseStyles} ${variantStyles} ${disabled ? disabledStyles : ''} ${className}`;
  return (
    <button
      onClick={onClick}
      className={buttonStyles}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;