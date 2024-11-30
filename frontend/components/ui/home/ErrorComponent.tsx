import React from 'react';

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => (
  <div className="text-center p-4">
    <h3 className="text-xl font-semibold text-red-500 mb-2">Error</h3>
    <p className="text-gray-300">{message}</p>
  </div>
);

export default ErrorComponent;