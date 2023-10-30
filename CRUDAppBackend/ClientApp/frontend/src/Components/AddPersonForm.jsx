import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MyButton from "./UI/Button/MyButton";
import '../Styles/MyInput.css';

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

const AddPersonForm = function ({ create }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    create(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className='myInput'
        {...register("firstName")}
        type="text"
        placeholder="First Name"
      />
      {errors.firstName && <p className='error'>{errors.firstName.message}</p>}
      <input className='myInput'
        {...register("lastName")}
        type="text"
        placeholder="Last Name"
      />
      {errors.lastName && <p className='error'>{errors.lastName.message}</p>}
      <input className='myInput'
        {...register("age")}
        type="text"
        placeholder="Age"
      />
      {errors.age && <p className='error'>{errors.age.message}</p>}
      <input className='myInput'
        {...register("description")}
        type="text"
        placeholder="Description"
      />
      <MyButton type="submit">Add Person</MyButton>
    </form>
  );
};

export default AddPersonForm;
