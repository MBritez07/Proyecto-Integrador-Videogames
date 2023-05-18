const axios = require ('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const {Platforms} = require ('../db')


const platforms = async (req,res)=>{
    try{
        const verificacionDb = await Platforms.count(); 
        if ( verificacionDb !==0){ //Si no es 0 guarda todos los datos encontrados de Platforms
            const miDb = await Platforms.findAll()// dentro de una constante
            return res.status(200).json(miDb);
        };
        if ( verificacionDb === 0 ) {//Si es 0 
        const { data } = await axios.get('https://api.rawg.io/api/platforms',{//busca en la Api
            params:{
                key: API_KEY
            }
        });
    
       const platforms = data.results.map (platform =>({//Se mapea sobre los resultados
        id : platform.id,                                // Se crea un nuevo objeto 
        name :platform.name                 //con las propiedades id y name para cada plataforma.
       }));

       await Platforms.bulkCreate (platforms, {ignoreDuplicates :true});
       return res.status (200).json (platforms);//Se guardan los datos en la base de datos (Platforms)
    }                                      
    }catch (error){
        console.error(error);
        return res.status(500).json({message : 'Error en el servidor'});
    }
    };

    module.exports = {
        platforms,
    }