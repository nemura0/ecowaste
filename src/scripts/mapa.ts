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

    // Leemos la plantilla HTML ya compilada y escapada por Astro para este punto
    const plantilla = document.getElementById(
      `popup-plantilla-${punto.id}`,
    ) as HTMLTemplateElement | null;
    const contenido = plantilla ? plantilla.content.cloneNode(true) : punto.nombre;

    // Pasamos el title con nombre y estado para lectores de pantalla y accesibilidad
    L.marker([punto.lat, punto.lng], {
      icon: icono,
      title: `${punto.nombre} (${punto.estadoTexto})`,
    })
      .addTo(map)
      .bindPopup(contenido as HTMLElement, {
        maxWidth: 240, // Evita desbordar la pantalla en anchos de 375 px
      });
  });
}
