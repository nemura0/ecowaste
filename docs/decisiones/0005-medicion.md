# 0005 · Medición del uso

**Estado:** pendiente · **Fecha:** 12-nov-2026

## Contexto

El curso pide poner el producto en uso y evaluarlo: construirlo no basta. Hay que poder mostrar cuánta gente lo usó y desde dónde llegó. La herramienta y los indicadores se definen con la delegación Diseño y evaluación.

## Lo que ya está decidido

- Las interacciones que se quieren contar son **navegaciones con URL propia**, como abrir el mapa, la página de un punto o "qué reciclar". Así se miden como páginas vistas, sin depender de eventos personalizados.
- **Un QR por ubicación física**, cada uno con su propia ruta. Eso permite saber desde dónde llega la gente sin recoger datos personales.

## Requisitos para la herramienta

- Sin cookies y sin datos personales.
- Costo cero.
- Que cuente visitas únicas y páginas vistas.
- Que registre clics, si el grupo lo exige.
- Que permita exportar las cifras como evidencia.

## Alternativas a evaluar en la Fase 3

- **Vercel Web Analytics:** según su [documentación de precios](https://vercel.com/docs/analytics/limits-and-pricing), el plan gratuito incluye 50.000 eventos al mes, un mes de historial y no incluye eventos personalizados. Habría que exportar las cifras antes de que cumplan un mes.
- Otras herramientas sin cookies y gratuitas, que se comparan en la Fase 3 contra los requisitos.

## Decisión

`[PENDIENTE]` La toma el grupo. Operaciones implementa lo acordado.
