import Person from "./Person";

export default function Persons({ persons, formState, namesToShow }) {
  return (
    <div>
      {!formState.nameToFilter
        ? persons.map((person) => <Person key={person.name} person={person} />)
        : namesToShow.map((person) => (
            <Person key={person.name} person={person} />
          ))}
    </div>
  );
}
