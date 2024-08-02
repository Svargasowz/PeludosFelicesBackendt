import { pool } from "../database/conexion.js";

export const listarCategoria=async (req,res)=>{
    try{
        const [categorias] = await pool.query("SELECT * FROM categorias")
        if(categorias.length > 0){
            res.json(categorias)
        }
        else{
            res.status(404).json({message: 'No hay categorias registrados'})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'Error al obtener las categorias'})
    }
 
}

export const registrarCategorias = async (req,res)=>{
    try{
        const {nombre} = req.body
        const [result] = await pool.query("INSERT INTO categorias (nombre) VALUES (?)", [nombre])
        if(result.affectedRows > 0){
            res.status(200).json({message: 'Categorias registrado con éxito'})
        }
        else{
            res.status(404).json({
                message: 'No fue posible registrar las categorias'
            })
        }
    }catch(error){
        res.status(500).json({
            message: 'Error del servidor: '+error
        })
    }
}