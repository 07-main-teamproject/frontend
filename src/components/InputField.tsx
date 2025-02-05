import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
  username: string;
}

interface InputFieldProps {
  label: string;
  type?: string;
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  name,
  register,
  error,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...register(name)} type={type} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default InputField;
