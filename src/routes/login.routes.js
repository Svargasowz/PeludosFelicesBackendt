import { Router } from "express";
import { validationResultExpress } from "../middleware/validacionErrores.js";
import {validar, validarToken} from '../controllers/token.controller.js';
import { registrarUsuarios,listarUsuarios,buscarUsuario,buscarAdministrador,actualizarUsuario,actualizarEstado,eliminarUsuario } from "../controllers/usuario.controller.js";

const routerLogin=Router();

routerLogin.post('/login',validationResultExpress,validar);

routerLogin.post('/registrar',validationResultExpress,registrarUsuarios);

routerLogin.get('/listar',validarToken,validationResultExpress,listarUsuarios)

routerLogin.get('/buscar/:cedula',validarToken,validationResultExpress,buscarUsuario)

routerLogin.get('/administrador',validationResultExpress,buscarAdministrador)

routerLogin.put('/actualizar/:cedula',validarToken,validationResultExpress,actualizarUsuario)

routerLogin.put('/actualizarEstado/:cedula',validarToken,validationResultExpress,actualizarEstado)

routerLogin.delete('/eliminar/:cedula',validarToken,validationResultExpress,eliminarUsuario)

export default routerLogin;
