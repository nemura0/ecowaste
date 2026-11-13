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

`[PENDIENTE]` Se definen en la Fase 1, cuando el grupo elija una dirección visual (o confirme si hay logo y colores). Van a vivir en un solo archivo, `src/styles/variables.css`, y el resto del sitio solo usa esas variables: no se escriben colores ni tamaños sueltos.
