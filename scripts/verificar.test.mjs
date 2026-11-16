// Pruebas de scripts/verificar.mjs. Se corren con `npm test`.
// Los correos, teléfonos y RUT de prueba se arman por partes para que este
// mismo archivo no aparezca como problema cuando se revisa el repo.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  esArchivoEnvProhibido,
  buscarCorreos,
  buscarTelefonos,
  buscarRuts,
  revisarArchivos,
} from './verificar.mjs';

const correoPersonal = ['persona', 'gmail.com'].join('@');
const correoNoreply = ['123+usuario', 'users.noreply.github.com'].join('@');
const correoEjemplo = ['alguien', 'example.com'].join('@');
const correoNoreplyAgente = ['noreply', 'anthropic.com'].join('@');
const celular = ['+56', '9', '1234', '5678'].join(' ');
const celularJunto = ['+569', '12345678'].join('');
const celularSinCodigo = ['9', '1234', '5678'].join(' ');
const fijoConCodigo = ['+56', '51', '234', '5678'].join(' ');
const rutConPuntos = ['12.345.678', 'k'].join('-');
const rutSinPuntos = ['12345678', '9'].join('-');

test('marca .env y sus variantes como archivos prohibidos', () => {
  assert.equal(esArchivoEnvProhibido('.env'), true);
  assert.equal(esArchivoEnvProhibido('.env.local'), true);
  assert.equal(esArchivoEnvProhibido('config/.env.production'), true);
});

test('permite .env.example y archivos que solo se parecen', () => {
  assert.equal(esArchivoEnvProhibido('.env.example'), false);
  assert.equal(esArchivoEnvProhibido('docs/env.md'), false);
  assert.equal(esArchivoEnvProhibido('src/environment.ts'), false);
});

test('encuentra un correo personal e informa la línea', () => {
  const texto = `primera línea\nescríbele a ${correoPersonal}\n`;
  assert.deepEqual(buscarCorreos(texto), [{ linea: 2, valor: correoPersonal }]);
});

test('ignora correos noreply y de ejemplo', () => {
  const texto = [correoNoreply, correoEjemplo, correoNoreplyAgente].join('\n');
  assert.deepEqual(buscarCorreos(texto), []);
});

test('no confunde versiones de paquetes con correos', () => {
  assert.deepEqual(buscarCorreos('instala astro@7.4.11 y leaflet@1.9.4'), []);
});

test('encuentra celulares chilenos con y sin código de país', () => {
  const texto = [celular, celularJunto, celularSinCodigo].join('\n');
  assert.deepEqual(
    buscarTelefonos(texto).map((t) => t.linea),
    [1, 2, 3],
  );
});

test('encuentra teléfonos fijos con código de país', () => {
  assert.equal(buscarTelefonos(`llama al ${fijoConCodigo}`).length, 1);
});

test('no confunde coordenadas, fechas ni números largos con teléfonos', () => {
  const texto = ['lat: -29.95123', 'lng: -71.33912', 'fecha: 2026-11-12', '91234567890123'].join('\n');
  assert.deepEqual(buscarTelefonos(texto), []);
});

test('encuentra RUT con y sin puntos', () => {
  const texto = `${rutConPuntos}\n${rutSinPuntos}`;
  assert.deepEqual(
    buscarRuts(texto).map((r) => r.linea),
    [1, 2],
  );
});

test('no confunde fechas con RUT', () => {
  assert.deepEqual(buscarRuts('verificado el 2026-11-12'), []);
});

test('revisarArchivos junta los problemas de cada archivo', () => {
  const archivos = {
    '.env': 'CLAVE=algo',
    'docs/nota.md': `contacto: ${correoPersonal}`,
    'docs/ok.md': 'sin datos personales',
  };
  const problemas = revisarArchivos(Object.keys(archivos), (ruta) => archivos[ruta]);
  assert.deepEqual(
    problemas.map((p) => [p.ruta, p.tipo]),
    [
      ['.env', 'env'],
      ['docs/nota.md', 'correo'],
    ],
  );
});

test('revisarArchivos no lee archivos generados ni binarios', () => {
  const leidos = [];
  const leer = (ruta) => {
    leidos.push(ruta);
    return '';
  };
  revisarArchivos(['package-lock.json', 'public/foto.png', 'src/pages/index.astro'], leer);
  assert.deepEqual(leidos, ['src/pages/index.astro']);
});
