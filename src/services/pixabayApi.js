// pixabayApi.js
import axios from 'axios';

const PIXABAY_API_KEY = '41804555-652b1cdd5b0192a5a55974dec'; // Tu clave de API

/**
 * Realiza una búsqueda de imágenes en Pixabay basada en el nombre de un país.
 * @param {string} countryName - Nombre del país para la búsqueda de imágenes.
 * @returns {Promise<Array>} - Promesa que resuelve en un array de datos de imágenes.
 */
export const searchImages = async (countryName) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: PIXABAY_API_KEY,
        q: `${countryName} country`, // Agrega "country" para obtener resultados más específicos
        image_type: 'photo',
      },
    });

    if (response.data && Array.isArray(response.data.hits) && response.data.hits.length > 0) {
      return response.data.hits; // Devuelve los datos de las imágenes
    } else {
      // No se encontraron imágenes, puedes devolver un array vacío o manejarlo según tus necesidades
      return [];
    }
  } catch (error) {
    throw new Error(`Error en la búsqueda de imágenes en Pixabay: ${error.message}`);
  }
};
