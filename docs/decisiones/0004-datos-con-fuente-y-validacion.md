# 0004 · Datos con fuente y validación automática

**Estado:** aceptada · **Fecha:** 12-nov-2026

## Contexto

El curso exige que el producto responda a una necesidad real, con diagnóstico y evidencia. Un mapa con puntos inventados o desactualizados haría más daño que no tener mapa. Además, los datos los cargan personas distintas a partir de una planilla.

## Decisión

- Cada punto es un archivo versionado en el repo y se valida contra un esquema (ver [DATOS.md](../DATOS.md)).
- La **fuente**, la **fecha de verificación** y la **delegación que verificó** son obligatorias. Si falta alguna, la compilación falla.
- La fuente y la fecha se muestran al usuario en la página de cada punto.
- Los datos de ejemplo llevan una marca y se ven como ejemplo. En modo real, la verificación falla si queda alguno.
- "Verificado por" es una delegación, nunca una persona.

## Alternativas consideradas

- **Leer los puntos directo desde la planilla de Drive:** las otras delegaciones verían sus cambios al instante, pero no habría validación ni historial, y el sitio dependería de que la planilla sea pública.
- **Un solo archivo con todos los puntos:** sería más fácil de exportar, pero dos personas que editan a la vez chocan, y un error de formato rompe todo.

## Consecuencias

- Cargar un punto toma un pull request. Es más lento, pero cada dato queda revisado y con historial.
- Alguien de Operaciones tiene que pasar las filas de la planilla al repo (rol "Datos de los puntos").
- El mapa gana credibilidad: cada punto dice de dónde salió y cuándo se comprobó.
