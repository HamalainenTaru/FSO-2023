import Countries from "./Countries";
import Country from "./Country";

export default function Display({ countries, onCountrySelect }) {
  switch (true) {
    case countries?.length <= 10 && countries?.length > 1:
      return (
        <Countries countries={countries} onCountrySelect={onCountrySelect} />
      );
    case countries?.length > 10:
      return <p>Too Many matches, specify another filter</p>;
    case countries?.length === 1:
      return <Country country={countries[0]} />;
    default:
      return null;
  }
}
