// Reemplaza con tu clave de API de Unsplash
// src/services/unsplashApi.js
const UNSPLASH_ACCESS_KEY = 'cfn3DuL18MwLWfITBut3eUKNbjqcNNEpnrpFxr4tDbg'; // Reemplaza con tu clave de API de Unsplash

// ...
export const searchImages = async (query) => {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        // Rate Limit Exceeded, esperar antes de intentar nuevamente
        await new Promise(resolve => setTimeout(resolve, 60000)); // Esperar 1 minuto (ajusta según necesites)
        return searchImages(query); // Intentar la búsqueda nuevamente después de la espera
      }

      const errorData = await response.text();
      throw new Error(`Error al buscar imágenes en Unsplash: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return data.results; // Retorna las imágenes encontradas
  } catch (error) {
    throw new Error(`Error en la búsqueda de imágenes en Unsplash: ${error.message}`);
  }
};
