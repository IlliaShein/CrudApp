import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import EditingPersonItemForm from './EditingPersonItemForm/EditingPersonItemForm';
import EditingPersonItemButtons from './EditingPersonItemButtons';
import { PersonContext } from '../../PersonsList';

const schema = yup.object().shape({
  id: yup.string().required(),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  description: yup.string(),
});

const EditingPersonItem = ({ Save, Cancel }) => {
  const { person } = useContext(PersonContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: person.id,
      firstName: person.firstName,
      lastName: person.lastName,
      age: person.age,
      description: person.description,
    },
  });

  const onSubmit = (data) => {
    Save(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="person">
        <EditingPersonItemForm errors={errors} register={register} />
        <EditingPersonItemButtons handleCancel={() => {
          reset();
          Cancel();
        }} />
      </div>
    </form>
  );
};

export default EditingPersonItem;
