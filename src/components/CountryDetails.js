// CountryDetails.js

import React from 'react';

const CountryDetails = ({ country }) => {
  // Verifica si hay información del país
  if (!country) {
    return <div>No se ha seleccionado ningún país</div>;
  }

  const { name, capital, continent, code, phone } = country;

  return (
    <div>
      <h2>{name}</h2>
      <p>Código: {code}</p>
      <p>Capital: {capital}</p>
      <p>Continente: {continent.name}</p>
      <p>Codigo de Teléfono: {phone}</p>
    </div>
  );
};

export default CountryDetails;
