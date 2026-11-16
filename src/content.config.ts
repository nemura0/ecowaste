// Esquema de los puntos del mapa. Ver docs/DATOS.md.
// Si un punto no cumple el esquema, `npm run build` falla y dice qué campo está mal.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
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
  ejemploPermitido,
  idCoincideConArchivo,
} from './lib/datos.mjs';

const valores = (lista: Record<string, string>) => Object.keys(lista) as [string, ...string[]];

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
        // YAML lee AAAA-MM-DD como fecha.
        fecha: z.coerce.date().refine((fecha) => !esFechaFutura(fecha), 'La fecha de verificación no puede ser futura'),
        delegacion: z.enum(valores(DELEGACIONES)),
      }),
      ejemplo: z.boolean(),
    })
    .refine((punto) => ejemploPermitido(sitio.modo, punto.ejemplo), {
      message: 'El sitio está en modo real y este punto es de ejemplo. Quítalo o cambia el modo en src/data/sitio.json.',
      path: ['ejemplo'],
    }),
});

export const collections = { puntos };
