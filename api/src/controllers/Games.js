const axios = require ('axios');
require('dotenv').config();
const {API_KEY} = process.env

//GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY
//GET https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7



const games = async (req,res)=>{
    try{
        const { data } = await axios.get('https://api.rawg.io/api/games',{
            params:{
                key: API_KEY
            }
        });

       const VideoGames=data.results;

       return res.status (200).json (VideoGames);
    }catch (error){
        console.error(error);
        return res.status(500).json({message : 'Error en el servidor'});
    }
    };

    module.exports = {
        games,
    }

 //1° Importamos axios (lo cual me permite conectarme a la Api)
 //2° Traemos nuestra Api_Key desde .env 
 //3° A traves de una funcion asyncronica nos conectamos a la url de la pagina para obtener la lista de juegos de nuestra API_KEY 
//4° Guardamos la lista de juegos (results) en una variable 
//5° Retornamos results, si hay algun error, retornamos 'Error en el servidor'