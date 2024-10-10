/**
 * @file db.js
 * @brief Configuración y creación de la conexión a la base de datos MySQL utilizando mysql2/promise.
 * @date 2024-10-1
 * @author Elena Ruiz de la Blanca
 * @details Este archivo configura la conexión a la base de datos MySQL utilizando el paquete mysql2/promise y variables de entorno cargadas con dotenv.
 */

import { createPool } from 'mysql2/promise'; // Importa la función para crear un pool de conexiones con soporte para Promises
import { config } from 'dotenv';  // Importa dotenv para gestionar las variables de entorno

// Cargar las variables de entorno desde el archivo .env
config();

/**
 * @brief Creación de un pool de conexiones para la base de datos MySQL.
 * @details Configura y crea un pool de conexiones a la base de datos utilizando las variables de entorno para la configuración.
 * @param {string} host - Dirección del servidor MySQL, obtenida de la variable de entorno MYSQLDB_HOST.
 * @param {string} user - Nombre de usuario de la base de datos, obtenido de la variable de entorno MYSQLDB_USER.
 * @param {string} password - Contraseña del usuario root de la base de datos, obtenida de la variable de entorno MYSQLDB_ROOT_PASSWORD.
 * @param {number} port - Puerto en el que corre MySQL, obtenido de la variable de entorno MYSQLDB_DOCKER_PORT.
 * @param {string} database - Nombre de la base de datos a la que se conecta.
 * @return {Pool} Devuelve una instancia del pool de conexiones a la base de datos MySQL.
 */
const pool = createPool({
  host: process.env.MYSQLDB_HOST, // Host del servidor MySQL
  user: process.env.MYSQLDB_USER, // Usuario de la base de datos
  password: process.env.MYSQLDB_ROOT_PASSWORD, // Contraseña del usuario root
  port: process.env.MYSQLDB_DOCKER_PORT, // Puerto de MySQL
  database: 'proyectobiodb' // Base de datos a utilizar
});

export default pool; // Exporta el pool de conexiones para usar en otras partes del proyecto
