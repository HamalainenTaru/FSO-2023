import { useEffect, useReducer, useState } from "react";
import AddPersonForm from "./components/AddPersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import server from "./services/server";
import Notification from "./components/Notification";

// reducer for form
const formInitialState = { name: "", number: "", nameToFilter: "" };
const formReducer = (state, action) => {
  switch (action.type) {
    case "Input Text":
      return { ...state, [action.field]: action.payload };
    case "reset":
      return formInitialState;
    default:
      throw new Error("no action type find");
  }
};

const SUCCESS = "success";
const FAIL = "fail";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [formState, dispatch] = useReducer(formReducer, formInitialState);
  const [error, setError] = useState({ message: null, type: SUCCESS });

  // getting data from json server
  useEffect(() => {
    server.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  // handle time out of error message when changing error object
  useEffect(() => {
    let timer = null;

    if (error.message) {
      timer = setTimeout(() => {
        setError({ ...error, message: null });
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [error]);

  const addNewPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: formState.name,
      number: formState.number,
    };

    // dont add person without name or number
    if (!formState.name || !formState.number) return;

    // check if name is already in phonebook
    const nameList = persons.map((person) => person.name);
    const existingPerson = nameList.includes(newPerson.name);

    // if person is not in phonebook
    if (!existingPerson) {
      // post new person to server
      server.create(newPerson).then((response) => {
        setPersons([...persons, response.data]);
        dispatch({ type: "reset" });
        setError({ message: `Added ${newPerson.name}`, type: SUCCESS });
      });
      // person is already in phonebook. Change number to new one
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already in phonebook. Change old number to new one (${newPerson.number}) ?`
        )
      ) {
        const person = persons.find((p) => p.name === newPerson.name);
        const updatedPerson = { ...person, number: newPerson.number };
        server
          .update(person.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : response.data))
            );
            setError({
              message: `${updatedPerson.name}'s number was updated`,
              type: SUCCESS,
            });
          })
          .catch((error) => {
            console.log(error);
            setError({
              message: `Information of ${person.name} was already removed from server`,
              type: FAIL,
            });
          });
      }
      dispatch({ type: "reset" });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name} from phonebook? `)) {
      server
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setError({ message: `${person.name} was removed`, type: SUCCESS });
        })
        .catch((error) => {
          console.log(error);
          setError({
            message: `${person.name} was already removed from server`,
            type: FAIL,
          });
        });
    }
  };

  const namesToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(formState.nameToFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification error={error} />
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
        onDeletePerson={deletePerson}
      />
    </div>
  );
}
