import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [newText, setNewText] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); 

  const handleNewText = (event) => {
    setNewText(event.target.value);
    setSelectedCountry(null); 
  };

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        console.log('promise fulfilled');
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newText.toLowerCase())
  );

  const showCountry = (country) => {
    setSelectedCountry(country); // Set the selected country when the button is clicked
  };

  return (
    <>
      <p>
        find countries{' '}
        <input value={newText} onChange={handleNewText} />
      </p>
      {selectedCountry ? (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <p>capital {selectedCountry.capital}</p>
          <p>area {selectedCountry?.area}</p>
          <p>
            <strong>languages</strong>
          </p>
          <ul>
            {Object.values(selectedCountry?.languages || {}).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.png} alt={selectedCountry.name.common} />
        </div>
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        filteredCountries.map((country, index) => (
          <div key={index}>
            <p>{country.name.common}</p>
            <button onClick={() => showCountry(country)}>Show</button>
          </div>
        ))
      )}
    </>
  );
};

export default App;
