const mongoose = require('mongoose') //Se requiere a mongoose
const MONGODB_URL = 'mongodb://localhost/Metro_CDMX' //Enlace a conexion

mongoose.connect(
    MONGODB_URL,
    async(err)=>{
        if(err) throw err;
        console.log("Conectado a Base de Datos")
    }
)


