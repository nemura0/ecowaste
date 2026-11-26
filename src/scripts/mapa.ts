import L from 'leaflet';

interface CampusData {
  nombre: string;
  lat: number;
  lng: number;
}

interface PuntoData {
  id: string;
  letra: string;
  residuos: string[];
  nombre: string;
  estado: string;
  estadoTexto: string;
  lat: number;
  lng: number;
}

// Tres ondas que salen del marcador cuando su punto recibe el residuo elegido en la portada.
const ONDAS =
  '<svg class="ondas" viewBox="0 0 88 88" aria-hidden="true" focusable="false">' +
  '<circle class="onda" cx="44" cy="44" r="30"></circle>'.repeat(3) +
  '</svg>';

// Cada cuánto cambia el filtro de las ondas para que la línea "hierva" como dibujo a mano.
const PASO_HERVOR_MS = 170;
const FILTROS_HERVOR = ['hervor-0', 'hervor-1', 'hervor-2'];

const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

const contenedor = document.getElementById('mapa');

if (contenedor) {
  const campusData: CampusData = JSON.parse(contenedor.dataset.campus || '{}');
  const puntosData: PuntoData[] = JSON.parse(contenedor.dataset.puntos || '[]');

  if (typeof campusData.lat !== 'number' || typeof campusData.lng !== 'number') {
    throw new Error('Las coordenadas del campus son requeridas para centrar el mapa.');
  }

  // Inicializamos el mapa centrado en el campus.
  // Desactivamos el control de zoom predeterminado para moverlo abajo a la izquierda,
  // evitando que en teléfonos pequeños tape el contenido de los popups.
  const map = L.map(contenedor, {
    zoomControl: false,
    scrollWheelZoom: false, // Evita hacer zoom accidental con la rueda del mouse al desplazarse por la página
  }).setView([campusData.lat, campusData.lng], 16);

  // Botones de zoom abajo a la izquierda con textos en español
  L.control
    .zoom({
      position: 'bottomleft',
      zoomInTitle: 'Acercar',
      zoomOutTitle: 'Alejar',
    })
    .addTo(map);

  // Teselas de OpenStreetMap con su atribución en español
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">Colaboradores de OpenStreetMap</a>',
  }).addTo(map);

  const marcadores: { punto: PuntoData; marcador: L.Marker }[] = [];

  puntosData.forEach((punto) => {
    // La letra viene de los datos del sitio (A, B, C…), no de lo que escribe alguien. Igual se escapa.
    const letra = document.createElement('span');
    letra.textContent = punto.letra;
    const icono = L.divIcon({
      className: 'pin-mapa-icono',
      html: `<div class="pin-mapa pin-${punto.estado}" aria-hidden="true">${ONDAS}${letra.innerHTML}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18],
    });

    // Función que devuelve el HTML compilado y escapado por Astro desde la etiqueta <template>.
    // Pasamos una función a bindPopup para que Leaflet actualice el contenido cada vez que
    // se abra o redibuje el popup, evitando que un DocumentFragment quede vacío tras el autoPan.
    const obtenerContenidoPopup = () => {
      const plantilla = document.getElementById(
        `popup-plantilla-${punto.id}`,
      ) as HTMLTemplateElement | null;

      if (plantilla && plantilla.innerHTML) {
        return plantilla.innerHTML;
      }
      // Respaldo si falta la plantilla: el nombre va como texto, nunca como HTML.
      const respaldo = document.createElement('strong');
      respaldo.textContent = punto.nombre;
      return respaldo;
    };

    // Pasamos el title con nombre y estado para lectores de pantalla y accesibilidad
    const marcador = L.marker([punto.lat, punto.lng], {
      icon: icono,
      title: `${punto.letra}: ${punto.nombre} (${punto.estadoTexto})`,
    });
    marcadores.push({ punto, marcador });
    marcador
      .addTo(map)
      .bindPopup(obtenerContenidoPopup, {
        maxWidth: 240, // Evita desbordar la pantalla en anchos reducidos (375 px y 320 px)
        minWidth: 180,
        autoPanPadding: [12, 12], // Margen de seguridad para no quedar pegado al borde del mapa
      });
  });

  // La portada avisa qué residuo se eligió (src/scripts/portada.ts). Se apagan los puntos que no lo
  // reciben y los que sí aparecen con ondas. Con null se vuelve a mostrar todo.
  let hervor: number | undefined;

  const hervir = () => {
    window.clearInterval(hervor);
    if (sinMovimiento.matches) return;
    let paso = 0;
    hervor = window.setInterval(() => {
      paso = (paso + 1) % FILTROS_HERVOR.length;
      contenedor.querySelectorAll<SVGCircleElement>('.marcado .onda').forEach((onda) => {
        onda.style.filter = `url(#${FILTROS_HERVOR[paso]})`;
      });
    }, PASO_HERVOR_MS);
  };

  document.addEventListener('residuo-elegido', (evento) => {
    const residuo = (evento as CustomEvent<{ residuo: string | null }>).detail.residuo;
    const elegidos: L.LatLng[] = [];

    marcadores.forEach(({ punto, marcador }) => {
      const elemento = marcador.getElement();
      if (!elemento) return;
      const loRecibe = residuo !== null && punto.residuos.includes(residuo);
      elemento.classList.toggle('marcado', loRecibe);
      elemento.classList.toggle('apagado', residuo !== null && !loRecibe);
      if (loRecibe) elegidos.push(marcador.getLatLng());
    });

    if (elegidos.length > 0) {
      map.fitBounds(L.latLngBounds(elegidos), { maxZoom: 16, padding: [48, 48], animate: !sinMovimiento.matches });
      hervir();
    } else {
      window.clearInterval(hervor);
    }
  });
}
