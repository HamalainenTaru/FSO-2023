export default function Filter({ filter, onChange }) {
  return (
    <div>
      <span>Find countries: </span>
      <input type="text" value={filter} onChange={onChange} />
    </div>
  );
}
