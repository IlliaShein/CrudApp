import React, { createContext } from "react";
import PersonItem from "./PersonItem/PersonItem";
import { Person } from "../Interfaces/Person";

interface PersonContextProps {
    person: Person;
    number: number;
}

const PersonContext = createContext<PersonContextProps | undefined>(undefined);

interface PersonsListProps {
    persons: Person[];
    title: string;
}

const PersonsList: React.FC<PersonsListProps> = ({ persons, title }: PersonsListProps) => {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>{title}</h1>
            <div className="App">
                {persons.map((person, index) => (
                    <PersonContext.Provider key={person.id} value={{ person, number: index + 1 }}>
                        <PersonItem />
                    </PersonContext.Provider>
                ))}
            </div>
        </div>
    );
};

export { PersonsList, PersonContext };
