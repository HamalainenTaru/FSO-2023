import axios from "axios";
import { useEffect, useState } from "react";

export default function Weather({ country }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          appid: import.meta.env.VITE_APIKEY,
          lat: country.capitalInfo.latlng[0],
          lon: country.capitalInfo.latlng[1],
          units: "metric",
        },
      })
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country.capitalInfo.latlng]);

  if (!weather) return null;
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <p>Feels like {weather.main.feels_like} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].main}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
}
