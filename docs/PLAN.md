# Plan de trabajo

## Cómo retomar

Abre Claude Code en la carpeta del repo y escribe:

> Lee `CLAUDE.md` y `docs/PLAN.md` y sigue con la fase que corresponde.

Si trabajas sin Claude Code, revisa la sección "Estado actual" y el [tablero del proyecto](https://github.com/users/nemura0/projects/1), que es público. El avance de cada fase está en los [hitos](https://github.com/nemura0/ecowaste/milestones).

## Estado actual

**Fase 1 · Demo, cerrada. Fase 2 · Producto final, en curso** (actualizado el 26-nov-2026).

Desde el 26-nov-2026, Operaciones y recursos decide por su cuenta y no espera al resto del grupo ([decisión 0008](decisiones/0008-operaciones-decide.md)).

### Fase 2 · Producto final (hasta el 3-dic)

- [x] Dirección visual "Cuaderno de campo" en todo el sitio: portada, lista, mapa, ficha y "Qué reciclar" (PR #55, #56, #57 y #58).
- [x] URL final fija: https://ecowaste-seven.vercel.app (PR #54, issue #37).
- [ ] Puntos reales con fuente, buscados y verificados por Operaciones (#34). Ya está el primero: Punto Limpio El Culebrón (PR #60).
- [ ] Contenedor del proyecto: ubicación, retiro y conseguir la autorización de quien corresponda (#32).
- [ ] Textos de "Qué reciclar" con fuente (#35). Ya están el porqué y la definición de cada residuo (PR #61). Falta qué entra y qué no en cada residuo.
- [ ] Lista de residuos revisada (#43).
- [ ] Paso a modo real, si ya no queda ningún dato de ejemplo.
- [ ] Prueba en un teléfono con datos móviles (#18).

### Fase 3 · Entrega (hasta el 10-dic)

- [ ] Ajustes según lo que salga de la presentación del 3-dic.
- [ ] Confirmar con el profesor si hace falta autorización antes de difundir el sitio. Sin respuesta registrada en la issue, no se difunde (#33).
- [ ] Revisión completa con `revisar-antes-de-publicar`.
- [ ] Registro de este plan al día, como insumo para la bitácora.

### Si alcanza

- [ ] Medición: herramienta e indicadores (#36).
- [ ] Encuestas para usuarios (#39).
- [ ] QR: dónde va cada uno (#44). Solo con la URL final fija.

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
- [x] Revisar los textos de la demo con la guía de estilo (#19).
- [x] Dirección visual: Operaciones eligió "Cuaderno de campo" (#4, PR #55).
- La prueba en teléfono (#18) pasa a la Fase 2. Las preguntas al grupo (#17) se cierran: ya no se espera su opinión.

### Fase 0 · Base y documentación

- [x] PR de documentación: `CLAUDE.md`, `README.md`, `docs/`, plantillas de `.github/` y skills del proyecto.
- [x] PR de base técnica: Astro mínimo, scripts `dev`, `build` y `verificar`, `.nvmrc` y verificación automática en cada pull request.
- [x] Repo conectado a Vercel (https://ecowaste-seven.vercel.app/).
- [x] Vista previa con un PR del encargado.
- [x] Vista previa con un PR de otro colaborador: Vercel la generó en el PR del mapa (#23).
- [x] Coautoría de agentes: no se prueba en el proyecto real por riesgo de bloqueo permanente; se desactiva en `.claude/settings.json`.
- [x] Skills de terceros decididas: `frontend-design` incluida; `web-design-guidelines` se instala aparte.
- [x] Issues de la Fase 1 creadas (hito "Fase 1 · Demo").

## Fases

Antes de cada fase se presenta un plan corto con los pull requests que se van a abrir, y se espera el visto bueno de Operaciones. Al terminar una fase, se detiene el trabajo.

| Fase | Qué sale | Está hecha cuando |
|---|---|---|
| 0 · Base y documentación | Documentos, skills, Astro mínimo y vista previa en Vercel | Cerrada el 17-nov-2026 |
| 1 · Demo | Sitio de demostración con datos de ejemplo rotulados, centrado en el campus | Cerrada el 26-nov-2026 |
| 2 · Producto final | Dirección visual aplicada, puntos reales con fuente, textos de "Qué reciclar" y modo real | Se presenta el 3-dic-2026 y pasa la verificación |
| 3 · Entrega | Ajustes de la presentación, decisión de difusión y revisión final | Se entrega el 10-dic-2026 |
| Si alcanza | Medición, encuestas y QR | No bloquea la entrega |

Cada fase tiene su [hito](https://github.com/nemura0/ecowaste/milestones) con fecha límite.

## Calendario

Lo informó el profesor en la clase del 26-nov-2026 (issue #31). La evidencia (diapositiva o mensaje) se guarda en la issue #31.

| Fecha | Qué pasa |
|---|---|
| 26-nov-2026 | Reformulación del proyecto |
| 3-dic-2026 | Finalización y presentación del producto |
| 10-dic-2026 | Entrega del producto, con bitácora y presentación |

La bitácora no va en el repo: la lleva otro encargado del grupo. El Registro de abajo le sirve de insumo.

## Pendientes

Los decide Operaciones y recursos, salvo lo que el profesor o la institución deben confirmar (autorizaciones y difusión). Mientras no estén resueltos, se marcan `[PENDIENTE]` en el sitio.

Cada fila tiene su issue en el tablero. Cuando se decide, se anota en la issue: fecha y qué se decidió, siempre como "Operaciones y recursos", nunca con un nombre. El PR que aplica la decisión lleva `Closes #número` en la descripción. Al poner el plan al día, se borra la fila y la decisión pasa al Registro.

| Tema | Qué falta | Issue |
|---|---|---|
| Puntos reales | Buscar puntos con fuente pública y verificarlos | #34 |
| Contenedor | Ubicación, qué residuos acepta, quién los retira y conseguir la autorización de quien corresponda | #32 |
| Contenido | Escribir qué entra y qué no en cada residuo de "Qué reciclar", con fuente, y conseguir los kilos recolectados | #35 |
| Residuos | Revisar la lista controlada de [DATOS.md](DATOS.md) | #43 |
| Difusión | Confirmar con el profesor si hace falta autorización. Sin respuesta registrada, no se difunde | #33 |
| Medición | Herramienta e indicadores (si alcanza) | #36 |
| Encuestas | Instrumento para usuarios (si alcanza) | #39 |
| QR | Dónde va cada QR (si alcanza; un origen por lugar físico, ver [DATOS.md](DATOS.md)) | #44 |

## Riesgos conocidos

- **Vercel y los cambios de otras personas.** La guía de Vercel dice que, en el plan gratuito, solo el dueño de la cuenta puede disparar despliegues. Se probó el 16-nov-2026 con el PR del mapa (#23), de otro colaborador, y la vista previa se generó sin problemas. Si vuelve a fallar, se replantea el hosting (ver [decisión 0003](decisiones/0003-hosting-vercel.md)).
- **Coautoría de agentes en los commits.** Hay reportes de despliegues bloqueados por eso en el plan gratuito de Vercel. No se prueba en el proyecto real: `.claude/settings.json` la desactiva para quien use Claude Code (ver [COMO_APORTAR.md](COMO_APORTAR.md)).
- **Teselas de OpenStreetMap.** Es un servicio público sin garantía de disponibilidad. Por eso el mapa lleva siempre una lista equivalente.
- **QR impresos.** No se pueden corregir. Se generan solo cuando la URL final esté fija.
- **Analítica.** Si se usa la de Vercel en el plan gratuito, guarda un mes de historial, así que las cifras hay que exportarlas antes.

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
| 24-nov-2026 | Operaciones y recursos decide que la URL de Vercel quede como URL final: https://ecowaste-seven.vercel.app (issue #37). Entra a `main` el 26-nov-2026 (PR #54) |
| 26-nov-2026 | Operaciones y recursos elige la dirección visual "Cuaderno de campo". Reemplaza a la dirección A (PR #53, cerrado). Entran a `main` la decisión y la base visual (PR #55 y #56) y su aplicación a la portada, la lista, el mapa, la ficha y "Qué reciclar" (PR #57 y #58) |
| 26-nov-2026 | El profesor informa el calendario final: 3-dic presentación del producto, 10-dic entrega con bitácora y presentación (issue #31). Operaciones y recursos pasa a decidir por su cuenta, sin esperar al resto del grupo ([decisión 0008](decisiones/0008-operaciones-decide.md)). Se cierra la Fase 1 y se rehacen las fases y los hitos. Roles y usuarios de GitHub quedan fuera del repo (issues #38 y #40) |
| 26-nov-2026 | Entran a `main` los textos de "Qué reciclar" con fuente: el porqué de separar los residuos y la definición de cada uno, según el Decreto 22 de 2026 y una nota del Ministerio del Medio Ambiente (PR #61). El aviso de demostración ahora dice que solo los puntos marcados EJEMPLO son inventados, y el mapa encuadra todos los puntos (PR #62) |
| 26-nov-2026 | Entra el primer punto real: Punto Limpio El Culebrón, en Coquimbo, verificado por Operaciones y recursos con notas de prensa, un formulario del Ministerio del Medio Ambiente y OpenStreetMap (PR #60) |
