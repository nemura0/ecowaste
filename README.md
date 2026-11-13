# EcoWaste

Sitio web con un mapa de puntos de reciclaje de residuos electrónicos. Parte por el campus de la UCN en Coquimbo y por el contenedor del proyecto.

Es el producto digital de un proyecto estudiantil del ramo Ecología Integral (Universidad Católica del Norte, sede Coquimbo). No es un servicio oficial de la universidad.

## Estado

**Fase 0 · base y documentación.** Todavía no hay sitio publicado. El avance y los pendientes están en [`docs/PLAN.md`](docs/PLAN.md).

## Dónde verlo

- Sitio: `[PENDIENTE]`. La URL final se define antes de imprimir cualquier QR.
- Vista previa de cada cambio: en cada pull request aparece un comentario con el enlace.

## Cómo se verifican los datos

Cada punto del mapa lleva tres cosas obligatorias:

1. **Fuente**: observación directa, consulta, documento o página web, con su detalle.
2. **Fecha de verificación.**
3. **Delegación que verificó.**

Si a un punto le falta alguna, la verificación automática falla y el cambio no entra. La fuente y la fecha se muestran en la página de cada punto. El detalle está en [`docs/DATOS.md`](docs/DATOS.md).

## Correrlo en tu computador

Necesitas [Git](https://git-scm.com/) y [Node.js](https://nodejs.org/) (versión LTS; mínimo 22.23.4).

```sh
git clone https://github.com/nemura0/ecowaste.git
cd ecowaste && npm install
npm run dev
```

Después abre `http://localhost:4321` en el navegador.

## Documentos

| Documento | Para quién |
|---|---|
| [`docs/EMPEZAR_AQUI.md`](docs/EMPEZAR_AQUI.md) | Si no programas: qué es esto y cómo aportar |
| [`docs/COMO_APORTAR.md`](docs/COMO_APORTAR.md) | Si vas a editar el repo |
| [`docs/DATOS.md`](docs/DATOS.md) | Si vas a cargar o revisar puntos |
| [`docs/ROLES.md`](docs/ROLES.md) | Roles dentro de Operaciones y recursos |
| [`docs/PLAN.md`](docs/PLAN.md) | Fases, estado y pendientes |
| [`docs/GUIA_DE_ESTILO.md`](docs/GUIA_DE_ESTILO.md) | Si vas a escribir textos o diseñar |
| [`docs/decisiones/`](docs/decisiones/) | Por qué se decidió cada cosa |
| [`CLAUDE.md`](CLAUDE.md) | Instrucciones para Claude Code |

## Licencia

`[PENDIENTE]`. El grupo todavía no la define.
