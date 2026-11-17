// Esquema de los puntos del mapa. Ver docs/DATOS.md.
// Si un punto no cumple el esquema, `npm run build` falla y dice qué campo está mal.

import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import sitio from './data/sitio.json';
import {
  TIPOS,
  ESTADOS,
  COMUNAS,
  RESIDUOS,
  TIPOS_DE_FUENTE,
  DELEGACIONES,
  esFechaFutura,
  FORMATO_FECHA,
  fechaComoTexto,
  ejemploPermitido,
  idCoincideConArchivo,
  validarModo,
  FORMATO_DESTINO,
} from './lib/datos.mjs';

const valores = (lista: Record<string, string>) => Object.keys(lista) as [string, ...string[]];

// Si el modo no es "demo" ni "real", la compilación se detiene aquí.
const modo = validarModo(sitio.modo);

const puntos = defineCollection({
  loader: glob({
    pattern: '*.{yaml,yml}',
    base: './src/data/puntos',
    generateId: ({ entry, data }) => {
      if (!idCoincideConArchivo(String(data.id), entry)) {
        throw new Error(`El id "${data.id}" no coincide con el nombre del archivo ${entry}.`);
      }
      return String(data.id);
    },
  }),
  schema: z
    .object({
      id: z.string().regex(/^[a-z0-9-]+$/, 'Usa solo minúsculas, números y guiones'),
      nombre: z.string().min(1),
      tipo: z.enum(valores(TIPOS)),
      estado: z.enum(valores(ESTADOS)),
      ubicacion: z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
        descripcion: z.string().min(1),
        comuna: z.enum(COMUNAS as [string, ...string[]]),
      }),
      residuos: z.array(z.enum(valores(RESIDUOS))).min(1),
      horario: z.string().min(1).optional(),
      administrador: z.string().min(1).optional(),
      fuente: z.object({
        tipo: z.enum(valores(TIPOS_DE_FUENTE)),
        detalle: z.string().min(1),
        enlace: z.string().regex(/^https:\/\//, 'El enlace tiene que empezar con https://').optional(),
      }),
      verificacion: z.object({
        // YAML puede leer la fecha como fecha o como texto. Las dos sirven si van como AAAA-MM-DD.
        fecha: z
          .preprocess(
            fechaComoTexto,
            z.string().regex(FORMATO_FECHA, 'Escribe la fecha como AAAA-MM-DD, por ejemplo 2026-11-16'),
          )
          .pipe(z.coerce.date())
          .refine((fecha) => !esFechaFutura(fecha), 'La fecha de verificación no puede ser futura'),
        delegacion: z.enum(valores(DELEGACIONES)),
      }),
      ejemplo: z.boolean(),
    })
    .refine((punto) => ejemploPermitido(modo, punto.ejemplo), {
      message: 'El sitio está en modo real y este punto es de ejemplo. Quítalo o cambia el modo en src/data/sitio.json.',
      path: ['ejemplo'],
    }),
});

// Páginas de texto del sitio. Cada archivo de src/content/paginas/ es una página:
// que-reciclar.md se publica en /que-reciclar/.
const paginas = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/paginas' }),
  schema: z.object({
    /** Título de la pestaña del navegador. */
    titulo: z.string().min(1),
    /** Título grande de la página. Si no se indica, se usa `titulo`. */
    titular: z.string().min(1).optional(),
    /** Resumen de una frase para buscadores y para compartir el enlace. */
    descripcion: z.string().min(1),
  }),
});

// Orígenes de QR: un QR por ubicación física. Cada uno se publica en /q/<id>/ y lleva a su destino.
// El id va impreso en el QR, así que no se cambia después de imprimirlo.
const origenes = defineCollection({
  loader: file('./src/data/origenes-qr.json'),
  schema: z
    .object({
      id: z.string().regex(/^[a-z0-9-]+$/, 'Usa solo minúsculas, números y guiones'),
      /** Dónde está pegado el QR. Es solo para el grupo: no se muestra en el sitio. */
      lugar: z.string().min(1),
      destino: z.string().regex(FORMATO_DESTINO, 'El destino es una página del sitio, como "/" o "/que-reciclar/"'),
      ejemplo: z.boolean(),
    })
    .refine((origen) => ejemploPermitido(modo, origen.ejemplo), {
      message: 'El sitio está en modo real y este origen de QR es de ejemplo. Quítalo o cambia el modo en src/data/sitio.json.',
      path: ['ejemplo'],
    }),
});

export const collections = { puntos, paginas, origenes };
