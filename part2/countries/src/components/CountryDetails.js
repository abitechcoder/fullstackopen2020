import { useState, useEffect } from "react";
import axios from "axios";

function CountryDetails({ country }) {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.name,
    };

    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => {
        const apiResponse = response.data;
        setWeatherData({
          location_name: apiResponse.location.name,
          temperature: apiResponse.current.temperature,
          icon_url: apiResponse.current.weather_icons[0],
          wind_speed: apiResponse.current.wind_speed,
          wind_dir: apiResponse.current.wind_dir,
        });
      })
      .catch((error) => {
        console.log("error occured while fetching the weather data: ", error);
      });
  }, []);

  const isEmpty = Object.entries(weatherData).length === 0;

  return (
    <div key={country.name}>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img
        src={country.flag}
        alt={"image of " + country.name}
        width="150"
        height="150"
      />
      <div className="weather__data">
        {!isEmpty && (
          <div>
            <h2>Weather in {weatherData.location_name}</h2>
            <p>
              <strong>temperature</strong> {weatherData.temperature} Celcius
            </p>
            <img
              src={weatherData.icon_url}
              alt={"weather icon of " + weatherData.location_name}
            />
            <p>
              <strong>wind</strong> {weatherData.wind_speed} mph direction{" "}
              {weatherData.wind_dir}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryDetails;
