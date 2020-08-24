
var map = L.map('mapid').setView([49.590294, 34.551315], 14);

var spiderbee = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);



// add your own pin
var teardrop = L.icon({
    iconUrl: 'images/marker-icon_red-1.png',
    iconSize: [19,29],
    iconAnchor: [8,29],
    //popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94]
});

//add some changes to onEachFeature function  
function styleGeoJson(feature, layer) {
    var popupContent = "<b>Номер: </b>" + feature.properties.Nr + "</br><b>Имя: </b> " + feature.properties.Name + "</br><b>Адресс: </b>" + feature.properties.Address + "</br><b>Город: </b>" + feature.properties.City + "</br><b>Собрание: </b>" + feature.properties.Congregation + "</br><b>Телефон: </b>" + feature.properties.Tel;

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }
    
    // call popup
    layer.bindPopup(popupContent);
    //call custom pins
    layer.setIcon(teardrop);
}


//for each feature for servants run the function define above - styleGeoJson
L.geoJson(servants, {
    onEachFeature: styleGeoJson,
     
})
.addTo(map);














// var place = L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup("<b>Hello world!</b><br />I am a popup.");


// var circle = L.circle([51.508, -0.11], 500, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.2
// }).addTo(map).bindPopup("I am a circle.");

// L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map).bindPopup("I am a polygon.");



// the code bellow will help you to get any coordinates on map
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);