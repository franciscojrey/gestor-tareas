import { formatearDireccion } from './formato';

describe('formatearDireccion', () => {
  it('arma la dirección con los campos disponibles', () => {
    const lugar = { name: 'Av. Corrientes 1234', city: 'CABA', region: 'Buenos Aires' };
    expect(formatearDireccion(lugar)).toBe('Av. Corrientes 1234, CABA, Buenos Aires');
  });

  it('ignora los campos vacíos', () => {
    const lugar = { name: 'Av. Corrientes 1234', city: null, region: 'Buenos Aires' };
    expect(formatearDireccion(lugar)).toBe('Av. Corrientes 1234, Buenos Aires');
  });

  it('devuelve null si no hay lugar', () => {
    expect(formatearDireccion(null)).toBeNull();
  });
});