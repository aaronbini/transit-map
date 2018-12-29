var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
mapboxgl.accessToken = 'sk.eyJ1IjoiYWFyb25iaW5pIiwiYSI6ImNqcTl1dzNpcTBjZHAzeG1uY2hzY3lhaXAifQ.tyk2ZDM3iEKTX9Jsd5s0iA';
var map = new mapboxgl.Map({
container: 'YOUR_CONTAINER_ELEMENT_ID',
style: 'mapbox://styles/mapbox/streets-v11'
});