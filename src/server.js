// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Importar Express para crear el servidor
const express = require('express');

// Importar la función de conexión a MongoDB
const connectDB = require('./utils/db');

// Importar las rutas de autenticación
const authRoutes = require('./routes/auth.routes');

// Inicializar la aplicación Express
const app = express();

// Puerto del servidor, tomado del .env o por defecto 3000
const PORT = process.env.PORT || 3000;

// Middleware para leer el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Conectar a MongoDB Atlas
connectDB();

// Registrar las rutas de autenticación bajo /api/auth
// POST /api/auth/registro - Registro de usuario
// POST /api/auth/login - Inicio de sesión
app.use('/api/auth', authRoutes);

// Iniciar el servidor y escuchar en el puerto definido
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));