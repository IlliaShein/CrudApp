import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MyButton from '../../UI/Button/MyButton';
import EditingPersonItemSegment from './EditingPersonItemSegment';
import { MyContext } from '../../PersonsList';
import '../../../Styles/Errors.css';

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
  const { person } = useContext(MyContext);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue('id', person.id);
    setValue('firstName', person.firstName);
    setValue('lastName', person.lastName);
    setValue('age', person.age);
    setValue('description', person.description);
  }, [person, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    Save(data);
  };

  const handleCancel = () => {
    Cancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="person">
        <div style={{ flexDirection: 'column', alignItems: 'start' }}>
          <EditingPersonItemSegment label="First name" name="firstName" register={register} />
          {errors.firstName && <p className='error'>{errors.firstName.message}</p>}
          <EditingPersonItemSegment label="Last name" name="lastName" register={register} />
          {errors.lastName && <p className='error'>{errors.lastName.message}</p>}
          <EditingPersonItemSegment label="Age" name="age" register={register} />
          {errors.age && <p className='error'>{errors.age.message}</p>}
          <EditingPersonItemSegment label="Description" name="description" register={register} />
        </div>
        <div className="person__btns">
          <MyButton type="submit">Save</MyButton>
          <MyButton type="button" onClick={handleCancel}>
            Cancel
          </MyButton>
        </div>
      </div>
    </form>
  );
};

export default EditingPersonItem;
