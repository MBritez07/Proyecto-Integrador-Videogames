
const { User } = require('../db');


 const login = async (req, res) => {
    const { email} = req.query
   const { password} = req.query;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }
  
    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ where: { email } });
    
        // Verificar que se encontró el usuario
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    
        // Verificar que la contraseña sea correcta
        if (user.password !== password) {
          return res.status(403).json({ message: 'Contraseña incorrecta' });
        }
    
        // Si todo está correcto, retornar el objeto access:true
        return res.json({ access: true });
      } catch (error) {
        // Manejar errores
        return res.status(500).json({ message: error.message });
      }
    };
    
    module.exports = {
      login,
    };
    
  




  