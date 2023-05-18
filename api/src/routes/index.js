const { Router } = require('express');
const { Games } = require('../controllers/Games');
const { GameById } = require('../controllers/GameById');
const { login } = require('../controllers/Login');
const { creatUser } = require('../controllers/CreatUser');
const { genres } = require('../controllers/Genres');
const { SearchGames } = require('../controllers/SearchGames');
const { platforms } = require('../controllers/Platforms');
const createVideogame = require('../controllers/PostNewGame'); //importa solo
//un controlador especifico (PostNewGame) sin usar la destructuración

const router = Router();  // crea una instancia de un enrutador de Express.

//Definde una ruta para cada controlador 
router.get('/videogames', Games);
router.get('/Login', login);
router.post('/Login', creatUser);
router.get('/genres', genres);
router.get('/platforms', platforms);
router.post('/videogames', createVideogame);  
router.get('/videogames/name', SearchGames);
router.get('/videogames/:idVideogame', GameById);

module.exports = router;
