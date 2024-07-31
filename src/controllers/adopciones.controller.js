import { pool } from "../database/conexion.js";

export const registrarAdopciones = async (req, res)=>{
    try{
        const {fk_mascota,fk_usuario,numero_celular} = req.body
       
        const [adoptar] = await pool.query("INSERT INTO adopciones (fk_mascota,fk_usuario,numero_celular,estado) VALUES (?,?,?,2)",[fk_mascota,fk_usuario,numero_celular]);

        if (adoptar.affectedRows > 0) {
            res.status(200).json({
                message: 'adopcion registrada con exito'
            })
        }else {
            res.status(404).json({
                message: 'Error al registrar la adopcion'
            })
        }
    }catch(error){
        res.status(500).json({
            message: 'Error en el servidor '+error
        });
    }
}
export const confirmacionAdopcion = async (req,res)=>{
    try{
        const {id} = req.params
    
        const [confirmacion] = await pool.query("UPDATE adopciones SET estado = 1 WHERE id=?",[id])
        
        if (confirmacion.affectedRows > 0) {
            res.status(200).json({
                    message: 'Adopcion confirmada con exito'
                })
        }else {
            res.status(404).json({
                    message: 'Error al confirmar la adopcion'
                })
             }
    }catch(error){
        res.status(500).json({
            message: 'Error en el servidor '+error
        });
    }
    }

export const listarAdopciones = async (req, res) => {
    try {
        const [adopciones] = await pool.query(`
           SELECT 
                adopciones.id,
                mascotas.nombre AS nombre_mascota,
                usuarios.nombres AS nombre_usuario,
                adopciones.numero_celular AS telefono,
                adopciones.fk_mascota AS mascota_codigo,
                adopciones.fk_usuario AS usuario_cedula,
                adopciones.estado AS estado_adopcion,
                categorias.nombre AS categoria,
                DATE_FORMAT(adopciones.fecha, '%Y-%m-%d') AS fecha_creacion
            FROM 
                adopciones
            LEFT JOIN 
                mascotas ON adopciones.fk_mascota = mascotas.codigo
            LEFT JOIN 
                usuarios ON adopciones.fk_usuario = usuarios.cedula
            LEFT JOIN 
                categorias ON mascotas.fk_categoria = categorias.codigo
            WHERE adopciones.estado = 2
        `);

        if (adopciones.length > 0) {
            res.status(200).json({ adopciones });
        } else {
            res.status(404).json({ message: 'No hay adopciones registradas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el sistema: ' + error });
    }
};
export const listarAdopcionesRechazadas = async (req, res) => {
    try {
        const [rechazadas] = await pool.query(`
            SELECT 
                adopciones.id,
                mascotas.nombre AS nombre_mascota,
                usuarios.nombres AS nombre_usuario,
                adopciones.numero_celular AS telefono,
                adopciones.fk_mascota AS mascota_codigo,
                adopciones.fk_usuario AS usuario_cedula,
                adopciones.estado AS estado_adopcion,
                categorias.nombre AS categoria
            FROM 
                adopciones
            LEFT JOIN 
                mascotas ON adopciones.fk_mascota = mascotas.codigo
            LEFT JOIN 
                usuarios ON adopciones.fk_usuario = usuarios.cedula
                LEFT JOIN
            categorias ON mascotas.fk_categoria = categorias.codigo
            WHERE adopciones.estado = 3
        `);

        if (rechazadas.length > 0) {
            res.status(200).json({ rechazadas });
        } else {
            res.status(404).json({ message: 'No hay adopciones registradas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el sistema: ' + error });
    }
};

export const listarAdopcionesAceptadas = async (req,res)=>{
    try {
        const [aceptadas] = await pool.query(`
           SELECT 
                adopciones.id,
                mascotas.nombre AS nombre_mascota,
                usuarios.nombres AS nombre_usuario,
                adopciones.numero_celular AS telefono,
                adopciones.fk_mascota AS mascota_codigo,
                adopciones.fk_usuario AS usuario_cedula,
                adopciones.estado AS estado_adopcion,
                categorias.nombre AS categoria,
                DATE_FORMAT(adopciones.fecha, '%Y-%m-%d') AS fecha_creacion
            FROM 
                adopciones
            LEFT JOIN 
                mascotas ON adopciones.fk_mascota = mascotas.codigo
            LEFT JOIN 
                usuarios ON adopciones.fk_usuario = usuarios.cedula
            LEFT JOIN 
                categorias ON mascotas.fk_categoria = categorias.codigo
            WHERE adopciones.estado = 1
        `);

        if (aceptadas.length > 0) {
            res.status(200).json({ aceptadas });
        } else {
            res.status(404).json({ message: 'No hay adopciones registradas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el sistema: ' + error });
    }
}


export const listarMisAdopciones = async (req, res) => {
    try {
        const {cedula} = req.params;
        const [misAdopcioness] = await pool.query(`
            SELECT 
                adopciones.id,
                mascotas.nombre AS nombre_mascota,
                usuarios.nombres AS nombre_usuario,
                adopciones.numero_celular AS telefono,
                adopciones.fk_mascota AS mascota_codigo,
                adopciones.fk_usuario AS usuario_cedula,
                adopciones.estado AS estado_adopcion,
                categorias.nombre AS categoria,
                DATE_FORMAT(adopciones.fecha, '%Y-%m-%d') AS fecha_creacion
            FROM 
                adopciones
            LEFT JOIN 
                mascotas ON adopciones.fk_mascota = mascotas.codigo
            LEFT JOIN 
                usuarios ON adopciones.fk_usuario = usuarios.cedula
            LEFT JOIN 
                categorias ON mascotas.fk_categoria = categorias.codigo
            WHERE 
                usuarios.cedula = ?
        `, [cedula]);

        if (misAdopcioness.length > 0) {
            res.status(200).json({ misAdopcioness });
        } else {
            res.status(404).json({ message: 'No hay adopciones registradas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el sistema: ' + error });
    }
};

export const eliminarAdopcion = async (req,res)=>{
    try{
        const {id} = req.params
        const [eliminar] = await pool.query("DELETE FROM adopciones WHERE id =?",[id]);
        
        if (eliminar.affectedRows > 0){
            res.status(200).json({
                message: 'Adopcion eliminada con exito'
            })
        }else {
            res.status(404).json({
                message: 'No se pudo eliminar la adopcion'
            })
} 
}catch(error){
    res.status(500).json({
        message: 'Error en el servidor '+error
    });
}

}


export const rechazarAdopcion = async (req,res)=>{
    try{
        const {id} = req.params
    
        const [confirmacion] = await pool.query("UPDATE adopciones SET estado = 3 WHERE id=?",[id])
        
        if (confirmacion.affectedRows > 0) {
            res.status(200).json({
                    message: 'Adopcion confirmada con exito'
                })
        }else {
            res.status(404).json({
                    message: 'Error al confirmar la adopcion'
                })
             }
    }catch(error){
        res.status(500).json({
            message: 'Error en el servidor '+error
        });
    }
    }

