import { pool } from "../database/conexion.js";
import multer from 'multer'


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img');
    },
        filename:function (req, file, cb){
            cb(null,file.originalname);
        }
})

const upload = multer({ storage: storage })
export const cargarImagen = upload.single('foto');



export const registrarMascotas = async (req, res)=>{
    try{
        const {nombre,fk_categoria,edad,fk_genero,descripcion,ubicacion,castrado,vacunas,fk_municipio,antecedentes} = req.body

        const foto = req.file.originalname;
       
        const [result] = await pool.query("INSERT INTO mascotas (nombre, fk_categoria, edad, fk_genero, foto, descripcion, ubicacion, castrado, vacunas, fk_municipio,antecedentes, estado) VALUES (?,?,?,?,?,?,?,?,?,?,?,1)",[nombre,fk_categoria,edad,fk_genero,foto,descripcion,ubicacion,castrado,vacunas,fk_municipio,antecedentes]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Mascota registrada con exito'
            })
        }else {
            res.status(404).json({
                message: 'Error al registrar la mascota'
            })
        }
    }catch(error){
        res.status(500).json({
            message: 'Error en el servidor '+error
        });
    }
}


export const listarMascotas = async (req, res) => {
    try {
        const [todos] = await pool.query(`
            SELECT 
                mascotas.codigo,
                mascotas.nombre,
                categorias.nombre AS categoria,
                categorias.codigo As fk_categorias,
                mascotas.edad,
                genero.nombre AS genero,
                genero.codigo AS fk_genero,
                mascotas.foto,
                mascotas.descripcion,
                mascotas.estado,
                mascotas.castrado,
                mascotas.vacunas,
                municipio.nombre AS municipio,
                municipio.codigo AS fk_municipio
            FROM 
                mascotas
            LEFT JOIN 
                categorias ON mascotas.fk_categoria = categorias.codigo
            LEFT JOIN 
                genero ON mascotas.fk_genero = genero.codigo
            LEFT JOIN
                municipio ON mascotas.fk_municipio = municipio.codigo 
                WHERE 
                mascotas.estado = 1 OR mascotas.estado = 3
        `);

        if (todos.length > 0) {
            res.status(200).json({ todos });
        } else {
            res.status(404).json({ message: 'No hay mascotas registradas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el sistema: ' + error });
    }
};


//!ESTADOS_MASCOTA

export const mascotaAdoptada = async (req,res) =>{
    try{
        const {codigo} = req.params
        const [result] = await pool.query(`UPDATE mascotas SET estado = 2 WHERE codigo =?`,[codigo]);
        
        if (result.affectedRows > 0){
            res.status(200).json({
                message: 'La mascota fue adoptada con éxito'
            })
        }
    }catch(error){
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
}
export const mascotaPendiente = async (req,res) =>{
    try{
        const {codigo} = req.params
        const [pendiente] = await pool.query("UPDATE mascotas SET estado = 3 WHERE codigo =?",[codigo]);
        
        if (pendiente.affectedRows > 0){
            res.status(200).json({
                message: 'pronto nos comunicaremos contigo'
            })
        }
    }catch(error){
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
}

export const mascotaDisponible = async (req,res) =>{
    try{
        const {codigo} = req.params
        const [disponible] = await pool.query("UPDATE mascotas SET estado = 1 WHERE codigo =?",[codigo]);
        
        if (disponible.affectedRows > 0){
            res.status(200).json({
                message: 'La mascota está disponible para adoptar'
            })
        }
    }catch(error){
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
}

//!FIN ESTADO_MASCOTAS



export const mascotaEliminada = async (req,res) =>{
    try{
        const {codigo} = req.params
        const [result] = await pool.query("DELETE FROM mascotas WHERE codigo =?",[codigo]);
        
        if (result.affectedRows > 0){
            res.status(200).json({
                message: 'La mascota fue eliminada con éxito'
            })
        }
    }catch(error){
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
}

export const actualizarMascotas = async (req, res) => {
    try {
        const { codigo } = req.params;
        const { nombre, fk_categoria, edad, fk_genero, descripcion, ubicacion, castrado, vacunas, fk_municipio, antecedentes } = req.body;
        const foto = req.file ? req.file.originalname : null;

        const [result] = await pool.query(
            'UPDATE mascotas SET nombre = IFNULL(?, nombre), fk_categoria = IFNULL(?, fk_categoria), edad = IFNULL(?, edad), fk_genero = IFNULL(?, fk_genero), foto = IFNULL(?, foto), descripcion = IFNULL(?, descripcion), ubicacion = IFNULL(?, ubicacion), castrado = IFNULL(?, castrado), vacunas = IFNULL(?, vacunas), fk_municipio = IFNULL(?, fk_municipio), antecedentes = IFNULL(?, antecedentes) WHERE codigo = ?',
            [nombre, fk_categoria, edad, fk_genero, foto, descripcion, ubicacion, castrado, vacunas, fk_municipio, antecedentes, codigo]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Mascota actualizada con éxito'
            });
        } else {
            res.status(404).json({
                message: 'No se pudo actualizar la mascota'
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error });
    }
}

export const buscarPerros = async (req, res) => {
    try {
        const [perros] = await pool.query(`
                SELECT 
                mascotas.codigo,
                mascotas.nombre,
                categorias.nombre AS categoria,
                categorias.codigo As fk_categorias,
                mascotas.edad,
                genero.nombre AS genero,
                genero.codigo AS fk_genero,
                mascotas.foto,
                mascotas.descripcion,
                mascotas.estado,
                mascotas.castrado,
                mascotas.vacunas,
                municipio.nombre AS municipio,
                municipio.codigo AS fk_municipio

            FROM 
                mascotas
            LEFT JOIN 
                categorias ON mascotas.fk_categoria = categorias.codigo
            LEFT JOIN 
                genero ON mascotas.fk_genero = genero.codigo
            LEFT JOIN
                municipio ON mascotas.fk_municipio = municipio.codigo 
            WHERE 
                mascotas.fk_categoria = 1 AND (mascotas.estado = 1 OR mascotas.estado = 3)
        `);

        if (perros.length > 0) {
            res.status(200).json({ perros });
        } else {
            res.status(404).json({ message: 'No hay perros registrados' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
};




export const buscarGatos = async (req, res) => {
    try {
        const [gatos] = await pool.query(`
             SELECT 
                mascotas.codigo,
                mascotas.nombre,
                categorias.nombre AS categoria,
                categorias.codigo As fk_categorias,
                mascotas.edad,
                genero.nombre AS genero,
                genero.codigo AS fk_genero,
                mascotas.foto,
                mascotas.descripcion,
                mascotas.estado,
                mascotas.castrado,
                mascotas.vacunas,
                municipio.nombre AS municipio,
                municipio.codigo AS fk_municipio
            FROM 
                mascotas
            LEFT JOIN 
                categorias ON mascotas.fk_categoria = categorias.codigo
            LEFT JOIN 
                genero ON mascotas.fk_genero = genero.codigo
            LEFT JOIN
                municipio ON mascotas.fk_municipio = municipio.codigo 
            WHERE 
                 mascotas.fk_categoria = 2 AND (mascotas.estado = 1 OR mascotas.estado = 3)
        `);

        if (gatos.length > 0) {
            res.status(200).json({ gatos });
        } else {
            res.status(404).json({ message: 'No hay gatos registrados' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
};

export const buscarMascotas = async (req, res) => {
    try {
        const { codigo } = req.params; 
        const [buscar] = await pool.query(`
            SELECT 
                mascotas.codigo,
                mascotas.nombre,
                categorias.nombre AS categoria,
                categorias.codigo As fk_categorias,
                mascotas.edad,
                genero.nombre AS genero,
                genero.codigo AS fk_genero,
                mascotas.foto,
                mascotas.descripcion,
                mascotas.estado,
                mascotas.castrado,
                mascotas.vacunas,
                 mascotas.ubicacion,
                 mascotas.antecedentes,
                municipio.nombre AS municipio,
                municipio.codigo AS fk_municipio
            FROM 
                mascotas
            LEFT JOIN 
                categorias ON mascotas.fk_categoria = categorias.codigo
            LEFT JOIN 
                genero ON mascotas.fk_genero = genero.codigo
            LEFT JOIN
                municipio ON mascotas.fk_municipio = municipio.codigo 
            WHERE 
                mascotas.codigo = ?
        `, [codigo]); 

        if (buscar.length > 0) {
            res.status(200).json({ buscar });
        } else {
            res.status(404).json({
                message: 'No se encontró la mascota'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error.message
        });
    }
};


