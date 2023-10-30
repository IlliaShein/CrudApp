import React from 'react';

const EditingPersonItemSegment = ({ label, name, register }) => {
  return (
    <div>
      {label}: <input className="myInput" {...register(name)} />
    </div>
  );
};

export default EditingPersonItemSegment;
