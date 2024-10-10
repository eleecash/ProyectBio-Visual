// tests/medicionesService.test.js
import pool from '../src/models/db.js';
import { obtenerMediciones, enviarMedicion, obtenerUltimaMedicion } from '../src/services/medicionesService.js';

jest.mock('../src/models/db.js');  // Mocks para simular las llamadas a la base de datos

describe('Servicios de mediciones', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();  // Limpia los mocks antes de cada prueba
  });

  test('obtenerMediciones debe retornar mediciones filtradas correctamente', async () => {
    const mockMediciones = [
      { medida: 50.5, lugar: 'Zona Industrial', tipo_gas: 'CO2', hora: '2024-09-26T14:30:00Z' },
    ];
    pool.query.mockResolvedValue([mockMediciones]);

    const result = await obtenerMediciones('Zona Industrial', 'CO2', '2024-09-26T00:00:00Z', '2024-09-27T00:00:00Z');

    expect(result).toEqual(mockMediciones);
    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('SELECT'), expect.any(Array));
  });

  test('enviarMedicion debe insertar una nueva medición', async () => {
    const nuevaMedicion = { medida: 45, lugar: 'Zona Residencial', tipo_gas: 'O3', hora: '2024-10-10T10:00:00Z' };
    
    await enviarMedicion(nuevaMedicion);
    
    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO mediciones'), expect.any(Array));
  });

  test('obtenerUltimaMedicion debe retornar la última medición registrada', async () => {
    const ultimaMedicion = { medida: 55, lugar: 'Zona Industrial', tipo_gas: 'CO2', hora: '2024-10-10T10:30:00Z' };
    pool.query.mockResolvedValue([ultimaMedicion]);

    const result = await obtenerUltimaMedicion();

    expect(result).toEqual(ultimaMedicion);
    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM mediciones ORDER BY hora DESC LIMIT 1'));
  });
});
