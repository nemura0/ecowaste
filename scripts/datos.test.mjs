// Pruebas de las reglas de datos de src/lib/datos.mjs. Se corren con `npm test`.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  esFechaFutura,
  ejemploPermitido,
  idCoincideConArchivo,
  validarModo,
  fechaComoTexto,
  formatearFechaLegible,
  FORMATO_FECHA,
  RESIDUOS,
  DELEGACIONES,
} from '../src/lib/datos.mjs';

const hoy = new Date('2026-11-16T12:00:00Z');

test('una fecha de hoy no es futura', () => {
  assert.equal(esFechaFutura(new Date('2026-11-16'), hoy), false);
});

test('una fecha pasada no es futura', () => {
  assert.equal(esFechaFutura(new Date('2026-10-01'), hoy), false);
});

test('una fecha de mañana es futura', () => {
  assert.equal(esFechaFutura(new Date('2026-11-17'), hoy), true);
});

test('en modo demo se permiten datos de ejemplo', () => {
  assert.equal(ejemploPermitido('demo', true), true);
});

test('en modo real no se permiten datos de ejemplo', () => {
  assert.equal(ejemploPermitido('real', true), false);
});

test('en modo real se permiten datos que no son de ejemplo', () => {
  assert.equal(ejemploPermitido('real', false), true);
});

test('el id coincide con el nombre del archivo', () => {
  assert.equal(idCoincideConArchivo('contenedor-campus', 'contenedor-campus.yaml'), true);
});

test('el id distinto al nombre del archivo se rechaza', () => {
  assert.equal(idCoincideConArchivo('otro-id', 'contenedor-campus.yaml'), false);
});

test('el modo del sitio acepta "demo" y "real"', () => {
  assert.equal(validarModo('demo'), 'demo');
  assert.equal(validarModo('real'), 'real');
});

test('un modo mal escrito detiene la compilación', () => {
  for (const modo of ['Demo', 'demo ', 'produccion', undefined]) {
    assert.throws(() => validarModo(modo), /tiene que ser "demo" o "real"/);
  }
});

test('una fecha que YAML leyó como fecha queda como texto AAAA-MM-DD', () => {
  assert.equal(fechaComoTexto(new Date('2026-11-16')), '2026-11-16');
  assert.equal(fechaComoTexto('2026-11-16'), '2026-11-16');
});

test('solo se acepta la fecha como AAAA-MM-DD', () => {
  assert.match('2026-11-16', FORMATO_FECHA);
  for (const fecha of ['05/11/2026', '16/11/2026', '16-11-2026', '2026/11/16', '2026-11-16 ']) {
    assert.doesNotMatch(fecha, FORMATO_FECHA);
  }
});

test('las listas controladas tienen un texto para mostrar por cada valor', () => {
  for (const lista of [RESIDUOS, DELEGACIONES]) {
    for (const [valor, texto] of Object.entries(lista)) {
      assert.match(valor, /^[a-z0-9-]+$/);
      assert.ok(texto.length > 0);
    }
  }
});

test('formatea la fecha en formato legible DD-mmm-AAAA', () => {
  assert.equal(formatearFechaLegible('2026-11-16'), '16-nov-2026');
  assert.equal(formatearFechaLegible(new Date('2026-11-16')), '16-nov-2026');
  assert.equal(formatearFechaLegible('2026-05-04'), '4-may-2026');
});
