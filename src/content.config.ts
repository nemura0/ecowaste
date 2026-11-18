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
  ID_METRICA_DE_MUESTRA,
} from './lib/datos.mjs';

const valores = (lista: Record<string, string>) => Object.keys(lista) as [string, ...string[]];

// Si el modo no es "demo" ni "real", la compilación se detiene aquí.
const modo = validarModo(sitio.modo);

// De dónde sale un dato, y quién y cuándo lo comprobó. Lo usan los puntos y las métricas.
const esquemaFuente = z.object({
  tipo: z.enum(valores(TIPOS_DE_FUENTE)),
  detalle: z.string().min(1),
  enlace: z.string().regex(/^https:\/\//, 'El enlace tiene que empezar con https://').optional(),
});

const esquemaVerificacion = z.object({
  // YAML puede leer la fecha como fecha o como texto. Las dos sirven si van como AAAA-MM-DD.
  fecha: z
    .preprocess(
      fechaComoTexto,
      z.string().regex(FORMATO_FECHA, 'Escribe la fecha como AAAA-MM-DD, por ejemplo 2026-11-16'),
    )
    .pipe(z.coerce.date())
    .refine((fecha) => !esFechaFutura(fecha), 'La fecha de verificación no puede ser futura'),
  delegacion: z.enum(valores(DELEGACIONES)),
});

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
      fuente: esquemaFuente,
      verificacion: esquemaVerificacion,
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

// Métricas del proyecto, como los kilos recolectados. Ver docs/DATOS.md.
// Una cifra nunca se inventa: no hay métricas de ejemplo, y cada una lleva fuente, fecha y delegación.
// Mientras src/data/metricas.json esté vacío, la sección no aparece en el sitio.
const metricas = defineCollection({
  loader: file('./src/data/metricas.json'),
  // z.strictObject: cualquier campo de más también detiene la compilación.
  schema: z.strictObject(
    {
      id: z
        .string()
        .regex(/^[a-z0-9-]+$/, 'Usa solo minúsculas, números y guiones')
        // El ejemplo de docs/DATOS.md no describe una cifra real: si se copia tal cual, no llega al sitio.
        .refine(
          (id) => id !== ID_METRICA_DE_MUESTRA,
          'Ese id es el del ejemplo de docs/DATOS.md. Cámbialo y usa una cifra real con su fuente',
        ),
      /** Qué se mide, por ejemplo "Residuos recolectados". */
      nombre: z.string().min(1),
      valor: z.number().nonnegative('La cifra no puede ser negativa'),
      /** Unidad de la cifra, por ejemplo "kg". */
      unidad: z.string().min(1),
      /** A qué período corresponde la cifra, tal como lo dice la fuente. */
      periodo: z.string().min(1),
      fuente: esquemaFuente,
      verificacion: esquemaVerificacion,
      // A diferencia de los puntos, una métrica nunca es de ejemplo: si se escribe "ejemplo", la compilación se detiene.
      ejemplo: z
        .undefined({ error: 'Las métricas no pueden ser de ejemplo: una cifra sin fuente no se escribe' })
        .optional(),
    },
    {
      error: (problema) =>
        problema.code === 'unrecognized_keys'
          ? `${problema.keys.length === 1 ? 'Campo' : 'Campos'} de más: ${problema.keys.join(', ')}. Revisa los campos de una métrica en docs/DATOS.md`
          : undefined,
    },
  ),
});

export const collections = { puntos, paginas, origenes, metricas };
