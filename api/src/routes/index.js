const { Router } = require('express');
const {games} = require ('../controllers/Games');
const {GameById} = require ('../controllers/GameById')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.get ('/videogames', games);
router.get ('/videogames/:idVideogame',GameById)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
