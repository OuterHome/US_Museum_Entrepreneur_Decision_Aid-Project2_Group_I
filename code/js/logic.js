  // Initialize all of the LayerGroups we'll be using
  var layers = {
    museumPoints: new L.LayerGroup()
    //museumMarkers: new L.MarkerClusterGroup()
  };

// Create overlays object for toggling
var overlayMaps = {
    "Museum Points": layers.museumPoints
    //"Museum Markers": layers.museumMarkers
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

// Load CSV data using D3
d3.csv('museums.csv')
  .then(function(data) {
      //console.log(data);

      // Create a new marker cluster group
    //var museumMarkers = L.markerClusterGroup();
      //var heatArray = [];
      var pointArray = [];
      var radius = [];
      var color = [];
      //var museumType;

      for (var i = 0; i < data.length; i++) {
        var museumBasicData = Object.assign({}, data[i]);
        //console.log(museumBasicData);

        var lat = museumBasicData.Latitude,
            lon = museumBasicData.Longitude,
            name = museumBasicData['Museum Name'],
            type = museumBasicData['Museum Type'];
            income = museumBasicData.Income;
            revenue = museumBasicData.Revenue;

            type.trim();

          var trace1 = {
              x: name,
              y: income,
              type: 'bar',
              text: ['4.17 below the mean', '4.17 below the mean', '0.17 below the mean', '0.17 below the mean', '0.83 above the mean', '7.83 above the mean'],
              marker: {
                color: 'rgb(142,124,195)'
              }
            };
            
            var data = [trace1];
            
            var layout = {
              title: 'Number of Graphs Made this Week',
              font:{
                family: 'Raleway, sans-serif'
              },
              showlegend: false,
              xaxis: {
                tickangle: -45
              },
              yaxis: {
                zeroline: false,
                gridwidth: 2
              },
              bargap :0.05
            };
            
            Plotly.newPlot('plot', data, layout);
            Plotly.newPlot('plot2',data2,layout);
        
        // Earthquake magnitude >= 2 and < 3.5, to catch some weird earthquakes below 2.5 :P
        if (type === 'HISTORY MUSEUM') {
          //icon = icons.History;
          color = '#f45c42'
          radius = 5
        }
        // Earthquake magnitude >= 3.5 and < 4.5
        else if (type === 'ARBORETUM, BOTANICAL GARDEN, OR NATURE CENTER') {
          //icon = icons.Garden;
          color = '#f49541'
          radius = 5
        }
        // Earthquake magnitude >= 4.5 and < 5.5
        else if (type === 'SCIENCE & TECHNOLOGY MUSEUM OR PLANETARIUM') {
          //icon = icons.Science;
          color = '#f4e841'
          radius = 5
        }
        // Earthquake magnitude >= 5.5 and < 6.5
        else if (type === 'HISTORIC PRESERVATION') {
          //icon = icons.General;
          color = '#7cf441'
          radius = 5
        }
        // Earthquake magnitude >= 6.5
        else if (type === 'GENERAL MUSEUM') {
          //icon = icons.History;
          color = '#41f470'
          radius = 5
        }
        // Earthquake magnitude >= 6.5
        else if (type === 'ZOO, AQUARIUM, OR WILDLIFE CONSERVATION') {
          //icon = icons.History_Preservation;
          color = '#58f4ae'
          radius = 5
        }
        // Earthquake magnitude >= 6.5
        else if (type === 'ART MUSEUM') {
          //icon = icons.Zoo;
          color = '#41e5f4'
          radius = 5
        }
        // Earthquake magnitude >= 6.5
        else {
          //icon = icons.Childrens;
          color = '#a041f4'
          radius = 5
        }

        //var location = [lat, lon];
/*         if (location) {
          museumMarkers.addLayer(L.circleMarker(location,{
          radius: radius,
          color: color,
          fillOpacity: 0.5,
          fill: true
          })),

          //museumMarkers.addTo(layers.museumPoints),
          coordsMarker.bindPopup("Name: " + museumBasicData['Museum Name'] + "<br>\
          Coords: " + museumBasicData.Latitude + " " + museumBasicData.Longitude + "<br>\
          Type: " + museumBasicData['Museum Type'])
        } */

  

//WORKS BELOW---------

        var coordsMarker = L.circleMarker([lat, lon], {
          //icon: icon
          radius: radius,
          color: color,
          fillOpacity: 0.5,
          fill: true
        });
 
        // Add markers to museumPoints layers
        coordsMarker.addTo(layers.museumPoints); 

        // Bind pop-up to museum markers
        coordsMarker.bindPopup("Name: " + museumBasicData['Museum Name'] + "<br>\
        Coords: " + museumBasicData.Latitude + " " + museumBasicData.Longitude + "<br>\
        Type: " + museumBasicData['Museum Type']);

  }})
  .catch(function(error){
     // handle error   
  });

  //WORKS ABOVE---------

  // Create the map with our layers
var map = L.map("mapid", {
  center: [38.627222, -90.197778],
  zoom: 10,
  worldCopyJump: true,
  layers: [
      satelliteMap,
      layers.museumPoints,
  ]
  });
  
  // Load data for faultlines 
  //var faultlinesData = new L.GeoJSON.AJAX("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json");  
  //faultlinesData.addTo(layers.faultlinesLayer);     
  
  // Create a control for our layers, add our overlay layers to it
  L.control.layers(baseMaps, overlayMaps).addTo(map);
  
/*         // Create a legend to display information about our map
        var legend = L.control({
          position: "bottomright"
        });
    
        // When the layer control is added, insert a div with the class of "legend"
        function getColor(d) {
          return d >= 2.5 && d < 3.5 ? '#58f4ae' :
          d >= 3.5 && d < 4.5 ? '#a0ed42' :
          d >= 4.5 && d < 5.5 ? '#dddd33' :
          d >= 5.5 && d < 6.5 ? '#db9e1a' :
          d > 6.5 ? '#ce5408' :
                '#FFEDA0';
        };
    
        legend.onAdd = function() {
          var div = L.DomUtil.create("div", "legend"),
            values = [3, 4, 5, 6, 7]
            labels = ["2.5-3.5", "3.5-4.5", "4.5-5.5", "5.5-6.5", "6.5+"];
    
            for (var i = 0; i < values.length; i++) {
              div.innerHTML +=
                '<i style="background:' + getColor(values[i]) + '"></i> ' + labels[i] + "<br>"
            };
          return div;
    
        };
        // Add the info legend to the map
        legend.addTo(map); */

      