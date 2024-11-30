import React, { ReactNode } from 'react';

type AlertVariant = 'error' | 'loading' | 'success';

interface AlertProps {
  variant: AlertVariant;
  children: ReactNode;
}

const Alert: React.FC<AlertProps> = ({ variant, children }) => {
  const variantStyles = {
    error: 'bg-red-100 text-red-700 border-red-400',
    loading: 'bg-yellow-100 text-yellow-700 border-yellow-400',
    success: 'bg-green-100 text-green-700 border-green-400',
  };

  return (
    <div className={`p-4 mb-4 rounded-md border ${variantStyles[variant]}`}>
      {variant === 'loading' && (
        <svg className="animate-spin h-5 w-5 mr-3 inline" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </div>
  );
};

export default Alert;