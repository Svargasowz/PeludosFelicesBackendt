import { Router } from "express";
import { validationResultExpress } from "../middleware/validacionErrores.js";
import { validarToken } from "../controllers/token.controller.js";
import { listarCategoria,registrarCategorias } from "../controllers/categoria.controller.js";

const routerCategorias=Router();

routerCategorias.get('/listar',validarToken,validationResultExpress,listarCategoria); 

routerCategorias.post('/registrar',validarToken,validationResultExpress,registrarCategorias);  

export default routerCategorias;
