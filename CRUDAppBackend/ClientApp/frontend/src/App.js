import React, { useState, useEffect, createContext } from 'react';
import './Styles/App.css';
import AddPersonForm from './Components/AddPersonForm/AddPersonForm';
import { PersonsList } from "./Components/PersonsList";
import * as Api from "./APIs/Api";

const GetPersonsContext = createContext();

function App() {
  const [persons, setPersons] = useState([]);

  const getPersons = async () => {
    const data = await Api.getPersons();
    setPersons(data);
  };

  useEffect(() => {
    getPersons();
  }, []);

  return (
    <div>
      <GetPersonsContext.Provider value={{ getPersons }}>
        <AddPersonForm/>
        {persons.length !== 0 ? (
          <PersonsList persons={persons} title={"Persons"} />
        ) : (
          <h2 style={{ textAlign: 'center' }}>Persons not found</h2>
        )}
      </GetPersonsContext.Provider>
    </div>
  );
}

export { App, GetPersonsContext };
