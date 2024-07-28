import { encrypt, comparacion } from "../helpers/token_incriptar.js";
import { pool } from "../database/conexion.js";

export const registrarUsuarios = async (req, res) => {
    try {
        const { cedula, nombres, apellidos, correo, telefono, clave } = req.body;
        const claveHash = await encrypt(clave);

        const [persona] = await pool.query("INSERT INTO usuarios (cedula, nombres, apellidos, correo, telefono, clave, rol) VALUES (?, ?, ?, ?, ?, ?, 1)", [cedula, nombres, apellidos, correo, telefono, claveHash]);

        if (persona.affectedRows > 0) {
            res.status(200).json({
                message: 'Usuario registrado con éxito'
            });
        } else {
            res.status(404).json({
                message: 'No fue posible registrar el usuario'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor: ' + error
        });
    }
};

export const listarUsuarios = async (req, res) => {
    try {
        const [usuarios] = await pool.query("SELECT * FROM usuarios WHERE rol = 1");

        if (usuarios.length > 0) {
            res.status(200).json(usuarios);
        } else {
            res.status(404).json({
                message: 'No hay usuarios adoptantes'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el sistema: ' + error
        });
    }
};

export const buscarUsuario = async (req, res) => {
    try {
        const { cedula } = req.params;
        const [usuario] = await pool.query("SELECT * FROM usuarios WHERE cedula = ?", [cedula]);

        if (usuario.length > 0) {
            res.status(200).json(usuario);
            return;
        }

        res.status(404).json({
            message: 'No hay usuarios adoptantes'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error en el sistema: ' + error
        });
    }
};
export const actualizarUsuario = async (req, res) => {
    try {
        const { cedula } = req.params
        const { nombres, apellidos, correo, telefono } = req.body
        const [actualizar] = await pool.query("UPDATE usuarios SET nombres=?, apellidos=?, correo=?, telefono=? WHERE cedula=?", [nombres, apellidos, correo, telefono, cedula]);

        if (actualizar.affectedRows > 0) {
            res.status(200).json({
                message: 'Usuario actualizado con éxito'
            })
        } else {
            res.status(404).json({
                message: 'No fue posible actualizar el usuario'
            })

        }
        }catch (error) {
            res.status(500).json({
                message: 'Error en el servidor:'+ error
            });
    }
}

export const buscarAdministrador = async (req, res) => {
        try {
            const [administrador] = await pool.query("SELECT * FROM usuarios WHERE rol='administrador'");

            if (administrador.length > 0) {
                res.status(200).json({ administrador });
            } else {
                res.status(404).json({ message: 'No hay administradores registrados' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener los administradores' });
        }
    };