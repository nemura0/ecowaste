# Cómo aportar

Esta guía es para la delegación Operaciones y recursos, que edita el repo y decide por su cuenta lo que toca al sitio ([decisión 0008](decisiones/0008-operaciones-decide.md)). Si no programas, empieza por [EMPEZAR_AQUI.md](EMPEZAR_AQUI.md).

## 1. Antes de empezar (una sola vez)

1. **Protege tu correo.** En GitHub, entra a **Settings → Emails** y activa **"Keep my email addresses private"** y **"Block command line pushes that expose my email"**. En esa misma página aparece tu correo noreply, con la forma `NÚMERO+usuario@users.noreply.github.com`.
2. **Instala** [Git](https://git-scm.com/) y [Node.js](https://nodejs.org/) en su versión LTS. El mínimo es 22.23.4 y la versión de referencia del proyecto está en `.nvmrc`.
3. **Descarga el repo y configura tu correo noreply** solo para este repo:

   ```sh
   git clone https://github.com/nemura0/ecowaste.git
   cd ecowaste
   git config user.email "NÚMERO+usuario@users.noreply.github.com"
   npm install
   ```

4. **Prueba que funciona:** corre `npm run dev` y abre `http://localhost:4321`.

## 2. El ciclo de trabajo

1. **Toma una tarea.** Las tareas se reparten en la revisión del jueves (más abajo). Si terminas la tuya, abre el [tablero](https://github.com/users/nemura0/projects/1), elige una de "Por hacer" sin asignar, comenta "la tomo" y asígnatela. Si tienes poca experiencia, parte por las que tienen la etiqueta `buena-primera-tarea`.
2. **Actualiza tu copia y crea una rama:**

   ```sh
   git switch main
   git pull
   git switch -c docs/corrige-glosario
   ```

   | Prefijo | Para qué |
   |---|---|
   | `feat/` | Algo nuevo en el sitio |
   | `fix/` | Corregir un error |
   | `docs/` | Documentación |
   | `datos/` | Puntos del mapa |
   | `chore/` | Mantención (dependencias, configuración) |

3. **Haz el cambio** y revisa que todo pase: `npm run verificar`.
4. **Revisa qué vas a guardar** y agrega archivo por archivo:

   ```sh
   git status
   git diff
   git add docs/EMPEZAR_AQUI.md
   git commit -m "docs: corrige el glosario"
   ```

   Los mensajes van en español, con el formato `tipo: descripción`.
5. **Sube la rama y abre el pull request:**

   ```sh
   git push -u origin docs/corrige-glosario
   ```

   GitHub te muestra un botón para abrir el pull request. Completa la plantilla: qué cambia, por qué, qué issue cierra y cómo probarlo.
6. **Espera la verificación y la vista previa.** La verificación tiene que quedar en verde. Abre la vista previa en tu teléfono.
7. **Pide revisión** a otra persona de Operaciones cuando se pueda.
8. **Merge.** Cuando la verificación esté en verde, usa **Squash and merge**, con un título que siga el formato `tipo: descripción`. Después borra la rama.

También puedes editar un archivo directamente en la web de GitHub (con el ícono del lápiz). GitHub crea la rama y el pull request por ti. La sección "Práctica" de [EMPEZAR_AQUI.md](EMPEZAR_AQUI.md) muestra cómo.

### El tablero

El [tablero](https://github.com/users/nemura0/projects/1) es público y también está en la pestaña **Projects** del repo. Tiene tres vistas:

- **Tablero:** las tarjetas en columnas, según en qué van.
- **Decisiones:** lo que Operaciones tiene que decidir.
- **Por fase:** las tareas agrupadas por hito, uno por cada fase del [plan](PLAN.md).

| Columna | Qué significa |
|---|---|
| Por hacer | Hay que hacerlo, pero todavía no se acordó para esta semana |
| Esta semana | Lo acordado el jueves. Máximo 3 tarjetas |
| En progreso | Alguien lo está haciendo. Máximo 2 por persona |
| En espera | Espera una respuesta de afuera, por ejemplo de una institución o del profesor |
| En revisión | Hay un PR abierto que la resuelve y espera revisión |
| Hecho | Mergeado o cerrado |

Cada tarjeta puede tener una **fecha límite**: hasta cuándo hay que tenerla, según el plan.

Las issues nuevas entran solas a "Por hacer". Cuando tomas una tarea, mueve su tarjeta a "En progreso". Si te quedas esperando una respuesta de afuera, muévela a "En espera" y anota en la issue qué institución o cargo esperas, sin nombres de personas. La tarjeta pasa sola a "En revisión" cuando abres un PR enlazado a la issue, y a "Hecho" cuando ese PR se mergea o la issue se cierra.

Para enlazar el PR, escribe en su descripción `Closes #número`, con el número de la issue. Tiene que ir en inglés: GitHub no reconoce "Cierra".

### La revisión del jueves

Cada jueves, en unos 10 minutos:

1. Se revisa lo que pasó a "Hecho".
2. Se eligen hasta 3 tarjetas para "Esta semana" y se asignan.
3. Se repasa la vista **Decisiones** y se decide lo que se pueda.
4. Se pone al día el plan en un solo PR: "Estado actual", "Pendientes" y "Registro" de [PLAN.md](PLAN.md). Los PR del resto de la semana no tocan ese archivo; así no chocan entre ellos.
5. Se manda un resumen corto al grupo por WhatsApp, para que quede informado.

### Las etiquetas y los hitos

| Etiqueta | Para qué |
|---|---|
| `problema` | Algo no funciona o un dato está mal |
| `decisión` | Lo decide Operaciones y recursos |
| `web`, `datos`, `contenido`, `docs`, `pruebas`, `accesibilidad` | Qué parte del proyecto toca |
| `buena-primera-tarea` | Sirve para empezar con poca experiencia |

La fase no va como etiqueta: va como [hito](https://github.com/nemura0/ecowaste/milestones) (*milestone*), uno por cada fase del [plan](PLAN.md). Cada hito muestra cuánto falta para cerrar su fase. Lo que no bloquea la entrega va en el hito "Si alcanza".

## 3. Reglas que no se negocian

- Nadie hace commits en `main`; GitHub lo impide de todos modos.
- No se suben claves, archivos `.env`, nombres, correos, teléfonos, la nómina, la ficha ni respuestas de encuestas.
- "Verificado por" es siempre una delegación, nunca una persona.
- Ningún dato se inventa. Lo que no tiene fuente queda como `[PENDIENTE]`.
- No se usa el logo ni la marca de la universidad.
- Nada de force-push ni de historia reescrita.

Las reglas completas están en [CLAUDE.md](../CLAUDE.md). Valen para personas y para Claude Code.

## 4. Si usas Claude Code

- Ábrelo dentro de la carpeta del repo. Lee `CLAUDE.md` solo, al empezar.
- Para retomar, escribe: "Lee `CLAUDE.md` y `docs/PLAN.md` y sigue con la fase que corresponde."
- Claude Code crea ramas y abre pull requests, pero el merge lo hace una persona.
- Las skills del proyecto están en `.claude/skills/` y se cargan solas.
- **Sin coautoría de Claude en los commits.** Hay reportes de que Vercel, en su plan gratuito, bloquea despliegues por commits con coautoría de agentes, y que el bloqueo puede quedar aunque se borre el commit. Por eso `.claude/settings.json` la desactiva para todo el repo. No cambies ese archivo, y si tus commits igual la traen, revisa tu configuración personal de Claude Code.
- **Skills de terceros:**
  - `frontend-design` (de [anthropics/skills](https://github.com/anthropics/skills), licencia Apache 2.0) viene incluida en `.claude/skills/`.
  - `web-design-guidelines` (de [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)) no viene en el repo porque ese repo no declara licencia. Si la quieres, instálala tú siguiendo las instrucciones de su README. Revisa una interfaz contra buenas prácticas de diseño y accesibilidad.

## 5. Si el encargado del repo no está

- Quién cubre cada rol se lleva fuera del repo (ver [ROLES.md](ROLES.md)).
- Cualquier persona de Operaciones con permiso de escritura puede revisar y mergear pull requests. La protección de `main` solo exige que los cambios entren por pull request.
- Vercel publica solo cada vez que algo entra a `main`. `[PENDIENTE]`: falta confirmar con la prueba de la Fase 0 que también funcione cuando el cambio lo hizo o lo mergeó otra persona (ver [decisión 0003](decisiones/0003-hosting-vercel.md)).
- Lo único que no puede hacer otra persona: cambiar los ajustes de GitHub (rulesets, colaboradores, seguridad) ni los de Vercel. Si es urgente, anota en una issue qué hace falta.

## 6. Plan B de despliegue

El sitio es estático: `npm run build` genera la carpeta `dist/` con todo el sitio. Cualquier hosting estático gratuito puede publicarla, por ejemplo GitHub Pages, Netlify o Cloudflare Pages. Antes de usar uno, consulta su documentación vigente.

Ojo: si cambia el hosting, cambia la URL, y los QR impresos seguirían apuntando a la anterior. Por eso los QR se generan solo cuando la URL final esté fija (ver [PLAN.md](PLAN.md)).
