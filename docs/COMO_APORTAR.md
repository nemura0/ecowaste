# Cómo aportar

Esta guía es para la delegación Operaciones y recursos, que edita el repo. Si no programas, empieza por [EMPEZAR_AQUI.md](EMPEZAR_AQUI.md).

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

1. **Toma una tarea.** En [Issues](https://github.com/nemura0/ecowaste/issues), elige una sin asignar, comenta "la tomo" y asígnatela. Si tienes poca experiencia, parte por las que tienen la etiqueta `buena-primera-tarea`.
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

   GitHub te muestra un botón para abrir el pull request. Completa la plantilla: qué cambia, por qué y cómo probarlo.
6. **Espera la verificación y la vista previa.** La verificación tiene que quedar en verde. Abre la vista previa en tu teléfono.
7. **Pide revisión** a otra persona de Operaciones cuando se pueda.
8. **Merge.** Cuando la verificación esté en verde, usa **Squash and merge**, con un título que siga el formato `tipo: descripción`. Después borra la rama.

También puedes editar un archivo directamente en la web de GitHub (con el ícono del lápiz). GitHub crea la rama y el pull request por ti. La sección "Práctica" de [EMPEZAR_AQUI.md](EMPEZAR_AQUI.md) muestra cómo.

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
- **Desactiva la coautoría automática de Claude en los commits.** Hay reportes de que Vercel, en su plan gratuito, bloquea despliegues por commits con coautoría de agentes. `[PENDIENTE]`: se confirma con la prueba de la Fase 0, y aquí quedará cómo desactivarla.
- Skills de terceros: `[PENDIENTE]`. Se proponen en la Fase 0 y, si se aprueban, aquí quedan los comandos de instalación.

## 5. Si el encargado del repo no está

- Revisa en [ROLES.md](ROLES.md) quién es suplente de cada rol.
- Cualquier persona de Operaciones con permiso de escritura puede revisar y mergear pull requests. La protección de `main` solo exige que los cambios entren por pull request.
- Vercel publica solo cada vez que algo entra a `main`. `[PENDIENTE]`: falta confirmar con la prueba de la Fase 0 que también funcione cuando el cambio lo hizo o lo mergeó otra persona (ver [decisión 0003](decisiones/0003-hosting-vercel.md)).
- Lo único que no puede hacer otra persona: cambiar los ajustes de GitHub (rulesets, colaboradores, seguridad) ni los de Vercel. Si es urgente, anota en una issue qué hace falta.

## 6. Plan B de despliegue

El sitio es estático: `npm run build` genera la carpeta `dist/` con todo el sitio. Cualquier hosting estático gratuito puede publicarla, por ejemplo GitHub Pages, Netlify o Cloudflare Pages. Antes de usar uno, consulta su documentación vigente.

Ojo: si cambia el hosting, cambia la URL, y los QR impresos seguirían apuntando a la anterior. Por eso los QR se generan solo cuando la URL final esté fija (ver [PLAN.md](PLAN.md)).
