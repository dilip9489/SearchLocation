import React, { useState, useEffect } from 'react';
import './LocationSelector.css'; 

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
     
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    
    // Fetching states for the selected country
    fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
      .then(response => response.json())
      .then(data => setStates(data))
      .catch(error => console.error('Error fetching states:', error));
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
     
    // Fetching cities for the selected state
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`)
      .then(response => response.json())
      .then(data => setCities(data ))
      .catch(error => console.error('Error fetching cities:', error));
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="location-selector">
      <h1>Select Location</h1>

      {/* Country Dropdown */}
      <div className="dropdown">
        <label>Select Country: </label>
        <select
          value={selectedCountry}
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value="" disabled>Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* State Dropdown */}
      <div className="dropdown">
        <label>Select State: </label>
        <select
          value={selectedState}
          onChange={(e) => handleStateChange(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="" disabled>Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="dropdown">
        <label>Select City: </label>
        <select
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          disabled={!selectedState}
        >
          <option value="" disabled>Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

       
      {selectedCity && (
        <p className="selected-location">
          You <span style={{fontWeight:"bold"}}>selected </span>{selectedCity}, {selectedState}, {selectedCountry}.
        </p>
      )}
    </div>
  );
};

export default LocationSelector;
