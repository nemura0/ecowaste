# 0002 · Mapa con Leaflet y OpenStreetMap

**Estado:** aceptada · **Fecha:** 12-nov-2026

## Contexto

El mapa es el centro del sitio. Tiene que costar cero, no depender de claves que haya que cuidar en un repo público y funcionar bien en teléfono.

## Decisión

- [Leaflet](https://leafletjs.com) en su versión estable: hoy la 1.9.4, porque la 2.0 sigue en beta. Se instala por npm y se empaqueta con el sitio, no se carga desde un CDN.
- Teselas (las imágenes que forman el mapa) de los servidores públicos de [OpenStreetMap](https://www.openstreetmap.org), sin clave de API.
- Junto al mapa va siempre una **lista equivalente** de puntos.

## Alternativas consideradas

- **Google Maps:** exige una clave de API y una cuenta con facturación.
- **MapLibre con teselas vectoriales:** pesa más y necesita un proveedor de teselas, que suele pedir clave.
- **Leaflet 2.0:** sigue en beta. Se puede revisar cuando salga la versión final.

## Consecuencias

- Hay que cumplir la [política de uso de teselas](https://operations.osmfoundation.org/policies/tiles/) de OpenStreetMap: la atribución tiene que verse, no se permite la descarga masiva ni el uso sin conexión, y OpenStreetMap puede bloquear sin aviso a quien degrade el servicio.
- Los servidores de teselas son un servicio público sin garantía de disponibilidad. Si no cargan, la lista equivalente sigue funcionando.
- El mapa es la única parte del sitio que necesita JavaScript.
