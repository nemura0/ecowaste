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

// Las cinco delegaciones del grupo, con los nombres oficiales del curso (issue #42).
export const DELEGACIONES = {
  'coordinacion-general': 'Coordinación general',
  'diseno-y-evaluacion': 'Diseño y evaluación',
  'economia-y-feria': 'Economía y feria',
  'vinculacion-y-autorizaciones': 'Vinculación y autorizaciones',
  'operaciones-y-recursos': 'Operaciones y recursos',
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

export const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** Formatea una fecha o texto AAAA-MM-DD como DD-mmm-AAAA (ej. 16-nov-2026), según la guía de estilo. */
export function formatearFechaLegible(valor) {
  const texto = fechaComoTexto(valor);
  if (typeof texto !== 'string' || !FORMATO_FECHA.test(texto)) return String(valor);
  const [año, mes, dia] = texto.split('-');
  const mesIndice = Number(mes) - 1;
  const mesNombre = MESES[mesIndice] || mes;
  return `${Number(dia)}-${mesNombre}-${año}`;
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

// Orígenes de QR: un QR por ubicación física, cada uno con su ruta /q/<id>/. Ver docs/DATOS.md.

/** Un destino es una ruta interna del sitio que termina en "/", por ejemplo "/" o "/que-reciclar/". */
export const FORMATO_DESTINO = /^\/(?:[a-z0-9-]+\/)*$/;

/** Dirección a la que lleva un QR: el destino, con el origen anotado para poder contar desde dónde llega la gente. */
export function urlDeOrigen({ id, destino }) {
  return `${destino}?origen=${encodeURIComponent(id)}`;
}

/** Deja una ruta de la compilación como "/", "/que-reciclar/", etc., para compararla con un destino. */
export function normalizarRuta(ruta) {
  const limpia = ruta.replace(/^\/+|\/+$/g, '');
  return limpia === '' ? '/' : `/${limpia}/`;
}

/**
 * Devuelve los orígenes cuyo destino no es una página del sitio.
 * Un QR impreso no se puede corregir, así que la compilación falla si alguno lleva a una página que no existe.
 */
export function destinosInexistentes(origenes, rutasDelSitio) {
  const existentes = new Set(rutasDelSitio.map(normalizarRuta));
  return origenes.filter(({ destino }) => !existentes.has(normalizarRuta(destino)));
}

/**
 * Escribe una cifra como se lee en Chile: punto para los miles y coma para los decimales (1.234,5).
 * Muestra a lo más un decimal: 1234.56 aparece redondeada como 1.234,6.
 */
export function formatearCifra(valor) {
  return new Intl.NumberFormat('es-CL', { maximumFractionDigits: 1 }).format(valor);
}

/** El id del ejemplo de métrica de docs/DATOS.md. Si llega al archivo de métricas, la compilación se detiene. */
export const ID_METRICA_DE_MUESTRA = 'nombre-de-la-metrica';

/** Letra con que se marca un punto en el mapa y en la lista: A, B, C… y, después de la Z, números. */
export function letraDePunto(indice) {
  const LETRAS = 26;
  return indice < LETRAS ? String.fromCharCode(65 + indice) : String(indice + 1);
}

/**
 * Frase que aparece en la portada al elegir un residuo. Solo invita a ir si hay puntos activos.
 * `puntos` es una lista de objetos con `estado` y `residuos`.
 */
export function respuestaPorResiduo(residuo, puntos) {
  const cosa = (RESIDUOS[residuo] ?? residuo).toLowerCase();
  const loReciben = puntos.filter((punto) => punto.residuos.includes(residuo));
  if (loReciben.length === 0) {
    return `Todavía no hay dónde dejar ${cosa}.`;
  }
  const activos = loReciben.filter((punto) => punto.estado === 'activo').length;
  if (activos === 0) {
    return `Todavía no hay un punto abierto que reciba ${cosa}.`;
  }
  return `Puedes dejar ${cosa} en ${activos} ${activos === 1 ? 'punto' : 'puntos'}.`;
}
