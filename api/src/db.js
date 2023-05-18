require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST,} = process.env;

//////////////////////////////////////////////////////////////////////////////////

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, //Se deshabilita el registro de consultas SQL en la consola.
  native: false, //indica a Sequelize que no se utilizará la biblioteca pg-native 
   //para acceder a la base de datos. En cambio, se utilizará la predeterminada por node
   //pára poder aumentar la velocidad de ejecucion un 30% 
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos:
// ( declaramos que los modelos van a ir con Mayuscula)
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Genres ,Videogame, User, Platforms } = sequelize.models;

  // Relaciones
 //videogame se relaciona a muchos generos a traves de una tabla llamada 'videogame_genre'
  Videogame.belongsToMany(Genres, { through: 'videogame_genre', timestamps: false });
  Genres.belongsToMany(Videogame, { through: 'videogame_genre', timestamps: false });

  //timestamps=false ya que no es necesario que guarde en la tabla los datos de la fecha en qu fueron creadas dichas tablas
  
  Videogame.belongsTo(User, { through: 'videogame_user', timestamps: false });
  User.belongsToMany(Videogame, { through: 'videogame_user', timestamps: false });
  
  Videogame.belongsToMany(Platforms, { through: 'videogame_platform', timestamps: false });
  Platforms.belongsToMany(Videogame, { through: 'videogame_platform', timestamps: false });
  
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};





