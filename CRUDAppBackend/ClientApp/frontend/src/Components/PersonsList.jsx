import React, { createContext } from "react";
import PersonItem from "./PersonItem/PersonItem";

const MyContext = createContext();

const PersonsList = function ({ persons, title, remove, edit }) {

    return (
        <div>

            <h1 style={{ textAlign: "center" }}>
                {title}
            </h1>

            <div className="App">
                {persons.map((person, index) => (
                    <MyContext.Provider value={{ person, number: index + 1 }}>
                        <PersonItem remove={remove} edit={edit} key={person.id} />
                    </MyContext.Provider>
                ))}
            </div>

        </div>
    )
}

export { PersonsList, MyContext };