import React from 'react';
import '../../../../Styles/Errors.css';

const EditingPersonItemSegment = ({ label, name, register, error }) => {
  return (
    <div>
      <div>
        {label}: <input className="myInput" {...register(name)} />
      </div>
      {error && <p className='error'>{error.message}</p>}
    </div>
  );
};

export default EditingPersonItemSegment;
