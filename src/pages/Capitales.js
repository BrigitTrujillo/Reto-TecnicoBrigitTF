import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONTINENTS, GET_COUNTRIES } from '../queries';
import { Card, Row, Col, Button } from 'react-bootstrap';
import '../css/capitales.css';

const Capitales = () => {
  const { loading: loadingContinents, error: errorContinents, data: dataContinents } = useQuery(GET_CONTINENTS);
  const { loading: loadingCountries, error: errorCountries, data: dataCountries } = useQuery(GET_COUNTRIES);
  const [selectedContinent, setSelectedContinent] = useState(null);

  if (loadingContinents || loadingCountries) return <p>Cargando...</p>;
  if (errorContinents || errorCountries) return <p>Error: {errorContinents || errorCountries.message}</p>;

  const continents = dataContinents.continents;
  const countries = dataCountries.countries;

  const handleContinentClick = (continent) => {
    setSelectedContinent(continent);
  };

  return (
    <div>
      <Row>
        <Col xs={4}>
          <h1>Capitales</h1>
          {continents.map((continent) => (
            <Button key={continent.name} onClick={() => handleContinentClick(continent)}>
              {continent.name}
            </Button>
          ))}
        </Col>
        <Col xs={8}>
          {selectedContinent && (
            <div>
              <h2>{selectedContinent.name}</h2>
              <Row xs={2} md={3} lg={4}>
                {countries
                  .filter((country) => country.continent.name === selectedContinent.name)
                  .map((country) => (
        <Col key={country.name} style={{ display: 'flex' }}>
         <Card>
             <Card.Body>
        <Card.Title>
           <p className="card-title">{country.name}</p>
           <p className="card-subtitle">Capital: {country.capital}</p>
          <p className="card-subtitle">Código: {country.code}</p>
   
       </Card.Title>
             </Card.Body>
              </Card>
               </Col>

                  ))}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Capitales;
