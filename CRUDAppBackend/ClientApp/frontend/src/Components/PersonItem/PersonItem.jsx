import React, { useState } from 'react';
import EditingPersonItem from './EditingPersonItem/EditingPersonItem';
import NotEditingPersonItem from './NotEditinfPersonItem';

const PersonItem = function (props) {
  const { person } = props;
  const [editing, setEditing] = useState(false);

  const save = (personData) => {
    setEditing(false);
    props.edit(personData);
  };

  
  if (editing) {
    return (
      <EditingPersonItem
        person={person}
        Save={save}
        Cancel={() => setEditing(false)}
      />
    );
  }

  return (
    <NotEditingPersonItem
      number={props.number}
      onEdit={() => setEditing(true)}
      onRemove={props.remove}
    />
  )
}

export default PersonItem;