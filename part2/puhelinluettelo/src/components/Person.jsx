export default function Person({ person, onDeletePerson }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={() => onDeletePerson(person.id)}>Delete</button>
    </div>
  );
}
