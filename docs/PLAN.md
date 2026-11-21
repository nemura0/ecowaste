# Plan de trabajo

## Cómo retomar

Abre Claude Code en la carpeta del repo y escribe:

> Lee `CLAUDE.md` y `docs/PLAN.md` y sigue con la fase que corresponde.

Si trabajas sin Claude Code, revisa la sección "Estado actual" y el [tablero del proyecto](https://github.com/users/nemura0/projects/1), que es público. El avance de cada fase está en los [hitos](https://github.com/nemura0/ecowaste/milestones).

## Estado actual

**Fase 0 · Base y documentación, cerrada. Fase 1 · Demo, en curso** (actualizado el 19-nov-2026).

### Fase 1 · Demo

- [x] Aviso de demostración y pie de página en todo el sitio (#5).
- [x] Esquema de datos de los puntos, con validación y modo real (#6).
- [x] Coordenadas del campus desde OpenStreetMap, con su fuente (#7).
- [x] Contenedor de ejemplo como "propuesto" (#8).
- [x] Portada, mapa con Leaflet y lista equivalente sin JavaScript (#9, #10 y #12).
- [x] Ficha de cada punto (#11).
- [x] Páginas "Qué reciclar" (solo estructura) y "Acerca del proyecto" (#13 y #14).
- [x] Rutas de entrada por QR, solo estructura (#15).
- [x] Sección de métricas oculta mientras no haya cifras con fuente (#16).
- [ ] Revisar los textos de la demo con la guía de estilo (#19).
- [ ] Probar la demo en un teléfono con datos móviles (#18).
- [ ] Preguntas para el grupo sobre la demo (#17).
- [ ] Confirmar la dirección visual con el grupo (#4).

### Fase 0 · Base y documentación

- [x] PR de documentación: `CLAUDE.md`, `README.md`, `docs/`, plantillas de `.github/` y skills del proyecto.
- [x] PR de base técnica: Astro mínimo, scripts `dev`, `build` y `verificar`, `.nvmrc` y verificación automática en cada pull request.
- [x] Repo conectado a Vercel (https://ecowaste-seven.vercel.app/, URL provisoria).
- [x] Vista previa con un PR del encargado.
- [x] Vista previa con un PR de otro colaborador: Vercel la generó en el PR del mapa (#23).
- [x] Coautoría de agentes: no se prueba en el proyecto real por riesgo de bloqueo permanente; se desactiva en `.claude/settings.json`.
- [x] Skills de terceros decididas: `frontend-design` incluida; `web-design-guidelines` se instala aparte.
- [x] Issues de la Fase 1 creadas (hito "Fase 1 · Demo").

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

Cada fila tiene su issue en el tablero. Cuando llega la respuesta a un pendiente, se anota en su issue: fecha, qué se decidió y qué delegación o cargo lo decidió, nunca un nombre. El PR que aplica la respuesta lleva `Closes #número` en la descripción, para que la issue se cierre sola al mergear, y no toca este archivo. En la revisión del jueves se borra la fila y la respuesta pasa al Registro (ver [COMO_APORTAR.md](COMO_APORTAR.md)).

| Tema | Qué falta | Con quién | Issue |
|---|---|---|---|
| Fechas | Confirmar las fechas de cada semana y la fecha límite | Profesor | #31 |
| Identidad visual | Confirmar la dirección visual A, que eligió el encargado del repo, o elegir otra | Grupo | #4 |
| Contenedor | Ubicación, autorización, qué residuos acepta y quién los retira | Delegaciones a cargo del contenedor | #32 |
| Autorización de la web | Saber si la universidad exige alguna antes de difundir | Profesor | #33 |
| Puntos reales | Puntos y sus fuentes | Datos de los puntos y otras delegaciones | #34 |
| Contenido | Quién escribe "qué reciclar" y quién entrega los kilos recolectados | Otras delegaciones | #35 |
| Medición | Herramienta e indicadores | Diseño y evaluación | #36 |
| URL final | Nombre del sitio. Tiene que quedar fijo antes de imprimir cualquier QR | Operaciones | #37 |
| QR | Dónde va cada QR (un origen por lugar físico, ver [DATOS.md](DATOS.md)) | Grupo | #44 |
| Roles | Titular y suplente de cada rol | Operaciones | #38 |
| Encuestas | Instrumento para usuarios | Otras delegaciones | #39 |
| Usuarios de GitHub | Si pueden aparecer en `ROLES.md` y `CODEOWNERS` | Operaciones | #40 |
| Delegaciones | Nombres oficiales de las cinco delegaciones (para los datos) | Grupo | #42 |
| Residuos | Validar la lista controlada de [DATOS.md](DATOS.md) | Quien escriba "qué reciclar" | #43 |

## Riesgos conocidos

- **Vercel y los cambios de otras personas.** La guía de Vercel dice que, en el plan gratuito, solo el dueño de la cuenta puede disparar despliegues. Se probó el 16-nov-2026 con el PR del mapa (#23), de otro colaborador, y la vista previa se generó sin problemas. Si vuelve a fallar, se replantea el hosting (ver [decisión 0003](decisiones/0003-hosting-vercel.md)).
- **Coautoría de agentes en los commits.** Hay reportes de despliegues bloqueados por eso en el plan gratuito de Vercel. No se prueba en el proyecto real: `.claude/settings.json` la desactiva para quien use Claude Code (ver [COMO_APORTAR.md](COMO_APORTAR.md)).
- **Teselas de OpenStreetMap.** Es un servicio público sin garantía de disponibilidad. Por eso el mapa lleva siempre una lista equivalente.
- **QR impresos.** No se pueden corregir. Se generan solo cuando la URL final esté fija.
- **Analítica.** Si se usa la de Vercel en el plan gratuito, guarda un mes de historial, así que las cifras hay que exportarlas antes.

## Acuerdos de la demo

`[PENDIENTE]` Esta sección la completa el encargado del repo después de mostrar la demo al grupo. Hasta que esté escrita, no se empieza la Fase 2.

## Registro

| Fecha | Qué pasó |
|---|---|
| 12-nov-2026 | Se revisa el estado del repo y se aprueba el plan de la Fase 0 |
| 16-nov-2026 | Se mergean los PR de documentación y base técnica. Se conecta Vercel (plan gratuito, aceptado por el grupo mientras tanto) |
| 16-nov-2026 | Se decide no probar la coautoría de agentes en Vercel y desactivarla. Empieza la Fase 1 sin esperar el caso 2. No hay logo ni colores del grupo, así que el encargado del repo elige la dirección visual A mientras el grupo la confirma |
| 16-nov-2026 | Se implementa el mapa con Leaflet centrado en el campus y la lista equivalente accesible sin JavaScript (PR #23) |
| 16-nov-2026 | Se agrega la ficha de cada punto en `/puntos/<id>/`, con estado, residuos, fuente, fecha y delegación que verificó. La lista y el popup del mapa enlazan a ella (issue #11) |
| 17-nov-2026 | Se cierra la Fase 0: queda registrado que Vercel generó la vista previa del PR #23, de otro colaborador (PR #24) |
| 17-nov-2026 | Se agregan las páginas "Qué reciclar" (solo estructura, con `[PENDIENTE]`) y "Acerca del proyecto", y un menú en la cabecera. Los textos de las páginas viven en `src/content/paginas/` (PR #25 y #26) |
| 17-nov-2026 | Se agregan las rutas de entrada por QR en `/q/<id>/`, con un origen de ejemplo. Dónde irán los QR está pendiente; se generan en la Fase 3 (PR #28) |
| 18-nov-2026 | Se agrega la sección "El proyecto en cifras" en la portada. Las cifras van en `src/data/metricas.json`, con fuente, fecha y delegación, y no pueden ser de ejemplo. Mientras el archivo esté vacío, la sección no aparece. Qué cifras se publican está pendiente (PR #30) |
| 19-nov-2026 | Se ordenan las etiquetas (todas en español, con colores por tipo y área), las fases pasan a hitos de GitHub, se crea una issue por cada pendiente y se arma un tablero público en GitHub Projects, donde las tarjetas se mueven solas al enlazar y mergear un PR (PR #45) |
| 20-nov-2026 | El grupo elige la licencia: MIT para el código y CC BY 4.0 para textos y datos (`docs/`, `src/content/` y `src/data/`). Se agregan `LICENSE`, `LICENSE-CONTENIDO` y la [decisión 0006](decisiones/0006-licencia.md). Sale de pendientes (issue #41) |
