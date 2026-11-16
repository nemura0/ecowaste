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

/** En modo real no puede quedar ningún dato de ejemplo. */
export function ejemploPermitido(modo, esEjemplo) {
  return !(modo === 'real' && esEjemplo);
}

/** El `id` de un punto tiene que ser igual al nombre de su archivo, sin la extensión. */
export function idCoincideConArchivo(id, nombreArchivo) {
  const base = nombreArchivo.split('/').pop().replace(/\.ya?ml$/, '');
  return id === base;
}
