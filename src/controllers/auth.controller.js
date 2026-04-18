// Módulo para encriptar contraseñas
const bcrypt = require('bcryptjs');

// Módulo para generar tokens de sesión
const jwt = require('jsonwebtoken');

// Importamos nuestra base de datos simulada
const db = require('../utils/db');

// Clave secreta para firmar los tokens
const JWT_SECRET = 'sena_api_secret_2024';

// ── REGISTRO ──────────────────────────────────────────────
// Recibe usuario y contraseña, valida y guarda el nuevo usuario
async function registro(req, res) {
  const { usuario, contrasena } = req.body; // Extraer datos enviados

  // Validar que los campos no estén vacíos
  if (!usuario || !contrasena) {
    return res.status(400).json({
      exito: false,
      mensaje: 'El usuario y la contraseña son obligatorios'
    });
  }

  // Verificar que el usuario no exista ya
  const usuarioExistente = db.buscarPorUsuario(usuario);
  if (usuarioExistente) {
    return res.status(409).json({
      exito: false,
      mensaje: `El usuario "${usuario}" ya está registrado`
    });
  }

  // Encriptar la contraseña antes de guardarla
  const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

  // Crear el objeto del nuevo usuario
  const nuevoUsuario = {
    id: Date.now().toString(), // ID único basado en la fecha
    usuario: usuario.trim().toLowerCase(),
    contrasena: contrasenaEncriptada,
    fechaRegistro: new Date().toISOString()
  };

  // Guardar en la base de datos
  db.guardar(nuevoUsuario);

  // Respuesta exitosa
  return res.status(201).json({
    exito: true,
    mensaje: `Usuario "${usuario}" registrado exitosamente`,
    datos: {
      id: nuevoUsuario.id,
      usuario: nuevoUsuario.usuario,
      fechaRegistro: nuevoUsuario.fechaRegistro
    }
  });
}

// ── LOGIN ─────────────────────────────────────────────────
// Recibe usuario y contraseña, verifica y responde si es correcto
async function login(req, res) {
  const { usuario, contrasena } = req.body; // Extraer datos enviados

  // Validar que los campos no estén vacíos
  if (!usuario || !contrasena) {
    return res.status(400).json({
      exito: false,
      mensaje: 'El usuario y la contraseña son obligatorios'
    });
  }

  // Buscar el usuario en la base de datos
  const usuarioEncontrado = db.buscarPorUsuario(usuario);

  // Si no existe el usuario → error de autenticación
  if (!usuarioEncontrado) {
    return res.status(401).json({
      exito: false,
      mensaje: 'Error en la autenticación: usuario o contraseña incorrectos'
    });
  }

  // Comparar la contraseña ingresada con la encriptada
  const contrasenaValida = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);

  // Si la contraseña no coincide → error de autenticación
  if (!contrasenaValida) {
    return res.status(401).json({
      exito: false,
      mensaje: 'Error en la autenticación: usuario o contraseña incorrectos'
    });
  }

  // Generar token JWT válido por 1 hora
  const token = jwt.sign(
    { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  // ✅ Autenticación satisfactoria
  return res.status(200).json({
    exito: true,
    mensaje: 'Autenticación satisfactoria',
    datos: {
      usuario: usuarioEncontrado.usuario,
      token
    }
  });
}

// Exportar las funciones para usarlas en las rutas
module.exports = { registro, login };