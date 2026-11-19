// Revisión automática del repo de EcoWaste.
//
// Busca lo que nunca se sube: archivos .env, correos personales, teléfonos y RUT.
// Se corre con `npm run verificar` y en cada pull request.
// Los datos del sitio los valida la compilación, con los esquemas de src/content.config.ts.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ENV_PERMITIDO = '.env.example';
const ARCHIVOS_GENERADOS = new Set(['package-lock.json']);
const EXTENSIONES_BINARIAS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico',
  '.pdf', '.zip', '.woff', '.woff2', '.ttf', '.otf',
]);

const CORREO = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const CORREOS_PERMITIDOS = [
  /@users\.noreply\.github\.com$/i,
  /^noreply@/i,
  /@example\.(com|org|net)$/i,
];
// Cualquier número con +56, o un celular de 9 dígitos que empieza con 9.
const TELEFONO =
  /(?<![\w.+-])(?:\+56[\s.-]?\d{1,2}[\s.-]?\d{3,4}[\s.-]?\d{4}|9[\s.-]?\d{4}[\s.-]?\d{4})(?![\w.])/g;
// RUT con puntos y guion, o solo con guion antes del dígito verificador.
const RUT = /(?<![\w.-])(?:\d{1,2}\.\d{3}\.\d{3}|\d{7,8})-[\dkK](?![\w.-])/g;

const MENSAJES = {
  env: 'Archivo de entorno: no se sube nunca. Sácalo con `git rm --cached` (queda en tu computador).',
  correo: 'Correo personal: en el repo solo van correos noreply.',
  telefono: 'Parece un número de teléfono.',
  rut: 'Parece un RUT.',
};

export function esArchivoEnvProhibido(ruta) {
  const nombre = basename(ruta);
  return nombre !== ENV_PERMITIDO && /^\.env(\..+)?$/.test(nombre);
}

function buscar(texto, patron) {
  return texto.split('\n').flatMap((contenido, indice) =>
    [...contenido.matchAll(patron)].map((coincidencia) => ({
      linea: indice + 1,
      valor: coincidencia[0],
    })),
  );
}

export function buscarCorreos(texto) {
  return buscar(texto, CORREO).filter(
    ({ valor }) => !CORREOS_PERMITIDOS.some((permitido) => permitido.test(valor)),
  );
}

export function buscarTelefonos(texto) {
  return buscar(texto, TELEFONO);
}

export function buscarRuts(texto) {
  return buscar(texto, RUT);
}

function debeLeerse(ruta) {
  return !ARCHIVOS_GENERADOS.has(basename(ruta)) && !EXTENSIONES_BINARIAS.has(extname(ruta).toLowerCase());
}

export function revisarArchivos(rutas, leer) {
  return rutas.flatMap((ruta) => {
    if (esArchivoEnvProhibido(ruta)) return [{ ruta, tipo: 'env', linea: null, valor: '' }];
    if (!debeLeerse(ruta)) return [];
    const texto = leer(ruta);
    return [
      ...buscarCorreos(texto).map((h) => ({ ruta, tipo: 'correo', ...h })),
      ...buscarTelefonos(texto).map((h) => ({ ruta, tipo: 'telefono', ...h })),
      ...buscarRuts(texto).map((h) => ({ ruta, tipo: 'rut', ...h })),
    ];
  });
}

function listarArchivos() {
  const salida = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], {
    encoding: 'utf8',
  });
  return salida.split('\0').filter((ruta) => ruta && existsSync(ruta));
}

// En la salida se muestra solo el comienzo del valor, para no volver a publicarlo.
function describir({ ruta, tipo, linea, valor }) {
  const lugar = linea ? `${ruta}:${linea}` : ruta;
  const pista = valor ? ` (empieza con "${valor.slice(0, 2)}…")` : '';
  return `  ✗ ${lugar} · ${MENSAJES[tipo]}${pista}`;
}

function principal() {
  let rutas;
  try {
    rutas = listarArchivos();
  } catch (error) {
    console.error('No pude listar los archivos del repo. ¿Estás dentro de la carpeta del repo y tienes git instalado?');
    console.error(error.message);
    process.exitCode = 2;
    return;
  }

  const problemas = revisarArchivos(rutas, (ruta) => readFileSync(ruta, 'utf8'));
  if (problemas.length === 0) {
    console.log(`Revisión del repo: sin problemas (${rutas.length} archivos revisados).`);
    return;
  }

  console.error(`Revisión del repo: ${problemas.length} problema(s).`);
  problemas.forEach((problema) => console.error(describir(problema)));
  console.error('Corrige lo anterior antes de abrir el pull request. Ver docs/COMO_APORTAR.md.');
  process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  principal();
}
