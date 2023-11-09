import { useState, useContext, FC } from 'react';
import EditingPersonItem from './EditingPersonItem/EditingPersonItem';
import NotEditingPersonItem from './NotEditinfPersonItem';
import * as Api from "../../APIs/Api";
import { GetPersonsContext } from '../../App';
import { CreateContext } from '../../Context/ContextManager';

const PersonItem: FC = () => {
  const [editing, setEditing] = useState<boolean>(false);

  const { GetPersons } = CreateContext(GetPersonsContext);
  
  const save = async (personData: any): Promise<void> => {
    setEditing(false);
    await Api.SavePersonEditing(personData);
    await GetPersons();
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
  );
};

export default PersonItem;
