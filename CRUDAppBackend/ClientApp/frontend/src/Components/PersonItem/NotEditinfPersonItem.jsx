import React, { useContext } from 'react';
import MyButton from '../UI/Button/MyButton';
import { PersonContext } from '../PersonsList';
import * as Api from "../../APIs/Api";
import { GetPersonsContext } from '../../App';


const NotEditingPersonItem = ({ onEdit }) => {
  const {person, number} = useContext(PersonContext);
  const { getPersons } = useContext(GetPersonsContext);

  const onRemove = async (id) => {
    await Api.removePerson(id);
    await getPersons();
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