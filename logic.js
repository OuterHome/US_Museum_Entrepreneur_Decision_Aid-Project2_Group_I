// Initialize the LayerGroups we'll be using
var layers = {
  museumPoints: new L.LayerGroup(),
  StateBoundary: new L.GeoJSON.AJAX()
  
  
  //museumMarkers: new L.MarkerClusterGroup()
};
       
  // Create the tile layer that will be the background of our map
  var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
});

var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

// Create overlays object for toggling
var overlayMaps = {
    "Museum Types": layers.museumPoints,
    "State Boundary": layers.StateBoundary
    
    };
  
// Create object to hold base layers
var baseMaps = {
  "Satellite": satelliteMap,
  "Dark": darkMap,
  "Outdoors": outdoorsMap
};

/* // Initialize an object containing icons for each layer group
var icons = {
  History: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  Garden: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  Science: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  General: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  History_Preservation: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  Zoo: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "brown",
    shape: "circle"
  }),
  Art: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "black",
    shape: "circle"
  }),
  Childrens: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "white",
    shape: "circle"
  })
}; */


// Load data from "/map/" route
d3.json("/map/")
  .then(function(mapData) {
    var radius = [];
    var color = [];

    for (var i = 0; i < mapData.length; i++) {
      var museumBasicData = Object.assign({}, mapData[i]);

      // Define variable shortcuts from museumBasicData
      var lat = museumBasicData.latitude,
      lon = museumBasicData.Longitude,
      name = museumBasicData.museum_name,
      type = museumBasicData.museum_type;

        // History Type
        if (type === 'HISTORY MUSEUM') {
          //icon = icons.History;
          color = '#f45c42'
          radius = 3
          legend = 1
        }
        // Garden Type
        else if (type === 'ARBORETUM, BOTANICAL GARDEN, OR NATURE CENTER') {
          //icon = icons.Garden;
          color = '#f49541'
          radius = 3
          legend = 2
        }
        // Science Type
        else if (type === 'SCIENCE & TECHNOLOGY MUSEUM OR PLANETARIUM') {
          //icon = icons.Science;
          color = '#f4e841'
          radius = 3
          legend = 3
        }
        // History_Preservation Type
        else if (type === 'HISTORIC PRESERVATION') {
          //icon = icons.History_Preservation;
          color = '#7cf441'
          radius = 3
          legend = 4
        }
        // General Type
        else if (type === 'GENERAL MUSEUM') {
          //icon = icons.General;
          color = '#41f4ca'
          radius = 3
          legend = 5
        }
        // Zoo Type
        else if (type === 'ZOO, AQUARIUM, OR WILDLIFE CONSERVATION') {
          //icon = icons.Zoo;
          color = '#419af4'
          radius = 3
          legend = 6
        }
        // Art Type
        else if (type === 'ART MUSEUM') {
          //icon = icons.Art;
          color = '#7641f4'
          radius = 3
          legend = 7
        }
        // Childrens Type
        else {
          //icon = icons.Childrens;
          color = '#df41f4'
          radius = 3
          legend = 8
        }

    var coordsMarker = L.circleMarker([Number(lat), Number(lon)], {
      radius: radius,
      color: color,
      fillOpacity: 0.5,
      fill: true

          //var coordsMarker = L.Marker([Number(lat), Number(lon)], {
      //icon: icon
      //radius: radius,
    });

    // Add markers to museumPoints
    coordsMarker.addTo(layers.museumPoints); 
    layers.StateBoundary.addTo(map);

    // Add popups to museumPoints
    coordsMarker.bindPopup("Name: " + name + "<br>\
    Coords: " + lat + " " + lon + "<br>\
    Type: " + type);
    }});

// Create the map with our layers
var map = L.map("mapid", {
  center: [38.627222, -90.197778],
  zoom: 12,
  worldCopyJump: true,
  layers: [
      satelliteMap,
      layers.museumPoints,
  ]
  })
  // var stateline = new L.GeoJSON.AJAX("https://leafletjs.com/examples/choropleth/us-states.js");
  // stateline.addTo(map);

// Create layer control
L.control.layers(baseMaps, overlayMaps).addTo(map);
  
// Create a legend to display information about our map
var legend = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
function getColor(d) {
  return d <= 1 ? '#f45c42' :
  d <= 2 ? '#f49541' :
  d <= 3 ? '#f4e841' :
  d <= 4 ? '#7cf441' :
  d <= 5 ? '#41f4ca' :
  d <= 6 ? '#419af4' :
  d <= 7 ? '#7641f4' :
          '#df41f4' ;
};

legend.onAdd = function() {
  var div = L.DomUtil.create("div", "legend"),
    values = [1, 2, 3, 4, 5, 6, 7, 8]
    labels = ["History", "Garden", "Science", "Preservation", "General", "Zoo", "Art", "Childrens"];

    for (var i = 0; i < values.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColor(values[i]) + '"></i> ' + labels[i] + "<br>"
    };
  return div;

};
// Add the info legend to the map
legend.addTo(map);