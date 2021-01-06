import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CountryDetails from "./components/CountryDetails";
import Country from "./components/Country";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [cDetails, setCDetails] = useState({});
  const [active, setActive] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(({ data }) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log("failed to fetch: ", error);
      });
  }, []);

  const handleChange = (event) => {
    setQuery(event.target.value);
    setActive("");
  };

  const specificCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const showDetails = (data) => {
    setActive(data.name);
    setCDetails(data);
  };

  const displayCountry =
    specificCountries.length === 1 ? (
      specificCountries.map((country) => {
        return <CountryDetails key={country.name} country={country} />;
      })
    ) : specificCountries.length > 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : (
      <Country
        specificCountries={specificCountries}
        showDetails={showDetails}
      />
    );

  return (
    <div className="App">
      <p>
        find countries
        <input type="text" onChange={handleChange} />
      </p>
      <div>
        {active === cDetails.name ? (
          <CountryDetails key={cDetails.name} country={cDetails} />
        ) : (
          displayCountry
        )}
      </div>
    </div>
  );
}

export default App;
