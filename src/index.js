/**
 * @file index.js
 * @brief Archivo principal del servidor que inicia la API de mediciones.
 * @date 2024-09-30
 * @author Elena Ruiz de la Blanca
 * @details Este archivo configura y arranca el servidor Express, define las rutas de la API de mediciones 
 *          y maneja solicitudes JSON. Utiliza variables de entorno para la configuración del servidor.
 */

import express from 'express'; // Importa el framework Express para crear el servidor
import { config } from 'dotenv'; // Importa dotenv para cargar variables de entorno
import medicionesRoutes from './routes/medicionesRoutes.js'; // Importa las rutas de mediciones

config(); // Carga las variables de entorno desde el archivo .env

const app = express(); // Crea una instancia de Express
app.use(express.json()); // Para manejar solicitudes JSON


/**
 * @brief Define las rutas de la API.
 * @details Se asigna el prefijo '/mediciones' para todas las rutas relacionadas con mediciones.
 */
app.use('/mediciones', medicionesRoutes);


/**
 * @brief Ruta de bienvenida.
 * @details Define la ruta raíz del servidor que devuelve un mensaje de bienvenida.
 * @route GET /
 */
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de mediciones de Elenucha :)'); // Respuesta a la solicitud
});

/**
 * @brief Inicia el servidor.
 * @details El servidor se pone en escucha en el puerto definido en las variables de entorno.
 * @param {number} process.env.NODE_DOCKER_PORT - Puerto en el que se inicia el servidor.
 * @return {void} No devuelve ningún valor, pero muestra un mensaje en la consola.
 */
app.listen(process.env.NODE_DOCKER_PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.NODE_DOCKER_PORT}`); // Muestra un mensaje cuando el servidor está activo
});
