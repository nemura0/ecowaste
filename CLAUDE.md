# EcoWaste · instrucciones para Claude Code

## El proyecto en cinco líneas

- EcoWaste es un sitio web estático con un mapa de puntos de reciclaje de residuos electrónicos.
- Es el producto digital de un proyecto grupal del ramo Ecología Integral (UCN, sede Coquimbo). No es un servicio oficial de la universidad.
- Solo la delegación **Operaciones y recursos** edita este repo. Las demás delegaciones aportan por Drive y WhatsApp.
- Stack: Astro con salida estática, Leaflet con OpenStreetMap, CSS propio, npm y Vercel en el plan gratuito.
- Cada dato del mapa lleva fuente, fecha de verificación y delegación que verificó. Nada se inventa.

## Cómo retomar

Lee este archivo y `docs/PLAN.md`, y sigue con la fase que corresponde.
Antes de cada fase, presenta un plan corto con los pull requests que vas a abrir y espera el visto bueno.
Al terminar una fase, detente.

Si tus reglas globales (por ejemplo, de `~/.claude`) piden otra cosa, como TDD con cobertura mínima o subagentes en cada cambio, en este repo mandan estas reglas: versión mínima viable, costo cero y gente que no programa.

## Reglas permanentes

### No inventar

- Ningún punto, horario, coordenada, residuo aceptado, cifra, autorización ni nombre de institución sale de tu conocimiento general. O viene de una fuente entregada por el grupo, o queda como `[PENDIENTE]`.
- Las afirmaciones sobre impacto ambiental, normativa o salud las escriben otras delegaciones, con su fuente. Tú armas la estructura de la página, no el contenido de fondo.
- Para la demo se usan datos de ejemplo. Cada uno se ve como ejemplo en pantalla, y todo el sitio muestra un aviso de demostración.
- En modo real, la verificación falla si queda algún dato de ejemplo.
- Lo que está en la lista de pendientes de `docs/PLAN.md` no se decide por cuenta propia: se marca `[PENDIENTE]` y se pregunta.

### Seguridad y privacidad

- El repo es público. No se suben claves, tokens ni archivos `.env`. `.env.example` lleva solo nombres de variables. Hoy el sitio no necesita ninguna.
- No se suben nombres de compañeros, correos, teléfonos, la nómina del grupo, la ficha, respuestas de encuestas ni archivos de contexto. No traigas al repo nada que esté fuera de esta carpeta.
- "Verificado por" es siempre una delegación, nunca una persona. Si la fuente es una consulta a alguien, se registra su cargo o institución, no su nombre.
- El sitio no usa cookies de seguimiento ni formularios que recojan datos personales.
- No se usa el logo ni la marca de la universidad. El pie de página dice que es un proyecto estudiantil del ramo.
- En el repo, la delegación responsable de la web se llama siempre "Operaciones y recursos", aunque otros documentos del grupo usen otro nombre.

### Git

- Nunca hagas commits en `main`. Usa una rama por unidad de trabajo, con prefijo `feat/`, `fix/`, `docs/`, `datos/` o `chore/`.
- Antes del primer commit de cada sesión, revisa `git config user.email`. Tiene que ser un correo noreply de GitHub (`…@users.noreply.github.com`). Si no lo es, detente.
- Revisa `git status` y el diff antes de cada commit. Agrega archivo por archivo, nunca `git add -A` a ciegas.
- Mensajes de commit en español, con el formato `tipo: descripción` (ejemplo: `docs: agrega guía de estilo`).
- Los pull requests son chicos y su descripción va en español simple: qué cambia, por qué, cómo probarlo y el enlace a la vista previa.
- Nada de force-push, historia reescrita ni verificaciones saltadas.
- Tú abres los pull requests. Los mergea una persona.
- Los ajustes de GitHub (rulesets, colaboradores, visibilidad, seguridad) y de Vercel los cambia a mano el encargado del repo. Si hace falta un cambio, explica exactamente qué hacer.

### Estilo

- Aplica la skill `guia-de-estilo` antes de escribir texto visible o tocar la interfaz.
- Español de Chile, con "tú". Nunca voseo.
- La referencia es un diseño tipo Canva: plano, amable y claro. No debe verse generado por IA.
- Los textos dicen dónde, qué y cuándo, en frases cortas.

### Teléfono y accesibilidad

- La gente llega escaneando un QR. Se diseña primero para teléfono y para datos móviles lentos: páginas livianas, sin imágenes ni fuentes pesadas.
- El mapa tiene siempre una lista equivalente de puntos.
- Contraste AA, navegación con teclado, textos alternativos y `lang="es-CL"`.
- Las páginas de contenido funcionan sin JavaScript. El mapa es la única excepción.

### Dependencias

- Una dependencia se agrega solo si resuelve algo que no se arregla en pocas líneas, y se explica en el pull request.
- Leaflet se instala por npm y se empaqueta con el sitio; no se carga desde un CDN.
- Consulta la documentación vigente de Astro, Leaflet y Vercel. No te fíes de la memoria para versiones ni APIs.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala las dependencias (una vez, o cuando cambie `package.json`) |
| `npm run dev` | Levanta el sitio en `http://localhost:4321` mientras editas |
| `npm run build` | Genera el sitio final en `dist/` |
| `npm test` | Corre las pruebas de los scripts |
| `npm run verificar` | Revisa el repo, corre las pruebas y compila. Es lo mismo que se revisa en cada pull request |

## Mapa de carpetas

| Carpeta | Qué hay |
|---|---|
| `docs/` | Documentación para el grupo: empezar, aportar, datos, roles, plan, estilo y decisiones |
| `.claude/skills/` | Skills del proyecto |
| `.github/` | Verificación automática, plantillas de pull request e issues, `CODEOWNERS` |
| `scripts/` | Verificación del repo y de los datos; más adelante, generación de QR |
| `src/data/` | Puntos, categorías de residuos y orígenes de QR (desde la Fase 1) |
| `src/content/` | Textos en Markdown |
| `src/pages/`, `src/layouts/`, `src/components/` | Páginas y piezas del sitio |
| `src/scripts/` | Código del mapa |
| `src/styles/` | Variables de diseño y estilos |
| `public/` | Archivos que se publican tal cual |

## Skills del proyecto

| Skill | Cuándo |
|---|---|
| `agregar-punto` | Para agregar, actualizar o retirar un punto del mapa |
| `guia-de-estilo` | Antes de escribir texto visible o tocar la interfaz |
| `explicar-cambio` | Al cerrar un pull request, o cuando alguien pide entender un cambio |
| `revisar-antes-de-publicar` | Antes de abrir un pull request y antes de cualquier difusión |

## Cómo trabajar

- Decide tú los detalles de implementación y cuéntalos. Pregunta cuando la decisión sea del grupo o esté en los pendientes.
- Si algo de estas instrucciones contradice lo que encuentras en el repo, dilo antes de seguir.
- Antes de decir que algo está listo, comprueba que compila, que pasa `npm run verificar` y que se ve bien a 375 px de ancho.
- Al cerrar cada pull request, usa `explicar-cambio`.
- Mantén `docs/PLAN.md` al día. Es lo que permite que otra persona retome el trabajo.
- Habla en español de Chile, con "tú".
