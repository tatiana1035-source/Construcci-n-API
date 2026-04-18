// Importar dependencias
const express = require('express');
const bcrypt = require('bcryptjs');

// Inicializar la aplicación
const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Base de datos temporal en memoria (arreglo de usuarios)
const usuarios = [];

// ─────────────────────────────────────────
// RUTA: Registro de usuario
// Método: POST
// URL: http://localhost:3000/register
// ─────────────────────────────────────────
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validar que se enviaron los datos
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  // Verificar si el usuario ya existe
  const usuarioExiste = usuarios.find(u => u.username === username);
  if (usuarioExiste) {
    return res.status(400).json({ error: 'El usuario ya existe' });
  }

  // Encriptar la contraseña antes de guardarla
  const passwordEncriptada = await bcrypt.hash(password, 10);

  // Guardar el nuevo usuario
  usuarios.push({ username, password: passwordEncriptada });

  res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

// ─────────────────────────────────────────
// RUTA: Inicio de sesión
// Método: POST
// URL: http://localhost:3000/login
// ─────────────────────────────────────────
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validar que se enviaron los datos
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  // Buscar el usuario en la base de datos
  const usuario = usuarios.find(u => u.username === username);

  // Si no existe el usuario, retornar error
  if (!usuario) {
    return res.status(401).json({ error: 'Error en la autenticación' });
  }

  // Comparar la contraseña ingresada con la encriptada
  const passwordCorrecta = await bcrypt.compare(password, usuario.password);

  // Si la contraseña no coincide, retornar error
  if (!passwordCorrecta) {
    return res.status(401).json({ error: 'Error en la autenticación' });
  }

  // Autenticación exitosa
  res.status(200).json({ message: 'Autenticación satisfactoria' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});