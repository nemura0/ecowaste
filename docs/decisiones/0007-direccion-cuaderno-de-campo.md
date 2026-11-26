# 0007 · Dirección visual "Cuaderno de campo"

**Estado:** decidida · **Fecha:** 26-nov-2026

## Contexto

La dirección A, "Etiqueta de contenedor", se veía genérica: colores intensos, cajas con borde grueso y la fuente del sistema. Costaba usarla y no tenía identidad propia. Había que confirmarla con el grupo (issue #4), pero no queda tiempo para esperar.

## Qué se probó

Se armaron tres maquetas. Se buscaron referencias en Dribbble con la búsqueda "eco", mirando textos, recuadros, dibujos, fuentes y colores. De ahí salieron cuatro ideas:

- Fondo de papel punteado, como un cuaderno.
- Letra sans liviana en títulos grandes, en vez de letra gruesa.
- Paneles pastel sin borde, en vez de tarjetas con sombra.
- Dibujos a tinta con trazo irregular y anotaciones a mano.

Se descartó una cabecera con textura de terrazo porque parecía de fiesta.

## Decisión

Operaciones y recursos elige la dirección **"Cuaderno de campo"**. Reemplaza a la dirección A. El grupo queda informado; si define después un logo o colores propios, se cambian en la [guía de estilo](../GUIA_DE_ESTILO.md).

- Colores apagados: papel, tinta, verde, lápiz y agua, más un panel pastel por estado (propuesto, activo, inactivo).
- Dos fuentes alojadas en el mismo sitio: Geist para el texto y Caveat para las anotaciones a mano. Solo se incluyen los caracteres del español, para que pesen poco.
- Dibujos a tinta en SVG para cada tipo de residuo.
- En la portada, eliges un residuo, se encierra con un trazo a mano y el mapa marca sus puntos con ondas. Sin JavaScript, cada residuo lleva a su sección en "Qué reciclar".
- Todo el movimiento se detiene si el teléfono pide menos movimiento.

## Consecuencias

- Se agregan dos dependencias de fuentes por npm (`@fontsource/geist` y `@fontsource/caveat`). Cambia la regla de "no se descarga ninguna fuente".
- La propuesta de dirección A que estaba abierta queda reemplazada.
- El cambio se hace en varios pull requests: primero esta documentación, después la base visual, la portada con el mapa y, al final, la ficha del punto y "Qué reciclar".
