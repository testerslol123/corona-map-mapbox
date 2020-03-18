import 'https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js';

const mapbox_token = 'pk.eyJ1IjoibWlzdGVybWFwYm94ZGFubnkiLCJhIjoiY2s3eDZwdmRxMDI0MTNobW96NWkzYzFlOSJ9.ld6IfTr4jpZbFQdl8_HPFA'
mapboxgl.accessToken = mapbox_token;
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 1.5,
  center: [0,20]
});

const getColorFromCount = count => {
  if (count >= 100) {
    return 'red'
  }
  if (count >= 10) {
    return 'blue'
  }
  return 'grey'
}

var marker = new mapboxgl.Marker({
  draggable: true
  })
  .setLngLat([0, 0])
  .addTo(map);
  

fetch('./get-places.json')
  .then(response => response.json())
  .then(data => {
    const places = data.data
    console.log(places)
    places.forEach((value, index) => {
      new mapboxgl.Marker({
        color: getColorFromCount(value.infected)
      })
        .setLngLat([value.longitude, value.latitude])
        .addTo(map);    
    })
  })