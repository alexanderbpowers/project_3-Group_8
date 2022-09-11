//*************************************
//Basic tile layer
//*************************************
var myMap = L.map("map", {
  center: [-7.20, -59.88],
  zoom: 7
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

//*************************************
// function to create a map with markers
//*************************************
function createMap(responce){
for (var i=0; i<responce.length; i++){
  console.log([responce[i].latitude, responce[i].longitude]);

  L.marker([responce[i].latitude, responce[i].longitude], {
    draggable: true
  }).bindPopup("<h1> "+ responce[i].station_id +"</h1><hr><h1> "+ responce[i].station +"</h1><hr><h1>" + responce[i].state + "</h1>").addTo(myMap);
};
};

//*************************************
// read from flask API & call function 
//*************************************
// const url = "api/stations";
// d3.json(url).then(createMap);

createMap(data);
