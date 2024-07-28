import cors from 'cors';
import express from 'express';
import login from './src/routes/login.routes.js'
import generos from './src/routes/generos.routes.js'
import mascotas from './src/routes/mascotas.routes.js'
import categorias from './src/routes/categorias.routes.js'
import adopciones from './src/routes/adopciones.routes.js'
import municipios from './src/routes/municipios.routes.js'
import { PORT } from './src/database/config.js';

const app = express();
app.use(cors()); 
const puerto=3000
app.use(express.json());
app.use("/user",login)
app.use("/generos",generos);
app.use("/mascotas",mascotas);
app.use("/categorias",categorias)
app.use("/adopciones",adopciones);
app.use("/municipios",municipios)

app.use(express.static('./public'))

app.listen(PORT,()=>{
    console.log(`Server Funcionand en el puerto ${PORT}🎆`)
})