import React, { createContext } from "react";
import PersonItem from "./PersonItem/PersonItem";

const PersonContext = createContext();

const PersonsList = function ({ persons, title }) {

    return (
        <div>

            <h1 style={{ textAlign: "center" }}>
                {title}
            </h1>

            <div className="App">
                {persons.map((person, index) => (
                    <PersonContext.Provider value={{ person, number: index + 1 }}>
                        <PersonItem key={person.id} />
                    </PersonContext.Provider>
                ))}
            </div>

        </div>
    )
}

export { PersonsList, PersonContext };