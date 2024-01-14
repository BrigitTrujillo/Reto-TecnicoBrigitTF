// flagApi.js

import axios from 'axios';

const FLAGCDN_BASE_URL = 'https://flagcdn.com/';

export const getCountryFlag = async (countryCode) => {
  try {
    const response = await axios.get(`${FLAGCDN_BASE_URL}64/${countryCode.toLowerCase()}.png`);

    if (response.status === 200) {
      return response.config.url;  // Devuelve la URL de la bandera
    } else {
      throw new Error(`Error al obtener la bandera para ${countryCode}`);
    }
  } catch (error) {
    throw new Error(`Error al obtener la bandera para ${countryCode}: ${error.message}`);
  }
};
