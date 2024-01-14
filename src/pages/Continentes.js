import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONTINENTS, GET_COUNTRIES } from '../queries';
import '../css/Continente.css';

const Continentes = () => {
  const { loading: continentsLoading, error: continentsError, data: continentsData } = useQuery(GET_CONTINENTS);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const { loading: countriesLoading, error: countriesError, data: countriesData } = useQuery(GET_COUNTRIES, {
    variables: { continent: selectedContinent },
  });

  if (continentsLoading || countriesLoading) return <p>Cargando...</p>;
  if (continentsError || countriesError) return <p>Error: {continentsError ? continentsError.message : countriesError.message}</p>;

  const handleContinentClick = (continentName) => {
    setSelectedContinent(continentName);
  };

  return (
    <div>
      <h2>Continentes</h2>
      <div className="continent-container">
        {continentsData.continents.map((continent) => (
          <div
            key={continent.name}
            onClick={() => handleContinentClick(continent.name)}
            className={`continent ${selectedContinent === continent.name ? 'selected' : ''}`}
          >
            {continent.name}
          </div>
        ))}
      </div>

      {selectedContinent && (
        <div>
          <h3 className="selected-continent">{selectedContinent}</h3>
          <div className="continent-container">
            {countriesData.countries
              .filter((country) => country.continent.name === selectedContinent)
              .map((country) => (
                <div key={country.name} className="country country-card">
                  {country.name}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Continentes;
