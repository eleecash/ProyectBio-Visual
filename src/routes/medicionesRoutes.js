/**
 * @file routes/medicionesRoutes.js
 * @brief Definición de rutas para la API de mediciones.
 * @date 2024-10-1
 * @author Elena Ruiz De la Blanca
 * @details Este archivo define las rutas para obtener todas las mediciones, crear una nueva medición y obtener la última medición registrada, utilizando controladores.
 */
import { Router } from 'express'; // Importa Router para definir rutas de Express
import { getMediciones, postMedicion, getUltimaMedicion } from '../controllers/medicionesController.js'; // Importa los controladores de mediciones

const router = Router(); // Crea una nueva instancia del enrutador


/**
 * @brief Ruta para obtener todas las mediciones.
 * @details Llama al controlador `getMediciones` para obtener una lista de todas las mediciones, con filtros opcionales.
 * @route GET /
 */
router.get('/', getMediciones);

/**
 * @brief Ruta para crear una nueva medición.
 * @details Llama al controlador `postMedicion` para crear una nueva medición con los datos enviados en el cuerpo de la solicitud.
 * @route POST /
 */
router.post('/', postMedicion);

/**
 * @brief Ruta para obtener la última medición registrada.
 * @details Llama al controlador `getUltimaMedicion` para recuperar la última medición almacenada.
 * @route GET /ultima
 */
router.get('/ultima', getUltimaMedicion);

export default router; // Exporta el enrutador para ser utilizado en otras partes del proyecto
