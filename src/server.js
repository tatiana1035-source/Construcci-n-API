// Framework principal para crear el servidor web
const express = require('express');

// Permite peticiones desde otros orígenes
const cors = require('cors');

// Importamos las rutas de autenticación
const authRoutes = require('./routes/auth.routes');

// Inicializar la aplicación Express
const app = express();
const PORT = 3000;

// ── Middlewares ───────────────────────────────────────────
// Permite recibir datos en formato JSON
app.use(express.json());

// Habilita CORS para todos los orígenes
app.use(cors());

// ── Rutas ─────────────────────────────────────────────────
// Todas las rutas de autenticación bajo el prefijo /api/auth
app.use('/api/auth', authRoutes);

// Ruta principal para verificar que el servidor está activo
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Autenticación activa',
    endpoints: {
      registro: 'POST /api/auth/registro',
      login: 'POST /api/auth/login'
    }
  });
});

// ── Iniciar el servidor ───────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
