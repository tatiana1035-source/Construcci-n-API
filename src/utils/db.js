// Importar mongoose para conectar con MongoDB
const mongoose = require('mongoose');

// Definir el modelo de Usuario con su esquema
// username: nombre de usuario único y requerido
// password: contraseña encriptada requerida
mongoose.model('Usuario', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

// Función para conectar a MongoDB Atlas
const connectDB = async () => {
  try {
    // Conectar usando la URI definida en las variables de entorno (.env)
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (error) {
    // Si falla la conexión, mostrar el error y detener el servidor
    console.error('❌ Error al conectar:', error.message);
    process.exit(1);
  }
};

// Exportar la función para usarla en server.js
module.exports = connectDB;