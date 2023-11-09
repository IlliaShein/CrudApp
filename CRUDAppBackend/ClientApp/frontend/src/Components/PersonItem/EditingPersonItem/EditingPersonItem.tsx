import { useContext, FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import EditingPersonItemForm from './EditingPersonItemForm/EditingPersonItemForm';
import EditingPersonItemButtons from './EditingPersonItemButtons';
import { PersonContext } from '../../PersonsList';

interface EditingPersonItemProps {
  Save: (data: FormValues) => void;
  Cancel: () => void;
}

interface FormValues {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  description?: string;
}

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

const EditingPersonItem: FC<EditingPersonItemProps> = ({ Save, Cancel }) => {
  const context = useContext(PersonContext);
  if (!context) {
    throw new Error('Context not provided properly');
  }
  const { person } = context;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: person.id.toString(),
      firstName: person.firstName,
      lastName: person.lastName,
      age: person.age,
      description: person.description,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    Save(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="person">
        <EditingPersonItemForm errors={errors} register={register} />
        <EditingPersonItemButtons
          handleCancel={() => {
            reset();
            Cancel();
          }}
        />
      </div>
    </form>
  );
};

export default EditingPersonItem;
