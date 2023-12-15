export default function AddPersonForm({ onAddNewPerson, formState, dispatch }) {
  return (
    <form onSubmit={onAddNewPerson}>
      <div>
        <label htmlFor="name">name:</label>
        <input
          name="name"
          id="name"
          autoComplete="off"
          value={formState.name}
          onChange={(e) =>
            dispatch({
              type: "Input Text",
              field: e.target.name,
              payload: e.target.value,
            })
          }
        />
        <div>
          <label htmlFor="number">number:</label>
          <input
            name="number"
            id="number"
            autoComplete="off"
            value={formState.number}
            onChange={(e) =>
              dispatch({
                type: "Input Text",
                field: e.target.name,
                payload: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
