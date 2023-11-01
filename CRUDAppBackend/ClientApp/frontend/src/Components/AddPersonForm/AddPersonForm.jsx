import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MyButton from "../UI/Button/MyButton";
import '../../Styles/MyInput.css';
import * as Api from "../../APIs/Api";
import { GetPersonsContext } from '../../App';
import FormElement from './FormElement';

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),
  description: yup.string(),
});

const AddPersonForm = function () {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { getPersons } = useContext(GetPersonsContext);

  const onSubmit = async (newPersonData) => {
    await Api.createPerson(newPersonData);
    await getPersons();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormElement
        name="firstName"
        placeholder="First Name"
        register={register}
        error={errors.firstName}
      />
      <FormElement
        name="lastName"
        placeholder="Last Name"
        register={register}
        error={errors.lastName}
      />
      <FormElement
        name="age"
        placeholder="Age"
        register={register}
        error={errors.age}
      />
      <FormElement
        name="description"
        placeholder="Description"
        register={register}
        error={errors.description}
      />
      <MyButton type="submit">Add Person</MyButton>
    </form>
    );
};

export default AddPersonForm;
