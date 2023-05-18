
const axios = require('axios');
require('dotenv').config();
const {Op}=require('sequelize')
const {API_KEY}= process.env
const { Videogame, Genres, Platforms } = require('../db'); 

const SearchGames = async (req, res) => {
  const name = req.query.name; // obtener el valor del parámetro de consulta "name"
  try {

    let videogames = [];

    // Buscar videojuegos en la base de datos local que coincidan con el nombre
    const dbVideoGames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%` // Utilizar una consulta parcial para buscar coincidencias en cualquier parte del nombre
        }
      },
      include: [Genres, Platforms],
    });

    // Formatear los datos de los videojuegos encontrados en la base de datos local
    dbVideoGames.forEach(dbVideoGame => {
      const videogame = {
        id: dbVideoGame.id,
        name: dbVideoGame.name,
        description: dbVideoGame.description,
        released: dbVideoGame.released,
        rating: dbVideoGame.rating,
        imagen: dbVideoGame.background_image,
        platforms: dbVideoGame.platforms.map(platform => platform.name),
        genres: dbVideoGame.genres.map(genre => genre.name)
      };
      videogames.push(videogame);
    });

    // Buscar videojuegos en la API RAWG Games que coincidan con el nombre
    const { data } = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: API_KEY,
        search: name,
      }
    });

    // Formatear los datos de los videojuegos encontrados en la API RAWG Games
    data.results.forEach(result => {
      const videogame = {
        id: result.id,
        name: result.name,
        description: result.description,
        released: result.released,
        rating: result.rating,
        imagen: result.background_image,
        platforms: result.platforms.map(platform => platform.platform.name),
        genres: result.genres.map(genre => genre.name)
      };
      videogames.push(videogame);
    });

    if (videogames.length === 0) {
      return res.status(404).json({ message: "No se encontraron videojuegos con el nombre ingresado" });
    }
    return res.status(200).json(videogames.slice(0, 15));

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al buscar videojuegos');
  }
};

module.exports = {
  SearchGames,
};