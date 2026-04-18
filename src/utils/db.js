// Módulo para leer y escribir archivos en el computador
const fs = require('fs');

// Módulo para construir rutas de archivos
const path = require('path');

// Ruta donde se guardarán los usuarios (archivo JSON)
const DB_PATH = path.join(__dirname, '../../data/usuarios.json');

// Lee los usuarios guardados en el archivo JSON
function cargarUsuarios() {
  if (!fs.existsSync(DB_PATH)) return []; // Si no existe el archivo, retorna vacío
  const contenido = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(contenido); // Convierte el texto JSON a un arreglo
}

// Guarda los usuarios en el archivo JSON
function guardarUsuarios(usuarios) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true }); // Crea la carpeta si no existe
  fs.writeFileSync(DB_PATH, JSON.stringify(usuarios, null, 2), 'utf8');
}

// Arreglo en memoria con los usuarios cargados
let usuarios = cargarUsuarios();

module.exports = {
  // Busca un usuario por su nombre
  buscarPorUsuario(nombreUsuario) {
    return usuarios.find(u => u.usuario.toLowerCase() === nombreUsuario.toLowerCase());
  },

  // Guarda un nuevo usuario
  guardar(nuevoUsuario) {
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    return nuevoUsuario;
  },

  // Retorna todos los usuarios
  obtenerTodos() {
    return usuarios;
  }
};