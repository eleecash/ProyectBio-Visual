/**
 * @file medicionesRoutes.test.js
 * @brief Pruebas unitarias para las rutas de mediciones.
 *
 * Este archivo contiene pruebas unitarias para las rutas definidas
 * en el archivo de rutas de mediciones.
 */

import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import medicionesRoutes from '../src/routes/medicionesRoutes.js';

const app = express();
app.use(express.json());
app.use('/', medicionesRoutes);

/**
 * @brief Conjunto de pruebas para las rutas de medición. Deberia ejecutarse con el servidor en funcionamiento.
 */
describe('Rutas de Medición', () => {

    it('Debe obtener todas las mediciones', async () => {
        const res = await request(app).get('/');
        expect(res.status).to.equal(200);
        // Agrega más aserciones según el contenido esperado
    });

    it('Debe crear una nueva medición', async () => {
        const nuevaMedicion = { medida: '50.50', lugar: 'Laboratorio', tipo_gas: 'CO2', hora: new Date() };
        const res = await request(app).post('/').send(nuevaMedicion);
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Medición creada correctamente');
    });

    it('Debe obtener la última medición', async () => {
        const res = await request(app).get('/ultima');
        expect(res.status).to.equal(200);
        // Agrega más aserciones según el contenido esperado
    });
});
