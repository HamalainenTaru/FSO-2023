import Person from "./Person";

export default function Persons({ persons, formState, namesToShow }) {
  const personList = formState.nameToFilter ? namesToShow : persons;
  return (
    <div>
      {personList.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
}
