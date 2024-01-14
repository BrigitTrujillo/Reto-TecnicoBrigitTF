import React, { useState, useEffect } from 'react';

// Función para obtener la URL de la bandera de un país
export const getCountryFlag = (countryCode, style = 'flat', size = 'normal') => {
  return `https://flagsapi.com/${countryCode}/${style}/${size}.png`;
};

// Ejemplo de uso
const countryCode = 'PE'; // Código del país (puedes obtenerlo de tus datos)
const flagUrl = getCountryFlag(countryCode);

const FlagComponent = () => {
  const [flagImage, setFlagImage] = useState(null);

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await fetch(flagUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        setFlagImage(imgUrl);
      } catch (error) {
        console.error('Error fetching flag:', error);
      }
    };

    fetchFlag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Elimina flagUrl del array de dependencias

  return (
    <div>
      {flagImage && (
        <img
          src={flagImage}
          alt={`Bandera de ${countryCode}`}
          style={{ width: '100px', height: 'auto' }}
        />
      )}
    </div>
  );
};

export default FlagComponent;
