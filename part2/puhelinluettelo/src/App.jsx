import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import AddPersonForm from "./components/AddPersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const formInitialState = { name: "", number: "", nameToFilter: "" };
const formReducer = (state, action) => {
  switch (action.type) {
    case "Input Text":
      console.log([action.field]);
      return { ...state, [action.field]: action.payload };
    case "reset":
      return formInitialState;
    default:
      throw new Error("no action type find");
  }
};

export default function App() {
  const [persons, setPersons] = useState([]);
  const [formState, dispatch] = useReducer(formReducer, formInitialState);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const addNewPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: formState.name,
      number: formState.number,
    };
    setPersons([...persons, newPerson]);
    dispatch({ type: "reset" });
  };

  const namesToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(formState.nameToFilter.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter dispatch={dispatch} formState={formState} />

      <h3>Add new person</h3>
      <AddPersonForm
        onAddNewPerson={addNewPerson}
        formState={formState}
        dispatch={dispatch}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        namesToShow={namesToShow}
        formState={formState}
      />
    </div>
  );
}
