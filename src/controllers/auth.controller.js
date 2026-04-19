// Importar librería para encriptar contraseñas
const bcrypt = require('bcryptjs');

// Importar mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

// Obtener el modelo de Usuario registrado en db.js
const Usuario = mongoose.model('Usuario');

// CONTROLADOR: Registro de usuario
// Recibe username y password, valida, encripta la contraseña y guarda en MongoDB
const registro = async (req, res) => {
  // Extraer datos del cuerpo de la petición
  const { username, password } = req.body;

  // Validar que se envíen los campos requeridos
  if (!username || !password)
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });

  try {
    // Verificar si el usuario ya existe en la base de datos
    const existe = await Usuario.findOne({ username });
    if (existe)
      return res.status(400).json({ error: 'El usuario ya existe' });

    // Encriptar la contraseña antes de guardarla
    const passwordEncriptada = await bcrypt.hash(password, 10);

    // Crear y guardar el nuevo usuario en MongoDB
    await Usuario.create({ username, password: passwordEncriptada });

    // Responder con éxito
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    // Error interno del servidor
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// CONTROLADOR: Inicio de sesión
// Recibe username y password, busca el usuario en MongoDB y valida la contraseña
const login = async (req, res) => {
  // Extraer datos del cuerpo de la petición
  const { username, password } = req.body;

  // Validar que se envíen los campos requeridos
  if (!username || !password)
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });

  try {
    // Buscar el usuario en la base de datos por su nombre de usuario
    const usuario = await Usuario.findOne({ username });

    // Si no existe el usuario, retornar error de autenticación
    if (!usuario)
      return res.status(401).json({ error: 'Error en la autenticación' });

    // Comparar la contraseña ingresada con la encriptada en la base de datos
    const correcta = await bcrypt.compare(password, usuario.password);

    // Si la contraseña no coincide, retornar error de autenticación
    if (!correcta)
      return res.status(401).json({ error: 'Error en la autenticación' });

    // Autenticación exitosa
    res.status(200).json({ message: 'Autenticación satisfactoria' });
  } catch (err) {
    // Error interno del servidor
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Exportar los controladores para usarlos en las rutas
module.exports = { registro, login };