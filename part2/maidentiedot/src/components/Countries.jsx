export default function Countries({ countries, onCountrySelect }) {
  return (
    <ul>
      {countries?.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => onCountrySelect(country.name.common)}>
            Show
          </button>
        </li>
      ))}
    </ul>
  );
}
