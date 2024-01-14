import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../queries';
import { searchImages } from '../services/pixabayApi';
import { getCountryFlag } from '../services/flagApi';
import '../css/SearchBar.css';

const SearchBar = ({ onSearch, onContinentFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [countryImages, setCountryImages] = useState([]);
  const [imageError, setImageError] = useState(null);
  const [countryFlags, setCountryFlags] = useState([]);

  useEffect(() => {
    const fetchImagesAndFlags = async () => {
      try {
        const imagesPromises = data?.countries.map(async (country) => {
          const images = await searchImages(searchTerm);
          const selectedImage = images.length > 0 ? images[0] : null;
          return { countryId: country.alpha2Code, image: selectedImage };
        });

        const flagsPromises = data?.countries.map(async (country) => {
          const flag = await getCountryFlag(country.alpha2Code);
          console.log('Flag for', country.name, ':', flag);
          return { countryId: country.alpha2Code, flag };
        });

        const imagesResults = await Promise.all(imagesPromises);
        const flagsResults = await Promise.all(flagsPromises);

        const imagesMap = imagesResults.reduce((acc, img) => {
          acc[img.countryId] = img.image;
          return acc;
        }, {});

        const flagsMap = flagsResults.reduce((acc, flag) => {
          acc[flag.countryId] = flag.flag;
          return acc;
        }, {});

        setCountryImages(imagesMap);
        setCountryFlags(flagsMap);
        setImageError(null);
      } catch (error) {
        setCountryImages([]);
        setCountryFlags([]);
        setImageError(error.message);
      }
    };

    if (searchTerm) {
      fetchImagesAndFlags();
    }
  }, [searchTerm, data]);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const filteredCountries = data?.countries?.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const twelveFilteredCountries = filteredCountries.slice(0, 12);

  return (
    <div className="container">
      <input
        className="input-search"
        type="text"
        placeholder="Buscar países..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>Buscar</button>

      {searchTerm && (
        <div>
          <h3>País encontrado:</h3>
          <ul className="suggestions">
            {twelveFilteredCountries.map((country) => (
              <li key={country.name}>
                <div>
                  {countryImages[country.alpha2Code] && (
                    <img
                      src={countryImages[country.alpha2Code].webformatURL}
                      alt={`Imagen de ${country.name}`}
                    />
                  )}
                  {countryFlags[country.alpha2Code] && (
                    <img
                      src={countryFlags[country.alpha2Code]}
                      alt={`Bandera de ${country.name}`}
                    />
                  )}
                </div>
                <div>
                  <p>{country.name} - {country.continent.name}</p>
                </div>
              </li>
            ))}
          </ul>
          {imageError && <p>Error al cargar imágenes: {imageError}</p>}
        </div>
      )}

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default SearchBar;
