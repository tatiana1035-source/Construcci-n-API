# Construcción de API - Registro e Inicio de Sesión

## Descripción
Servicio web REST desarrollado con Node.js y Express para el registro e inicio de sesión de usuarios. Las contraseñas se almacenan encriptadas en MongoDB Atlas.

## Tecnologías utilizadas
- **Node.js** - Entorno de ejecución de JavaScript
- **Express** - Framework para el servidor y rutas HTTP
- **Nodemon** - Reinicio automático del servidor en desarrollo
- **MongoDB Atlas** - Base de datos NoSQL en la nube
- **Mongoose** - Conexión y modelos de datos para MongoDB
- **bcryptjs** - Encriptación de contraseñas
- **Postman** - Testing de endpoints

## Endpoints
| Método | URL | Descripción |
|--------|-----|-------------|
| POST | `/api/auth/registro` | Registro de nuevo usuario |
| POST | `/api/auth/login` | Inicio de sesión |

## Cómo ejecutar el proyecto
1. Instalar dependencias:
```bash
   npm install
```
2. Crear archivo `.env` con:
 PORT=3000
 MONGO_URI=tu_cadena_de_conexion_mongodb

3. Ejecutar el servidor:
```bash
   node src/server.js
```

## Autor
Tatiana - SENA
