export default function Filter({ dispatch, formState }) {
  return (
    <div>
      <label htmlFor="nameToFilter">filter shown with:</label>
      <input
        name="nameToFilter"
        id="nameToFilter"
        value={formState.nameToFilter}
        onChange={(e) =>
          dispatch({
            type: "Input Text",
            field: e.target.name,
            payload: e.target.value,
          })
        }
      />
    </div>
  );
}
