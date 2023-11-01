import React, { useState, useContext } from 'react';
import EditingPersonItem from './EditingPersonItem/EditingPersonItem';
import NotEditingPersonItem from './NotEditinfPersonItem';
import * as Api from "../../APIs/Api";
import { GetPersonsContext } from '../../App';

const PersonItem = function () {
  const [editing, setEditing] = useState(false);
  const { getPersons } = useContext(GetPersonsContext);
  
  const save = async (personData) => {
    setEditing(false);
    await Api.savePersonEditing(personData);
    await getPersons();
  };
  
  if (editing) {
    return (
      <EditingPersonItem
        Save={save}
        Cancel={() => setEditing(false)}
      />
    );
  }

  return (
    <NotEditingPersonItem
      onEdit={() => setEditing(true)}
    />
  )
}

export default PersonItem;