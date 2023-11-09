import React, { useState, useEffect, createContext } from 'react';
import './Styles/App.css';
import AddPersonForm from './Components/AddPersonForm/AddPersonForm';
import { PersonsList } from "./Components/PersonsList";
import * as Api from "./APIs/Api";
import { Person } from './Interfaces/Person';

interface GetPersonsContextProps {
    GetPersons: () => Promise<void>;
}

const GetPersonsContext = createContext<GetPersonsContextProps | undefined>(undefined);

const App: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([]);

    const GetPersons = async () => {
        const data: Person[] = await Api.GetPersons();
        setPersons(data);
    };

    useEffect(() => {
        GetPersons();
    });

    return (
        <div>
            <GetPersonsContext.Provider value={{ GetPersons }}>
                <AddPersonForm />
                {persons.length !== 0 ? (
                    <PersonsList persons={persons} title={"Persons"} />
                ) : (
                    <h2 style={{ textAlign: 'center' }}>Persons not found</h2>
                )}
            </GetPersonsContext.Provider>
        </div>
    );
};

export { App, GetPersonsContext };
