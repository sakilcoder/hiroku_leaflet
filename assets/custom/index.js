var stateLayer;
var regionsLayer;
var citiesLayer;
var spLayer;
var dis_stateLayer;
var dis_regionsLayer;
var dis_cityLayer;

let minMax = [];
let legendValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let strMinPrice = '';
let strMaxPrice = '';

// updateValueToStatesGeojson();

var map = L.map('map').setView([-50.78, -9.99], 4);
map.options.minZoom = 4;
map.options.maxZoom = 14;


var tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '',
    maxZoom: 20,
}).addTo(map);

updateValueToStatesGeojson();

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    // var div = L.DomUtil.create('div', 'info legend');
    // div.innerHTML = str;
    // return div;

    this._div = L.DomUtil.create('div', 'info legend');
    this.update();
    return this._div;
};

legend.update = function (props) {
    str = '<div class="input-group"><span class="input-group-addon">'+strMinPrice+'</span>';
    str += '<div class="progress input-group-addon" style="height:20px; width:300px">';
    for(i=0;i<legendColors.length;i++){
        
        str += '<div class="progress-bar" role="progressbar" style="width:10%; background-color:'+ legendColors[i] +' !important;"></div>';
    }
    str += '</div>';
    str += '<span class="input-group-addon" id="basic-addon1">'+strMaxPrice+'</span></div>';

    this._div.innerHTML = str;
};

legend.addTo(map);

L.easyButton('fa-home fa-lg', function () {
    if(stateLayer)
        map.removeLayer(stateLayer);
    if(regionsLayer)
        map.removeLayer(regionsLayer);
    if(citiesLayer)
        map.removeLayer(citiesLayer);
    if(spLayer)
        map.removeLayer(spLayer);
    if(dis_stateLayer)   
        map.removeLayer(dis_stateLayer);
    if(dis_regionsLayer)
        map.removeLayer(dis_regionsLayer);
    if(dis_cityLayer)
        map.removeLayer(dis_cityLayer);

    updateValueToStatesGeojson();
    // map.addLayer(stateLayer);
    // map.fitBounds(stateLayer.getBounds());

}).addTo(map);


map.on("zoomend", function (e) {
    
    let zoomLevel = map.getZoom();

    if (zoomLevel == 4) {
        if(stateLayer)
            map.removeLayer(stateLayer);
        if(regionsLayer)
            map.removeLayer(regionsLayer);
        if(citiesLayer)
            map.removeLayer(citiesLayer);
        if(spLayer)
            map.removeLayer(spLayer);
        if(dis_stateLayer)   
            map.removeLayer(dis_stateLayer);
        if(dis_regionsLayer)
            map.removeLayer(dis_regionsLayer);
        if(dis_cityLayer)
            map.removeLayer(dis_cityLayer);
        updateValueToStatesGeojson();
        // map.addLayer(stateLayer);

    }
});


