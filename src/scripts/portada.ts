// Selector de residuos de la portada. Al elegir uno:
// - se encierra con un trazo a lápiz (aria-pressed, ver SelectorResiduos.astro),
// - aparece una frase que dice dónde dejarlo,
// - la lista muestra solo los puntos que lo reciben,
// - y el mapa los marca con ondas (evento "residuo-elegido", ver mapa.ts).
// Sin JavaScript, el selector se queda como enlaces a "Qué reciclar" y la lista muestra todo.
import { RESIDUOS, respuestaPorResiduo } from '../lib/datos.mjs';

interface PuntoParaRespuesta {
  estado: string;
  residuos: string[];
}

const selector = document.querySelector<HTMLElement>('.selector');

if (selector) {
  const puntos: PuntoParaRespuesta[] = JSON.parse(selector.dataset.puntos || '[]');
  const botones = [...selector.querySelectorAll<HTMLButtonElement>('[data-residuo]')];
  const respuesta = selector.querySelector<HTMLElement>('[data-respuesta]');
  const notas = [...document.querySelectorAll<HTMLElement>('[data-punto]')];
  const textoFiltro = document.querySelector<HTMLElement>('[data-filtro-texto]');
  const verTodos = document.querySelector<HTMLButtonElement>('[data-ver-todos]');
  const textoFiltroOriginal = textoFiltro?.textContent ?? '';

  // Cambia los enlaces por botones
  selector.querySelector('[data-botones]')?.removeAttribute('hidden');
  selector.querySelector('[data-enlaces]')?.setAttribute('hidden', '');

  const elegir = (residuo: string | null) => {
    botones.forEach((boton) => {
      boton.setAttribute('aria-pressed', String(boton.dataset.residuo === residuo));
    });

    if (respuesta) {
      respuesta.textContent = residuo ? respuestaPorResiduo(residuo, puntos) : '';
    }

    let visibles = 0;
    notas.forEach((nota) => {
      const residuosDelPunto = (nota.dataset.residuos ?? '').split(' ');
      nota.hidden = residuo !== null && !residuosDelPunto.includes(residuo);
      if (!nota.hidden) visibles += 1;
      nota.querySelectorAll<HTMLElement>('li[data-residuo]').forEach((item) => {
        item.classList.toggle('elegido', item.dataset.residuo === residuo);
      });
    });

    if (textoFiltro) {
      const nombre = residuo ? RESIDUOS[residuo as keyof typeof RESIDUOS] : '';
      const cosa = nombre.toLowerCase();
      if (residuo === null) textoFiltro.textContent = textoFiltroOriginal;
      else if (visibles === 0) textoFiltro.textContent = `Ningún punto de la lista recibe ${cosa}.`;
      else textoFiltro.textContent = `Solo los puntos que reciben ${cosa}.`;
    }
    if (verTodos) verTodos.hidden = residuo === null;

    document.dispatchEvent(new CustomEvent('residuo-elegido', { detail: { residuo } }));
  };

  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      const yaElegido = boton.getAttribute('aria-pressed') === 'true';
      elegir(yaElegido ? null : (boton.dataset.residuo ?? null));
    });
  });

  verTodos?.addEventListener('click', () => {
    elegir(null);
    botones[0]?.focus();
  });
}
