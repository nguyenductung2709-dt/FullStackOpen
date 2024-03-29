import { useState, useEffect } from 'react';
import axios from 'axios';

const useCountry = (countryName) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (countryName) {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => {
          if (response.data.length > 0) {
            setCountry(response.data[0]);
          } else {
            setCountry(null);
          }
        })
        .catch((error) => {
          console.error('Error fetching country data:', error);
          setCountry(null);
        });
    } else {
      setCountry(null);
    }
  }, [countryName]);

  return country;
};

export default useCountry;
