import { FC } from 'react';
import '../../../../Styles/Errors.css';

interface EditingPersonItemSegmentProps {
  label: string;
  name: string;
  register: any;
  error?: any;
}

const EditingPersonItemSegment: FC<EditingPersonItemSegmentProps> = ({ label, name, register, error }) => {
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
