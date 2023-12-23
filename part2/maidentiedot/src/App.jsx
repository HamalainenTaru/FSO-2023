import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Display from "./components/Display";

export default function App() {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState("");

  const countriesToShow = countries?.filter((country) =>
    filter
      ? country.name.common.toLowerCase().startsWith(filter.toLowerCase())
      : null
  );

  // handle input change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // handle selecting country
  const handleCountrySelect = (value) => {
    setFilter(value);
  };

  // get country data from API
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Filter filter={filter} onChange={handleFilterChange} />
      <Display
        countries={countriesToShow}
        onCountrySelect={handleCountrySelect}
      />
    </div>
  );
}
