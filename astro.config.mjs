// @ts-check
import { defineConfig } from 'astro/config';
import origenes from './src/data/origenes-qr.json' with { type: 'json' };
import { destinosInexistentes } from './src/lib/datos.mjs';

/**
 * Un QR impreso no se puede corregir. Al terminar la compilación, revisa que cada origen de
 * src/data/origenes-qr.json lleve a una página que existe. Si no, la compilación falla.
 * @returns {import('astro').AstroIntegration}
 */
function revisarDestinosDeQr() {
  return {
    name: 'revisar-destinos-de-qr',
    hooks: {
      'astro:build:done': ({ pages }) => {
        const rotos = destinosInexistentes(origenes, pages.map((pagina) => pagina.pathname));
        if (rotos.length === 0) return;
        const lista = rotos.map(({ id, destino }) => `"${id}" lleva a ${destino}`).join('; ');
        throw new Error(`Hay orígenes de QR que llevan a páginas que no existen: ${lista}. Revisa src/data/origenes-qr.json`);
      },
    },
  };
}

// Configuración de Astro: https://docs.astro.build/en/reference/configuration-reference/
// La salida es estática por defecto, así que no hace falta indicarla.
export default defineConfig({
  site: 'https://ecowaste-seven.vercel.app',
  integrations: [revisarDestinosDeQr()],
});
