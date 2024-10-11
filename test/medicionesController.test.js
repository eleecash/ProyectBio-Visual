/**
 * @file medicionesController.test.js
 * @brief Pruebas unitarias para los controladores de mediciones.
 *
 * Este archivo contiene pruebas unitarias para las funciones de controlador,
 * incluyendo la obtención y creación de mediciones.
 */

import { expect } from 'chai';
import sinon from 'sinon';
import { obtenerMediciones, enviarMedicion, obtenerUltimaMedicion } from '../src/services/medicionesService.js';
import { getMediciones, postMedicion, getUltimaMedicion } from '../src/controllers/medicionesController.js';
import { request } from 'supertest';

/**
 * @brief Conjunto de pruebas para los controladores de medición.
 */
describe('Controladores de Medición', () => {

    let req, res;
    const mediciones =  [
      50.5,
      "Laboratorio",
      "CO2",
      "2024-09-29 08:00:00.000"
  ]

    beforeEach(() => {
        req = {
        };
        res = {
        };
    });

    it('Debe obtener todas las mediciones correctamente', async () => {
        sinon.stub({obtenerMediciones}, 'obtenerMediciones').returns(mediciones);
        
        await getMediciones(req, res);
        
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(mediciones)).to.be.true;
        medicionesService.obtenerMediciones.restore();
    });

    it('Debe crear una nueva medición correctamente', async () => {
        const body = { medida: '50.50', lugar: 'Laboratorio', tipo_gas: 'CO2', hora:"2024-09-29 08:00:00.000" };
        req.body = JSON.stringify(body);
        sinon.stub({enviarMedicion}, 'enviarMedicion').resolves();
        
        await postMedicion(req, res);
        
        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith({ message: 'Medición creada correctamente' })).to.be.true;
        medicionesService.enviarMedicion.restore();
    });

    it('Debe obtener la última medición correctamente', async () => {
        sinon.stub({obtenerUltimaMedicion}, 'obtenerUltimaMedicion').returns(mediciones);
        
        await getUltimaMedicion(req, res);
        
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(ultimaMedicion)).to.be.true;
        medicionesService.obtenerUltimaMedicion.restore();
    });
});
