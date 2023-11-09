import { FC } from 'react';
import EditingPersonItemSegment from './EditingPersonItemSegment';

interface EditingPersonItemFormProps {
  register: any;
  errors: {
    firstName?: any;
    lastName?: any;
    age?: any;
    description?: any;
  };
}

const EditingPersonItemForm: FC<EditingPersonItemFormProps> = ({ register, errors }) => {
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
