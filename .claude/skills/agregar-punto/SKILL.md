---
name: agregar-punto
description: Agrega, actualiza o retira un punto del mapa de EcoWaste. Úsala cuando alguien entregue los datos de un punto de reciclaje (una fila de la planilla de Drive, un mensaje o un documento) o pida corregir o quitar uno.
---

# Agregar, actualizar o retirar un punto

Esta skill existe para que ningún punto entre al mapa sin fuente. Si falta algo, el punto espera.

## 1. Antes de tocar nada

1. Lee `docs/DATOS.md` completo. Es el esquema vigente y puede haber cambiado desde la última vez.
2. Si `src/data/puntos/` todavía no existe, detente y dilo: el esquema en código llega en la Fase 1.
3. Revisa que `git config user.email` sea un correo noreply de GitHub. Si no lo es, detente.

## 2. Revisa que estén los tres datos obligatorios

| Dato | Si falta |
|---|---|
| Fuente (tipo y detalle; enlace si existe) | No edites |
| Fecha de verificación | No edites |
| Delegación que verificó | No edites |

Si falta alguno, **no edites ningún archivo**. Explica en palabras simples qué falta y por qué. Por ejemplo:

> Para cargar este punto falta la fuente: ¿alguien fue al lugar, se consultó a quien lo administra, o hay un documento o página web que lo diga? Sin eso no puede entrar al mapa.

## 3. No deduzcas nada

- **Coordenadas:** solo las que vienen de la fuente (GPS en el lugar o leídas en openstreetmap.org). Si no vienen, el punto espera.
- **Horario y administrador:** solo si la fuente los dice. Si no, se omiten (son opcionales).
- **Residuos aceptados:** solo los que dice la fuente, traducidos a la lista controlada de `docs/DATOS.md`. Si la fuente nombra algo que no está en la lista, pregunta antes de elegir un valor.
- **Personas:** si la fuente es una consulta, se registra el cargo o la institución, nunca un nombre. "Verificado por" es siempre una delegación.

## 4. Edita en una rama

1. `git switch main && git pull`.
2. Crea la rama: `datos/agrega-<id>`, `datos/actualiza-<id>` o `datos/retira-<id>`.
3. Según el caso:
   - **Agregar:** crea `src/data/puntos/<id>.yaml` con los campos de `docs/DATOS.md`.
   - **Actualizar:** cambia los campos, con la nueva fuente y la nueva fecha de verificación.
   - **Retirar:** cambia `estado` a `inactivo`, con la fuente que lo confirma. Borra el archivo solo si el punto se cargó por error.
4. Corre `npm run verificar`. Si falla, corrige; no saltes la verificación.

## 5. Abre el pull request

1. Revisa `git status` y `git diff`. Agrega solo el archivo del punto.
2. Commit: `datos: agrega <nombre del punto>` (o `actualiza`, `retira`).
3. `git push -u origin <rama>` y abre el pull request con `gh pr create`. La descripción cita:
   - la fuente (tipo, detalle y enlace si existe),
   - la fecha de verificación,
   - la delegación que verificó.
4. No mergees. Lo hace una persona.
5. Termina con la skill `explicar-cambio`.
