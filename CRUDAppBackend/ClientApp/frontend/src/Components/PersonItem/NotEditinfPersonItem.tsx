import { useContext, FC } from 'react';
import MyButton from '../UI/Button/MyButton';
import { PersonContext } from '../PersonsList';
import * as Api from '../../APIs/Api';
import { GetPersonsContext } from '../../App';
import { CreateContext } from '../../Context/ContextManager';

interface NotEditingPersonItemProps {
  onEdit: () => void;
}

const NotEditingPersonItem: FC<NotEditingPersonItemProps> = ({ onEdit }) => {

  const { GetPersons } = CreateContext(GetPersonsContext);
  const { person, number } = CreateContext(PersonContext);

  const onRemove = async (id: number): Promise<void> => {
    await Api.RemovePerson(id);
    await GetPersons();
  };

  return (
    <div className="person">
      <div className="person_content">
        <strong>№{number} {person.firstName} {person.lastName} - {person.age} years</strong>
        <div>{person.description}</div>
      </div>
      <div className="person__btns">
        <MyButton onClick={() => onRemove(person.id)}>Delete</MyButton>
        <MyButton onClick={onEdit}>Edit</MyButton>
      </div>
    </div>
  );
};

export default NotEditingPersonItem;
