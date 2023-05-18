const { Videogame } = require("../db");

const createVideogame = async (req, res) => {
  //extrae los campos necesarios del cuerpo de la solicitud (req.body)
  try {
    const {
      name,
      description,
      platforms,
      image,
      releaseDate,
      rating,
      genres
    } = req.body;

    const id = Date.now() % 6000000;//proporciona un ID único dentro del rango de 0 a 5999999.

    const newVideogame = await Videogame.create({//crear un nuevo registro en la base de datos.
    // Se pasan los valores de las variables extraídas del cuerpo de la solicitud
    //Junto con el ID generado, como argumentos para crear el nuevo registro.
      id,
      name,
      description,
      image,
      releaseDate,
      rating
    });

    await newVideogame.addGenres(genres);  //Agregamos a la lista de Genres
    await newVideogame.addPlatforms(platforms);//Agregamos a la lista de Platforms 

    res.status(201).json(newVideogame); //retornamos en nuevo videojuego
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createVideogame;
