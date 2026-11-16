// Listas controladas y reglas de los datos de los puntos. Ver docs/DATOS.md.
// Es JavaScript simple para que lo usen tanto el sitio como las pruebas (npm test).

export const TIPOS = {
  contenedor: 'Contenedor',
  'punto-limpio': 'Punto limpio',
  empresa: 'Empresa',
  otro: 'Otro',
};

export const ESTADOS = {
  propuesto: 'Propuesto',
  activo: 'Activo',
  inactivo: 'Inactivo',
};

export const COMUNAS = ['Coquimbo', 'La Serena'];

// [PENDIENTE] Propuesta inicial de Operaciones; la revisa quien escriba "qué reciclar".
export const RESIDUOS = {
  pilas: 'Pilas',
  baterias: 'Baterías recargables',
  'celulares-y-tablets': 'Celulares y tablets',
  'computadores-y-notebooks': 'Computadores y notebooks',
  'perifericos-y-cables': 'Teclados, mouse, cargadores y cables',
  'pequenos-electrodomesticos': 'Pequeños electrodomésticos',
};

export const TIPOS_DE_FUENTE = {
  observacion: 'Observación en el lugar',
  consulta: 'Consulta a quien administra el punto',
  documento: 'Documento',
  web: 'Página web',
};

// [PENDIENTE] Falta la lista oficial de las cinco delegaciones.
export const DELEGACIONES = {
  'operaciones-y-recursos': 'Operaciones y recursos',
  'diseno-y-evaluacion': 'Diseño y evaluación',
};

/** Una fecha es futura si cae después del día de `hoy` (se compara solo el día, en UTC). */
export function esFechaFutura(fecha, hoy = new Date()) {
  const dia = (d) => d.toISOString().slice(0, 10);
  return dia(fecha) > dia(hoy);
}

/** Las fechas de verificación van como AAAA-MM-DD, por ejemplo 2026-11-16. */
export const FORMATO_FECHA = /^\d{4}-\d{2}-\d{2}$/;

/** YAML puede leer AAAA-MM-DD como fecha o como texto. Esto la deja siempre como texto, para revisar el formato. */
export function fechaComoTexto(valor) {
  if (valor instanceof Date && !Number.isNaN(valor.getTime())) return valor.toISOString().slice(0, 10);
  return valor;
}

/** En modo real no puede quedar ningún dato de ejemplo. */
export function ejemploPermitido(modo, esEjemplo) {
  return !(modo === 'real' && esEjemplo);
}

export const MODOS = ['demo', 'real'];

/**
 * Devuelve el modo si es "demo" o "real". Con cualquier otro valor detiene la compilación,
 * para que un error de tipeo no apague el aviso de demostración ni la revisión de datos de ejemplo.
 */
export function validarModo(modo) {
  if (!MODOS.includes(modo)) {
    const actual = modo === undefined ? 'no hay ningún modo' : `dice "${modo}"`;
    // Sin punto final: Astro agrega uno al mostrar el error.
    throw new Error(`El modo del sitio tiene que ser "demo" o "real". En src/data/sitio.json ${actual}`);
  }
  return modo;
}

/** El `id` de un punto tiene que ser igual al nombre de su archivo, sin la extensión. */
export function idCoincideConArchivo(id, nombreArchivo) {
  const base = nombreArchivo.split('/').pop().replace(/\.ya?ml$/, '');
  return id === base;
}
