import Router from 'express';
import { validationResultExpress } from '../middleware/validacionErrores.js';
import {registrarMascotas,listarMascotas,mascotaAdoptada,mascotaPendiente,mascotaEliminada,buscarPerros,buscarGatos,buscarMascotas,actualizarMascotas,mascotaDisponible} from '../controllers/mascotas.controller.js'
import { cargarImagen } from '../controllers/mascotas.controller.js';
import { validarToken } from '../controllers/token.controller.js';

const routerMascotas=Router();

routerMascotas.get('/listar',validationResultExpress,listarMascotas);
routerMascotas.get('/perros',validarToken,validationResultExpress,buscarPerros);
routerMascotas.get('/gatos',validarToken,validationResultExpress,buscarGatos);
routerMascotas.get('/buscar/:codigo',validarToken,validationResultExpress,buscarMascotas);
routerMascotas.post('/registrar',validarToken,cargarImagen,validationResultExpress,registrarMascotas);
routerMascotas.delete('/eliminar/:codigo',validarToken,validationResultExpress,mascotaEliminada);
routerMascotas.put('/actualizar/:codigo',validarToken,cargarImagen,validationResultExpress,actualizarMascotas);


routerMascotas.put('/pendiente/:codigo',validarToken,validationResultExpress,mascotaPendiente);
routerMascotas.put('/adoptada/:codigo',validarToken,validationResultExpress,mascotaAdoptada);
routerMascotas.put('/disponible/:codigo',validarToken,validationResultExpress,mascotaDisponible);

export default routerMascotas;