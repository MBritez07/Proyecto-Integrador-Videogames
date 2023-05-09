const axios = require('axios');
require('dotenv').config();
const {API_KEY}= process.env
const URL= "https://api.rawg.io/api/games/"

const GameById= async (req, res) => {
  const { idVideogame } = req.params;

  try {
    // Hacer la solicitud a la API RAWG para obtener el detalle del videojuego
    const { data } = await axios.get(`${URL}${idVideogame}`, {
      params: {
        key: API_KEY
      }
    });

    // Obtener los datos relevantes del videojuego
    const games = {
      id: data.id,
      name: data.name,
      description: data.description,
      released: data.released,
      rating: data.rating,
      imagen: data.background_image,
      platforms: data.platforms.map(platform => platform.platform.name),
      genres: data.genres.map(genre => genre.name),
    };

    return res.status(200).json(games);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  GameById,
};