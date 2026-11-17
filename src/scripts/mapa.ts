import L from 'leaflet';

interface CampusData {
  nombre: string;
  lat: number;
  lng: number;
}

interface PuntoData {
  id: string;
  nombre: string;
  estado: string;
  estadoTexto: string;
  lat: number;
  lng: number;
}

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

  puntosData.forEach((punto) => {
    const icono = L.divIcon({
      className: 'pin-mapa-icono',
      html: `<div class="pin-mapa pin-${punto.estado}" aria-hidden="true"><span class="pin-centro"></span></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28],
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
      return `<strong>${punto.nombre}</strong>`;
    };

    // Pasamos el title con nombre y estado para lectores de pantalla y accesibilidad
    L.marker([punto.lat, punto.lng], {
      icon: icono,
      title: `${punto.nombre} (${punto.estadoTexto})`,
    })
      .addTo(map)
      .bindPopup(obtenerContenidoPopup, {
        maxWidth: 240, // Evita desbordar la pantalla en anchos reducidos (375 px y 320 px)
        minWidth: 180,
        autoPanPadding: [12, 12], // Margen de seguridad para no quedar pegado al borde del mapa
      });
  });
}
