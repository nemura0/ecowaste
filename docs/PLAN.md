# Plan de trabajo

## Cómo retomar

Abre Claude Code en la carpeta del repo y escribe:

> Lee `CLAUDE.md` y `docs/PLAN.md` y sigue con la fase que corresponde.

Si trabajas sin Claude Code, revisa la sección "Estado actual" y las [issues abiertas](https://github.com/nemura0/ecowaste/issues).

## Estado actual

**Fase 0 · Base y documentación, en curso** (actualizado el 12-nov-2026).

- [ ] PR de documentación: `CLAUDE.md`, `README.md`, `docs/`, plantillas de `.github/` y skills del proyecto.
- [ ] PR de base técnica: Astro mínimo, scripts `dev`, `build` y `verificar`, `.nvmrc` y verificación automática en cada pull request.
- [ ] Repo conectado a Vercel.
- [ ] Vista previa probada en tres casos: un PR del encargado, uno de otro colaborador y un commit con coautoría de un agente.
- [ ] Skills de terceros propuestas y decididas.
- [ ] Issues de la Fase 1 creadas.

## Fases

Antes de cada fase se presenta un plan corto con los pull requests que se van a abrir, y se espera el visto bueno. Al terminar una fase, se detiene el trabajo.

| Fase | Qué sale | Está hecha cuando |
|---|---|---|
| 0 · Base y documentación | Documentos, skills, Astro mínimo y vista previa en Vercel | Los dos PR están mergeados, la vista previa funciona y cualquiera del grupo entiende el repo leyendo [EMPEZAR_AQUI.md](EMPEZAR_AQUI.md) |
| 1 · Demo | Sitio de demostración con datos de ejemplo rotulados, centrado en el campus | Se abre en un teléfono con datos móviles, pasa la verificación y hay un enlace para compartir. **Aquí se detiene el trabajo hasta registrar abajo lo que opinó el grupo** |
| 2 · Datos y contenido reales | Puntos con fuente, textos de otras delegaciones y paso a modo real | No queda ningún dato de ejemplo |
| 3 · Medición | La herramienta que acuerde el grupo, rutas de QR y QR generados | El grupo decidió la herramienta y la URL final está fija |
| 4 · Puesta en uso y evidencias | Sitio difundido, pruebas en teléfonos y evidencias de uso | Hay autorización o visto bueno confirmado, y las evidencias quedan guardadas |

La Fase 3 va antes que la 4 porque, si el sitio se difunde sin medición, no queda evidencia de uso.

## Calendario

`[SUPUESTO]` Las diapositivas del curso hablan de semanas sin fecha. Se suponen clases los jueves:

| Hito | Fecha supuesta |
|---|---|
| Presentación del plan de ejecución (conviene llevar la demo) | 19-nov |
| Ejecución | Semana del 26-nov o del 3-dic |
| Presentación final | 3 o 10-dic |

## Pendientes

Nada de esta lista se decide por cuenta propia. Se marca `[PENDIENTE]` donde corresponda y se pregunta.

| Tema | Qué falta | Con quién |
|---|---|---|
| Fechas | Confirmar las fechas de cada semana y la fecha límite | Profesor |
| Identidad visual | Saber si hay logo o colores | Grupo |
| Contenedor | Ubicación, autorización, qué residuos acepta y quién los retira | Delegaciones a cargo del contenedor |
| Autorización de la web | Saber si la universidad exige alguna antes de difundir | Profesor |
| Puntos reales | Puntos y sus fuentes | Datos de los puntos y otras delegaciones |
| Contenido | Quién escribe "qué reciclar" y quién entrega los kilos recolectados | Otras delegaciones |
| Medición | Herramienta e indicadores | Diseño y evaluación |
| URL final | Nombre del sitio. Tiene que quedar fijo antes de imprimir cualquier QR | Operaciones |
| Roles | Titular y suplente de cada rol | Operaciones |
| Encuestas | Instrumento para usuarios | Otras delegaciones |
| Usuarios de GitHub | Si pueden aparecer en `ROLES.md` y `CODEOWNERS` | Operaciones |
| Licencia | Licencia del repo | Grupo |
| Delegaciones | Nombres oficiales de las cinco delegaciones (para los datos) | Grupo |
| Residuos | Validar la lista controlada de [DATOS.md](DATOS.md) | Quien escriba "qué reciclar" |

## Riesgos conocidos

- **Vercel y los cambios de otras personas.** La guía de Vercel dice que, en el plan gratuito, solo el dueño de la cuenta puede disparar despliegues. Se prueba en la Fase 0. Si falla, se replantea el hosting (ver [decisión 0003](decisiones/0003-hosting-vercel.md)).
- **Coautoría de agentes en los commits.** Hay reportes de despliegues bloqueados por eso en el plan gratuito de Vercel. Se prueba en la Fase 0.
- **Teselas de OpenStreetMap.** Es un servicio público sin garantía de disponibilidad. Por eso el mapa lleva siempre una lista equivalente.
- **QR impresos.** No se pueden corregir. Se generan solo cuando la URL final esté fija.
- **Analítica.** Si se usa la de Vercel en el plan gratuito, guarda un mes de historial, así que las cifras hay que exportarlas antes.

## Acuerdos de la demo

`[PENDIENTE]` Esta sección la completa el encargado del repo después de mostrar la demo al grupo. Hasta que esté escrita, no se empieza la Fase 2.

## Registro

| Fecha | Qué pasó |
|---|---|
| 12-nov-2026 | Se revisa el estado del repo y se aprueba el plan de la Fase 0 |
