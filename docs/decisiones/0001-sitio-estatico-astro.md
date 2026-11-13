# 0001 · Sitio estático con Astro

**Estado:** aceptada · **Fecha:** 12-nov-2026

## Contexto

El grupo acordó como versión mínima viable una web estática sencilla, con costo cero. El repo lo editan cinco personas con niveles técnicos distintos. Los datos de los puntos tienen que validarse antes de publicarse.

## Decisión

- Sitio estático, sin backend ni base de datos.
- [Astro](https://astro.build), en su versión estable vigente, con salida estática.
- Sin React ni Vue. CSS propio con variables, sin Tailwind ni librerías de componentes.
- npm como gestor de paquetes.

## Alternativas consideradas

- **HTML escrito a mano:** sin piezas que instalar, pero cada página repite el encabezado y el pie, y no hay forma de validar los datos.
- **Un framework con React (por ejemplo, Next.js):** es más potente, pero hay mucho más que aprender y el sitio pesa más en el teléfono.
- **Constructores visuales (Google Sites, WordPress):** son fáciles de editar, pero no dan control sobre el mapa ni permiten exigir una fuente a cada dato.

## Consecuencias

- Los archivos `.astro` son casi HTML, así que puede leerlos alguien que sabe poco.
- Las colecciones de contenido de Astro validan los datos contra un esquema, y la compilación falla si a un punto le falta algo.
- El sitio final es una carpeta de archivos (`dist/`) que cualquier hosting estático puede publicar.
- Hace falta Node.js para trabajar en local.
- Lo que necesite un servidor (formularios, cuentas de usuario) queda fuera del alcance.
