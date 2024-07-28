import { Router } from "express";
import { validationResultExpress } from "../middleware/validacionErrores.js";
import {validarToken} from '../controllers/token.controller.js';
import {listarMunicipios,registrarMunicipios} from '../controllers/municipio.controller.js'

const routerMunicipios = Router();

routerMunicipios.get('/listar',validarToken,validationResultExpress,listarMunicipios);
routerMunicipios.post('/registrar',validarToken,validationResultExpress,registrarMunicipios);

export default routerMunicipios;