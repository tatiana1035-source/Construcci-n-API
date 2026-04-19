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

// RUTA: Registro de usuario - POST /register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }
  const usuarioExiste = usuarios.find(u => u.username === username);
  if (usuarioExiste) {
    return res.status(400).json({ error: 'El usuario ya existe' });
  }
  const passwordEncriptada = await bcrypt.hash(password, 10);
  usuarios.push({ username, password: passwordEncriptada });
  res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

// RUTA: Inicio de sesión - POST /login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }
  const usuario = usuarios.find(u => u.username === username);
  if (!usuario) {
    return res.status(401).json({ error: 'Error en la autenticación' });
  }
  const passwordCorrecta = await bcrypt.compare(password, usuario.password);
  if (!passwordCorrecta) {
    return res.status(401).json({ error: 'Error en la autenticación' });
  }
  res.status(200).json({ message: 'Autenticación satisfactoria' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});