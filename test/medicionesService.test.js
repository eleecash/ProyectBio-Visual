/**
 * @file medicionesService.test.js
 * @brief Pruebas unitarias para los servicios de mediciones.
 *
 * Este archivo contiene pruebas unitarias para las funciones de servicio,
 * incluyendo la obtención y creación de mediciones.
 */

import { expect } from 'chai';
import sinon from 'sinon';
import pool from '../src/models/db.js';
import { obtenerMediciones, enviarMedicion, obtenerUltimaMedicion } from '../src/services/medicionesService.js';

/**
 * @brief Conjunto de pruebas para los servicios de medición.
 */
describe('Servicios de Medición', () => {

    it('Debe obtener mediciones con filtros correctamente', async () => {
        const lugar = 'Laboratorio';
        const tipo_gas = 'CO2';
        const mediciones = [{ lugar: 'Laboratorio', tipo_gas: 'CO2', medida: 23.5 }];
        
        sinon.stub(pool, 'query').returns([mediciones]);
        
        const result = await obtenerMediciones(lugar, tipo_gas);
        expect(result).to.deep.equal(mediciones);
        
        pool.query.restore();
    });

    it('Debe insertar una nueva medición correctamente', async () => {
        const nuevaMedicion = { medida: '50.50', lugar: 'Laboratorio', tipo_gas: 'CO2', hora: new Date() };
        
        sinon.stub(pool, 'query').resolves();
        
        await enviarMedicion(nuevaMedicion);
        
        expect(pool.query.calledOnce).to.be.true;
        pool.query.restore();
    });

    it('Debe obtener la última medición correctamente', async () => {
        const ultimaMedicion = { lugar: 'Laboratorio', tipo_gas: 'CO2', medida: 23.5 };
        
        sinon.stub(pool, 'query').returns([[ultimaMedicion]]);
        
        const result = await obtenerUltimaMedicion();
        expect(result).to.deep.equal(ultimaMedicion);
        
        pool.query.restore();
    });
});
