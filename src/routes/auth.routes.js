// Módulo de Express para crear rutas
const express = require('express');
const router = express.Router();

// Importamos las funciones del controlador
const { registro, login } = require('../controllers/auth.controller');

// Ruta para registrar un nuevo usuario
// POST /api/auth/registro
router.post('/registro', registro);

// Ruta para iniciar sesión
// POST /api/auth/login
router.post('/login', login);

// Exportar las rutas
module.exports = router;