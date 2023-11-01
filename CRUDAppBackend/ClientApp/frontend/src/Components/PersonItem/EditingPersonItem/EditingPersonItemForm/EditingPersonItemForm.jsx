import React from 'react';
import EditingPersonItemSegment from './EditingPersonItemSegment';

const EditingPersonItemForm = ({ register, errors }) => {
  return (
    <div style={{ flexDirection: 'column', alignItems: 'start' }}>
      <EditingPersonItemSegment label="First name" name="firstName" register={register} error={errors.firstName} />
      <EditingPersonItemSegment label="Last name" name="lastName" register={register} error={errors.lastName} />
      <EditingPersonItemSegment label="Age" name="age" register={register} error={errors.age} />
      <EditingPersonItemSegment label="Description" name="description" register={register} error={errors.description} />
    </div>
  );
};

export default EditingPersonItemForm;
