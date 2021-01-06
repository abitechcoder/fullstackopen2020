import React from "react";
import "./Country.css";

function Country({ specificCountries, showDetails }) {
  return (
    <div>
      {specificCountries.map((country) => {
        return (
          <div id="country" key={country.name}>
            {country.name}
            <button onClick={() => showDetails(country)}>show</button>
          </div>
        );
      })}
    </div>
  );
}

export default Country;
