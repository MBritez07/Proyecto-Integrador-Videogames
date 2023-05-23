const axios = require('axios');
require('dotenv').config();
const {API_KEY}= process.env
const {Genres, Platforms, Videogame } = require('../db');


const Games = async (req, res) => {
  try {
    const pageSize = 15; // Se declara el tamaño del empaginado (15 videojuegos x pagina) 
    const pageNumber = req.query.page; //obtiene el número de página de los resultados buscados
    const { data } = await axios.get('https://api.rawg.io/api/games', {//Consulta en la Api
      params: {
        key: API_KEY,
        page: pageNumber,// especifica el número de página 
        page_size: pageSize//tamaño de página para la paginación
      }
    });

    const dbVideoGames = await Videogame.findAll({//Consulta a todos los videojuegos de la db
      include: [Genres, Platforms],
    });

    const allVideoGames = [...data.results.slice(0, 100), ...dbVideoGames];//Combina ambos resultados
    //obtiene un total de 100 videojuegos.
    const videoGames = await Promise.all(allVideoGames.map(async (videogame) => {
      const genres = videogame.genres
        ? await Genres.findAll({
            where: { id: videogame.genres.map((genre) => genre.id) },
            attributes: ['name'],
          })
        : [];
        
      const platforms = videogame.platforms
        ? await Platforms.findAll({
            where: {
              id: videogame.platforms.map((platform) =>
                platform.platform ? platform.platform.id : platform.id
              ),
            },
            attributes: ['name'],
          })
        : [];
        
      return {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        released: videogame.released,
        rating: videogame.rating,
        imagen: videogame.background_image,
        platforms: platforms.map((platform) => platform.name),
        genres: genres.map((genre) => genre.name),
      };
    }));
    
    const allvideoGames = await Promise.all(videoGames);// espera a que todas las promesas en videoGames se resuelvan.
     //Una vez que todas las promesas se han resuelto, se obtiene un array de los resultados y se asigna a la variable LallvideoGames
    return res.status(200).json(allvideoGames);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  Games,
};
