import React from "react";

interface FormElementProps {
  name: string;
  placeholder: string;
  register: any;
  error: any;
}

const FormElement: React.FC<FormElementProps> = ({ name, placeholder, register, error }) => {
  return (
    <div>
      <input
        className='myInput'
        {...register(name)}
        type="text"
        placeholder={placeholder}
      />
      {error && <p className='error'>{error.message}</p>}
    </div>
  );
};

export default FormElement;
