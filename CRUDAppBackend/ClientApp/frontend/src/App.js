import React, { useState, useEffect } from 'react';
import './Styles/App.css';
import AddPersonForm from './Components/AddPersonForm';
import { PersonsList } from "./Components/PersonsList";
import * as Api from "./APIs/Api";

function App() {
  const [persons, setPersons] = useState([]);

  const getPersons = async () => {
    const data = await Api.getPersons();
    console.log(data);
    setPersons(data);
  };

  const removePerson = async (personId) => {
    await Api.removePerson(personId);
    await getPersons();
  };

  const createPerson = async (newPerson) => {
    console.log(newPerson);
    await Api.createPerson(newPerson);
    await getPersons();
  };

  const savePersonEditing = async (person) => {
    await Api.savePersonEditing(person);
    await getPersons();
  };

  useEffect(() => {
    getPersons();
  }, []);

  return (
    <div>

      <AddPersonForm create={createPerson} />

      {persons.length !== 0 ? (
        <PersonsList remove={removePerson} edit={savePersonEditing} persons={persons} title={"Persons"} />
      ) : (
        <h2 style={{ textAlign: 'center' }}>Persons not found</h2>
      )}
    </div>
  );
}

export default App;
