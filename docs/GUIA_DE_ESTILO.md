# Guía de estilo

Esta guía es para quien escribe textos del sitio o toca su diseño.

## Idioma y tono

- **Español de Chile, con "tú".** Nunca voseo: "puedes", "revisa", "lleva", no "podés", "revisá", "llevá".
- **Frases cortas que dicen dónde, qué y cuándo.** Un dato por frase.
- **Amable y directo.** Habla como un compañero que explica, no como una campaña publicitaria.
- **Sin cifras ni testimonios inventados.** Toda cifra lleva su fuente. Si no la hay, no se escribe.
- **Sin textos de marketing vacíos** del tipo "revolución verde", "transforma el planeta" o "únete al cambio".

| Bien | Mal |
|---|---|
| Puedes dejar cargadores y cables en el contenedor. | ¡Súmate a la revolución del reciclaje electrónico! |
| El horario aún no está confirmado. | Abierto siempre para ti. |
| Dato verificado por Operaciones y recursos el 20-nov-2026. | Información 100% confiable. |

## Palabras

| Usa | En vez de |
|---|---|
| residuos electrónicos | e-waste, RAEE (salvo que se explique) |
| punto de reciclaje | punto verde, ecopunto (salvo que sea su nombre propio) |
| contenedor | eco-box, tacho |
| Operaciones y recursos | Informática, el nombre de una carrera |

## Marcas que se ven en el sitio

- `[PENDIENTE]` marca lo que falta decidir o averiguar. Nunca se presenta como hecho.
  En los textos de `src/content/paginas/`, lo pendiente va en una línea que empieza con `> [PENDIENTE]`, y en el sitio se ve como un recuadro punteado.
- **EJEMPLO** marca los datos de ejemplo de la demo.
- El **aviso de demostración** aparece en todas las páginas mientras el sitio esté en modo demo.
- El **pie de página** dice que es un proyecto estudiantil del ramo Ecología Integral y que no es un servicio oficial de la universidad.

## Reglas visuales

La dirección es **"Cuaderno de campo"**: papel punteado, letra liviana, paneles pastel, dibujos a tinta y anotaciones a lápiz. Debe verse hecho a mano y tranquilo, no como plantilla. Ver la [decisión 0007](decisiones/0007-direccion-cuaderno-de-campo.md).

**Sí:**

- Pensar primero en el teléfono: una columna, botones grandes y texto legible sin hacer zoom.
- Pocos colores y apagados. Un panel pastel para cada estado de un punto (propuesto, activo, inactivo), siempre con la palabra escrita.
- Dibujos a tinta en SVG para los residuos: trazo irregular y un color plano corrido detrás. Siempre con su nombre al lado o debajo.
- Anotaciones a lápiz (fuente a mano) solo para detalles chicos: la marca **EJEMPLO**, nombres en el mapa, la fecha de revisión. Nunca para texto que haya que leer con cuidado.
- Títulos grandes en peso normal, con poco espacio entre letras.
- Movimiento solo donde explica algo: el trazo que encierra el residuo elegido y las ondas del mapa. Todo se detiene si el teléfono pide menos movimiento.
- Contraste AA como mínimo, y foco visible al navegar con teclado.
- Páginas livianas: sin fotos ni imágenes pesadas.

**No:**

- Degradados, efecto vidrio, brillos ni sombras.
- Letra gruesa y pesada en los títulos, o colores saturados.
- Cajas con borde grueso, pastillas de colores por todos lados o tarjetas idénticas con sombra.
- Fondos con confeti o texturas de colores que distraigan.
- Emojis como íconos.
- La portada genérica con eslogan y dos botones.
- Todo centrado.
- El logo o la marca de la universidad.

## Variables de diseño

Operaciones y recursos eligió la dirección "Cuaderno de campo" el 26-nov-2026. Reemplaza a la dirección A, "Etiqueta de contenedor". Si el grupo define después un logo o colores propios, se cambian aquí.

Todo vive en un solo archivo, `src/styles/variables.css`. El resto del sitio solo usa esas variables: no se escriben colores ni tamaños sueltos.

| Color | Valor | Para qué |
|---|---|---|
| Papel | `#FAFAF6` | Fondo de todas las páginas |
| Tinta | `#1F2421` | Texto, trazos de los dibujos y botón principal |
| Tinta suave | `#5F6762` | Textos secundarios |
| Verde | `#2F6B4F` | Enlaces y ondas del mapa |
| Lápiz | `#9A5B45` | Anotaciones a mano y trazo que encierra lo elegido |
| Agua | `#DFF0EE` | Cabecera punteada y recuadro de la fuente |
| Puntos | `#C8D2CC` | Puntos del papel y líneas suaves |

| Estado de un punto | Panel | Texto |
|---|---|---|
| Propuesto | Mantequilla `#F3EFC8` | Tinta |
| Activo | Salvia `#DFE9DA` | Tinta |
| Inactivo | Niebla `#ECEBE6` | Tinta |

El aviso de demostración usa el mismo color mantequilla.

- **Tipografía:** dos fuentes, alojadas en el mismo sitio (no se cargan desde Google) y solo con los caracteres del español. **Geist** para todo el texto, en peso normal (400) y medio (500). **Caveat** solo para las anotaciones a lápiz.
- **Bordes:** casi no hay. Los paneles se separan por color, con esquinas redondeadas (18 px). Lo pendiente lleva borde punteado.
- **Foco:** contorno punteado de 2 px en tinta.
- **Dibujos:** viven en `src/components/Dibujo.astro`. Para un residuo nuevo, se agrega su dibujo ahí.
