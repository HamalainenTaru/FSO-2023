import Person from "./Person";

export default function Persons({
  persons,
  formState,
  namesToShow,
  onDeletePerson,
}) {
  const personList = formState.nameToFilter ? namesToShow : persons;
  return (
    <div>
      {personList.map((person) => (
        <Person
          key={person.name}
          person={person}
          onDeletePerson={onDeletePerson}
        />
      ))}
    </div>
  );
}
