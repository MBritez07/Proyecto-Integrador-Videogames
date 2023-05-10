const { Router } = require('express');
const {games} = require ('../controllers/Games');
const {GameById} = require ('../controllers/GameById');
const {login} = require ('../controllers/Login');
const {creatUser} = require ('../controllers/CreatUser');
const { genres } = require('../controllers/Genres');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.get ('/videogames', games);
router.get ('/videogames/:idVideogame',GameById);
router.get("/Login",login);
router.post("/Login" ,creatUser);
router.get("/genres", genres);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
