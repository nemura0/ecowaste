# Datos de los puntos

Esta guía es para quien carga o revisa puntos del mapa. Explica qué datos lleva un punto, qué cuenta como fuente y cómo una fila de la planilla llega al repo.

> **Estado:** este es el esquema acordado para la Fase 1. El código que lo valida todavía no existe. Si al implementarlo cambia algo, se actualiza este archivo en el mismo pull request.

## La regla de oro

Un punto sin **fuente**, sin **fecha de verificación** o sin **delegación que verificó** no entra al mapa. La verificación automática lo rechaza.

Nada se completa "de memoria": ni coordenadas, ni horarios, ni residuos aceptados. Lo que no tiene fuente se deja vacío (si el campo es opcional) o el punto espera.

## Dónde viven

Cada punto es un archivo en `src/data/puntos/`, con el formato YAML (texto con `campo: valor`). El nombre del archivo es el identificador del punto: `src/data/puntos/contenedor-campus.yaml`.

## Campos

| Campo | Obligatorio | Qué va | Valores permitidos |
|---|---|---|---|
| `id` | Sí | Identificador único, igual al nombre del archivo | Minúsculas, números y guiones |
| `nombre` | Sí | Nombre que se muestra | Texto corto |
| `tipo` | Sí | Qué clase de punto es | `contenedor`, `punto-limpio`, `empresa`, `otro` |
| `estado` | Sí | Si funciona hoy | `propuesto`, `activo`, `inactivo` |
| `ubicacion.lat` | Sí | Latitud en grados decimales, con 5 decimales | Número entre -90 y 90 |
| `ubicacion.lng` | Sí | Longitud en grados decimales, con 5 decimales | Número entre -180 y 180 |
| `ubicacion.descripcion` | Sí | Cómo encontrarlo en el lugar | Texto corto |
| `ubicacion.comuna` | Sí | Comuna | `Coquimbo`, `La Serena` (se amplía si hace falta) |
| `residuos` | Sí | Qué recibe | Lista con valores de la [lista controlada](#lista-controlada-de-residuos) |
| `horario` | No | Cuándo recibe | Texto corto, tal como lo dice la fuente |
| `administrador` | No | Quién lo gestiona | Institución o delegación, **nunca una persona** |
| `fuente.tipo` | Sí | De dónde salió el dato | `observacion`, `consulta`, `documento`, `web` |
| `fuente.detalle` | Sí | Qué dice la fuente y cómo se obtuvo | Texto corto |
| `fuente.enlace` | No | Dirección web de la fuente, si existe | URL que empieza con `https://` |
| `verificacion.fecha` | Sí | Cuándo se comprobó por última vez | `AAAA-MM-DD`, sin fechas futuras |
| `verificacion.delegacion` | Sí | Qué delegación lo comprobó | Ver [delegaciones](#delegaciones) |
| `ejemplo` | Sí | Si es un dato de ejemplo para la demo | `true` o `false` |

### Ejemplo de archivo

Los valores son ilustrativos y no describen un punto real.

```yaml
id: punto-de-ejemplo
nombre: Punto de ejemplo
tipo: contenedor
estado: propuesto
ubicacion:
  lat: -29.00000
  lng: -71.00000
  descripcion: Texto que explica cómo llegar al punto
  comuna: Coquimbo
residuos:
  - pilas
  - perifericos-y-cables
fuente:
  tipo: observacion
  detalle: Visita al lugar; coordenadas tomadas con el GPS del teléfono
verificacion:
  fecha: 2026-11-20
  delegacion: operaciones-y-recursos
ejemplo: true
```

## Qué cuenta como fuente

| Tipo | Cuándo usarlo | Qué anotar en `detalle` |
|---|---|---|
| `observacion` | Alguien del grupo fue al lugar y lo vio | Qué se vio y cómo se tomaron las coordenadas |
| `consulta` | Se le preguntó a quien administra el punto | Cargo o institución consultada (**nunca un nombre**) y por qué medio |
| `documento` | Un oficio, convenio, afiche o informe | Título del documento y quién lo emite |
| `web` | La página oficial del punto o de la institución | Qué página es. El enlace va en `fuente.enlace` |

**No cuentan como fuente:** "me dijeron", la memoria de alguien, una respuesta de una IA, ni una ficha de Google Maps o un post en redes sociales por sí solos. Sirven como pista, pero hay que confirmarlas con una fuente de la tabla.

**Coordenadas:** también necesitan origen. Se toman en el lugar con el GPS del teléfono o se leen en [openstreetmap.org](https://www.openstreetmap.org). Anota cuál de las dos en `fuente.detalle`.

## Lista controlada de residuos

`[PENDIENTE]` Es una propuesta inicial de Operaciones y no una clasificación oficial. La revisa la delegación que escriba "qué reciclar".

| Valor | Qué incluye |
|---|---|
| `pilas` | Pilas |
| `baterias` | Baterías recargables |
| `celulares-y-tablets` | Teléfonos celulares y tablets |
| `computadores-y-notebooks` | Computadores de escritorio y notebooks |
| `perifericos-y-cables` | Teclados, mouse, cargadores y cables |
| `pequenos-electrodomesticos` | Aparatos eléctricos chicos de uso doméstico |

## Delegaciones

`[PENDIENTE]` Falta la lista oficial de las cinco delegaciones. Por ahora:

| Valor | Delegación |
|---|---|
| `operaciones-y-recursos` | Operaciones y recursos |
| `diseno-y-evaluacion` | Diseño y evaluación |

## Datos de ejemplo y modo real

- En la demo, los puntos con `ejemplo: true` se muestran con una marca visible de **EJEMPLO**, y todo el sitio lleva un aviso de demostración.
- El sitio tiene un modo (`demo` o `real`) definido en un archivo del repo. En modo `real`, la verificación falla si queda algún punto con `ejemplo: true`.

## La planilla de Drive

Las otras delegaciones proponen puntos en una planilla de Drive con estas columnas (la plantilla CSV llega en la Fase 2):

`id`, `nombre`, `tipo`, `estado`, `lat`, `lng`, `descripcion_lugar`, `comuna`, `residuos` (separados por `;`), `horario`, `administrador`, `fuente_tipo`, `fuente_detalle`, `fuente_enlace`, `fecha_verificacion`, `delegacion_verifico`, `observaciones`.

La columna `observaciones` es para conversar y no pasa al repo.

## Cómo pasar una fila al repo

1. Revisa que la fila tenga fuente, fecha de verificación y delegación. Si falta algo, no la cargues: pídeselo a quien la propuso.
2. Crea una rama `datos/agrega-<id>`.
3. Crea `src/data/puntos/<id>.yaml` con los campos de arriba. Si usas Claude Code, pídele que use la skill `agregar-punto`.
4. Corre `npm run verificar`.
5. Abre un pull request que cite la fuente (tipo, detalle y enlace), la fecha y la delegación.

## Actualizar o retirar un punto

- **Actualizar:** cambia los campos y pon una nueva fuente y una nueva fecha de verificación.
- **Retirar:** si el punto dejó de funcionar, cambia `estado` a `inactivo`, con la fuente que lo confirma. Borra el archivo solo si el punto se cargó por error.
