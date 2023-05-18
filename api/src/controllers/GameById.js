
const axios = require('axios');
require('dotenv').config();
const {API_KEY}= process.env
const {Genres, Platforms, Videogame} = require('../db');

const GameById = async (req, res) => {
  try {
    const { idVideogame } = req.params;

    // Convertir el parámetro de cadena a número
    const id = Number(idVideogame);

    let videogame;

    // Buscar el juego con la ID específica en la base de datos local
    const dbVideoGame = await Videogame.findOne({
      where: { id },
      include: [Genres, Platforms],
    });

    if (dbVideoGame) {
      // Si se encuentra el juego en la base de datos, formatear los datos y devolver el resultado
      videogame = {
        id: dbVideoGame.id,
        name: dbVideoGame.name,
        description: dbVideoGame.description,
        released: dbVideoGame.released,
        rating: dbVideoGame.rating,
        imagen: dbVideoGame.background_image,
        platforms: dbVideoGame.platforms.map(platform => platform.name),
        genres: dbVideoGame.genres.map(genre => genre.name)
      };
    } else {
      // Si el juego no se encuentra en la base de datos, buscarlo en la API 
      const { data } = await axios.get(`https://api.rawg.io/api/games/${id}`, {
        params: {
          key: API_KEY
        }
      });

      // Si se encuentra el juego en la API RAWG Games, formatear los datos y devolver el resultado
      videogame = {
        id: data.id,
        name: data.name,
        description: data.description,
        released: data.released,
        rating: data.rating,
        imagen: data.background_image,
        platforms: data.platforms.map(platform => platform.platform.name),
        genres: data.genres.map(genre => genre.name)
      };
    }

    return res.status(200).json(videogame);

  } catch (error) {
    return res.status(500).json({ message: 'Juego no encontrado' });
  }
};

module.exports = {
  GameById,
};