# Construcción API - Servicio Web de Autenticación

## Descripción
API REST para registro e inicio de sesión de usuarios, desarrollada como evidencia GA7-220501096-AA5-EV01.

## Tecnologías
- Node.js
- Express.js
- bcryptjs

## Endpoints

### Registro de usuario
- **Método:** POST
- **URL:** /register
- **Body:**
```json
{
  "username": "sakuratendo",
  "password": "123456"
}
```

### Inicio de sesión
- **Método:** POST  
- **URL:** /login
- **Respuesta exitosa:** Autenticación satisfactoria
- **Respuesta error:** Error en la autenticación

## Cómo ejecutar
1. Instalar dependencias: `npm install`
2. Correr el servidor: `node index.js`
3. El servidor corre en: `http://localhost:3000`
