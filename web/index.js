mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyb25iaW5pIiwiYSI6ImNpcHU3ajc2cjA5eGNmbG0yZmh2a2Fud3EifQ.bMYgeUt9yYRmG3Za0B9lSw';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  zoom: 12,
  center: [-122.6739923, 45.5163031]
});
let initialized = false;
//mapbox marker array
let mapLocations = [];
function updateLocations(locationArray) {
  locationArray.forEach((element, index) => {
    if (mapLocations[index]) {
      mapLocations[index].setLngLat([element.longitude, element.latitude]);
    }
  });
}

const host = window.document.location.host.replace(/:.*/, '');
const ws = new WebSocket('ws://localhost:8080');

function moveMarkers(event) {
  let incoming = JSON.parse(event.data);
  if (!initialized) {
    initialized = true;
    initializeMarkers(incoming);
  } else {
    updateLocations(incoming.resultSet.vehicle);
  }
}

function initializeMarkers(incoming) {
  incoming.resultSet.vehicle.forEach(location => {
    let el = document.createElement('div');
    el.className = 'dot';
    if (location.type === 'bus') {
      el.classList.add([ 'bus' ]);
    } else if (location.type === 'rail') {
      el.classList.add([ 'train' ]);
    } else {
      el.style.backgroundColor = '#bbb';
    }
    let marker = new mapboxgl.Marker(el);
    marker.setLngLat([location.longitude, location.latitude]);
    marker.addTo(map);
    mapLocations.push(marker);
  });
}

ws.onmessage = function (event) {
  moveMarkers(event);
};
