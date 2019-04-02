import L from 'leaflet'
import places from './nice_places.json'
import './heatlayer'
;(() => {
  const map = L.map('map').setView([60.2013599484, 24.92042541504], 12)
  L.tileLayer(
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken:
        'pk.eyJ1IjoiZGR1bmRlcmZlbHQiLCJhIjoiY2pra3puMDFyMDE0ZjNxbW53czc4N2txbSJ9.PBi1S7hV8oBytbMdcr5O0Q'
    }
  ).addTo(map)

  const points = places.features.map(({ geometry }) => [
    geometry.coordinates[1],
    geometry.coordinates[0]
  ])

  L.heatLayer(points, {
    radius: 20,
    max: 1,
    minOpacity: 0,
    blur: 20,
    maxZoom: 18
  }).addTo(map)

  map.on('click', e => {
    const { lat, lng } = e.latlng
    const mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`
    window.open(mapsLink, '_blank')
  })
})()
