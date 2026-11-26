# Datos de los puntos

Esta guía es para quien carga o revisa puntos del mapa. Explica qué datos lleva un punto, qué cuenta como fuente y cómo una fila de la planilla llega al repo.

> **Estado:** el esquema está en `src/content.config.ts` y las listas controladas en `src/lib/datos.mjs`. Si cambia algo, se actualizan este archivo y el código en el mismo pull request.

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
| `verificacion.fecha` | Sí | Cuándo se comprobó por última vez | `AAAA-MM-DD` (por ejemplo `2026-11-16`; `16/11/2026` no sirve), sin fechas futuras |
| `verificacion.delegacion` | Sí | Qué delegación lo comprobó | Ver [delegaciones](#delegaciones) |
| `ejemplo` | Sí | Si es un dato de ejemplo para la demo | `true` o `false` |

Si un archivo trae un campo que no está en esta tabla, por ejemplo `horarios` en vez de `horario`, la compilación se detiene y dice cuál sobra.

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
  fecha: 2026-11-16
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

Las cinco delegaciones del grupo, con los nombres oficiales del curso. En `verificacion.delegacion` va el valor; en el sitio se muestra el nombre. Nunca va el nombre de una persona.

| Valor | Delegación |
|---|---|
| `coordinacion-general` | Coordinación general |
| `diseno-y-evaluacion` | Diseño y evaluación |
| `economia-y-feria` | Economía y feria |
| `vinculacion-y-autorizaciones` | Vinculación y autorizaciones |
| `operaciones-y-recursos` | Operaciones y recursos |

## Datos de ejemplo y modo real

- En la demo, los puntos con `ejemplo: true` se muestran con una marca visible de **EJEMPLO**, y todo el sitio lleva un aviso de demostración.
- El modo del sitio (`demo` o `real`) está en `src/data/sitio.json`. En modo `real`, `npm run verificar` falla si queda algún punto con `ejemplo: true`. Si el modo dice otra cosa (por ejemplo `Demo`), la compilación se detiene.
- La compilación (`npm run build`) parte siempre sin caché, así que el error aparece aunque solo cambies el modo. Antes de abrir un PR, usa igual `npm run verificar`, que además revisa el repo y corre las pruebas.

## El campus en el mapa

El centro del Campus Guayacán está en `src/data/campus.json`, con coordenadas leídas en [OpenStreetMap](https://www.openstreetmap.org/way/92022614) el 16-nov-2026. Sirve para centrar el mapa. No es la ubicación de ningún punto.

## Orígenes de QR

Cada QR va pegado en una ubicación física y tiene su propia ruta, para saber desde dónde llega la gente sin pedir datos personales (ver [decisión 0005](decisiones/0005-medicion.md)).

Los orígenes están en `src/data/origenes-qr.json`. Cada uno se publica en `/q/<id>/` y lleva de inmediato a su destino, con el origen anotado en la dirección: `/q/contenedor/` lleva a `/?origen=contenedor`.

| Campo | Qué va |
|---|---|
| `id` | Identificador que va impreso en el QR. Minúsculas, números y guiones. **No se cambia después de imprimir el QR** |
| `lugar` | Dónde está pegado el QR. Es para el grupo: no se muestra en el sitio |
| `destino` | Página del sitio a la que lleva, terminada en `/`, por ejemplo `/` o `/que-reciclar/` |
| `ejemplo` | `true` si es un origen de ejemplo para la demo |

- Si un destino no es una página del sitio, la compilación falla. Un QR impreso no se puede corregir.
- Si un origen trae un campo que no está en esta tabla, la compilación se detiene.
- En modo real, la verificación falla si queda algún origen con `ejemplo: true`.
- `[PENDIENTE]` Dónde irán los QR. Los QR se generan en la Fase 3, cuando la URL final esté fija.

## Métricas

Las cifras del proyecto, como los kilos recolectados, van en `src/data/metricas.json`. Se muestran en la portada, en la sección "El proyecto en cifras".

**Mientras el archivo esté vacío (`[]`), la sección no aparece en el sitio.** Al compilar, la terminal avisa `No items found in ./src/data/metricas.json`: es normal.

| Campo | Obligatorio | Qué va |
|---|---|---|
| `id` | Sí | Identificador único. Minúsculas, números y guiones |
| `nombre` | Sí | Qué se mide, en pocas palabras |
| `valor` | Sí | La cifra, como número: `12.5`, no `"12,5 kg"` |
| `unidad` | Sí | Unidad de la cifra, por ejemplo `kg` |
| `periodo` | Sí | A qué fechas corresponde, tal como lo dice la fuente |
| `fuente` | Sí | Igual que en los puntos: `tipo`, `detalle` y, si existe, `enlace` |
| `verificacion` | Sí | Igual que en los puntos: `fecha` y `delegacion` |

- **No hay métricas de ejemplo.** Una cifra sin fuente no se escribe (ver la [guía de estilo](GUIA_DE_ESTILO.md)). Si un archivo trae `ejemplo`, la compilación se detiene.
- La cifra se muestra como se lee en Chile: `1234.5` aparece como `1.234,5`.
- Se muestra a lo más un decimal. Si la fuente dice `1234.56`, en el sitio aparece redondeada: `1.234,6`.
- Si un archivo trae un campo que no está en esta tabla, la compilación se detiene.
- `[PENDIENTE]` Qué cifras se publican. Las define Operaciones y recursos, y cada cifra se publica solo con su fuente citada (ver la [decisión 0008](decisiones/0008-operaciones-decide.md)). Sin fuente, queda `[PENDIENTE]`.

### Ejemplo de archivo con una métrica

Los valores son ilustrativos y no describen una cifra real. Si lo copias, cambia el `id`: con `nombre-de-la-metrica`, la compilación se detiene, para que el ejemplo no llegue al sitio por error.

```json
[
  {
    "id": "nombre-de-la-metrica",
    "nombre": "Qué se mide",
    "valor": 0,
    "unidad": "kg",
    "periodo": "Fechas a las que corresponde la cifra",
    "fuente": { "tipo": "documento", "detalle": "Título del documento y quién lo emite" },
    "verificacion": { "fecha": "2026-11-16", "delegacion": "operaciones-y-recursos" }
  }
]
```

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
