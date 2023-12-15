import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [newText, setNewText] = useState('');
  const [countries, setCountries] = useState([]);

  const handleNewText = (event) => {
    setNewText(event.target.value);
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

  return (
    <>
      <p>
        find countries{' '}
        <input value={newText} onChange={handleNewText} />
      </p>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        filteredCountries.map((country, index) => (
          <div key={index}>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country?.area}</p>
            <p><strong>languages</strong></p>
            <ul>
              {Object.values(country?.languages || {}).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <img src = {country.flags.png} />
          </div>
        ))
      ) : (
        filteredCountries.map((country, index) => (
          <p key={index}>{country.name.common}</p>
        ))
      )}
    </>
  );
};

export default App;
