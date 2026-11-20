# 0006 · Licencia del repo

**Estado:** decidida · **Fecha:** 20-nov-2026

## Contexto

El repo es público, pero sin licencia nadie puede reutilizarlo legalmente. Tiene dos tipos de contenido: el código del sitio y los textos y datos (documentación, páginas y puntos). Este tipo de licencias suele elegirse por separado para cada uno.

## Alternativas

- **Sin licencia:** el repo se puede ver, pero no reutilizar.
- **MIT para el código y CC BY 4.0 para textos y datos:** se puede reutilizar todo citando al proyecto.
- **MIT para todo:** una sola licencia, pensada para código.
- **Licencias "compartir igual" (GPL y CC BY-SA):** quien modifique el proyecto tiene que publicar su versión con la misma licencia.

## Decisión

El grupo eligió **MIT para el código y CC BY 4.0 para textos y datos** (issue #41).

- CC BY 4.0 cubre `docs/`, `src/content/` y `src/data/`. Su texto está en `LICENSE-CONTENIDO`.
- MIT cubre todo lo demás. Su texto está en `LICENSE`.
- Hay dos excepciones con su propia licencia: `.claude/skills/frontend-design/` (Apache 2.0, de terceros) y las coordenadas sacadas de OpenStreetMap.
- El titular es "Colaboradores de EcoWaste". No se nombra a personas, igual que en el resto del repo.

## Consecuencias

- Quien reutilice el proyecto tiene que citarlo. La forma de citarlo está en el `README.md`.
- Si se agrega una carpeta de textos o datos fuera de las tres de arriba, hay que sumarla en el `README.md` y en esta decisión.
- Antes de traer al repo código o textos de terceros, hay que revisar que su licencia sea compatible y conservar su aviso.
