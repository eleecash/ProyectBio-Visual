/**
 * @file controllers/medicionesController.js
 * @brief Controladores para manejar las operaciones de mediciones.
 * @date 2024-10-1
 * @author Elena Ruiz de la Blanca
 * @details Este archivo contiene los controladores para obtener todas las mediciones,
 *          crear una nueva medición y obtener la última medición registrada.
 */
import { obtenerMediciones, enviarMedicion, obtenerUltimaMedicion } from '../services/medicionesService.js';


/**
 * @brief Obtener todas las mediciones con filtros opcionales.
 * @details Este controlador permite obtener todas las mediciones almacenadas, con la posibilidad de aplicar filtros como lugar, tipo de gas, y rango de fechas.
 * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene los filtros opcionales en req.query.
 * @param {Object} res - Objeto de respuesta (Response) de Express, que se utiliza para devolver los resultados.
 * @return {void} Devuelve un array de mediciones en formato JSON o un mensaje de error si falla.
 */

// Obtener todas las mediciones (con filtros opcionales)
export const getMediciones = async (req, res) => {
  try {
    const { lugar, tipo_gas, desde_hora, hasta_hora } = req.query;
    const mediciones = await obtenerMediciones(lugar, tipo_gas, desde_hora, hasta_hora);
    res.status(200).json(mediciones);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


/**
 * @brief Crear una nueva medición.
 * @details Este controlador permite crear una nueva medición basada en los datos enviados en el cuerpo de la solicitud.
 * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene la nueva medición en req.body.
 * @param {Object} res - Objeto de respuesta (Response) de Express, que se utiliza para devolver un mensaje de éxito o error.
 * @return {void} Devuelve un mensaje de éxito en formato JSON o un mensaje de error si falla.
 */

// Crear nueva medición
export const postMedicion = async (req, res) => {
  try {
    const nuevaMedicion = req.body;
    await enviarMedicion(nuevaMedicion);
    res.status(201).json({ message: 'Medición creada correctamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @brief Obtener la última medición registrada.
 * @details Este controlador recupera la última medición registrada en la base de datos.
 * @param {Object} req - Objeto de solicitud (Request) de Express.
 * @param {Object} res - Objeto de respuesta (Response) de Express, que se utiliza para devolver la última medición o un mensaje de error.
 * @return {void} Devuelve la última medición en formato JSON o un mensaje de error si no se encuentra.
 */

// Obtener la última medición
export const getUltimaMedicion = async (req, res) => {
  try {
    const ultimaMedicion = await obtenerUltimaMedicion();
    if (!ultimaMedicion) {
      return res.status(404).json({ message: 'No se encontró ninguna medición' });
    }
    res.status(200).json(ultimaMedicion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
