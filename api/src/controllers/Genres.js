
const axios = require ('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const {Genres} = require ('../db')


const genres = async (req,res)=>{
    try{
        const verificacionDb = await Genres.count(); 
        if ( verificacionDb !==0){
            const miDb = await Genres.findAll()
            return res.status(200).json(miDb);
        };
        if ( verificacionDb === 0 ) {
        const { data } = await axios.get('https://api.rawg.io/api/genres',{
            params:{
                key: API_KEY
            }
        });
    
       const genres=data.results.map ( genre =>({
        id : genre.id,
        name : genre.name
       }));

       await Genres.bulkCreate (genres, {ignoreDuplicates :true}); //Guardamos los datos de 
       return res.status (200).json (genres); //Genres (de la Api) en una tabla en la base de datos(genres) 
    }                                        //Ignorando los duplicados y luego retornamos genres 
    }catch (error){
        console.error(error);
        return res.status(500).json({message : 'Error en el servidor'});
    }
    };

    module.exports = {
        genres,
    }

 //1° Importamos axios (lo cual me permite conectarme a la Api)
 //2° Traemos nuestra Api_Key desde .env 
 //3° A traves de una funcion asyncronica nos conectamos a la url de la pagina para obtener la lista de juegos de nuestra API_KEY 
//4° Guardamos la lista de juegos (results) en una variable 
//5° Retornamos results, si hay algun error, retornamos 'Error en el servidor'