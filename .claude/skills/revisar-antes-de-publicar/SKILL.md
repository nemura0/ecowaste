---
name: revisar-antes-de-publicar
description: Revisión de seguridad, privacidad y calidad de EcoWaste. Úsala antes de abrir cualquier pull request y antes de difundir el sitio (compartir enlaces, imprimir QR).
---

# Revisar antes de publicar

Revisa todo lo que cambió (`git diff main...HEAD` para un pull request; el sitio completo antes de una difusión). Si algún punto falla, **no publiques**: corrige o avisa qué falta.

## 1. Seguridad y privacidad

- [ ] **Secretos:** no hay claves, tokens, contraseñas ni archivos `.env*` (salvo `.env.example`, que solo lleva nombres de variables). Busca en el diff palabras como `key`, `token`, `secret`, `password` y textos largos que parezcan claves.
- [ ] **Datos personales:** no hay nombres de compañeros, correos (salvo los noreply), teléfonos, RUT, la nómina, la ficha, respuestas de encuestas ni archivos de contexto del grupo.
- [ ] **Personas en los datos:** "verificado por" es una delegación; las consultas registran cargo o institución, nunca un nombre.
- [ ] **Fotos:** no aparece nadie reconocible.
- [ ] **Marca:** no se usa el logo ni la marca de la universidad, y el pie dice que es un proyecto estudiantil del ramo.
- [ ] **Seguimiento:** no hay cookies de seguimiento ni formularios que recojan datos personales.

## 2. Datos y contenido

- [ ] Ningún punto sin fuente, fecha de verificación o delegación que verificó.
- [ ] Todo dato de ejemplo se ve como **EJEMPLO** en pantalla, y el aviso de demostración está en todas las páginas mientras el sitio esté en modo demo.
- [ ] Nada que esté pendiente se presenta como hecho. Busca `[PENDIENTE]` y comprueba que se vea como pendiente.
- [ ] Las afirmaciones ambientales, de normativa o de salud tienen fuente y las entregó la delegación correspondiente.
- [ ] Antes de una difusión: el sitio está en modo real y no queda ningún dato de ejemplo.

## 3. Sitio

- [ ] El mapa muestra la atribución de OpenStreetMap.
- [ ] Los enlaces funcionan: revisa los internos en `dist/` después de compilar y abre los externos nuevos.
- [ ] Se ve bien a 375 px de ancho, sin desplazamiento horizontal, y las páginas de contenido funcionan sin JavaScript.
- [ ] `npm run verificar` pasa.

## 4. Informe

Termina con un informe corto:

```
Revisión antes de publicar: OK | FALTA
- Seguridad y privacidad: OK
- Datos y contenido: FALTA (el punto X no tiene fecha de verificación)
- Sitio: OK
```

Si todo está OK, sigue con el pull request o la difusión. Si algo falta, detente.
