const express = require('express') //Importar express
const app = express() //Objeto app
const multer = require('multer'); //Importar (Procesa el archivo) 
const qrcode = require('qrcode');

//ENVIO DE ARCHIVOS
const storage = multer.diskStorage({
    destination: 'uploads/', //Se guardaran en carpeta de "uploads"
    //Nombre del archivo
    filename: function(req,file,cb){
                //Nombre original 
        cb("",file.originalname);
    }
})
const upload = multer ({ //Funcion registra el destino para guardar archivos
    storage: storage 
})
//upload.single (solo un archivo a la vez), avatar (nombre input), upload.array (más de un archivo a la vez)
app.post("/files",upload.array('avatar') ,(req,res)=>{       
     res.redirect('/')
})

//Ruta para coleccion de BD 
const db = require('./db')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
const empleados = require('./routes/empleados')
app.use(empleados)

//const codigo = require('./routes/codigo')
//app.use(codigo)

//SERVIDOR ESCUCHANDO
app.get('/', (req, res) => {
res.send('Hola Mundo')
})

app.get("/codigo", (req, res,next) => {//submenu
    res.render("codigo");
  });
  app.post("/scan",(req, res, next) => {//
    const input_text = req.body.text;
    console.log(input_text);
    qrcode.toDataURL(input_text, (err,src) => {//
       // if (err) res.send("Something went wrong!!");
        res.render("scan", {
          qr_code: src,
        });
    });
    });
    app.get("/acerca", (req, res,next) => {//submenu
      res.render("acerca");
    });
    app.get("/", (req, res,next) => {//submenu
      res.render("inicio");
    });
app.listen(3000, ()=>{ //El servidor escucha en el puerto 8080
console.log('Conectado puerto 3000')
})


