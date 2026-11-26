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
  urlDeOrigen,
  normalizarRuta,
  destinosInexistentes,
  FORMATO_DESTINO,
  formatearCifra,
  letraDePunto,
  respuestaPorResiduo,
  puntosQueReciben,
  ESTADOS,
  EXPLICACION_DE_ESTADO,
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

// Orígenes de QR

test('un QR lleva a su destino con el origen anotado', () => {
  assert.equal(urlDeOrigen({ id: 'contenedor', destino: '/' }), '/?origen=contenedor');
  assert.equal(urlDeOrigen({ id: 'biblioteca', destino: '/que-reciclar/' }), '/que-reciclar/?origen=biblioteca');
});

test('las rutas de la compilación se comparan igual con o sin barras', () => {
  assert.equal(normalizarRuta(''), '/');
  assert.equal(normalizarRuta('/'), '/');
  assert.equal(normalizarRuta('que-reciclar/'), '/que-reciclar/');
  assert.equal(normalizarRuta('/puntos/contenedor-campus'), '/puntos/contenedor-campus/');
});

test('un destino que existe en el sitio no se reporta', () => {
  const origenes = [{ id: 'a', destino: '/' }, { id: 'b', destino: '/que-reciclar/' }];
  assert.deepEqual(destinosInexistentes(origenes, ['', 'que-reciclar/', 'acerca/']), []);
});

test('un destino que no existe en el sitio se reporta', () => {
  const origenes = [{ id: 'a', destino: '/' }, { id: 'b', destino: '/no-existe/' }];
  assert.deepEqual(destinosInexistentes(origenes, ['']), [{ id: 'b', destino: '/no-existe/' }]);
});

test('el destino es una ruta interna que termina en barra', () => {
  for (const valido of ['/', '/que-reciclar/', '/puntos/contenedor-campus/']) {
    assert.match(valido, FORMATO_DESTINO);
  }
  for (const invalido of ['', 'que-reciclar/', '/que-reciclar', 'https://otro.sitio/', '/?origen=x', '/#mapa']) {
    assert.doesNotMatch(invalido, FORMATO_DESTINO);
  }
});

// Métricas

test('las cifras usan punto para los miles y coma para los decimales', () => {
  assert.equal(formatearCifra(1234.5), '1.234,5');
  assert.equal(formatearCifra(1000), '1.000');
  assert.equal(formatearCifra(0.5), '0,5');
});

test('las cifras enteras no muestran decimales y las demás muestran a lo más uno', () => {
  assert.equal(formatearCifra(12), '12');
  assert.equal(formatearCifra(0), '0');
  assert.equal(formatearCifra(3.14159), '3,1');
});

// Portada: letras de los puntos y respuesta al elegir un residuo

test('los puntos se marcan con letras y, después de la Z, con números', () => {
  assert.equal(letraDePunto(0), 'A');
  assert.equal(letraDePunto(25), 'Z');
  assert.equal(letraDePunto(26), '27');
});

const puntosDePrueba = [
  { estado: 'activo', residuos: ['pilas', 'baterias'] },
  { estado: 'activo', residuos: ['pilas'] },
  { estado: 'propuesto', residuos: ['celulares-y-tablets'] },
  { estado: 'inactivo', residuos: ['baterias'] },
];

test('si hay puntos activos, la respuesta dice en cuántos puedes dejarlo', () => {
  assert.equal(respuestaPorResiduo('pilas', puntosDePrueba), 'Puedes dejar pilas en 2 puntos.');
  assert.equal(respuestaPorResiduo('baterias', puntosDePrueba), 'Puedes dejar baterías recargables en 1 punto.');
});

test('si ningún punto que lo recibe está activo, la respuesta no invita a ir', () => {
  assert.equal(
    respuestaPorResiduo('celulares-y-tablets', puntosDePrueba),
    'Todavía no hay un punto abierto que reciba celulares y tablets.',
  );
});

test('si ningún punto lo recibe, la respuesta lo dice', () => {
  assert.equal(
    respuestaPorResiduo('pequenos-electrodomesticos', puntosDePrueba),
    'Todavía no hay dónde dejar pequeños electrodomésticos.',
  );
});

// Qué reciclar: cuántos puntos reciben cada residuo

test('cuenta los puntos abiertos que reciben un residuo y avisa si son de ejemplo', () => {
  const puntos = [
    { estado: 'activo', residuos: ['pilas'], ejemplo: true },
    { estado: 'activo', residuos: ['pilas', 'baterias'], ejemplo: true },
  ];
  assert.equal(puntosQueReciben('pilas', puntos), 'Lo reciben 2 puntos abiertos (de ejemplo).');
  assert.equal(puntosQueReciben('baterias', puntos), 'Lo recibe 1 punto abierto (de ejemplo).');
  assert.equal(puntosQueReciben('celulares-y-tablets', puntos), 'Todavía ningún punto lo recibe.');
});

test('si hay algún punto abierto real, el conteo no dice que son de ejemplo', () => {
  const puntos = [
    { estado: 'activo', residuos: ['pilas'], ejemplo: true },
    { estado: 'activo', residuos: ['pilas'], ejemplo: false },
  ];
  assert.equal(puntosQueReciben('pilas', puntos), 'Lo reciben 2 puntos abiertos.');
});

test('los puntos propuestos no se cuentan como abiertos', () => {
  const puntos = [
    { estado: 'propuesto', residuos: ['pilas'], ejemplo: true },
    { estado: 'activo', residuos: ['baterias'], ejemplo: false },
    { estado: 'propuesto', residuos: ['baterias'], ejemplo: true },
  ];
  assert.equal(
    puntosQueReciben('pilas', puntos),
    'Todavía ningún punto abierto lo recibe. Hay 1 punto propuesto (de ejemplo).',
  );
  assert.equal(puntosQueReciben('baterias', puntos), 'Lo recibe 1 punto abierto.');
});

test('los puntos inactivos no se cuentan ni como abiertos ni como propuestos', () => {
  const puntos = [{ estado: 'inactivo', residuos: ['pilas'], ejemplo: false }];
  assert.equal(puntosQueReciben('pilas', puntos), 'Todavía ningún punto abierto lo recibe.');
});

test('cada estado tiene su explicación para la ficha', () => {
  assert.deepEqual(Object.keys(EXPLICACION_DE_ESTADO).sort(), Object.keys(ESTADOS).sort());
});
