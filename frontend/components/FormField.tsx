import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  description?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  register,
  error,
  placeholder,
  description
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-indigo-300 mb-2">
        {label}
      </label>
      <input
        {...register(name)}
        id={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
      />
      {error && <p className="text-red-400 text-xs mt-2">{error.message}</p>}
      {description && <p className="text-gray-400 text-xs mt-2">{description}</p>}
    </div>
  );
};

export default FormField;