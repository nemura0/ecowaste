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
- **EJEMPLO** marca los datos de ejemplo de la demo.
- El **aviso de demostración** aparece en todas las páginas mientras el sitio esté en modo demo.
- El **pie de página** dice que es un proyecto estudiantil del ramo Ecología Integral y que no es un servicio oficial de la universidad.

## Reglas visuales

La referencia es un diseño tipo Canva: **plano, amable y claro**.

**Sí:**

- Pensar primero en el teléfono: una columna, botones grandes y texto legible sin hacer zoom.
- Pocos colores, usados con intención. Un color para cada estado de un punto (propuesto, activo, inactivo), siempre acompañado de texto.
- Íconos simples en SVG, con texto al lado.
- Contraste AA como mínimo, y foco visible al navegar con teclado.
- Páginas livianas: sin imágenes pesadas ni fuentes descargadas que no hagan falta.

**No:**

- Degradados morados o azules, efecto vidrio, brillos.
- Emojis como íconos.
- La portada genérica con eslogan y dos botones.
- Tarjetas idénticas con sombra suave por todos lados.
- Todo centrado.
- El logo o la marca de la universidad.

## Variables de diseño

El grupo no tiene logo ni colores propios, así que el 16-nov-2026 se eligió la **dirección A, "Etiqueta de contenedor"**. Se inspira en los adhesivos de los contenedores de reciclaje: verde profundo, amarillo de señalética, tinta oscura y bordes marcados. Si el grupo define después un logo o colores, se cambian aquí.

Todo vive en un solo archivo, `src/styles/variables.css`. El resto del sitio solo usa esas variables: no se escriben colores ni tamaños sueltos.

| Color | Valor | Para qué |
|---|---|---|
| Verde | `#0F5C4A` | Cabecera, enlaces y botones |
| Amarillo | `#F5C518` | Aviso de demostración y marca **EJEMPLO** |
| Tinta | `#18262B` | Texto y bordes |
| Superficie | `#EAF2EE` | Fondos suaves, como el pie de página |

| Estado de un punto | Fondo | Texto |
|---|---|---|
| Propuesto | `#FFF1D6` | `#6B4200` |
| Activo | `#DDF0E4` | `#155A34` |
| Inactivo | `#ECEEEE` | `#3D4747` |

- **Tipografía:** la fuente del sistema del teléfono. No se descarga ninguna fuente.
- **Bordes:** de 2 px en color tinta, con esquinas poco redondeadas (6 px). Nada de sombras.
- **Foco:** contorno de 3 px en tinta; sobre el verde, en amarillo.
