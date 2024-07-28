import { Router } from "express";
import { validationResultExpress } from "../middleware/validacionErrores.js";
import { validarToken } from "../controllers/token.controller.js";
import { listarGeneros } from "../controllers/genero.controller.js";

const routerGeneros=Router();

routerGeneros.get('/listar',validarToken,validationResultExpress,listarGeneros);

export default routerGeneros;
