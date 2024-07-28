import { Router } from "express";
import { validationResultExpress } from "../middleware/validacionErrores.js";
import { validarToken } from "../controllers/token.controller.js";
import { registrarAdopciones,listarAdopciones,eliminarAdopcion,confirmacionAdopcion,rechazarAdopcion,listarAdopcionesRechazadas,listarMisAdopciones,listarAdopcionesAceptadas } from "../controllers/adopciones.controller.js";

const routerAdopciones=Router();

routerAdopciones.post('/registrar',validarToken,validationResultExpress,registrarAdopciones); 


routerAdopciones.get('/listar',validarToken,validationResultExpress,listarAdopciones); 
routerAdopciones.get('/listarRechazadas',validarToken,validationResultExpress,listarAdopcionesRechazadas);
routerAdopciones.get('/listarAceptadas',validarToken,validationResultExpress,listarAdopcionesAceptadas);


routerAdopciones.get('/misAdopciones/:cedula',validarToken,validationResultExpress,listarMisAdopciones);  
routerAdopciones.delete('/eliminar/:id',validarToken,validationResultExpress,eliminarAdopcion);
routerAdopciones.put('/confirmar/:id',validarToken,validationResultExpress,confirmacionAdopcion);
routerAdopciones.put('/rechazar/:id',validarToken,validationResultExpress,rechazarAdopcion);

export default routerAdopciones;
