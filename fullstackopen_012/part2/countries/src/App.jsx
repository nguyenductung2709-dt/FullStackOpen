import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [newText, setNewText] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const api_key = import.meta.env.VITE_SOME_KEY;

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
        console.error('Error fetching countries data:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const { latlng } = selectedCountry.capitalInfo;
      if (latlng && latlng.length === 2) {
        const [latitude, longitude] = latlng;
        const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;
        axios
          .get(API)
          .then((response) => {
            setWeatherData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching weather data:', error);
            setWeatherData(null); 
          });
      }
    }
  }, [selectedCountry, api_key]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newText.toLowerCase())
  );

  const showCountry = (country) => {
    setSelectedCountry(country);
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
          {weatherData ? (
            <div>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <img src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon}@2x.png`} alt="Weather Icon" />
              <p> wind {weatherData.wind.speed} m/s </p>
            </div>
          ) : (
            <p>No weather data available</p>
          )}
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
