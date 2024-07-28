import { Router } from "express";
import { validationResultExpress } from "../middleware/validacionErrores.js";
import {validar, validarToken} from '../controllers/token.controller.js';
import { registrarUsuarios,listarUsuarios,buscarUsuario,buscarAdministrador,actualizarUsuario } from "../controllers/usuario.controller.js";

const routerLogin=Router();

routerLogin.post('/login',validationResultExpress,validar);

routerLogin.post('/registrar',validationResultExpress,registrarUsuarios);

routerLogin.get('/listar',validarToken,validationResultExpress,listarUsuarios)

routerLogin.get('/buscar/:cedula',validarToken,validationResultExpress,buscarUsuario)

routerLogin.get('/administrador',validationResultExpress,buscarAdministrador)

routerLogin.put('/actualizar/:cedula',validarToken,validationResultExpress,actualizarUsuario)

export default routerLogin;
