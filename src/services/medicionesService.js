/**
 * @file services/medicionesService.js
 * @brief Servicios para interactuar con la base de datos de mediciones.
 * @date 2024-10-1
 * @author Elena Ruiz de la Blanca
 * @details Este archivo contiene las funciones para obtener mediciones con filtros opcionales, 
 *          crear una nueva medición y obtener la última medición registrada desde la base de datos.
 */

import pool from '../models/db.js';// Importa el pool de conexiones a la base de datos

/**
 * @brief Obtener mediciones con filtros opcionales.
 * @details Esta función permite obtener mediciones desde la base de datos con la posibilidad de aplicar filtros por lugar, tipo de gas y rango de tiempo.
 * @param {string} lugar - Filtro opcional por lugar donde se tomó la medición.
 * @param {string} tipo_gas - Filtro opcional por tipo de gas medido.
 * @param {string} desde_hora - Filtro opcional para obtener mediciones desde una hora específica (formato date-time).
 * @param {string} hasta_hora - Filtro opcional para obtener mediciones hasta una hora específica (formato date-time).
 * @return {Array<Object>} Devuelve un array de objetos que representan las mediciones obtenidas.
 */
// Obtener mediciones con filtros opcionales
export const obtenerMediciones = async (lugar, tipo_gas, desde_hora, hasta_hora) => {
  let query = 'SELECT * FROM mediciones WHERE 1=1'; // Consulta base que siempre es verdadera
  const params = []; // Array de parámetros para las consultas preparadas

  // Aplica los filtros opcionales
  if (lugar) {
    query += ' AND lugar = ?';
    params.push(lugar);
  }

  if (tipo_gas) {
    query += ' AND tipo_gas = ?';
    params.push(tipo_gas);
  }

  if (desde_hora) {
    query += ' AND hora >= ?';
    params.push(desde_hora);
  }

  if (hasta_hora) {
    query += ' AND hora <= ?';
    params.push(hasta_hora);
  }

  const [rows] = await pool.query(query, params); // Ejecuta la consulta con los parámetros
  return rows; // Devuelve las filas obtenidas
};


/**
 * @brief Crear una nueva medición en la base de datos.
 * @details Inserta una nueva medición en la base de datos utilizando los datos proporcionados.
 * @param {Object} medicion - Objeto que contiene los datos de la medición a crear.
 * @param {number} medicion.medida - Valor de la medida tomada por el sensor.
 * @param {string} medicion.lugar - Lugar donde se tomó la medición.
 * @param {string} medicion.tipo_gas - Tipo de gas medido.
 * @param {string} medicion.hora - Hora en la que se tomó la medida (formato date-time).
 * @return {void} No devuelve ningún valor, pero inserta la nueva medición en la base de datos.
 */
// Crear nueva medición
export const enviarMedicion = async (medicion) => {
  const { medida, lugar, tipo_gas, hora } = medicion; // Desestructura el objeto medición
  const query = 'INSERT INTO mediciones (medida, lugar, tipo_gas, hora) VALUES (?, ?, ?, ?)'; // Consulta de inserción
  await pool.query(query, [medida, lugar, tipo_gas, hora]); // Ejecuta la consulta de inserción
};


/**
 * @brief Obtener la última medición registrada.
 * @details Recupera la última medición registrada en la base de datos, ordenada por hora de manera descendente.
 * @return {Object} Devuelve un objeto que representa la última medición registrada, o `null` si no hay registros.
 */
// Obtener la última medición
export const obtenerUltimaMedicion = async () => {
  const [rows] = await pool.query('SELECT * FROM mediciones ORDER BY hora DESC LIMIT 1'); // Consulta para obtener la última medición
  return rows[0]; // Devuelve la primera fila obtenida, que representa la última medición
};
